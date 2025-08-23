


// server.js
const mysql = require("mysql2");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const jwt_ka_secret = "abcekukh1323";
// web rtc ke liye
const {Server} = require("socket.io");
const http = require("http");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Superman",
});

// Helper: promise wrapper
const db = con.promise();

// authentication ka middleware 
rakshak = (req, res, next) => {
  const authheader = req.headers['authorization'];

  const token = authheader && authheader.split(' ')[1];

  if(!token) return res.status(401).send({message:"token nahi hai"});

  jwt.verify(token, jwt_ka_secret, (err,user) =>{
    if(err) return res.status(403).send({message: "token invalid hai yaa phir maar gaya hai"});

    req.user = user;
    next();
  })
  
  };



/*
  ROUTES
  - Student: /signupS, /loginS
  - Teacher: /signupT, /loginT
  - Teacher profile: POST /infoofteacher (insert or update)
  - Get teachers by language/subject: GET /api/teachers?lang=english
  - Get single teacher by username: GET /api/teachers/username/:username
  - Bookings: GET /bookings?username=<tutorUsername>  (returns tutor's bookings)
              POST /bookings  (accepts tutorUsername & studentUsername OR start/end datetimes OR date+time)
  - Teacher requests (pending): GET /teacher/:username/requests
  - Accept/reject booking: POST /teacher/requests/:bookingId/decision
*/

// --------- STUDENT ---------
app.post("/signupS", async (req, res) => {
  try {
    const { namer, username, pass } = req.body;
    if (!namer || !username || !pass) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const hash = await bcrypt.hash(pass, 10);

    // insert into signups (student info) and loginS (credentials)
    await db.query("INSERT INTO signups (namer, username) VALUES (?, ?)", [
      namer,
      username,
    ]);
    await db.query("INSERT INTO logins (username, pass) VALUES (?, ?)", [
      username,
      hash,
    ]);

    return res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    console.error("signupS error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/loginS", (req, res) => {
  const { username, pass } = req.body;
  if (!username || !pass) return res.status(400).json({ message: "Missing fields" });

  const q = "SELECT * FROM logins WHERE username = ?";
  con.query(q, [username], (err, results) => {
    if (err) {
      console.error("loginS db error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (results.length === 0) return res.status(404).json({ message: "Username not found" });

    const user = results[0];
    bcrypt.compare(pass, user.pass, (err, match) => {
      if (err) {
        console.error("bcrypt error:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (!match) return res.status(401).json({ message: "Incorrect password" });
      // return res.status(200).json({ message: "Login successful", username: user.username });

      // fetching the my student login details

      con.query("SELECT * FROM signups WHERE username = ?", [username], (err, sRes) => {
        if (err) {
          console.error("fetch teacher info error:", err);
          return res.status(500).json({ message: "Server error" });
        }
        if (sRes.length === 0) return res.status(404).json({ message: "student ka info not found" });

        const student = sRes[0];

// jwt ka code 

const token = jwt.sign({username: username}, jwt_ka_secret, {expiresIn: "20m"});

        return res.status(200).json({
          message: "Login successful",
          student: {
            username: student.username,
            namer: student.namer,
            // email: student.email,
            id: student.id,
            token: token,
          },
        });
      });

// bus yaha tak as a trial 



    });
  });
});

// --------- TEACHER (signup/login) ---------
app.post("/signupT", async (req, res) => {
  try {
    const { namer, username, email, pass } = req.body;
    if (!namer || !username || !email || !pass) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const hash = await bcrypt.hash(pass, 10);

    await db.query("INSERT INTO signupt (namer, username, email) VALUES (?, ?, ?)", [
      namer,
      username,
      email,
    ]);
    await db.query("INSERT INTO logint (username, pass) VALUES (?, ?)", [username, hash]);

    return res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    console.error("signupT error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/loginT", (req, res) => {
  const { username, pass } = req.body;
  if (!username || !pass) return res.status(400).json({ message: "Missing fields" });

  const q = "SELECT * FROM logint WHERE username = ?";
  con.query(q, [username], (err, results) => {
    if (err) {
      console.error("loginT db error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (results.length === 0) return res.status(404).json({ message: "Username not found" });

    const user = results[0];
    bcrypt.compare(pass, user.pass, (err, match) => {
      if (err) {
        console.error("bcrypt error:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (!match) return res.status(401).json({ message: "Incorrect password" });

      // fetch teacher details from signupt (profile basic info)
      con.query("SELECT * FROM signupt WHERE username = ?", [username], (err, tRes) => {
        if (err) {
          console.error("fetch teacher info error:", err);
          return res.status(500).json({ message: "Server error" });
        }
        if (tRes.length === 0) return res.status(404).json({ message: "Teacher info not found" });

        const teacher = tRes[0];


        // jwt ka code 
        const token = jwt.sign({username: username}, jwt_ka_secret, {expiresIn:"1h"});

        return res.status(200).json({
          message: "Login successful",
          teacher: {
            username: teacher.username,
            namer: teacher.namer,
            email: teacher.email,
            id: teacher.id,
            token:token,
          },
        });
      });
    });
  });
});

// --------- TEACHER PROFILE (insert or update) ---------
// Expects: { username, namer, oneline, about, lang, timezone, subjects, level, education, exp }
app.post("/infoofteacher", async (req, res) => {
  try {
    const { username, namer = null, oneline = null, about = null, lang = null, timezone = null, subjects = null, level = null, education = null,  exp = null,
    } = req.body;

    if (!username) return res.status(400).json({ message: "Username is required" });

    const [rows] = await db.query("SELECT * FROM teacherprofile WHERE username = ?", [username]);

    if (rows.length > 0) {
      // UPDATE
      const updateQuery = `
        UPDATE teacherprofile
        SET namer = ?, oneline = ?, about = ?, lang = ?, timezone = ?, subjects = ?, level = ?, education = ?, exp = ?
        WHERE username = ?
      `;
      await db.query(updateQuery, [namer, oneline, about, lang, timezone, subjects, level, education, exp, username,]);
      return res.json({ message: "Profile updated successfully" });
    } else {
      // INSERT
      const insertQuery = `
        INSERT INTO teacherprofile (username, namer, oneline, about, lang, timezone, subjects, level, education, exp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await db.query(insertQuery, [ username, namer, oneline, about, lang, timezone, subjects, level, education, exp, ]);
      return res.json({ message: "Profile created successfully" });
    }
  } catch (err) {
    console.error("infoofteacher error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// --------- GET TEACHERS (by language/subject partial match) ---------
// GET /api/teachers?lang=english
app.get("/api/teachers", async (req, res) => {
  try {
    const { lang } = req.query;
    if (!lang) return res.status(400).json({ message: "Language is required" });

    const sql = "SELECT * FROM teacherprofile WHERE LOWER(subjects) LIKE ? OR LOWER(lang) LIKE ?";
    const like = `%${lang.toLowerCase()}%`;
    const [rows] = await db.query(sql, [like, like]);
    return res.json(rows);
  } catch (err) {
    console.error("GET /api/teachers error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// --------- GET single teacher by username ---------
// GET /api/teachers/username/:username
app.get("/api/teachers/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const [rows] = await db.query("SELECT * FROM teacherprofile WHERE username = ?", [username]);
    if (rows.length === 0) return res.status(404).json({ message: "Teacher not found" });
    return res.json(rows[0]);
  } catch (err) {
    console.error("GET teacher by username error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// --------- BOOKINGS (use usernames instead of numeric ids) ---------
// GET /bookings?username=<tutorUsername>
// app.get("/bookings", async (req, res) => {
//   try {
//     const { username } = req.query;
//     if (!username) return res.status(400).json({ message: "Tutor username is required" });

//     // join teacherprofile to get tutor id, then get bookings
//     const sql = `
//       SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, b.status, b.roomId
//       FROM Bookings b
//       WHERE b.tutorUsername = ?
//       ORDER BY b.start ASC
//     `;
//     const [rows] = await db.query(sql, [username]);
//     return res.json(rows);
//   } catch (err) {
//     console.error("GET /bookings error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });
// In /bookings endpoint for teacher









// ---------------------------------------get for booking----------------

// app.get("/bookings", async (req, res) => {
//   try {
//     const { username } = req.query;
//     if (!username) return res.status(400).json({ message: "Tutor username is required" });

//     const sql = `
//       SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, b.status, b.roomId
//       FROM Bookings b
//       WHERE b.tutorUsername = ?
//       ORDER BY b.start ASC
//     `;
//     const [rows] = await db.query(sql, [username]);
//     // Attach studentSocketId
//     const bookingsWithSocket = rows.map(b => ({
//       ...b,
//       studentSocketId: onlineStudents[b.studentUsername] || null
//     }));
//     return res.json(bookingsWithSocket);
//   } catch (err) {
//     console.error("GET /bookings error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });


// GET /student/bookings?username=<studentUsername>
// Returns bookings where the studentUsername matches the given username
app.get("/student/bookings", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ message: "Student username is required" });

    const sql = `
      SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, b.status, b.message, b.roomId
      FROM Bookings b
      WHERE b.studentUsername = ?
      ORDER BY b.start ASC
    `;
    const [rows] = await db.query(sql, [username]);
    return res.json(rows);
  } catch (err) {
    console.error("GET /student/bookings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});




// POST /bookings
// Accepts either:
//  - { tutorUsername, studentUsername, start, end }   (start/end are datetimes)
//  - or { tutorUsername, studentUsername, date, time } (we'll create start from date+time and end +1 hour)
app.post("/bookings", async (req, res) => {
  try {
    const { tutorUsername, studentUsername, start, end, date, time } = req.body;
//  const tutorUsername = req.query.tutorUsername;


    // if (!tutorUsername || !studentUsername) {
    //   return res.status(400).json({ message: "tutorUsername and studentUsername required" });
    // }

    // Build start/end if needed
    let startDatetime = start || null;
    let endDatetime = end || null;

    if (!startDatetime && date && time) {
      // Expecting date in YYYY-MM-DD and time in HH:MM (24h)
      startDatetime = `${date} ${time}:00`;
      const startTs = new Date(startDatetime);
      const endTs = new Date(startTs.getTime() + 60 * 60 * 1000); // +1 hour
      // format to MySQL 'YYYY-MM-DD HH:MM:SS'
      const pad = (n) => (n < 10 ? "0" + n : n);
      const toSql = (d) =>
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
          d.getHours()
        )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      startDatetime = toSql(startTs);
      endDatetime = toSql(endTs);
    }

    if (!startDatetime || !endDatetime) {
      return res.status(400).json({ message: "start/end datetime (or date+time) required" });
    }

    
    const [tRows] = await db.query("SELECT username FROM teacherprofile WHERE username = ?", [
      tutorUsername,
    ]);
    if (tRows.length === 0) return res.status(404).json({ message: "Tutor not found" });

    const [sRows] = await db.query("SELECT username FROM signups WHERE username = ?", [
      studentUsername,
    ]);
    if (sRows.length === 0) {
      // Not fatal — maybe students are stored elsewhere; still warn
      console.warn("student not found in signups:", studentUsername);
      // you can decide to return 404 or allow it
      // return res.status(404).json({ message: "Student not found" });
    }

    // Insert booking using usernames (make sure Bookings table has tutorUsername / studentUsername columns)
    const insertSql =
      "INSERT INTO Bookings (tutorUsername, studentUsername, start, end, status) VALUES (?, ?, ?, ?, ?)";
    await db.query(insertSql, [tutorUsername, studentUsername, startDatetime, endDatetime, "pending"]);

    return res.json({ message: "Booking saved" });
  } catch (err) {
    console.error("POST /bookings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// --------- TEACHER: pending requests by tutor username ---------
// GET /teacher/:username/requests
app.get("/teacher/:username/requests", async (req, res) => {
  try {
    const { username } = req.params;

    const sql = `
      SELECT b.id, b.tutorUsername, b.studentUsername, s.namer AS student_name, b.start, b.end, b.status
      FROM Bookings b
      LEFT JOIN signups s ON s.username = b.studentUsername
      WHERE b.tutorUsername = ? AND b.status = 'pending'
      ORDER BY b.start ASC
    `;
    const [rows] = await db.query(sql, [username]);
    return res.json(rows);
  } catch (err) {
    console.error("GET teacher requests error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// --------- Accept / Reject booking (by booking id) ---------
// POST /teacher/requests/:bookingId/decision  with { decision: 'accepted'|'rejected' }
app.post("/teacher/requests/:bookingId/decision", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { decision, message } = req.body;
    if (!["accepted", "rejected"].includes(decision)) {
      return res.status(400).json({ message: "Invalid decision" });
    }
//     await db.query("UPDATE Bookings SET status = ? WHERE id = ?", [decision, bookingId]);
//     return res.json({ message: `Booking ${decision}` });
//   } catch (err) {
//     console.error("POST booking decision error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

 const msgToSave = decision === "rejected" ? null : message || null;

 await db.query("UPDATE Bookings SET status = ?, message = ? WHERE id = ?", [decision, message, bookingId]);

    return res.json({ message: `Booking ${decision}` });
  } catch (err) {
    console.error("POST booking decision error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});



// new course creation se related 

// Get all courses (student marketplace)
// app.get("/api/courses", async (req, res) => {
// //   try {
// //     const [rows] = await db.query("SELECT * FROM teacherprofile");
// //     return res.json(rows);
// //   } catch (err) {
// //     console.error("GET /api/courses error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });

// Get all courses OR filter by tutorUsername query param
app.get("/api/courses", async (req, res) => {
  try {
    const { tutorUsername } = req.query;
    let sql = "SELECT * FROM newcourse";
    let params = [];

    if (tutorUsername) {
      sql += " WHERE tutorUsername = ?";
      params.push(tutorUsername);
    }

    const [rows] = await db.query(sql, params);
    return res.json(rows);
  } catch (err) {
    console.error("GET /api/courses error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});



// Get courses by teacher username (teacher dashboard)
app.get("/api/courses/by-teacher/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const [rows] = await db.query("SELECT * FROM teacherprofile WHERE username = ?", [username]);
    return res.json(rows);
  } catch (err) {
    console.error("GET /api/courses/by-teacher error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});




// yeah hai mera new course creation course

const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // upload path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

// Create course endpoint
app.post('/createcourse', upload.single('thumbnail'), (req, res) => {
  const { title, description, category, duration, level, price, tutorUsername} = req.body;
    // const teacherUsername = req.session.teacherUsername;

    if (! tutorUsername ){
    return res.status(400).json({ message: 'Teacher username is required' });
  }

  // if (!req.file) {
  //   return res.status(400).json({ message: 'Thumbnail is required' });
  // }

  const thumbnail = req.file.filename;

  const sql = `INSERT INTO newcourse (title, description, category, duration, level, price, thumbnail, tutorUsername)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;

  db.query(sql, [title, description, category, duration, level, price, thumbnail, tutorUsername], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: 'Error creating course' });
    }
    res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
  });
});





// 

// Fetch all courses
app.get("/courses", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM newcourse");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});


app.get("/courses/subjects", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT DISTINCT category FROM newcourse");
    const subjects = rows.map(r => r.category); // ✅ now fetching category
    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});



// ---------------------------------------VIDEO CALL wala feature------------------------------------------------------------------------------ //



// ----------------------- SOCKET.IO & VIDEO CALL -----------------------

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});





const onlineStudents = {}; // { username: socketId }

io.on("connection", (socket) => {
  console.log(`🔌 New user connected: ${socket.id}`);

  // 1️⃣ Student announces online status
  socket.on("student-online", (username) => {
    onlineStudents[username] = socket.id;
    console.log(`✅ Student ${username} is online with socket ${socket.id}`);
  });

  // 2️⃣ Handle disconnects
  socket.on("disconnect", () => {
    for (const user in onlineStudents) {
      if (onlineStudents[user] === socket.id) {
        delete onlineStudents[user];
        console.log(`❌ Student ${user} disconnected (${socket.id})`);
        break;
      }
    }

    // Notify others
    socket.broadcast.emit("user-disconnected", socket.id);
  });

  // 3️⃣ WebRTC signaling
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`📢 User ${socket.id} joined room: ${roomId}`);
    socket.to(roomId).emit("user-joined", socket.id);
  });

  socket.on("offer", ({ roomId, sdp }) => {
    socket.to(roomId).emit("offer", { sdp, sender: socket.id });
  });

  socket.on("answer", ({ roomId, sdp }) => {
    socket.to(roomId).emit("answer", { sdp, sender: socket.id });
  });

  socket.on("ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("ice-candidate", { candidate, sender: socket.id });
  });
});




// ----------------------- ROUTES -----------------------
const { v4: uuidv4 } = require("uuid");

// GET /bookings (teacher)
app.get("/bookings", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ message: "Tutor username is required" });

    const sql = `
      SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, b.status, b.roomId
      FROM Bookings b
      WHERE b.tutorUsername = ?
      ORDER BY b.start ASC
    `;
    const [rows] = await db.query(sql, [username]);

    // Attach studentSocketId
    const bookingsWithSocket = rows.map((b) => ({
      ...b,
      studentSocketId: onlineStudents[b.studentUsername] || null,
    }));

    return res.json(bookingsWithSocket);
  } catch (err) {
    console.error("GET /bookings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /start-call
app.post("/start-call", async (req, res) => {
  try {
    const { tutorUsername, studentUsername, bookingId } = req.body;
    if (!tutorUsername || !studentUsername || !bookingId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const roomId = uuidv4();
    await db.query("UPDATE Bookings SET roomId = ? WHERE id = ?", [roomId, bookingId]);

    // Notify student if online
    const studentSocketId = onlineStudents[studentUsername];
    if (studentSocketId) {
      io.to(studentSocketId).emit("incoming-call", { roomId, tutorUsername, bookingId });
    }

    return res.json({ message: "Call started", roomId });
  } catch (err) {
    console.error("POST /start-call error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /get-call/:bookingId
app.get("/get-call/:bookingId", rakshak, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const [rows] = await db.query("SELECT roomId FROM Bookings WHERE id = ?", [bookingId]);

    if (rows.length === 0 || !rows[0].roomId) {
      return res.status(404).json({ message: "No active call" });
    }

    return res.json({ roomId: rows[0].roomId });
  } catch (err) {
    console.error("GET /get-call error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});



// new frontend api access points
// Add these endpoints to your server.js

// Get recommended tutors (for dashboard)
// Get recommended tutors (for dashboard)
app.get('/api/tutors/recommended', async (req, res) => {
  try {
    // First, just get the basic teacher data without any complex joins
    const [rows] = await db.query(`
      SELECT * FROM teacherprofile 
      ORDER BY id DESC 
      LIMIT 8
    `);
    
    // Format the response
    const tutors = rows.map(tutor => ({
      id: tutor.id,
      name: tutor.namer,
      username: tutor.username,
      subject: tutor.subjects,
      experience: tutor.exp,
      rating: (4.5 + Math.random() * 0.5).toFixed(1),
      reviews: Math.floor(Math.random() * 50) + 10,
      hourlyRate: `₹${Math.floor(500 + Math.random() * 1500)}/hr`,
      responseTime: ['1 hour', '2 hours', '3 hours', '4 hours'][Math.floor(Math.random() * 4)],
      description: tutor.about || tutor.oneline || "Experienced tutor",
      profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`,
      isOnline: Math.random() > 0.3,
      lang: tutor.lang,
      about: tutor.about,
      education: tutor.education,
      level: tutor.level
    }));
    
    res.json(tutors);
  } catch (err) {
    console.error('GET /api/tutors/recommended error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get tutors by language
app.get('/api/tutors', async (req, res) => {
  try {
    const { lang } = req.query;
    if (!lang) return res.status(400).json({ message: 'Language is required' });

    const [rows] = await db.query(`
      SELECT * FROM teacherprofile 
      WHERE LOWER(lang) LIKE ? OR LOWER(subjects) LIKE ?
      ORDER BY id DESC
    `, [`%${lang.toLowerCase()}%`, `%${lang.toLowerCase()}%`]);
    
    const tutors = rows.map(tutor => ({
      id: tutor.id,
      name: tutor.namer,
      username: tutor.username,
      subject: tutor.subjects,
      experience: tutor.exp,
      rating: (4.5 + Math.random() * 0.5).toFixed(1),
      reviews: Math.floor(Math.random() * 50) + 10,
      hourlyRate: `₹${Math.floor(500 + Math.random() * 1500)}/hr`,
      responseTime: ['1 hour', '2 hours', '3 hours', '4 hours'][Math.floor(Math.random() * 4)],
      description: tutor.about || tutor.oneline || "Experienced tutor",
      profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`,
      isOnline: Math.random() > 0.3,
      lang: tutor.lang,
      about: tutor.about,
      education: tutor.education,
      level: tutor.level,
      oneline: tutor.oneline
    }));
    
    res.json(tutors);
  } catch (err) {
    console.error('GET /api/tutors error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get tutor by username
app.get('/api/tutors/username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    const [rows] = await db.query(`
      SELECT * FROM teacherprofile 
      WHERE username = ?
    `, [username]);
    
    if (rows.length === 0) return res.status(404).json({ message: 'Tutor not found' });
    
    const tutor = rows[0];
    const formattedTutor = {
      id: tutor.id,
      name: tutor.namer,
      username: tutor.username,
      subject: tutor.subjects,
      experience: tutor.exp,
      rating: (4.5 + Math.random() * 0.5).toFixed(1),
      reviews: Math.floor(Math.random() * 50) + 10,
      hourlyRate: `₹${Math.floor(500 + Math.random() * 1500)}/hr`,
      responseTime: ['1 hour', '2 hours', '3 hours', '4 hours'][Math.floor(Math.random() * 4)],
      description: tutor.about || tutor.oneline || "Experienced tutor",
      profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`,
      isOnline: Math.random() > 0.3,
      lang: tutor.lang,
      about: tutor.about,
      education: tutor.education,
      level: tutor.level,
      oneline: tutor.oneline,
      timezone: tutor.timezone
    };
    
    res.json(formattedTutor);
  } catch (err) {
    console.error('GET /api/tutors/username error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});




// fallback
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// start
server.listen(4000, () => {
  console.log("Server running on port 4000");
});


















// const onlineStudents = {}; // { username: socketId }

// const roomOffers = {}; // { roomId: { sdp, sender } }

// io.on("connection", (socket) => {
//   console.log("New user connected:", socket.id);

//   // 1️⃣ Student announces online status
//   socket.on("student-online", (username) => {
//     onlineStudents[username] = socket.id;
//     console.log(`Student ${username} is online with socket ${socket.id}`);
//   });

//   // 2️⃣ Handle disconnects
//   socket.on("disconnect", () => {
//     Object.keys(onlineStudents).forEach((user) => {
//       if (onlineStudents[user] === socket.id) delete onlineStudents[user];
//     });
//     socket.broadcast.emit("user-disconnected", socket.id);
//     console.log("User disconnected:", socket.id);
//   });

//   // 3️⃣ WebRTC signaling
//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room: ${roomId}`);
//     socket.to(roomId).emit("user-joined", socket.id);

//   });

//   // socket.on("offer", (data) => {
//   //   socket.to(data.roomId).emit("offer", {
//   //     sdp: data.sdp,
//   //     sender: socket.id,
//   //   });
//   // });

//   // socket.on("answer", (data) => {
//   //   socket.to(data.roomId).emit("answer", {
//   //     sdp: data.sdp,
//   //     sender: socket.id,
//   //   });
//   // });


//    // 3️⃣ Join room
//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room: ${roomId}`);

//     // If an offer already exists, immediately send it to the new joiner
//     if (roomOffers[roomId]) {
//       socket.emit("offer", roomOffers[roomId]);
//       console.log(`Re-sent stored offer to late joiner ${socket.id}`);
//     }

//     socket.to(roomId).emit("user-joined", socket.id);
//   });

//   // 4️⃣ Store + forward SDP offer
//   socket.on("offer", (data) => {
//     const offerPayload = {
//       sdp: data.sdp,
//       sender: socket.id,
//       roomId: data.roomId,
//     };
//     roomOffers[data.roomId] = offerPayload; // ✅ Save the latest offer

//     socket.to(data.roomId).emit("offer", offerPayload);
//     console.log(`Offer stored for room ${data.roomId} from ${socket.id}`);
//   });

//   // 5️⃣ Forward SDP answer
//   socket.on("answer", (data) => {
//     socket.to(data.roomId).emit("answer", {
//       sdp: data.sdp,
//       sender: socket.id,
//     });
//   });


//   socket.on("ice-candidate", (data) => {
//     socket.to(data.roomId).emit("ice-candidate", {
//       candidate: data.candidate,
//       sender: socket.id,
//     });
//   });
// });


// const onlineStudents = {}; // { username: socketId }
// const offers = {}; // { roomId: sdp }

// io.on("connection", (socket) => {
//   console.log("New user connected:", socket.id);

//   // Student announces online status
//   socket.on("student-online", (username) => {
//     onlineStudents[username] = socket.id;
//     console.log(`Student ${username} is online with socket ${socket.id}`);
//   });

//   // Handle disconnects
//   socket.on("disconnect", () => {
//     Object.keys(onlineStudents).forEach((user) => {
//       if (onlineStudents[user] === socket.id) delete onlineStudents[user];
//     });
//     socket.broadcast.emit("user-disconnected", socket.id);
//     console.log("User disconnected:", socket.id);
//   });

//   // WebRTC signaling
//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room: ${roomId}`);
//     socket.to(roomId).emit("user-joined", socket.id);

//     // ✅ If teacher already created an offer, send it to this student immediately
//     if (offers[roomId]) {
//       socket.emit("offer", { sdp: offers[roomId] });
//     }
//   });

//   socket.on("offer", (data) => {
//     // ✅ Save teacher’s offer
//     offers[data.roomId] = data.sdp;

//     // Send it to students
//     socket.to(data.roomId).emit("offer", {
//       sdp: data.sdp,
//       sender: socket.id,
//     });
//   });

//   socket.on("answer", (data) => {
//     socket.to(data.roomId).emit("answer", {
//       sdp: data.sdp,
//       sender: socket.id,
//     });
//   });

//   socket.on("ice-candidate", (data) => {
//     socket.to(data.roomId).emit("ice-candidate", {
//       candidate: data.candidate,
//       sender: socket.id,
//     });
//   });
// });





// --------------------------