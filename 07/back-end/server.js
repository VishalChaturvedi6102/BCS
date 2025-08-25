


// // server.js
// const mysql = require("mysql2");
// const express = require("express");
// const bodyparser = require("body-parser");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const multer = require("multer");
// const jwt = require("jsonwebtoken");
// const jwt_ka_secret = "abcekukh1323";
// // web rtc ke liye
// const {Server} = require("socket.io");
// const http = require("http");
// const path = require("path"); 
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');



// const app = express();

// const server = http.createServer(app);
// // app.use(cors());
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));
// app.use(bodyparser.json());
// app.use(express.json());

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "Superman",
// });

// // Helper: promise wrapper
// const db = con.promise();

// // authentication ka middleware 
// rakshak = (req, res, next) => {
//   const authheader = req.headers['authorization'];

//   const token = authheader && authheader.split(' ')[1];

//   if(!token) return res.status(401).send({message:"token nahi hai"});

//   jwt.verify(token, jwt_ka_secret, (err,user) =>{
//     if(err) return res.status(403).send({message: "token invalid hai yaa phir maar gaya hai"});

//     req.user = user;
//     next();
//   })
  
//   };



// /*
//   ROUTES
//   - Student: /signupS, /loginS
//   - Teacher: /signupT, /loginT
//   - Teacher profile: POST /infoofteacher (insert or update)
//   - Get teachers by language/subject: GET /api/teachers?lang=english
//   - Get single teacher by username: GET /api/teachers/username/:username
//   - Bookings: GET /bookings?username=<tutorUsername>  (returns tutor's bookings)
//               POST /bookings  (accepts tutorUsername & studentUsername OR start/end datetimes OR date+time)
//   - Teacher requests (pending): GET /teacher/:username/requests
//   - Accept/reject booking: POST /teacher/requests/:bookingId/decision
// */

// // --------- STUDENT ---------
// app.post("/signupS", async (req, res) => {
//   try {
//     const { namer, username, pass } = req.body;
//     if (!namer || !username || !pass) {
//       return res.status(400).json({ message: "Please fill all fields" });
//     }

//     const hash = await bcrypt.hash(pass, 10);

//     // insert into signups (student info) and loginS (credentials)
//     await db.query("INSERT INTO signups (namer, username) VALUES (?, ?)", [
//       namer,
//       username,
//     ]);
//     await db.query("INSERT INTO logins (username, pass) VALUES (?, ?)", [
//       username,
//       hash,
//     ]);

//     return res.status(200).json({ message: "Signup successful" });
//   } catch (err) {
//     console.error("signupS error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/loginS", (req, res) => {
//   const { username, pass } = req.body;
//   if (!username || !pass) return res.status(400).json({ message: "Missing fields" });

//   const q = "SELECT * FROM logins WHERE username = ?";
//   con.query(q, [username], (err, results) => {
//     if (err) {
//       console.error("loginS db error:", err);
//       return res.status(500).json({ message: "Server error" });
//     }
//     if (results.length === 0) return res.status(404).json({ message: "Username not found" });

//     const user = results[0];
//     bcrypt.compare(pass, user.pass, (err, match) => {
//       if (err) {
//         console.error("bcrypt error:", err);
//         return res.status(500).json({ message: "Server error" });
//       }
//       if (!match) return res.status(401).json({ message: "Incorrect password" });
//       // return res.status(200).json({ message: "Login successful", username: user.username });

//       // fetching the my student login details

//       con.query("SELECT * FROM signups WHERE username = ?", [username], (err, sRes) => {
//         if (err) {
//           console.error("fetch teacher info error:", err);
//           return res.status(500).json({ message: "Server error" });
//         }
//         if (sRes.length === 0) return res.status(404).json({ message: "student ka info not found" });

//         const student = sRes[0];

// // jwt ka code 

// const token = jwt.sign({username: username}, jwt_ka_secret, {expiresIn: "20m"});

//         return res.status(200).json({
//           message: "Login successful",
//           student: {
//             username: student.username,
//             namer: student.namer,
//             // email: student.email,
//             id: student.id,
//             token: token,
//           },
//         });
//       });

// // bus yaha tak as a trial 



//     });
//   });
// });

// // --------- TEACHER (signup/login) ---------
// app.post("/signupT", async (req, res) => {
//   try {
//     const { namer, username, email, pass } = req.body;
//     if (!namer || !username || !email || !pass) {
//       return res.status(400).json({ message: "Please fill all fields" });
//     }

//     const hash = await bcrypt.hash(pass, 10);

//     await db.query("INSERT INTO signupt (namer, username, email) VALUES (?, ?, ?)", [
//       namer,
//       username,
//       email,
//     ]);
//     await db.query("INSERT INTO logint (username, pass) VALUES (?, ?)", [username, hash]);

//     return res.status(200).json({ message: "Signup successful" });
//   } catch (err) {
//     console.error("signupT error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/loginT", (req, res) => {
//   const { username, pass } = req.body;
//   if (!username || !pass) return res.status(400).json({ message: "Missing fields" });

//   const q = "SELECT * FROM logint WHERE username = ?";
//   con.query(q, [username], (err, results) => {
//     if (err) {
//       console.error("loginT db error:", err);
//       return res.status(500).json({ message: "Server error" });
//     }
//     if (results.length === 0) return res.status(404).json({ message: "Username not found" });

//     const user = results[0];
//     bcrypt.compare(pass, user.pass, (err, match) => {
//       if (err) {
//         console.error("bcrypt error:", err);
//         return res.status(500).json({ message: "Server error" });
//       }
//       if (!match) return res.status(401).json({ message: "Incorrect password" });

//       // fetch teacher details from signupt (profile basic info)
//       con.query("SELECT * FROM signupt WHERE username = ?", [username], (err, tRes) => {
//         if (err) {
//           console.error("fetch teacher info error:", err);
//           return res.status(500).json({ message: "Server error" });
//         }
//         if (tRes.length === 0) return res.status(404).json({ message: "Teacher info not found" });

//         const teacher = tRes[0];


//         // jwt ka code 
//         const token = jwt.sign({username: username}, jwt_ka_secret, {expiresIn:"1h"});

//         return res.status(200).json({
//           message: "Login successful",
//           teacher: {
//             username: teacher.username,
//             namer: teacher.namer,
//             email: teacher.email,
//             id: teacher.id,
//             token:token,
//           },
//         });
//       });
//     });
//   });
// });

// // --------- TEACHER PROFILE (insert or update) ---------
// // Expects: { username, namer, oneline, about, lang, timezone, subjects, level, education, exp }
// // app.post("/infoofteacher", async (req, res) => {
// //   try {
// //     const { username, namer = null, oneline = null, about = null, lang = null, timezone = null, subjects = null, level = null, education = null,  exp = null,
// //     } = req.body;

// //     if (!username) return res.status(400).json({ message: "Username is required" });

// //     const [rows] = await db.query("SELECT * FROM teacherprofile WHERE username = ?", [username]);

// //     if (rows.length > 0) {
// //       // UPDATE
// //       const updateQuery = `
// //         UPDATE teacherprofile
// //         SET namer = ?, oneline = ?, about = ?, lang = ?, timezone = ?, subjects = ?, level = ?, education = ?, exp = ?
// //         WHERE username = ?
// //       `;
// //       await db.query(updateQuery, [namer, oneline, about, lang, timezone, subjects, level, education, exp, username,]);
// //       return res.json({ message: "Profile updated successfully" });
// //     } else {
// //       // INSERT
// //       const insertQuery = `
// //         INSERT INTO teacherprofile (username, namer, oneline, about, lang, timezone, subjects, level, education, exp)
// //         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// //       `;
// //       await db.query(insertQuery, [ username, namer, oneline, about, lang, timezone, subjects, level, education, exp, ]);
// //       return res.json({ message: "Profile created successfully" });
// //     }
// //   } catch (err) {
// //     console.error("infoofteacher error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });




// // Expects: { username, namer, oneline, about, lang, timezone, subjects, level, education, exp, free_sessions, all_sessions_free }
// // Also handles profile_image file upload
// // Update your multer configuration to handle both profile images and syllabus files
// // Update your multer configuration to handle both profile images and syllabus files
// const teacherStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadsDir = path.join(__dirname, 'uploads');
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     if (file.fieldname === 'profile_image') {
//       cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
//     } else if (file.fieldname === 'syllabus') {
//       cb(null, 'syllabus-' + uniqueSuffix + path.extname(file.originalname));
//     } else {
//       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
//   }
// });

// const teacherUpload = multer({ 
//   storage: teacherStorage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit for both files
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.fieldname === 'profile_image' && file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else if (file.fieldname === 'syllabus' && file.mimetype === 'application/pdf') {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type'), false);
//     }
//   }
// });

// // Update your MySQL table to include syllabus field
// // Run this SQL command:
// // ALTER TABLE teacherprofile ADD COLUMN syllabus VARCHAR(255) NULL AFTER all_sessions_free;

// // Update your POST endpoint
// app.post("/infoofteacher", teacherUpload.fields([
//   { name: 'profile_image', maxCount: 1 },
//   { name: 'syllabus', maxCount: 1 }
// ]), async (req, res) => {
//   try {
//     const {
//       username,
//       namer = null,
//       oneline = null,
//       about = null,
//       lang = null,
//       timezone = null,
//       subjects = null,
//       level = null,
//       education = null,
//       exp = null,
//       free_sessions = 0,
//       all_sessions_free = false
//     } = req.body;

//     // Convert boolean values to numbers for MySQL
//     const allSessionsFree = all_sessions_free === 'true' || all_sessions_free === true ? 1 : 0;
//     const freeSessions = parseInt(free_sessions) || 0;

//     if (!username) return res.status(400).json({ message: "Username is required" });

//     // Handle file uploads
//     let profileImage = null;
//     let syllabusFile = null;
    
//     if (req.files) {
//       if (req.files['profile_image']) {
//         profileImage = req.files['profile_image'][0].filename;
        
//         // Delete old profile image if it exists
//         const [existingRows] = await db.query("SELECT profile_image FROM teacherprofile WHERE username = ?", [username]);
//         if (existingRows.length > 0 && existingRows[0].profile_image) {
//           const oldImagePath = path.join(__dirname, 'uploads', existingRows[0].profile_image);
//           if (fs.existsSync(oldImagePath)) {
//             fs.unlinkSync(oldImagePath);
//           }
//         }
//       }
      
//       if (req.files['syllabus']) {
//         syllabusFile = req.files['syllabus'][0].filename;
        
//         // Delete old syllabus if it exists
//         const [existingRows] = await db.query("SELECT syllabus FROM teacherprofile WHERE username = ?", [username]);
//         if (existingRows.length > 0 && existingRows[0].syllabus) {
//           const oldSyllabusPath = path.join(__dirname, 'uploads', existingRows[0].syllabus);
//           if (fs.existsSync(oldSyllabusPath)) {
//             fs.unlinkSync(oldSyllabusPath);
//           }
//         }
//       }
//     }

//     const [rows] = await db.query("SELECT * FROM teacherprofile WHERE username = ?", [username]);

//     if (rows.length > 0) {
//       // UPDATE existing profile
//       let updateQuery = `
//         UPDATE teacherprofile
//         SET namer = ?, oneline = ?, about = ?, lang = ?, timezone = ?, 
//             subjects = ?, level = ?, education = ?, exp = ?, 
//             free_sessions = ?, all_sessions_free = ?
//       `;
//       let queryParams = [
//         namer, oneline, about, lang, timezone, subjects, level, education, exp,
//         freeSessions, allSessionsFree
//       ];

//       // Add profile image to update if provided
//       if (profileImage) {
//         updateQuery += ", profile_image = ?";
//         queryParams.push(profileImage);
//       }
      
//       // Add syllabus to update if provided
//       if (syllabusFile) {
//         updateQuery += ", syllabus = ?";
//         queryParams.push(syllabusFile);
//       }

//       updateQuery += " WHERE username = ?";
//       queryParams.push(username);

//       await db.query(updateQuery, queryParams);
//       return res.json({ message: "Profile updated successfully" });
//     } else {
//       // INSERT new profile
//       const insertQuery = `
//         INSERT INTO teacherprofile 
//         (username, namer, oneline, about, lang, timezone, subjects, level, education, exp, profile_image, syllabus, free_sessions, all_sessions_free)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;
//       await db.query(insertQuery, [
//         username, namer, oneline, about, lang, timezone, subjects, level, education, exp,
//         profileImage, syllabusFile, freeSessions, allSessionsFree
//       ]);
//       return res.json({ message: "Profile created successfully" });
//     }
//   } catch (err) {
//     console.error("infoofteacher error:", err);
    
//     // Clean up uploaded files if there was an error
//     if (req.files) {
//       if (req.files['profile_image']) {
//         const filePath = path.join(__dirname, 'uploads', req.files['profile_image'][0].filename);
//         if (fs.existsSync(filePath)) {
//           fs.unlinkSync(filePath);
//         }
//       }
//       if (req.files['syllabus']) {
//         const filePath = path.join(__dirname, 'uploads', req.files['syllabus'][0].filename);
//         if (fs.existsSync(filePath)) {
//           fs.unlinkSync(filePath);
//         }
//       }
//     }
    
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // Add this to your server.js to serve uploaded images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // --------- GET TEACHERS (by language/subject partial match) ---------
// // GET /api/teachers?lang=english
// app.get("/api/teachers", async (req, res) => {
//   try {
//     const { lang } = req.query;
//     if (!lang) return res.status(400).json({ message: "Language is required" });

//     const sql = "SELECT * FROM teacherprofile WHERE LOWER(subjects) LIKE ? OR LOWER(lang) LIKE ?";
//     const like = `%${lang.toLowerCase()}%`;
//     const [rows] = await db.query(sql, [like, like]);
//     return res.json(rows);
//   } catch (err) {
//     console.error("GET /api/teachers error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // --------- GET single teacher by username ---------
// // GET /api/teachers/username/:username
// app.get("/api/teachers/username/:username", async (req, res) => {
//   try {
//     const { username } = req.params;
//     const [rows] = await db.query("SELECT * FROM teacherprofile WHERE username = ?", [username]);
//     if (rows.length === 0) return res.status(404).json({ message: "Teacher not found" });
//     return res.json(rows[0]);
//   } catch (err) {
//     console.error("GET teacher by username error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // --------- BOOKINGS (use usernames instead of numeric ids) ---------
// // GET /bookings?username=<tutorUsername>
// // app.get("/bookings", async (req, res) => {
// //   try {
// //     const { username } = req.query;
// //     if (!username) return res.status(400).json({ message: "Tutor username is required" });

// //     // join teacherprofile to get tutor id, then get bookings
// //     const sql = `
// //       SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, b.status, b.roomId
// //       FROM Bookings b
// //       WHERE b.tutorUsername = ?
// //       ORDER BY b.start ASC
// //     `;
// //     const [rows] = await db.query(sql, [username]);
// //     return res.json(rows);
// //   } catch (err) {
// //     console.error("GET /bookings error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });
// // In /bookings endpoint for teacher









// // ---------------------------------------get for booking----------------

// // app.get("/bookings", async (req, res) => {
// //   try {
// //     const { username } = req.query;
// //     if (!username) return res.status(400).json({ message: "Tutor username is required" });

// //     const sql = `
// //       SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, b.status, b.roomId
// //       FROM Bookings b
// //       WHERE b.tutorUsername = ?
// //       ORDER BY b.start ASC
// //     `;
// //     const [rows] = await db.query(sql, [username]);
// //     // Attach studentSocketId
// //     const bookingsWithSocket = rows.map(b => ({
// //       ...b,
// //       studentSocketId: onlineStudents[b.studentUsername] || null
// //     }));
// //     return res.json(bookingsWithSocket);
// //   } catch (err) {
// //     console.error("GET /bookings error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });


// // GET /student/bookings?username=<studentUsername>
// // Returns bookings where the studentUsername matches the given username
// app.get("/student/bookings", async (req, res) => {
//   try {
//     const { username } = req.query;
//     if (!username) return res.status(400).json({ message: "Student username is required" });

//     const sql = `
//       SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, b.status, b.message, b.roomId
//       FROM Bookings b
//       WHERE b.studentUsername = ?
//       ORDER BY b.start ASC
//     `;
//     const [rows] = await db.query(sql, [username]);
//     return res.json(rows);
//   } catch (err) {
//     console.error("GET /student/bookings error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });




// // POST /bookings
// // Accepts either:
// //  - { tutorUsername, studentUsername, start, end }   (start/end are datetimes)
// //  - or { tutorUsername, studentUsername, date, time } (we'll create start from date+time and end +1 hour)
// app.post("/bookings", async (req, res) => {
//   try {
//     const { tutorUsername, studentUsername, start, end, date, time } = req.body;
// //  const tutorUsername = req.query.tutorUsername;


//     // if (!tutorUsername || !studentUsername) {
//     //   return res.status(400).json({ message: "tutorUsername and studentUsername required" });
//     // }

//     // Build start/end if needed
//     let startDatetime = start || null;
//     let endDatetime = end || null;

//     if (!startDatetime && date && time) {
//       // Expecting date in YYYY-MM-DD and time in HH:MM (24h)
//       startDatetime = `${date} ${time}:00`;
//       const startTs = new Date(startDatetime);
//       const endTs = new Date(startTs.getTime() + 60 * 60 * 1000); // +1 hour
//       // format to MySQL 'YYYY-MM-DD HH:MM:SS'
//       const pad = (n) => (n < 10 ? "0" + n : n);
//       const toSql = (d) =>
//         `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
//           d.getHours()
//         )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
//       startDatetime = toSql(startTs);
//       endDatetime = toSql(endTs);
//     }

//     if (!startDatetime || !endDatetime) {
//       return res.status(400).json({ message: "start/end datetime (or date+time) required" });
//     }

    
//     const [tRows] = await db.query("SELECT username FROM teacherprofile WHERE username = ?", [
//       tutorUsername,
//     ]);
//     if (tRows.length === 0) return res.status(404).json({ message: "Tutor not found" });

//     const [sRows] = await db.query("SELECT username FROM signups WHERE username = ?", [
//       studentUsername,
//     ]);
//     if (sRows.length === 0) {
//       // Not fatal — maybe students are stored elsewhere; still warn
//       console.warn("student not found in signups:", studentUsername);
//       // you can decide to return 404 or allow it
//       // return res.status(404).json({ message: "Student not found" });
//     }

//     // Insert booking using usernames (make sure Bookings table has tutorUsername / studentUsername columns)
//     const insertSql =
//       "INSERT INTO Bookings (tutorUsername, studentUsername, start, end, status) VALUES (?, ?, ?, ?, ?)";
//     await db.query(insertSql, [tutorUsername, studentUsername, startDatetime, endDatetime, "pending"]);

//     return res.json({ message: "Booking saved" });
//   } catch (err) {
//     console.error("POST /bookings error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // --------- TEACHER: pending requests by tutor username ---------
// // GET /teacher/:username/requests
// app.get("/teacher/:username/requests", async (req, res) => {
//   try {
//     const { username } = req.params;

//     const sql = `
//       SELECT b.id, b.tutorUsername, b.studentUsername, s.namer AS student_name, b.start, b.end, b.status
//       FROM Bookings b
//       LEFT JOIN signups s ON s.username = b.studentUsername
//       WHERE b.tutorUsername = ? AND b.status = 'pending'
//       ORDER BY b.start ASC
//     `;
//     const [rows] = await db.query(sql, [username]);
//     return res.json(rows);
//   } catch (err) {
//     console.error("GET teacher requests error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // --------- Accept / Reject booking (by booking id) ---------
// // POST /teacher/requests/:bookingId/decision  with { decision: 'accepted'|'rejected' }
// app.post("/teacher/requests/:bookingId/decision", async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const { decision, message } = req.body;
//     if (!["accepted", "rejected"].includes(decision)) {
//       return res.status(400).json({ message: "Invalid decision" });
//     }
// //     await db.query("UPDATE Bookings SET status = ? WHERE id = ?", [decision, bookingId]);
// //     return res.json({ message: `Booking ${decision}` });
// //   } catch (err) {
// //     console.error("POST booking decision error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });

//  const msgToSave = decision === "rejected" ? null : message || null;

//  await db.query("UPDATE Bookings SET status = ?, message = ? WHERE id = ?", [decision, message, bookingId]);

//     return res.json({ message: `Booking ${decision}` });
//   } catch (err) {
//     console.error("POST booking decision error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });



// // new course creation se related 

// // Get all courses (student marketplace)
// // app.get("/api/courses", async (req, res) => {
// // //   try {
// // //     const [rows] = await db.query("SELECT * FROM teacherprofile");
// // //     return res.json(rows);
// // //   } catch (err) {
// // //     console.error("GET /api/courses error:", err);
// // //     return res.status(500).json({ message: "Server error" });
// // //   }
// // // });

// // Get all courses OR filter by tutorUsername query param
// app.get("/api/courses", async (req, res) => {
//   try {
//     const { tutorUsername } = req.query;
//     let sql = "SELECT * FROM newcourse";
//     let params = [];

//     if (tutorUsername) {
//       sql += " WHERE tutorUsername = ?";
//       params.push(tutorUsername);
//     }

//     const [rows] = await db.query(sql, params);
//     return res.json(rows);
//   } catch (err) {
//     console.error("GET /api/courses error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });



// // Get courses by teacher username (teacher dashboard)
// app.get("/api/courses/by-teacher/:username", async (req, res) => {
//   try {
//     const { username } = req.params;
//     const [rows] = await db.query("SELECT * FROM teacherprofile WHERE username = ?", [username]);
//     return res.json(rows);
//   } catch (err) {
//     console.error("GET /api/courses/by-teacher error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });




// // yeah hai mera new course creation course

// // const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // upload path
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique filename
//   }
// });

// const upload = multer({ storage });

// // Create course endpoint
// app.post('/createcourse', upload.single('thumbnail'), (req, res) => {
//   const { title, description, category, duration, level, price, tutorUsername} = req.body;
//     // const teacherUsername = req.session.teacherUsername;

//     if (! tutorUsername ){
//     return res.status(400).json({ message: 'Teacher username is required' });
//   }

//   // if (!req.file) {
//   //   return res.status(400).json({ message: 'Thumbnail is required' });
//   // }

//   const thumbnail = req.file.filename;

//   const sql = `INSERT INTO newcourse (title, description, category, duration, level, price, thumbnail, tutorUsername)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;

//   db.query(sql, [title, description, category, duration, level, price, thumbnail, tutorUsername], (err, result) => {
//     if (err) {
//       console.error("Database Error:", err);
//       return res.status(500).json({ message: 'Error creating course' });
//     }
//     res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
//   });
// });





// // 

// // Fetch all courses
// app.get("/courses", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM newcourse");
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// });


// app.get("/courses/subjects", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT DISTINCT category FROM newcourse");
//     const subjects = rows.map(r => r.category); // ✅ now fetching category
//     res.json(subjects);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// });



// // ---------------------------------------VIDEO CALL wala feature------------------------------------------------------------------------------ //



// // ----------------------- SOCKET.IO & VIDEO CALL -----------------------

// // const server = http.createServer(app);

// // const io = new Server(server, {
// //   cors: {
// //     origin: "http://localhost:3000",
// //     methods: ["GET", "POST"],
// //   },
// // });





// // const onlineStudents = {}; // { username: socketId }

// // io.on("connection", (socket) => {
// //   console.log(`🔌 New user connected: ${socket.id}`);

// //   // 1️⃣ Student announces online status
// //   socket.on("student-online", (username) => {
// //     onlineStudents[username] = socket.id;
// //     console.log(`✅ Student ${username} is online with socket ${socket.id}`);
// //   });

// //   // 2️⃣ Handle disconnects
// //   socket.on("disconnect", () => {
// //     for (const user in onlineStudents) {
// //       if (onlineStudents[user] === socket.id) {
// //         delete onlineStudents[user];
// //         console.log(`❌ Student ${user} disconnected (${socket.id})`);
// //         break;
// //       }
// //     }

// //     // Notify others
// //     socket.broadcast.emit("user-disconnected", socket.id);
// //   });

// //   // 3️⃣ WebRTC signaling
// //   socket.on("join-room", (roomId) => {
// //     socket.join(roomId);
// //     console.log(`📢 User ${socket.id} joined room: ${roomId}`);
// //     socket.to(roomId).emit("user-joined", socket.id);
// //   });

// //   socket.on("offer", ({ roomId, sdp }) => {
// //     socket.to(roomId).emit("offer", { sdp, sender: socket.id });
// //   });

// //   socket.on("answer", ({ roomId, sdp }) => {
// //     socket.to(roomId).emit("answer", { sdp, sender: socket.id });
// //   });

// //   socket.on("ice-candidate", ({ roomId, candidate }) => {
// //     socket.to(roomId).emit("ice-candidate", { candidate, sender: socket.id });
// //   });
// // });




// // // ----------------------- ROUTES -----------------------
// // const { v4: uuidv4 } = require("uuid");

// // // GET /bookings (teacher)
// // app.get("/bookings", async (req, res) => {
// //   try {
// //     const { username } = req.query;
// //     if (!username) return res.status(400).json({ message: "Tutor username is required" });

// //     const sql = `
// //       SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, b.status, b.roomId
// //       FROM Bookings b
// //       WHERE b.tutorUsername = ?
// //       ORDER BY b.start ASC
// //     `;
// //     const [rows] = await db.query(sql, [username]);

// //     // Attach studentSocketId
// //     const bookingsWithSocket = rows.map((b) => ({
// //       ...b,
// //       studentSocketId: onlineStudents[b.studentUsername] || null,
// //     }));

// //     return res.json(bookingsWithSocket);
// //   } catch (err) {
// //     console.error("GET /bookings error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });

// // // POST /start-call
// // app.post("/start-call", async (req, res) => {
// //   try {
// //     const { tutorUsername, studentUsername, bookingId } = req.body;
// //     if (!tutorUsername || !studentUsername || !bookingId) {
// //       return res.status(400).json({ message: "Missing data" });
// //     }

// //     const roomId = uuidv4();
// //     await db.query("UPDATE Bookings SET roomId = ? WHERE id = ?", [roomId, bookingId]);

// //     // Notify student if online
// //     const studentSocketId = onlineStudents[studentUsername];
// //     if (studentSocketId) {
// //       io.to(studentSocketId).emit("incoming-call", { roomId, tutorUsername, bookingId });
// //     }

// //     return res.json({ message: "Call started", roomId });
// //   } catch (err) {
// //     console.error("POST /start-call error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });

// // // GET /get-call/:bookingId
// // app.get("/get-call/:bookingId", rakshak, async (req, res) => {
// //   try {
// //     const { bookingId } = req.params;
// //     const [rows] = await db.query("SELECT roomId FROM Bookings WHERE id = ?", [bookingId]);

// //     if (rows.length === 0 || !rows[0].roomId) {
// //       return res.status(404).json({ message: "No active call" });
// //     }

// //     return res.json({ roomId: rows[0].roomId });
// //   } catch (err) {
// //     console.error("GET /get-call error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });




// // const server = http.createServer(app);

// // const io = new Server(server, {
// //   cors: {
// //     origin: "http://localhost:3000",
// //     methods: ["GET", "POST"],
// //   },
// // });

// // // Store online users
// // const onlineTeachers = {};
// // const onlineStudents = {};

// // io.on("connection", (socket) => {
// //   console.log("🔌 User connected:", socket.id);

// //   // Handle teacher online status
// //   socket.on("teacher-online", (username) => {
// //     console.log(`Teacher ${username} is online with socket ${socket.id}`);
// //     onlineTeachers[username] = socket.id;
    
// //     // Broadcast to all students that this teacher is online
// //     socket.broadcast.emit("teacher-online", { 
// //       username, 
// //       socketId: socket.id 
// //     });
// //   });

// //   // Handle student online status
// //   socket.on("student-online", (username) => {
// //     console.log(`Student ${username} is online with socket ${socket.id}`);
// //     onlineStudents[username] = socket.id;
    
// //     // Broadcast to all teachers that this student is online
// //     socket.broadcast.emit("student-online", { 
// //       username, 
// //       socketId: socket.id 
// //     });
// //   });

// //   // Handle disconnections
// //   socket.on("disconnect", () => {
// //     console.log("❌ User disconnected:", socket.id);
    
// //     // Remove from online users
// //     for (const username in onlineTeachers) {
// //       if (onlineTeachers[username] === socket.id) {
// //         delete onlineTeachers[username];
// //         break;
// //       }
// //     }
    
// //     for (const username in onlineStudents) {
// //       if (onlineStudents[username] === socket.id) {
// //         delete onlineStudents[username];
// //         break;
// //       }
// //     }
    
// //     // Notify other users about this disconnection
// //     socket.broadcast.emit("user-disconnected", socket.id);
// //   });

// //   // WebRTC signaling events
// //   socket.on("join-room", (roomId) => {
// //     socket.join(roomId);
// //     console.log(`📢 User ${socket.id} joined room: ${roomId}`);
// //     socket.to(roomId).emit("user-joined", socket.id);
// //   });

// //   socket.on("offer", ({ roomId, sdp }) => {
// //     socket.to(roomId).emit("offer", { sdp, sender: socket.id });
// //   });

// //   socket.on("answer", ({ roomId, sdp }) => {
// //     socket.to(roomId).emit("answer", { sdp, sender: socket.id });
// //   });

// //   socket.on("ice-candidate", ({ roomId, candidate }) => {
// //     socket.to(roomId).emit("ice-candidate", { candidate, sender: socket.id });
// //   });

// //   // Handle call initiation
// //   socket.on("start-call", ({ tutorUsername, studentUsername, bookingId }) => {
// //     const roomId = uuidv4();
// //     const studentSocketId = onlineStudents[studentUsername];
    
// //     if (studentSocketId) {
// //       // Notify student about incoming call
// //       io.to(studentSocketId).emit("incoming-call", { 
// //         roomId, 
// //         tutorUsername, 
// //         bookingId 
// //       });
      
// //       // Notify teacher that call was initiated
// //       socket.emit("call-started", { roomId });
// //     } else {
// //       // Notify teacher that student is offline
// //       socket.emit("student-offline", { studentUsername });
// //     }
// //   });

// //   // Handle call acceptance
// //   socket.on("accept-call", ({ roomId, studentUsername }) => {
// //     socket.join(roomId);
// //     socket.to(roomId).emit("call-accepted", { studentUsername });
// //   });

// //   // Handle call rejection
// //   socket.on("reject-call", ({ roomId, tutorUsername }) => {
// //     const tutorSocketId = onlineTeachers[tutorUsername];
// //     if (tutorSocketId) {
// //       io.to(tutorSocketId).emit("call-rejected", { roomId });
// //     }
// //   });

// //   // Handle ending a call
// //   socket.on("end-call", ({ roomId }) => {
// //     socket.to(roomId).emit("call-ended");
// //     socket.leave(roomId);
// //   });
// // });


// // const http = require('http');
// // const { Server } = require('socket.io');

// // Add this near the top with your other declarations
// // const onlineStudents = {}; // Object to track online students by username
// // const onlineTeachers = {}; // You might need this too for consistency


// const io = new Server(server, {
//   cors: {
//     origin: "*", // Start with * for testing
//     methods: ["GET", "POST"],
//   },
// });

// // Online users tracking
// const onlineStudents = {};
// const onlineTeachers = {};
// const activeCalls = new Map();

// // Socket.IO Connection Handling
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Student goes online
//   socket.on('student-online', (data) => {
//     if (!data || !data.username) {
//       console.error('Invalid student-online data:', data);
//       return;
//     }

//     const { username, userData } = data;
//     onlineStudents[username] = {
//       socketId: socket.id,
//       userData: userData,
//       lastSeen: new Date()
//     };
//     console.log(`Student ${username} is online`);
    
//     // Broadcast to tutors that student is online
//     socket.broadcast.emit('student-status-changed', {
//       username,
//       isOnline: true,
//       userData
//     });
//   });

//   // Teacher goes online
//   socket.on('teacher-online', (data) => {
//     if (!data || !data.username) {
//       console.error('Invalid teacher-online data:', data);
//       return;
//     }

//     const { username, userData } = data;
//     onlineTeachers[username] = {
//       socketId: socket.id,
//       userData: userData,
//       lastSeen: new Date()
//     };
//     console.log(`Teacher ${username} is online`);
//   });

//   // Join video room
//   socket.on('join-room', (data) => {
//     if (!data || !data.roomId) {
//       console.error('Invalid join-room data:', data);
//       return;
//     }

//     const { roomId, username, userType } = data;
//     socket.join(roomId);
//     console.log(`${userType} ${username} joined room ${roomId}`);

//     // Notify others in the room
//     socket.to(roomId).emit('user-joined', {
//       username,
//       userType,
//       socketId: socket.id
//     });

//     // Track active calls
//     if (!activeCalls.has(roomId)) {
//       activeCalls.set(roomId, {
//         participants: [],
//         startTime: new Date(),
//         bookingId: data.bookingId
//       });
//     }

//     const call = activeCalls.get(roomId);
//     call.participants.push({
//       socketId: socket.id,
//       username,
//       userType,
//       joinedAt: new Date()
//     });
//   });

//   // WebRTC signaling
//   socket.on('offer', (data) => {
//     if (data && data.roomId) {
//       socket.to(data.roomId).emit('offer', {
//         offer: data.offer,
//         from: data.from
//       });
//     }
//   });

//   socket.on('answer', (data) => {
//     if (data && data.roomId) {
//       socket.to(data.roomId).emit('answer', {
//         answer: data.answer,
//         from: data.from
//       });
//     }
//   });

//   socket.on('ice-candidate', (data) => {
//     if (data && data.roomId) {
//       socket.to(data.roomId).emit('ice-candidate', {
//         candidate: data.candidate,
//         from: data.from
//       });
//     }
//   });

//   // Call controls
//   socket.on('toggle-audio', (data) => {
//     socket.to(data.roomId).emit('audio-toggled', {
//       username: data.username,
//       audioEnabled: data.audioEnabled
//     });
//   });

//   socket.on('toggle-video', (data) => {
//     socket.to(data.roomId).emit('video-toggled', {
//       username: data.username,
//       videoEnabled: data.videoEnabled
//     });
//   });

//   socket.on('share-screen', (data) => {
//     socket.to(data.roomId).emit('screen-sharing', {
//       username: data.username,
//       isSharing: data.isSharing
//     });
//   });

//   // Leave room
//   socket.on('leave-room', (data) => {
//     const { roomId, username } = data;
//     socket.leave(roomId);
//     console.log(`${username} left room ${roomId}`);

//     // Update active calls
//     if (activeCalls.has(roomId)) {
//       const call = activeCalls.get(roomId);
//       call.participants = call.participants.filter(p => p.socketId !== socket.id);
      
//       if (call.participants.length === 0) {
//         // End call if no participants left
//         activeCalls.delete(roomId);
//         console.log(`Call ended in room ${roomId}`);
        
//         // Update booking status to completed
//         updateBookingStatus(call.bookingId, 'completed')
//           .then(() => console.log(`Booking ${call.bookingId} marked as completed`))
//           .catch(err => console.error('Error updating booking status:', err));
//       }
//     }

//     socket.to(roomId).emit('user-left', { username });
//   });

//   // Disconnect handling
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);

//     // Remove from online students
//     for (const [username, student] of Object.entries(onlineStudents)) {
//       if (student.socketId === socket.id) {
//         delete onlineStudents[username];
//         console.log(`Student ${username} went offline`);
        
//         // Broadcast student offline status
//         socket.broadcast.emit('student-status-changed', {
//           username,
//           isOnline: false,
//           userData: student.userData
//         });
//         break;
//       }
//     }

//     // Remove from online teachers
//     for (const [username, teacher] of Object.entries(onlineTeachers)) {
//       if (teacher.socketId === socket.id) {
//         delete onlineTeachers[username];
//         console.log(`Teacher ${username} went offline`);
//         break;
//       }
//     }

//     // Handle active calls on disconnect
//     for (const [roomId, call] of activeCalls.entries()) {
//       const participantIndex = call.participants.findIndex(p => p.socketId === socket.id);
//       if (participantIndex !== -1) {
//         const participant = call.participants[participantIndex];
//         call.participants.splice(participantIndex, 1);
        
//         // Notify others in the room
//         socket.to(roomId).emit('user-disconnected', {
//           username: participant.username
//         });

//         if (call.participants.length === 0) {
//           activeCalls.delete(roomId);
//           console.log(`Call ended in room ${roomId} due to disconnect`);
          
//           // Update booking status
//           updateBookingStatus(call.bookingId, 'completed')
//             .then(() => console.log(`Booking ${call.bookingId} marked as completed`))
//             .catch(err => console.error('Error updating booking status:', err));
//         }
//       }
//     }
//   });
// });

// // Helper function to update booking status
// async function updateBookingStatus(bookingId, status) {
//   try {
//     await db.query(
//       "UPDATE bookings SET status = ?, end = NOW() WHERE id = ?",
//       [status, bookingId]
//     );
//   } catch (error) {
//     console.error('Error updating booking status:', error);
//     throw error;
//   }
// }








// // GET /bookings (teacher) - ADJUSTED FOR SUPERMAN DATABASE
// app.get("/bookings", async (req, res) => {
//   try {
//     const { username } = req.query;
//     if (!username) return res.status(400).json({ message: "Tutor username is required" });

//     const sql = `
//       SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, 
//              b.status, b.roomId, b.message
//       FROM bookings b
//       WHERE b.tutorUsername = ?
//       ORDER BY b.start ASC
//     `;
//     const [rows] = await db.query(sql, [username]);

//     // Attach online status and socket info
//     const bookingsWithStatus = rows.map((booking) => {
//       const studentOnlineInfo = onlineStudents[booking.studentUsername];
//       return {
//         ...booking,
//         studentSocketId: studentOnlineInfo?.socketId || null,
//         isStudentOnline: !!studentOnlineInfo,
//         studentLastSeen: studentOnlineInfo?.lastSeen || null
//       };
//     });

//     return res.json(bookingsWithStatus);
//   } catch (err) {
//     console.error("GET /bookings error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // GET /bookings/student (for student view)
// app.get("/bookings/student", async (req, res) => {
//   try {
//     const { username } = req.query;
//     if (!username) return res.status(400).json({ message: "Student username is required" });

//     const sql = `
//       SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, 
//              b.status, b.roomId, b.message,
//              t.namer as tutorName
//       FROM bookings b
//       LEFT JOIN teacherprofile t ON b.tutorUsername = t.username
//       WHERE b.studentUsername = ?
//       ORDER BY b.start ASC
//     `;
//     const [rows] = await db.query(sql, [username]);

//     const bookingsWithStatus = rows.map((booking) => {
//       const tutorOnlineInfo = onlineTeachers[booking.tutorUsername];
//       return {
//         ...booking,
//         tutorSocketId: tutorOnlineInfo?.socketId || null,
//         isTutorOnline: !!tutorOnlineInfo,
//         tutorLastSeen: tutorOnlineInfo?.lastSeen || null
//       };
//     });

//     return res.json(bookingsWithStatus);
//   } catch (err) {
//     console.error("GET /bookings/student error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // POST /start-call - ADJUSTED FOR SUPERMAN DATABASE
// app.post("/start-call", async (req, res) => {
//   try {
//     const { tutorUsername, studentUsername, bookingId } = req.body;
    
//     if (!tutorUsername || !studentUsername || !bookingId) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }
    
//     // Verify booking exists
//     const [bookingRows] = await db.query(
//       `SELECT b.* FROM bookings b WHERE b.id = ? AND b.tutorUsername = ?`,
//       [bookingId, tutorUsername]
//     );
    
//     if (bookingRows.length === 0) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     const booking = bookingRows[0];
    
//     // Generate room ID
//     const roomId = uuidv4();
    
//     // Update booking with room ID and mark as accepted (since call is starting)
//     await db.query(
//       "UPDATE bookings SET roomId = ?, status = 'accepted' WHERE id = ?",
//       [roomId, bookingId]
//     );

//     // Notify student if online
//     const studentOnlineInfo = onlineStudents[studentUsername];
//     if (studentOnlineInfo) {
//       io.to(studentOnlineInfo.socketId).emit("incoming-call", { 
//         roomId, 
//         tutorUsername, 
//         bookingId,
//         message: booking.message
//       });
//       console.log(`Notified student ${studentUsername} about incoming call`);
//     }

//     return res.json({ 
//       message: "Call started", 
//       roomId,
//       studentOnline: !!studentOnlineInfo
//     });
//   } catch (err) {
//     console.error("POST /start-call error:", err);
//     return res.status(500).json({ 
//       message: "Server error",
//       error: err.message
//     });
//   }
// });

// // GET /get-call/:bookingId
// app.get("/get-call/:bookingId", async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const [rows] = await db.query(
//       "SELECT roomId, status FROM bookings WHERE id = ?",
//       [bookingId]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     if (!rows[0].roomId || rows[0].status !== 'accepted') {
//       return res.status(404).json({ message: "No active call" });
//     }

//     return res.json({ 
//       roomId: rows[0].roomId,
//       status: rows[0].status
//     });
//   } catch (err) {
//     console.error("GET /get-call error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // GET /online-students
// app.get("/online-students", async (req, res) => {
//   try {
//     const onlineStudentsList = Object.entries(onlineStudents).map(([username, data]) => ({
//       username,
//       socketId: data.socketId,
//       lastSeen: data.lastSeen,
//       userData: data.userData
//     }));

//     return res.json(onlineStudentsList);
//   } catch (err) {
//     console.error("GET /online-students error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // GET /online-teachers
// app.get("/online-teachers", async (req, res) => {
//   try {
//     const onlineTeachersList = Object.entries(onlineTeachers).map(([username, data]) => ({
//       username,
//       socketId: data.socketId,
//       lastSeen: data.lastSeen,
//       userData: data.userData
//     }));

//     return res.json(onlineTeachersList);
//   } catch (err) {
//     console.error("GET /online-teachers error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // GET /active-calls
// app.get("/active-calls", async (req, res) => {
//   try {
//     const calls = Array.from(activeCalls.entries()).map(([roomId, call]) => ({
//       roomId,
//       participants: call.participants,
//       startTime: call.startTime,
//       bookingId: call.bookingId,
//       duration: Math.floor((new Date() - call.startTime) / 1000) // in seconds
//     }));

//     return res.json(calls);
//   } catch (err) {
//     console.error("GET /active-calls error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // POST /end-call
// app.post("/end-call", async (req, res) => {
//   try {
//     const { roomId, bookingId } = req.body;
    
//     if (activeCalls.has(roomId)) {
//       // Notify all participants to end call
//       io.to(roomId).emit('call-ended', { reason: 'host-ended' });
      
//       // Remove from active calls
//       activeCalls.delete(roomId);
      
//       // Update booking status to completed
//       await db.query(
//         "UPDATE bookings SET status = 'completed', end = NOW() WHERE id = ?",
//         [bookingId]
//       );
      
//       console.log(`Call ended in room ${roomId}`);
//     }

//     return res.json({ message: "Call ended successfully" });
//   } catch (err) {
//     console.error("POST /end-call error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     onlineStudents: Object.keys(onlineStudents).length,
//     onlineTeachers: Object.keys(onlineTeachers).length,
//     activeCalls: activeCalls.size
//   });
// });

// module.exports = { app, server, io, onlineStudents, onlineTeachers, activeCalls };



// // ----------------------- ROUTES -----------------------
// // Make sure to import your database connection (db) and authentication middleware (rakshak)

// // GET /bookings (teacher)
// // app.get("/bookings", async (req, res) => {
// //   try {
// //     const { username } = req.query;
// //     if (!username) return res.status(400).json({ message: "Tutor username is required" });

// //     const sql = `
// //       SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, b.status, b.roomId
// //       FROM Bookings b
// //       WHERE b.tutorUsername = ?
// //       ORDER BY b.start ASC
// //     `;
// //     const [rows] = await db.query(sql, [username]);

// //     // Attach studentSocketId
// //     const bookingsWithSocket = rows.map((b) => ({
// //       ...b,
// //       studentSocketId: onlineStudents[b.studentUsername] || null,
// //     }));

// //     return res.json(bookingsWithSocket);
// //   } catch (err) {
// //     console.error("GET /bookings error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });



// // // POST /start-call
// // app.post("/start-call", async (req, res) => {
// //   try {
// //     const { tutorUsername, studentUsername, bookingId } = req.body;
    
// //     // Validate input
// //     if (!tutorUsername || !studentUsername || !bookingId) {
// //       return res.status(400).json({ message: "Missing required fields" });
// //     }
    
// //     // Check if booking exists and belongs to this tutor
// //     const [bookingRows] = await db.query(
// //       "SELECT * FROM Bookings WHERE id = ? AND tutorUsername = ?",
// //       [bookingId, tutorUsername]
// //     );
    
// //     if (bookingRows.length === 0) {
// //       return res.status(404).json({ message: "Booking not found" });
// //     }
    
// //     // Generate room ID using uuid
// //     const roomId = uuidv4();
    
// //     // Update the booking with the room ID
// //     await db.query("UPDATE Bookings SET roomId = ? WHERE id = ?", [roomId, bookingId]);

// //     // Notify student if online
// //     const studentSocketId = onlineStudents[studentUsername];
// //     if (studentSocketId) {
// //       io.to(studentSocketId).emit("incoming-call", { 
// //         roomId, 
// //         tutorUsername, 
// //         bookingId 
// //       });
// //       console.log(`Notified student ${studentUsername} about incoming call`);
// //     } else {
// //       console.log(`Student ${studentUsername} is offline, cannot notify`);
// //     }

// //     return res.json({ 
// //       message: "Call started", 
// //       roomId,
// //       studentOnline: !!studentSocketId 
// //     });
// //   } catch (err) {
// //     console.error("POST /start-call error:", err);
// //     return res.status(500).json({ 
// //       message: "Server error",
// //       error: err.message
// //     });
// //   }
// // });

// // app.post("/start-call", async (req, res) => {
// //   try {
// //     const { tutorUsername, studentUsername, bookingId } = req.body;
    
// //     // Just validate and return success - socket handles the rest
// //     const studentSocketId = onlineUsers.students[studentUsername];
    
// //     if (!studentSocketId) {
// //       return res.status(404).json({ message: "Student is offline" });
// //     }

// //     res.json({ message: "Call initiation sent to student" });
// //   } catch (err) {
// //     console.error("POST /start-call error:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // POST /start-call
// // app.post("/start-call", async (req, res) => {
// //   try {
// //     const { tutorUsername, studentUsername, bookingId } = req.body;
// //     if (!tutorUsername || !studentUsername || !bookingId) {
// //       return res.status(400).json({ message: "Missing data" });
// //     }

// //     const roomId = uuidv4();
// //     await db.query("UPDATE Bookings SET roomId = ? WHERE id = ?", [roomId, bookingId]);

// //     // Notify student if online
// //     const studentSocketId = onlineStudents[studentUsername];
// //     if (studentSocketId) {
// //       io.to(studentSocketId).emit("incoming-call", { roomId, tutorUsername, bookingId });
// //     }

// //     return res.json({ message: "Call started", roomId });
// //   } catch (err) {
// //     console.error("POST /start-call error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });

// // POST /start-call
// // In your server.js
// // app.post("/start-call", async (req, res) => {
// //   try {
// //     console.log("Start call request:", req.body);
    
// //     const { tutorUsername, studentUsername, bookingId } = req.body;
// //     if (!tutorUsername || !studentUsername || !bookingId) {
// //       return res.status(400).json({ message: "Missing data" });
// //     }

// //     const roomId = uuidv4();
// //     console.log("Generated room ID:", roomId);
    
// //     // Check if booking exists first
// //     const [bookingCheck] = await db.query(
// //       "SELECT * FROM Bookings WHERE id = ? AND tutorUsername = ?",
// //       [bookingId, tutorUsername]
// //     );
    
// //     if (bookingCheck.length === 0) {
// //       return res.status(404).json({ message: "Booking not found" });
// //     }

// //     await db.query("UPDATE Bookings SET roomId = ? WHERE id = ?", [roomId, bookingId]);
// //     console.log("Database updated successfully");

// //     // Notify student if online
// //     const studentSocketId = onlineStudents[studentUsername];
// //     if (studentSocketId) {
// //       io.to(studentSocketId).emit("incoming-call", { roomId, tutorUsername, bookingId });
// //       console.log("Notified student:", studentUsername);
// //     }

// //     return res.json({ message: "Call started", roomId });
// //   } catch (err) {
// //     console.error("POST /start-call error:", err);
// //     return res.status(500).json({ 
// //       message: "Server error",
// //       error: err.message // Include error details for debugging
// //     });
// //   }
// // });


// // // Make sure to add this at the top of your file
// // const { v4: uuidv4 } = require('uuid');

// // // POST /start-call
// // app.post("/start-call", async (req, res) => {
// //   try {
// //     const { tutorUsername, studentUsername, bookingId } = req.body;
    
// //     // Validate input
// //     if (!tutorUsername || !studentUsername || !bookingId) {
// //       return res.status(400).json({ message: "Missing required fields" });
// //     }
    
// //     // Check if booking exists and belongs to this tutor
// //     const [bookingRows] = await db.query(
// //       "SELECT * FROM Bookings WHERE id = ? AND tutorUsername = ?",
// //       [bookingId, tutorUsername]
// //     );
    
// //     if (bookingRows.length === 0) {
// //       return res.status(404).json({ message: "Booking not found" });
// //     }
    
// //     // Generate room ID using uuid
// //     const roomId = uuidv4();
    
// //     // Update the booking with the room ID
// //     await db.query("UPDATE Bookings SET roomId = ? WHERE id = ?", [roomId, bookingId]);

// //     // Notify student if online
// //     const studentSocketId = onlineStudents[studentUsername];
// //     if (studentSocketId) {
// //       io.to(studentSocketId).emit("incoming-call", { 
// //         roomId, 
// //         tutorUsername, 
// //         bookingId 
// //       });
// //     }

// //     return res.json({ message: "Call started", roomId });
// //   } catch (err) {
// //     console.error("POST /start-call error:", err);
// //     return res.status(500).json({ 
// //       message: "Server error",
// //       error: err.message // Include error message for debugging
// //     });
// //   }
// // });

// // GET /get-call/:bookingId
// // app.get("/get-call/:bookingId", rakshak, async (req, res) => {
// //   try {
// //     const { bookingId } = req.params;
// //     const [rows] = await db.query("SELECT roomId FROM Bookings WHERE id = ?", [bookingId]);

// //     if (rows.length === 0 || !rows[0].roomId) {
// //       return res.status(404).json({ message: "No active call" });
// //     }

// //     return res.json({ roomId: rows[0].roomId });
// //   } catch (err) {
// //     console.error("GET /get-call error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });

// // module.exports = { server, io, onlineTeachers, onlineStudents };


// // new frontend api access points
// // Add these endpoints to your server.js

// // Get recommended tutors (for dashboard)
// // Get recommended tutors (for dashboard)
// app.get('/api/tutors/recommended', async (req, res) => {
//   try {
//     // First, just get the basic teacher data without any complex joins
//     const [rows] = await db.query(`
//       SELECT * FROM teacherprofile 
//       ORDER BY id DESC 
//       LIMIT 8
//     `);
    
//     // Format the response
//     const tutors = rows.map(tutor => ({
//       id: tutor.id,
//       name: tutor.namer,
//       username: tutor.username,
//       subject: tutor.subjects,
//       experience: tutor.exp,
//       rating: (4.5 + Math.random() * 0.5).toFixed(1),
//       reviews: Math.floor(Math.random() * 50) + 10,
//       hourlyRate: `₹${Math.floor(500 + Math.random() * 1500)}/hr`,
//       responseTime: ['1 hour', '2 hours', '3 hours', '4 hours'][Math.floor(Math.random() * 4)],
//       description: tutor.about || tutor.oneline || "Experienced tutor",
//       profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`,
//       isOnline: Math.random() > 0.3,
//       lang: tutor.lang,
//       about: tutor.about,
//       education: tutor.education,
//       level: tutor.level
//     }));
    
//     res.json(tutors);
//   } catch (err) {
//     console.error('GET /api/tutors/recommended error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Get tutors by language
// app.get('/api/tutors', async (req, res) => {
//   try {
//     const { lang } = req.query;
//     if (!lang) return res.status(400).json({ message: 'Language is required' });

//     const [rows] = await db.query(`
//       SELECT * FROM teacherprofile 
//       WHERE LOWER(lang) LIKE ? OR LOWER(subjects) LIKE ?
//       ORDER BY id DESC
//     `, [`%${lang.toLowerCase()}%`, `%${lang.toLowerCase()}%`]);
    
//     const tutors = rows.map(tutor => ({
//       id: tutor.id,
//       name: tutor.namer,
//       username: tutor.username,
//       subject: tutor.subjects,
//       experience: tutor.exp,
//       rating: (4.5 + Math.random() * 0.5).toFixed(1),
//       reviews: Math.floor(Math.random() * 50) + 10,
//       hourlyRate: `₹${Math.floor(500 + Math.random() * 1500)}/hr`,
//       responseTime: ['1 hour', '2 hours', '3 hours', '4 hours'][Math.floor(Math.random() * 4)],
//       description: tutor.about || tutor.oneline || "Experienced tutor",
//       profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`,
//       isOnline: Math.random() > 0.3,
//       lang: tutor.lang,
//       about: tutor.about,
//       education: tutor.education,
//       level: tutor.level,
//       oneline: tutor.oneline
//     }));
    
//     res.json(tutors);
//   } catch (err) {
//     console.error('GET /api/tutors error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Get tutor by username
// app.get('/api/tutors/username/:username', async (req, res) => {
//   try {
//     const { username } = req.params;
    
//     const [rows] = await db.query(`
//       SELECT * FROM teacherprofile 
//       WHERE username = ?
//     `, [username]);
    
//     if (rows.length === 0) return res.status(404).json({ message: 'Tutor not found' });
    
//     const tutor = rows[0];
//     const formattedTutor = {
//       id: tutor.id,
//       name: tutor.namer,
//       username: tutor.username,
//       subject: tutor.subjects,
//       experience: tutor.exp,
//       rating: (4.5 + Math.random() * 0.5).toFixed(1),
//       reviews: Math.floor(Math.random() * 50) + 10,
//       hourlyRate: `₹${Math.floor(500 + Math.random() * 1500)}/hr`,
//       responseTime: ['1 hour', '2 hours', '3 hours', '4 hours'][Math.floor(Math.random() * 4)],
//       description: tutor.about || tutor.oneline || "Experienced tutor",
//       profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`,
//       isOnline: Math.random() > 0.3,
//       lang: tutor.lang,
//       about: tutor.about,
//       education: tutor.education,
//       level: tutor.level,
//       oneline: tutor.oneline,
//       timezone: tutor.timezone
//     };
    
//     res.json(formattedTutor);
//   } catch (err) {
//     console.error('GET /api/tutors/username error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });




// // fallback
// app.use((req, res) => {
//   res.status(404).json({ message: "Endpoint not found" });
// });

// // start
// server.listen(4000, () => {
//   console.log("Server running on port 4000");
// });












// server.js
require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');

const JWT_SECRET = process.env.JWT_SECRET || 'abcekukh1323';
const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGINS || 'http://localhost:3000').split(',');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: FRONTEND_ORIGINS,
  credentials: true,
}));

// MySQL connection (promise wrapper)
const con = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'Superman',
});
const db = con.promise();

// ---- Multer storage for uploads ----
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const teacherStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    if (file.fieldname === 'profile_image') {
      cb(null, `profile-${uniqueSuffix}${path.extname(file.originalname)}`);
    } else if (file.fieldname === 'syllabus') {
      cb(null, `syllabus-${uniqueSuffix}${path.extname(file.originalname)}`);
    } else {
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  }
});

const teacherUpload = multer({
  storage: teacherStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'profile_image' && file.mimetype.startsWith('image/')) return cb(null, true);
    if (file.fieldname === 'syllabus' && file.mimetype === 'application/pdf') return cb(null, true);
    return cb(new Error('Invalid file type'), false);
  }
});

// Serve uploads
app.use('/uploads', express.static(uploadsDir));

// ---- Utility helpers ----
function signToken(payload, expiresIn = '1h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

async function updateBookingStatus(bookingId, status) {
  try {
    await db.query("UPDATE bookings SET status = ?, end = NOW() WHERE id = ?", [status, bookingId]);
  } catch (err) {
    console.error('updateBookingStatus error:', err);
    throw err;
  }
}

// ---- Auth middleware for REST endpoints ----
function rakshak(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'token nahi hai' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'token invalid ya expire ho gaya' });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

// ---- Routes: Student/Teacher Signup & Login ----
app.post("/signupS", async (req, res) => {
  try {
    const { namer, username, pass } = req.body;
    if (!namer || !username || !pass) return res.status(400).json({ message: "Please fill all fields" });
    const [exists] = await db.query("SELECT username FROM signups WHERE username = ?", [username]);
    if (exists.length) return res.status(400).json({ message: 'Username already exists' });
    const hash = await bcrypt.hash(pass, 10);
    await db.query("INSERT INTO signups (namer, username) VALUES (?, ?)", [namer, username]);
    await db.query("INSERT INTO logins (username, pass) VALUES (?, ?)", [username, hash]);
    return res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    console.error("signupS error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/loginS", (req, res) => {
  const { username, pass } = req.body;
  if (!username || !pass) return res.status(400).json({ message: "Missing fields" });
  con.query("SELECT * FROM logins WHERE username = ?", [username], async (err, results) => {
    if (err) {
      console.error("loginS db error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (!results.length) return res.status(404).json({ message: "Username not found" });
    const user = results[0];
    const match = await bcrypt.compare(pass, user.pass);
    if (!match) return res.status(401).json({ message: "Incorrect password" });
    con.query("SELECT * FROM signups WHERE username = ?", [username], (err2, sRes) => {
      if (err2) {
        console.error("fetch student info error:", err2);
        return res.status(500).json({ message: "Server error" });
      }
      if (!sRes.length) return res.status(404).json({ message: "student ka info not found" });
      const student = sRes[0];
      const token = signToken({ username: username }, '20m');
      return res.status(200).json({
        message: "Login successful",
        student: {
          username: student.username,
          namer: student.namer,
          id: student.id,
          token
        }
      });
    });
  });
});

app.post("/signupT", async (req, res) => {
  try {
    const { namer, username, email, pass } = req.body;
    if (!namer || !username || !email || !pass) return res.status(400).json({ message: "Please fill all fields" });
    const [exists] = await db.query("SELECT username FROM signupt WHERE username = ?", [username]);
    if (exists.length) return res.status(400).json({ message: 'Username already exists' });
    const hash = await bcrypt.hash(pass, 10);
    await db.query("INSERT INTO signupt (namer, username, email) VALUES (?, ?, ?)", [namer, username, email]);
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
  con.query("SELECT * FROM logint WHERE username = ?", [username], async (err, results) => {
    if (err) {
      console.error("loginT db error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (!results.length) return res.status(404).json({ message: "Username not found" });
    const user = results[0];
    const match = await bcrypt.compare(pass, user.pass);
    if (!match) return res.status(401).json({ message: "Incorrect password" });
    con.query("SELECT * FROM signupt WHERE username = ?", [username], (err2, tRes) => {
      if (err2) {
        console.error("fetch teacher info error:", err2);
        return res.status(500).json({ message: "Server error" });
      }
      if (!tRes.length) return res.status(404).json({ message: "Teacher info not found" });
      const teacher = tRes[0];
      const token = signToken({ username: username }, '1h');
      return res.status(200).json({
        message: "Login successful",
        teacher: {
          username: teacher.username,
          namer: teacher.namer,
          email: teacher.email,
          id: teacher.id,
          token
        }
      });
    });
  });
});

// ----- Teacher profile upload / info endpoint -----
app.post("/infoofteacher", teacherUpload.fields([
  { name: 'profile_image', maxCount: 1 },
  { name: 'syllabus', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      username,
      namer = null,
      oneline = null,
      about = null,
      lang = null,
      timezone = null,
      subjects = null,
      level = null,
      education = null,
      exp = null,
      free_sessions = 0,
      all_sessions_free = false
    } = req.body;

    if (!username) return res.status(400).json({ message: "Username is required" });

    const allSessionsFree = all_sessions_free === 'true' || all_sessions_free === true ? 1 : 0;
    const freeSessions = parseInt(free_sessions) || 0;

    // handle upload filenames
    let profileImage = null;
    let syllabusFile = null;

    // Delete previous and set new files
    if (req.files) {
      if (req.files['profile_image'] && req.files['profile_image'][0]) {
        profileImage = req.files['profile_image'][0].filename;
        const [existingRows] = await db.query("SELECT profile_image FROM teacherprofile WHERE username = ?", [username]);
        if (existingRows.length > 0 && existingRows[0].profile_image) {
          const oldImagePath = path.join(uploadsDir, existingRows[0].profile_image);
          if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }
      }
      if (req.files['syllabus'] && req.files['syllabus'][0]) {
        syllabusFile = req.files['syllabus'][0].filename;
        const [existingRows] = await db.query("SELECT syllabus FROM teacherprofile WHERE username = ?", [username]);
        if (existingRows.length > 0 && existingRows[0].syllabus) {
          const oldSyllabusPath = path.join(uploadsDir, existingRows[0].syllabus);
          if (fs.existsSync(oldSyllabusPath)) fs.unlinkSync(oldSyllabusPath);
        }
      }
    }

    const [rows] = await db.query("SELECT * FROM teacherprofile WHERE username = ?", [username]);
    if (rows.length > 0) {
      // update
      let updateQuery = `
        UPDATE teacherprofile
        SET namer = ?, oneline = ?, about = ?, lang = ?, timezone = ?, 
            subjects = ?, level = ?, education = ?, exp = ?, 
            free_sessions = ?, all_sessions_free = ?
      `;
      const params = [namer, oneline, about, lang, timezone, subjects, level, education, exp, freeSessions, allSessionsFree];
      if (profileImage) { updateQuery += ", profile_image = ?"; params.push(profileImage); }
      if (syllabusFile) { updateQuery += ", syllabus = ?"; params.push(syllabusFile); }
      updateQuery += " WHERE username = ?";
      params.push(username);
      await db.query(updateQuery, params);
      return res.json({ message: "Profile updated successfully" });
    } else {
      // insert
      const insertSql = `
        INSERT INTO teacherprofile 
        (username, namer, oneline, about, lang, timezone, subjects, level, education, exp, profile_image, syllabus, free_sessions, all_sessions_free)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await db.query(insertSql, [username, namer, oneline, about, lang, timezone, subjects, level, education, exp, profileImage, syllabusFile, freeSessions, allSessionsFree]);
      return res.json({ message: "Profile created successfully" });
    }
  } catch (err) {
    console.error("infoofteacher error:", err);
    // cleanup uploaded files on error
    try {
      if (req.files) {
        if (req.files['profile_image']) {
          const filePath = path.join(uploadsDir, req.files['profile_image'][0].filename);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        if (req.files['syllabus']) {
          const filePath = path.join(uploadsDir, req.files['syllabus'][0].filename);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
      }
    } catch (cleanupErr) {
      console.error('cleanup error:', cleanupErr);
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// --------- Teachers endpoints (search/by username) ----------
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

app.get("/api/teachers/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const [rows] = await db.query("SELECT * FROM teacherprofile WHERE username = ?", [username]);
    if (!rows.length) return res.status(404).json({ message: "Teacher not found" });
    return res.json(rows[0]);
  } catch (err) {
    console.error("GET teacher by username error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ----- Bookings endpoints -----
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

app.post("/bookings", async (req, res) => {
  try {
    const { tutorUsername, studentUsername, start, end, date, time } = req.body;
    let startDatetime = start || null;
    let endDatetime = end || null;
    if (!startDatetime && date && time) {
      startDatetime = `${date} ${time}:00`;
      const startTs = new Date(startDatetime);
      const endTs = new Date(startTs.getTime() + 60 * 60 * 1000);
      const pad = (n) => (n < 10 ? "0" + n : n);
      const toSql = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      startDatetime = toSql(startTs);
      endDatetime = toSql(endTs);
    }
    if (!startDatetime || !endDatetime) return res.status(400).json({ message: "start/end required" });
    const [tRows] = await db.query("SELECT username FROM teacherprofile WHERE username = ?", [tutorUsername]);
    if (!tRows.length) return res.status(404).json({ message: "Tutor not found" });
    await db.query("INSERT INTO Bookings (tutorUsername, studentUsername, start, end, status) VALUES (?, ?, ?, ?, ?)", [tutorUsername, studentUsername, startDatetime, endDatetime, "pending"]);
    return res.json({ message: "Booking saved" });
  } catch (err) {
    console.error("POST /bookings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ message: "Tutor username is required" });

    const sql = `
      SELECT b.id, b.tutorUsername, b.studentUsername, b.start, b.end, 
             b.status, b.roomId, b.message
      FROM bookings b
      WHERE b.tutorUsername = ?
      ORDER BY b.start ASC
    `;
    const [rows] = await db.query(sql, [username]);

    // Attach online status and socket info
    const bookingsWithStatus = rows.map((booking) => {
      const studentOnlineInfo = onlineStudents[booking.studentUsername];
      return {
        ...booking,
        studentSocketId: studentOnlineInfo?.socketId || null,
        isStudentOnline: !!studentOnlineInfo,
        studentLastSeen: studentOnlineInfo?.lastSeen || null
      };
    });

    return res.json(bookingsWithStatus);
  } catch (err) {
    console.error("GET /bookings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

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

app.post("/teacher/requests/:bookingId/decision", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { decision, message } = req.body;
    if (!["accepted", "rejected"].includes(decision)) return res.status(400).json({ message: "Invalid decision" });
    const msgToSave = decision === "rejected" ? null : (message || null);
    await db.query("UPDATE Bookings SET status = ?, message = ? WHERE id = ?", [decision, msgToSave, bookingId]);
    return res.json({ message: `Booking ${decision}` });
  } catch (err) {
    console.error("POST booking decision error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ----- Courses endpoints (create/fetch) -----
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

app.post('/createcourse', upload.single('thumbnail'), (req, res) => {
  try {
    const { title, description, category, duration, level, price, tutorUsername } = req.body;
    if (!tutorUsername) return res.status(400).json({ message: 'Teacher username is required' });
    const thumbnail = req.file ? req.file.filename : null;
    const sql = `INSERT INTO newcourse (title, description, category, duration, level, price, thumbnail, tutorUsername) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [title, description, category, duration, level, price, thumbnail, tutorUsername], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: 'Error creating course' });
      }
      res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
    });
  } catch (err) {
    console.error('/createcourse error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

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
    const subjects = rows.map(r => r.category);
    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

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

// ----- Signaling & Socket.IO set up -----
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  // pingTimeout: 60000
});

// In-memory maps
const onlineStudents = {}; // username -> { socketId, userData, lastSeen }
const onlineTeachers = {}; // username -> { socketId, userData, lastSeen }
const activeCalls = new Map(); // roomId -> { participants: [{ socketId, username, userType, joinedAt }], startTime, bookingId }
const rooms = new Map(); // roomId -> Set(socketId)

// Socket auth middleware (reads token from handshake.auth.token or Authorization header)
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token || (socket.handshake.headers?.authorization ? socket.handshake.headers.authorization.split(' ')[1] : null);
    if (!token) {
      // allow unauthenticated for now but mark as guest
      socket.user = null;
      return next();
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.warn('Socket auth failed:', err.message);
        socket.user = null;
        return next(); // optional: next(new Error('unauthorized')) to block
      }
      socket.user = user; // { username }
      return next();
    });
  } catch (err) {
    console.error('socket auth error:', err);
    return next();
  }
});

// Helper: get peers excluding one
function getPeers(roomId, exceptSocketId) {
  const set = rooms.get(roomId);
  if (!set) return [];
  return [...set].filter(id => id !== exceptSocketId);
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id, 'user:', socket.user?.username || 'guest');

  socket.on('student-online', (data) => {
    if (!data || !data.username) return console.error('Invalid student-online:', data);
    const { username, userData } = data;
    onlineStudents[username] = { socketId: socket.id, userData, lastSeen: new Date() };
    socket.username = username;
    socket.userType = 'student';
    socket.broadcast.emit('student-status-changed', { username, isOnline: true, userData });
  });

  socket.on('teacher-online', (data) => {
    if (!data || !data.username) return console.error('Invalid teacher-online:', data);
    const { username, userData } = data;
    onlineTeachers[username] = { socketId: socket.id, userData, lastSeen: new Date() };
    socket.username = username;
    socket.userType = 'teacher';
  });

  socket.on('join-room', (data) => {
    try {
      if (!data || !data.roomId) return console.error('Invalid join-room:', data);
      const { roomId, username, userType, bookingId } = data;
      socket.join(roomId);

      // maintain rooms map
      if (!rooms.has(roomId)) rooms.set(roomId, new Set());
      rooms.get(roomId).add(socket.id);

      // maintain activeCalls
      if (!activeCalls.has(roomId)) {
        activeCalls.set(roomId, { participants: [], startTime: new Date(), bookingId: bookingId || null });
      }
      const call = activeCalls.get(roomId);
      call.participants.push({ socketId: socket.id, username, userType, joinedAt: new Date() });

      // notify others
      socket.to(roomId).emit('user-joined', { username, userType, socketId: socket.id });

      // if exactly two peers, tell them who to call (avoid glare)
      const peers = getPeers(roomId, socket.id);
      if (peers.length === 1) {
        const otherId = peers[0];
        // tell both sides who to call (useful in one-to-one)
        socket.emit('peer-ready', { to: otherId });
        io.to(otherId).emit('peer-ready', { to: socket.id });
      } else if (peers.length > 1) {
        // group call: broadcast list of peers or handle SFU/mesh strategy
        socket.emit('peers-list', { peers });
      }

      // store some socket meta for cleanup
      socket.roomId = roomId;
      socket.username = username;
      socket.userType = userType;
    } catch (err) {
      console.error('join-room error:', err);
    }
  });

  // Offer/Answer/Candidate must contain `to` (socketId) for targeted routing
  socket.on('offer', (data) => {
    try {
      const { to, sdp, from, roomId } = data;
      if (!to) return console.warn('offer missing `to`', data);
      io.to(to).emit('offer', { sdp, from: from || socket.id, roomId });
    } catch (err) {
      console.error('offer handler error:', err);
    }
  });

  socket.on('answer', (data) => {
    try {
      const { to, sdp, from, roomId } = data;
      if (!to) return console.warn('answer missing `to`', data);
      io.to(to).emit('answer', { sdp, from: from || socket.id, roomId });
    } catch (err) {
      console.error('answer handler error:', err);
    }
  });

  socket.on('ice-candidate', (data) => {
    try {
      const { to, candidate, from, roomId } = data;
      if (!to) return console.warn('ice-candidate missing `to`', data);
      io.to(to).emit('ice-candidate', { candidate, from: from || socket.id, roomId });
    } catch (err) {
      console.error('ice-candidate handler error:', err);
    }
  });

  socket.on('toggle-audio', (data) => {
    try {
      const { roomId, username, audioEnabled } = data;
      socket.to(roomId).emit('audio-toggled', { username, audioEnabled });
    } catch (err) { console.error(err); }
  });

  socket.on('toggle-video', (data) => {
    try {
      const { roomId, username, videoEnabled } = data;
      socket.to(roomId).emit('video-toggled', { username, videoEnabled });
    } catch (err) { console.error(err); }
  });

  socket.on('share-screen', (data) => {
    try {
      const { roomId, username, isSharing } = data;
      socket.to(roomId).emit('screen-sharing', { username, isSharing });
    } catch (err) { console.error(err); }
  });

  socket.on('leave-room', (data) => {
    try {
      const { roomId, username } = data;
      socket.leave(roomId);
      const set = rooms.get(roomId);
      if (set) {
        set.delete(socket.id);
        if (set.size === 0) rooms.delete(roomId);
      }
      socket.to(roomId).emit('user-left', { username, socketId: socket.id });

      const call = activeCalls.get(roomId);
      if (call) {
        call.participants = call.participants.filter(p => p.socketId !== socket.id);
        if (!call.participants.length) {
          activeCalls.delete(roomId);
          if (call.bookingId) updateBookingStatus(call.bookingId, 'completed').catch(console.error);
        }
      }
    } catch (err) { console.error('leave-room error:', err); }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // remove from online lists
    for (const [username, info] of Object.entries(onlineStudents)) {
      if (info.socketId === socket.id) {
        delete onlineStudents[username];
        socket.broadcast.emit('student-status-changed', { username, isOnline: false, userData: info.userData });
        break;
      }
    }
    for (const [username, info] of Object.entries(onlineTeachers)) {
      if (info.socketId === socket.id) {
        delete onlineTeachers[username];
        break;
      }
    }

    // cleanup rooms & activeCalls
    for (const [roomId, set] of Array.from(rooms.entries())) {
      if (set.has(socket.id)) {
        set.delete(socket.id);
        socket.to(roomId).emit('user-disconnected', { socketId: socket.id });
        if (set.size === 0) rooms.delete(roomId);
        const call = activeCalls.get(roomId);
        if (call) {
          call.participants = call.participants.filter(p => p.socketId !== socket.id);
          if (!call.participants.length) {
            activeCalls.delete(roomId);
            if (call.bookingId) updateBookingStatus(call.bookingId, 'completed').catch(console.error);
          }
        }
      }
    }
  });

}); // io.on connection

// ----- REST endpoints for call management -----
app.post("/start-call", async (req, res) => {
  try {
    const { tutorUsername, studentUsername, bookingId } = req.body;
    if (!tutorUsername || !studentUsername || !bookingId) return res.status(400).json({ message: "Missing required fields" });
    const [bookingRows] = await db.query("SELECT b.* FROM bookings b WHERE b.id = ? AND b.tutorUsername = ?", [bookingId, tutorUsername]);
    if (!bookingRows.length) return res.status(404).json({ message: "Booking not found" });
    const roomId = uuidv4();
    await db.query("UPDATE bookings SET roomId = ?, status = 'accepted' WHERE id = ?", [roomId, bookingId]);

    // prepare activeCalls entry
    activeCalls.set(roomId, { participants: [], startTime: new Date(), bookingId });

    // notify student if online
    const studentOnlineInfo = onlineStudents[studentUsername];
    if (studentOnlineInfo) {
      io.to(studentOnlineInfo.socketId).emit("incoming-call", { roomId, tutorUsername, bookingId, message: bookingRows[0].message });
      console.log(`Notified student ${studentUsername} about incoming call`);
    }

    return res.json({ message: "Call started", roomId, studentOnline: !!studentOnlineInfo });
  } catch (err) {
    console.error("POST /start-call error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/get-call/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const [rows] = await db.query("SELECT roomId, status FROM bookings WHERE id = ?", [bookingId]);
    if (!rows.length) return res.status(404).json({ message: "Booking not found" });
    if (!rows[0].roomId || rows[0].status !== 'accepted') return res.status(404).json({ message: "No active call" });
    return res.json({ roomId: rows[0].roomId, status: rows[0].status });
  } catch (err) {
    console.error("GET /get-call error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/end-call", async (req, res) => {
  try {
    const { roomId, bookingId } = req.body;
    if (!roomId) return res.status(400).json({ message: "roomId required" });
    if (activeCalls.has(roomId)) {
      io.to(roomId).emit('call-ended', { reason: 'host-ended' });
      activeCalls.delete(roomId);
    }
    if (bookingId) {
      await db.query("UPDATE bookings SET status = 'completed', end = NOW() WHERE id = ?", [bookingId]);
    }
    return res.json({ message: "Call ended successfully" });
  } catch (err) {
    console.error("POST /end-call error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ---- Monitoring endpoints ----
app.get("/online-students", async (req, res) => {
  try {
    const list = Object.entries(onlineStudents).map(([username, data]) => ({ username, ...data }));
    return res.json(list);
  } catch (err) {
    console.error("GET /online-students error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/online-teachers", async (req, res) => {
  try {
    const list = Object.entries(onlineTeachers).map(([username, data]) => ({ username, ...data }));
    return res.json(list);
  } catch (err) {
    console.error("GET /online-teachers error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/active-calls", async (req, res) => {
  try {
    const calls = Array.from(activeCalls.entries()).map(([roomId, call]) => ({
      roomId,
      participants: call.participants,
      startTime: call.startTime,
      bookingId: call.bookingId,
      duration: Math.floor((new Date() - call.startTime) / 1000)
    }));
    return res.json(calls);
  } catch (err) {
    console.error("GET /active-calls error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    onlineStudents: Object.keys(onlineStudents).length,
    onlineTeachers: Object.keys(onlineTeachers).length,
    activeCalls: activeCalls.size
  });
});

// fallback
app.use((req, res) => res.status(404).json({ message: "Endpoint not found" }));

// start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export for tests if needed
module.exports = { app, server, io, onlineStudents, onlineTeachers, activeCalls };



























































































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