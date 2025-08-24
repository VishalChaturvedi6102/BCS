

// // // src/pages/BookSession.jsx
// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import Layout from "./Layout";
// // import { Container, Form, Button } from "react-bootstrap";

// // const Booksession = () => {
// // //   const { tutorId } = useParams();
// // const { username } = useParams();
// //   const [tutor, setTutor] = useState(null);
// //   const [date, setDate] = useState("");
// //   const [time, setTime] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost:4000/api/teachers/${tutorId}`)
// //       .then((res) => setTutor(res.data))
// //       .catch((err) => console.error(err));
// //   }, [tutorId]);

// //   const handleBooking = () => {
// //     axios
// //       .post(`http://localhost:4000/api/bookings`, {
// //         tutorId,
// //         date,
// //         time,
// //         studentId: localStorage.getItem("studentId"),
// //       })
// //       .then(() => {
// //         alert("Session booked successfully!");
// //         navigate("/student/dashboard");
// //       })
// //       .catch((err) => console.error(err));
// //   };

// //   return (
// //     <>
// //       <Layout />
// //       <Container className="my-5">
// //         {tutor ? (
// //           <>
// //             <h2>Book Session with {tutor.name}</h2>
// //             <Form>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Select Date</Form.Label>
// //                 <Form.Control
// //                   type="date"
// //                   value={date}
// //                   onChange={(e) => setDate(e.target.value)}
// //                 />
// //               </Form.Group>

// //               <Form.Group className="mb-3">
// //                 <Form.Label>Select Time</Form.Label>
// //                 <Form.Control
// //                   type="time"
// //                   value={time}
// //                   onChange={(e) => setTime(e.target.value)}
// //                 />
// //               </Form.Group>

// //               <Button variant="primary" onClick={handleBooking}>
// //                 Confirm Booking
// //               </Button>
// //             </Form>
// //           </>
// //         ) : (
// //           <p>Loading tutor details...</p>
// //         )}
// //       </Container>
// //     </>
// //   );
// // };

// // export default Booksession;



// // src/pages/BookSession.jsx
// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import Layout from "./Layout";
// // import { Container, Form, Button } from "react-bootstrap";

// // const Booksession = () => {
// //   const { username } = useParams(); // now getting username from URL
// //   const [tutor, setTutor] = useState(null);
// //   const [date, setDate] = useState("");
// //   const [time, setTime] = useState("");
// //   const navigate = useNavigate();

// //   // Fetch tutor details by username
// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost:4000/api/teachers/username/${username}`)
// //       .then((res) => setTutor(res.data))
// //       .catch((err) => console.error("Error fetching tutor details:", err));
// //   }, [username]);

// //   // Handle booking
// //   const handleBooking = () => {
// //     if (!date || !time) {
// //       alert("Please select both date and time before booking.");
// //       return;
// //     }

// //     axios
// //       .post(`http://localhost:4000/api/bookings`, {
// //         tutorUsername: username,
// //         date,
// //         time,
// //         studentUsername: localStorage.getItem("studentUsername"), // store username instead of id
// //       })
// //       .then(() => {
// //         alert("Session booked successfully!");
// //         navigate("/student/dashboard");
// //       })
// //       .catch((err) => console.error("Error booking session:", err));
// //   };

// //   return (
// //     <>
// //       <Layout />
// //       <Container className="my-5">
// //         {tutor ? (
// //           <>
// //             <h2>Book Session with {tutor.namer}</h2>
// //             <p>
// //               <strong>Subject:</strong> {tutor.subjects} <br />
// //               <strong>Level:</strong> {tutor.level} <br />
// //               <strong>Experience:</strong> {tutor.exp} years <br />
// //               <strong>Language:</strong> {tutor.lang} <br />
// //             </p>

// //             <Form>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Select Date</Form.Label>
// //                 <Form.Control
// //                   type="date"
// //                   value={date}
// //                   onChange={(e) => setDate(e.target.value)}
// //                 />
// //               </Form.Group>

// //               <Form.Group className="mb-3">
// //                 <Form.Label>Select Time</Form.Label>
// //                 <Form.Control
// //                   type="time"
// //                   value={time}
// //                   onChange={(e) => setTime(e.target.value)}
// //                 />
// //               </Form.Group>

// //               <Button variant="primary" onClick={handleBooking}>
// //                 Confirm Booking
// //               </Button>
// //             </Form>
// //           </>
// //         ) : (
// //           <p>Loading tutor details...</p>
// //         )}
// //       </Container>
// //     </>
// //   );
// // };

// // export default Booksession;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import Layout from "./Layout";

// const Booksession = () => {
//   const { tutorUsername } = useParams();
//   const [tutor, setTutor] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:4000/api/teachers/${tutorUsername}`)
//       .then(res => setTutor(res.data))
//       .catch(err => console.error("Error fetching tutor profile:", err));
//   }, [tutorUsername]);

//   if (!tutor) return <p>Loading...</p>;

//   return (
//     <>
//       <Layout />
//       <Container className="my-5">
//         <Row>
//           {/* Teacher profile */}
//           <Col md={8}>
//             <h2>{tutor.name}</h2>
//             <p><strong>Language:</strong> {tutor.lang}</p>
//             <p><strong>Subject:</strong> {tutor.subjects}</p>
//             <p><strong>Experience:</strong> {tutor.exp} years</p>
//             <p>{tutor.about}</p>
//           </Col>

//           {/* Booking card */}
//           <Col md={4}>
//             <Card className="p-3 shadow-sm">
//               <h4>Ready to book?</h4>
//               <p>Pick a suitable time with {tutor.name} for {tutor.subjects}.</p>
//               <Button
//                 variant="primary"
//                 onClick={() => {
//                   sessionStorage.setItem("tutorUsername", tutor.username);
//                   sessionStorage.setItem("subjectName", tutor.subjects);
//                   navigate("/calendar");
//                 }}
//               >
//                 Confirm Your Booking
//               </Button>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Booksession;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import Layout from "./Layout";

// const Booksession = () => {
//   const { tutorUsername } = useParams();
//   const [tutor, setTutor] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/teachers/username/${tutorUsername}`)
//       .then((res) => {
//         // Handle both object and array responses
//         if (Array.isArray(res.data)) {
//           setTutor(res.data[0] || null);
//         } else {
//           setTutor(res.data || null);
//         }
//       })
//       .catch((err) =>
//         console.error("Error fetching tutor profile:", err)
//       );
//   }, [tutorUsername]);

//   if (!tutor) return <p className="text-center mt-5">Loading...</p>;

//   return (
//     <>
//       <Layout />
//       <Container className="my-5">
//         <Row>
//           {/* Teacher profile */}
//           <Col md={8}>
//             <h2>{tutor.namer}</h2>

// <p>
//               <strong>Intro:</strong> {tutor.oneline}
//             </p>

//             <p>
//               <strong>About:</strong> {tutor.about}
//             </p>

//             <p>
//               <strong>Language:</strong> {tutor.lang}
//             </p>

//             <p>
//               <strong>Timezone:</strong> {tutor.timezone}
//             </p>


//             <p>
//               <strong>Subjects:</strong> {tutor.subjects}
//             </p>

//             <p>
//               <strong>Level:</strong> {tutor.level}
//             </p>

//             <p>
//               <strong>Education:</strong> {tutor.education}
//             </p>
//             <p>
//               <strong>Experience:</strong> {tutor.exp} years
//             </p>
//             {/* <p>{tutor.about}</p> */}
//           </Col>

//           {/* Booking card */}
//           <Col md={4}>
//             <Card className="p-3 shadow-sm">
//               <h4>Ready to book?</h4>
//               <p>
//                 Pick a suitable time with {tutor.name} for {tutor.subjects}.
//               </p>
//               <Button
//                 variant="primary"
//                 onClick={() => {
//                   sessionStorage.setItem("tutorUsername", tutor.username);
//                   sessionStorage.setItem("subjectName", tutor.subjects);
//                   navigate("/calendar");
//                 }}
//               >
//                 Confirm Your Booking
//               </Button>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Booksession;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
// // import Layout from "./Layout";

// const Booksession = () => {
//   const { tutorUsername } = useParams();
//   const [tutor, setTutor] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/teachers/username/${tutorUsername}`)
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           setTutor(res.data[0] || null);
//         } else {
//           setTutor(res.data || null);
//         }
//       })
//       .catch((err) => console.error("Error fetching tutor profile:", err));
//   }, [tutorUsername]);

//   if (!tutor) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-3 text-muted">Fetching tutor details...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* <Layout /> */}
//       <style>
//         {`
//           .profile-card {
//             background: #ffffff;
//             border-radius: 12px;
//             padding: 20px;
//             transition: all 0.3s ease-in-out;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           }
//           .profile-card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 8px 20px rgba(0,0,0,0.15);
//           }
//           .booking-card {
//             background: linear-gradient(135deg, #007bff, #0056b3);
//             color: white;
//             border-radius: 12px;
//             padding: 20px;
//             text-align: center;
//           }
//           .booking-card h4 {
//             font-weight: bold;
//             margin-bottom: 10px;
//           }
//           .booking-card p {
//             font-size: 0.95rem;
//             opacity: 0.9;
//           }
//           .confirm-btn {
//             background-color: #ffc107;
//             color: #000;
//             font-weight: bold;
//             border: none;
//             padding: 10px 20px;
//             border-radius: 6px;
//             transition: all 0.2s ease-in-out;
//           }
//           .confirm-btn:hover {
//             background-color: #e0a800;
//             transform: scale(1.05);
//           }
//           .info-label {
//             font-weight: bold;
//             color: #333;
//           }
//           .info-value {
//             color: #555;
//           }
//         `}
//       </style>

//       <Container className="my-5">
//         <Row>
//           {/* Teacher profile */}
//           <Col md={8}>
//             <div className="profile-card">
//               <h2 className="mb-3">{tutor.name}</h2>
//               <p><span className="info-label">Intro:</span> <span className="info-value">{tutor.oneline}</span></p>
//               <p><span className="info-label">About:</span> <span className="info-value">{tutor.about}</span></p>
//               <p><span className="info-label">Language:</span> <Badge bg="secondary">{tutor.lang}</Badge></p>
//               <p><span className="info-label">Timezone:</span> <span className="info-value">{tutor.timezone}</span></p>
//               <p><span className="info-label">Subjects:</span> <span className="info-value">{tutor.subjects}</span></p>
//               <p><span className="info-label">Level:</span> <span className="info-value">{tutor.level}</span></p>
//               <p><span className="info-label">Education:</span> <span className="info-value">{tutor.education}</span></p>
//               <p><span className="info-label">Experience:</span> <span className="info-value">{tutor.exp} years</span></p>
//             </div>
//           </Col>

//           {/* Booking card */}
//           <Col md={4}>
//             <div className="booking-card">
//               <h4>Ready to Book?</h4>
//               <p>Pick a suitable time with <strong>{tutor.name}</strong> for <strong>{tutor.subjects}</strong>.</p>
//               <Button
//                 className="confirm-btn mt-3"
//                 onClick={() => {
//                   sessionStorage.setItem("tutorUsername", tutor.username);
//                   sessionStorage.setItem("subjectName", tutor.subjects);
//                   navigate("/calendar");
//                 }}
//               >
//                 Confirm Your Booking
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Booksession;






// Booksession.jsx - Updated with Superprof design
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
// import Syllabusviewer from "./Syllabusviewer";

// const Booksession = () => {
//   const { tutorUsername } = useParams();
//   const [tutor, setTutor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();



//    const [teacherData, setTeacherData] = useState(null); // Add state for teacherData
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch teacher data when component mounts
//     const fetchTeacherData = async () => {
//       try {
//         // You need to know which teacher's data to fetch
//         // This could come from URL params, props, or some other state
//         const teacherId = /* Get teacher ID from somewhere */;
        
//         const response = await axios.get(`http://localhost:4000/api/teachers/${teacherId}`);
//         setTeacherData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchTeacherData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!teacherData) return <div>No teacher data found</div>;

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/tutors/username/${tutorUsername}`)
//       .then((res) => {
//         setTutor(Array.isArray(res.data) ? res.data[0] : res.data);
//       })
//       .catch((err) => console.error("Error fetching tutor profile:", err))
//       .finally(() => setLoading(false));
//   }, [tutorUsername]);

//   if (loading) {
//     return (
//       <div className="text-center py-5" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-3 text-muted">Loading tutor profile...</p>
//       </div>
//     );
//   }

//   if (!tutor) {
//     return (
//       <div className="text-center py-5">
//         <p className="text-muted">Tutor not found</p>
//         <Button onClick={() => navigate('/dashboard')} variant="primary">
//           Back to Dashboard
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ 
//       minHeight: "100vh", 
//       background: "linear-gradient(to bottom, #FFFFFF 0%, #F8F9FA 100%)",
//       padding: "2rem 0",
//       fontFamily: "'Poppins', sans-serif"
//     }}>
//       <Container>
//         <Row>
//           {/* Tutor Profile Details */}
//           <Col lg={8}>
//             <div style={{
//               backgroundColor: "white",
//               borderRadius: "12px",
//               padding: "2rem",
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//               marginBottom: "2rem"
//             }}>
//               <div className="d-flex align-items-start mb-4">
//                 <img 
//                   src={tutor.profileImage || 'https://via.placeholder.com/120x120?text=Tutor'} 
//                   alt={tutor.name}
//                   style={{
//                     width: "120px",
//                     height: "120px",
//                     borderRadius: "12px",
//                     objectFit: "cover",
//                     marginRight: "1.5rem"
//                   }}
//                 />
//                 <div>
//                   <h2 style={{ color: "#1F2937", marginBottom: "0.5rem" }}>{tutor.name}</h2>
//                   <div className="d-flex align-items-center mb-2">
//                     <span style={{ color: "#FFC107", fontWeight: "bold", marginRight: "0.5rem" }}>
//                       ⭐ {tutor.rating || '4.9'}
//                     </span>
//                     <span style={{ color: "#6B7280" }}>({tutor.reviews || '25'} reviews)</span>
//                   </div>
//                   <Badge bg="warning" text="dark" style={{ marginRight: "0.5rem" }}>
//                     🎓 1st free class
//                   </Badge>
//                   <Badge bg="success" style={{ marginRight: "0.5rem" }}>
//                     ⚡ Online
//                   </Badge>
//                 </div>
//               </div>

//               <div className="row mb-4">
//                 <div className="col-md-6">
//                   <p><strong>Subject:</strong> {tutor.subject}</p>
//                   <p><strong>Experience:</strong> {tutor.experience} years</p>
//                   <p><strong>Hourly Rate:</strong> <span style={{ color: "#006CFF", fontWeight: "600" }}>{tutor.hourlyRate || '₹2,500/hr'}</span></p>
//                 </div>
//                 <div className="col-md-6">
//                   <p><strong>Response Time:</strong> {tutor.responseTime || 'Within 2 hours'}</p>
//                   <p><strong>Language:</strong> {tutor.lang}</p>
//                   <p><strong>Level:</strong> {tutor.level}</p>
//                   <Syllabusviewer syllabusFilename={teacherData.syllabus} />
//                 </div>
//               </div>

//               <div>
//                 <h5 style={{ color: "#1F2937", marginBottom: "1rem" }}>About Me</h5>
//                 <p style={{ color: "#6B7280", lineHeight: "1.6" }}>
//                   {tutor.about || tutor.oneline || "Experienced tutor passionate about teaching and helping students achieve their goals."}
//                 </p>
//               </div>

//               {tutor.education && (
//                 <div className="mt-4">
//                   <h5 style={{ color: "#1F2937", marginBottom: "1rem" }}>Education</h5>
//                   <p style={{ color: "#6B7280" }}>{tutor.education}</p>
//                 </div>
//               )}
//             </div>
//           </Col>

//           {/* Booking Card */}
//           <Col lg={4}>
//             <div style={{
//               backgroundColor: "white",
//               borderRadius: "12px",
//               padding: "2rem",
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//               textAlign: "center",
//               position: "sticky",
//               top: "2rem"
//             }}>
//               <h4 style={{ color: "#1F2937", marginBottom: "1rem" }}>Ready to Learn?</h4>
//               <p style={{ color: "#6B7280", marginBottom: "1.5rem" }}>
//                 Book your first session with {tutor.name} and start your learning journey!
//               </p>
              
//               <div style={{ backgroundColor: "#EFF6FF", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem" }}>
//                 <p style={{ margin: "0", fontWeight: "600", color: "#006CFF" }}>🎓 First lesson free!</p>
//               </div>

//               <Button
//                 style={{
//                   backgroundColor: "#FF7138",
//                   border: "none",
//                   borderRadius: "8px",
//                   padding: "1rem 2rem",
//                   fontWeight: "600",
//                   width: "100%",
//                   marginBottom: "1rem"
//                 }}
//                 onClick={() => {
//                   sessionStorage.setItem("tutorUsername", tutor.username);
//                   sessionStorage.setItem("subjectName", tutor.subject);
//                   navigate("/calendar");
//                 }}
//               >
//                 Book Your Free Session
//               </Button>

//               <Button
//                 variant="outline-primary"
//                 style={{
//                   borderColor: "#006CFF",
//                   color: "#006CFF",
//                   borderRadius: "8px",
//                   padding: "0.75rem 1.5rem",
//                   fontWeight: "600",
//                   width: "100%"
//                 }}
//                 onClick={() => navigate(`/tutorwale/${tutor.lang?.toLowerCase()}`)}
//               >
//                 ← Back to Tutors
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Booksession;



// Booksession.jsx - Fixed version
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import Syllabusviewer from "./Syllabusviewer";

const Booksession = () => {
  const { tutorUsername } = useParams();
  const [tutor, setTutor] = useState(null);
  const [teacherData, setTeacherData] = useState(null); // Add state for teacherData
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tutor data
    const fetchTutorData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/tutors/username/${tutorUsername}`);
        const tutorData = Array.isArray(response.data) ? response.data[0] : response.data;
        setTutor(tutorData);
        
        // If the tutor data contains a syllabus, use it
        if (tutorData.syllabus) {
          setTeacherData(tutorData);
        } else {
          // Otherwise, try to fetch teacher data separately
          try {
            const teacherResponse = await axios.get(`http://localhost:4000/api/teachers/username/${tutorUsername}`);
            setTeacherData(teacherResponse.data);
          } catch (teacherErr) {
            console.error("Error fetching teacher data:", teacherErr);
          }
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [tutorUsername]);

  if (loading) {
    return (
      <div className="text-center py-5" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading tutor profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">Error: {error}</p>
        <Button onClick={() => navigate('/dashboard')} variant="primary">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">Tutor not found</p>
        <Button onClick={() => navigate('/dashboard')} variant="primary">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom, #FFFFFF 0%, #F8F9FA 100%)",
      padding: "2rem 0",
      fontFamily: "'Poppins', sans-serif"
    }}>
      <Container>
        <Row>
          {/* Tutor Profile Details */}
          <Col lg={8}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              marginBottom: "2rem"
            }}>
              <div className="d-flex align-items-start mb-4">
                <img 
                  src={tutor.profile_image ? `http://localhost:4000/uploads/${tutor.profile_image}` : 'https://via.placeholder.com/120x120?text=Tutor'} 
                  alt={tutor.namer || tutor.username}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "12px",
                    objectFit: "cover",
                    marginRight: "1.5rem"
                  }}
                />
                <div>
                  <h2 style={{ color: "#1F2937", marginBottom: "0.5rem" }}>{tutor.namer || tutor.username}</h2>
                  <div className="d-flex align-items-center mb-2">
                    <span style={{ color: "#FFC107", fontWeight: "bold", marginRight: "0.5rem" }}>
                      ⭐ {tutor.rating || '4.9'}
                    </span>
                    <span style={{ color: "#6B7280" }}>({tutor.reviews || '25'} reviews)</span>
                  </div>
                  <Badge bg="warning" text="dark" style={{ marginRight: "0.5rem" }}>
                    🎓 1st free class
                  </Badge>
                  <Badge bg="success" style={{ marginRight: "0.5rem" }}>
                    ⚡ Online
                  </Badge>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <p><strong>Subject:</strong> {tutor.subjects || tutor.subject}</p>
                  <p><strong>Experience:</strong> {tutor.exp || tutor.experience} years</p>
                  <p><strong>Hourly Rate:</strong> <span style={{ color: "#006CFF", fontWeight: "600" }}>{tutor.hourlyRate || '₹2,500/hr'}</span></p>
                </div>
                <div className="col-md-6">
                  <p><strong>Response Time:</strong> {tutor.responseTime || 'Within 2 hours'}</p>
                  <p><strong>Language:</strong> {tutor.lang}</p>
                  <p><strong>Level:</strong> {tutor.level}</p>
                  {teacherData && (
                    <Syllabusviewer syllabusFilename={teacherData.syllabus} />
                  )}
                </div>
              </div>

              <div>
                <h5 style={{ color: "#1F2937", marginBottom: "1rem" }}>About Me</h5>
                <p style={{ color: "#6B7280", lineHeight: "1.6" }}>
                  {tutor.about || tutor.oneline || "Experienced tutor passionate about teaching and helping students achieve their goals."}
                </p>
              </div>

              {tutor.education && (
                <div className="mt-4">
                  <h5 style={{ color: "#1F2937", marginBottom: "1rem" }}>Education</h5>
                  <p style={{ color: "#6B7280" }}>{tutor.education}</p>
                </div>
              )}
            </div>
          </Col>

          {/* Booking Card */}
          <Col lg={4}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              textAlign: "center",
              position: "sticky",
              top: "2rem"
            }}>
              <h4 style={{ color: "#1F2937", marginBottom: "1rem" }}>Ready to Learn?</h4>
              <p style={{ color: "#6B7280", marginBottom: "1.5rem" }}>
                Book your first session with {tutor.namer || tutor.username} and start your learning journey!
              </p>
              
              <div style={{ backgroundColor: "#EFF6FF", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem" }}>
                <p style={{ margin: "0", fontWeight: "600", color: "#006CFF" }}>🎓 First lesson free!</p>
              </div>

              <Button
                style={{
                  backgroundColor: "#FF7138",
                  border: "none",
                  borderRadius: "8px",
                  padding: "1rem 2rem",
                  fontWeight: "600",
                  width: "100%",
                  marginBottom: "1rem"
                }}
                onClick={() => {
                  sessionStorage.setItem("tutorUsername", tutor.username);
                  sessionStorage.setItem("subjectName", tutor.subjects || tutor.subject);
                  navigate("/calendar");
                }}
              >
                Book Your Free Session
              </Button>

              <Button
                variant="outline-primary"
                style={{
                  borderColor: "#006CFF",
                  color: "#006CFF",
                  borderRadius: "8px",
                  padding: "0.75rem 1.5rem",
                  fontWeight: "600",
                  width: "100%"
                }}
                onClick={() => navigate(`/tutorwale/${tutor.lang?.toLowerCase()}`)}
              >
                ← Back to Tutors
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Booksession;