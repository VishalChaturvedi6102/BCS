// // import React from 'react';
// // import Layout from './Layout';
// // import {useNavigate} from "react-router-dom";

// // const Dashboard = () => {

// //   const navigate = useNavigate();
// //   const lang = ["English", "hindi","French", "Japanese", "Chinese", "Spanish"];
    
// //   return (
// //     <>
// //     <Layout/>

// // <div className="grid grid-cols-3 gap-4 p-6">
// //       {lang.map((lang) => (
// //         <div
// //           key={lang}
// //           onClick={() => navigate(`/tutors/${lang.toLowerCase()}`)}
// //           className="bg-white shadow-lg p-4 rounded-lg cursor-pointer hover:shadow-xl"
// //         >
// //           <h2 className="text-xl font-bold">{lang}</h2>
// //         </div>
// //       ))}
// //     </div>


// //     </>
// //   )
// // }

// // export default Dashboard;


// import React from 'react';
// import Layout from './Layout';
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Card } from 'react-bootstrap';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const lang = ["English", "Hindi", "French", "Japanese", "Chinese", "Spanish"];

//   return (
//     <>
//       <Layout />

//       <Container className="my-5">
//         <h1 className="text-center mb-4 text-primary fw-bold">
//           Choose Your Tutor Language
//         </h1>

//         <Row xs={1} sm={2} md={3} className="g-4">
//           {lang.map((language) => (
//             <Col key={language}>
//               <Card
//                 onClick={() => navigate(`/Tutorwale/${language.toLowerCase()}`)}
//                 className="h-100 text-center shadow-sm"
//                 style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
//                 onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//                 onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//               >
//                 <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//                   <Card.Title className="fs-3 text-primary">{language}</Card.Title>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Dashboard;



// import React from 'react';
// import Layout from './Layout';
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Card } from 'react-bootstrap';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const lang = ["English", "Hindi", "French", "Japanese", "Chinese", "Spanish"];

//   return (
//     <>
//       <Layout />

//       <Container className="my-5">
//         <h1 className="text-center mb-4 text-primary fw-bold">
//           Choose Your Tutor Language
//         </h1>

//         <Row xs={1} sm={2} md={3} className="g-4">
//           {lang.map((language) => (
//             <Col key={language}>
//               <Card
//                 onClick={() => navigate(`/Tutorwale/${language.toLowerCase()}`)}
//                 className="h-100 text-center shadow-sm"
//                 style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
//                 onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//                 onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//               >
//                 <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//                   <Card.Title className="fs-3 text-primary">{language}</Card.Title>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>


//       // Example inside your Student dashboard component:

// {bookings.length === 0 ? (
//   <p>No bookings yet.</p>
// ) : (
//   <table className="table">
//     <thead>
//       <tr>
//         <th>Tutor</th>
//         <th>Start</th>
//         <th>End</th>
//         <th>Status</th>
//         <th>Message</th>
//       </tr>
//     </thead>
//     <tbody>
//       {bookings.map((b) => (
//         <tr key={b.id}>
//           <td>{b.tutorUsername}</td>
//           <td>{new Date(b.start).toLocaleString()}</td>
//           <td>{new Date(b.end).toLocaleString()}</td>
//           <td>{b.status}</td>
//           <td>{b.message || "—"}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// )}

//     </>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import Layout from './Layout';
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import axios from 'axios';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const lang = ["English", "Hindi", "French", "Japanese", "Chinese", "Spanish"];

//   const [bookings, setBookings] = useState([]);

//   // Example: fetch bookings for the logged-in student on component mount
//   // useEffect(() => {
//   //   // Assuming you have student username stored somewhere, e.g. sessionStorage
//   //   const studentUsername = sessionStorage.getItem("studentUsername");
//   //   if (!studentUsername) return;

//   //   axios
//   //     .get(`http://localhost:4000/bookings?studentUsername=${studentUsername}`)
//   //     .then(res => setBookings(res.data))
//   //     .catch(err => console.error(err));
//   // }, []);



//   useEffect(() => {
//   const studentUsername = sessionStorage.getItem("studentUsername");
//   if (!studentUsername) return;

//   axios
//     .get(`http://localhost:4000/student/bookings?username=${studentUsername}`)
//     .then(res => setBookings(res.data))
//     .catch(err => console.error(err));
// }, []);

//   return (
//     <>
//       <Layout />

//       <Container className="my-5">
//         <h1 className="text-center mb-4 text-primary fw-bold">
//           Choose Your Tutor Language
//         </h1>

//         <Row xs={1} sm={2} md={3} className="g-4 mb-5">
//           {lang.map((language) => (
//             <Col key={language}>
//               <Card
//                 onClick={() => navigate(`/Tutorwale/${language.toLowerCase()}`)}
//                 className="h-100 text-center shadow-sm"
//                 style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
//                 onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//                 onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//               >
//                 <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//                   <Card.Title className="fs-3 text-primary">{language}</Card.Title>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>

//         {/* Bookings table */}
//         {bookings.length === 0 ? (
//           <p className="text-center">No bookings yet.</p>
//         ) : (
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>Tutor</th>
//                 <th>Start</th>
//                 <th>End</th>
//                 <th>Status</th>
//                 <th>Message</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((b) => (
//                 <tr key={b.id}>
//                   <td>{b.tutorUsername}</td>
//                   <td>{new Date(b.start).toLocaleString()}</td>
//                   <td>{new Date(b.end).toLocaleString()}</td>
//                   <td>{b.status}</td>
//                   <td>{b.message || "—"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </Container>
//     </>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from "react";
// // import Layout from "./Layout";
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
// import axios from "axios";
//  import { socket } from "./socket"; 

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const lang = ["English", "Hindi", "French", "Japanese", "Chinese", "Spanish"];

//   const [bookings, setBookings] = useState([]);

//   // Fetch student bookings
//   useEffect(() => {



//     const token = sessionStorage.getItem("token");

//   if (!token) {
//     navigate("/"); // redirect to frontpage if not logged in
//     return;
//   }
//     const studentUsername = sessionStorage.getItem("studentUsername");
//     if (!studentUsername) return;

//     axios
//       .get(`http://localhost:4000/student/bookings?username=${studentUsername}`,
//         {
//           headers: {
//         Authorization: `Bearer ${token}`, // ✅ send JWT with request
//       },
//         }
//       )
//       .then((res) => setBookings(res.data))
//       .catch((err) => console.error(err));
//   }, []);




 

// useEffect(() => {
//   const username = sessionStorage.getItem("studentUsername");
//   if (username) socket.emit("student-online", username);
// }, []);


//   return (
//     <>
//       {/* <Layout /> */}
//       <Container
//         fluid
//         className="py-5"
//         style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}
//       >
//         {/* Section Title */}
//         <h1
//           className="text-center mb-5 fw-bold animate__animated animate__fadeInDown"
//           style={{ color: "#0d6efd" }}
//         >
//           Choose Your Tutor Language
//         </h1>

//         {/* Languages Section */}
//         <Row xs={1} sm={2} md={3} lg={3} className="g-4 mb-5 px-3">
//           {lang.map((language, index) => (
//             <Col
//               key={language}
//               className="animate__animated animate__fadeInUp"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <Card
//                 onClick={() => navigate(`/Tutorwale/${language.toLowerCase()}`)}
//                 className="h-100 text-center border-0 shadow-lg rounded-4"
//                 style={{
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   backgroundColor: "#fdfdfd",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.transform = "scale(1.05)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.transform = "scale(1)")
//                 }
//               >
//                 <Card.Body className="d-flex flex-column justify-content-center align-items-center py-5">
//                   <Card.Title
//                     className="fs-3 fw-bold"
//                     style={{ color: "#0d6efd" }}
//                   >
//                     {language}
//                   </Card.Title>
//                   <p className="text-muted mt-2">
//                     Learn {language} from expert tutors
//                   </p>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>

//         {/* Explore More Courses Button */}
//         <div className="d-flex align-items-center my-5">
//           <div className="flex-grow-1 border-top"></div>
//           <Button
//             onClick={() => navigate("/newcourses")}
//             variant="outline-primary"
//             className="rounded-circle mx-3 px-4 py-4 fw-bold shadow-sm"
//             style={{
//               fontSize: "0.9rem",
//               whiteSpace: "nowrap",
//               transition: "all 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor = "#0d6efd";
//               e.currentTarget.style.color = "#fff";
//               e.currentTarget.style.transform = "scale(1.1)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = "transparent";
//               e.currentTarget.style.color = "#0d6efd";
//               e.currentTarget.style.transform = "scale(1)";
//             }}
//           >
//             Explore More Courses
//           </Button>
//           <div className="flex-grow-1 border-top"></div>
//         </div>

//         {/* Divider */}
//         <hr className="my-5" />

//         {/* Bookings Section */}
//         <h2
//           className="text-center mb-4 fw-bold animate__animated animate__fadeIn"
//           style={{ color: "#0d6efd" }}
//         >
//           📅 Your Bookings
//         </h2>

//         <div className="px-3 animate__animated animate__fadeInUp">
//           {bookings.length === 0 ? (
//             <p className="text-center text-muted">No bookings yet.</p>
//           ) : (
//             <div className="table-responsive shadow-sm rounded-4">
//               <Table bordered hover className="align-middle mb-0 bg-white">
//                 <thead className="table-light">
//                   <tr>
//                     <th className="text-center">Tutor</th>
//                     <th className="text-center">Start</th>
//                     <th className="text-center">End</th>
//                     <th className="text-center">Status</th>
//                     <th className="text-center">Message</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {bookings.map((b) => (
//                     <tr key={b.id}>
//                       <td className="text-center fw-semibold">
//                         {b.tutorUsername}
//                       </td>
//                       <td className="text-center">
//                         {new Date(b.start).toLocaleString()}
//                       </td>
//                       <td className="text-center">
//                         {new Date(b.end).toLocaleString()}
//                       </td>
//                       <td className="text-center">
//                         <span
//                           className={`badge rounded-pill px-3 py-2 ${
//                             b.status === "Confirmed"
//                               ? "bg-success"
//                               : b.status === "Pending"
//                               ? "bg-warning text-dark"
//                               : "bg-secondary"
//                           }`}
//                         >
//                           {b.status}
//                         </span>
//                       </td>
//                       <td className="text-center">
//                         {b.message || <span className="text-muted">—</span>}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </div>
//       </Container>
//     </>
//   );
// };

// export default Dashboard;





// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
// import axios from "axios";
// import { socket } from "./socket"; 

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const lang = ["English", "Hindi", "French", "Japanese", "Chinese", "Spanish"];
//   const [bookings, setBookings] = useState([]);

//   // Fetch student bookings
//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (!token) {
//       navigate("/");
//       return;
//     }
    
//     const studentUsername = sessionStorage.getItem("studentUsername");
//     if (!studentUsername) return;

//     axios
//       .get(`http://localhost:4000/student/bookings?username=${studentUsername}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setBookings(res.data))
//       .catch((err) => console.error(err));
//   }, [navigate]);

//   useEffect(() => {
//     const username = sessionStorage.getItem("studentUsername");
//     if (username) socket.emit("student-online", username);
//   }, []);

//   return (
//     <div style={{ 
//       minHeight: "100vh", 
//       // backgroundColor: "#f9bbbbff",
//       background: "linear-gradient(to bottom, #e0fdffff 0%, #f8b7b7ff 100%)",
//       fontFamily: "'Poppins', sans-serif"
//     }}>
//       <Container className="py-5">
//         {/* Header Section */}
//         <div className="text-center mb-5">
//           <h1 style={{ 
//             fontWeight: "700", 
//             color: "#1F2937", 
//             marginBottom: "1rem",
//             fontSize: "2.5rem"
//           }}>
//             Welcome to Your Dashboard
//           </h1>
//           <p style={{ 
//             color: "#6B7280", 
//             fontSize: "1.1rem",
//             maxWidth: "600px",
//             margin: "0 auto"
//           }}>
//             Discover expert tutors and manage your learning journey
//           </p>
//         </div>

//         {/* Languages Section */}
//         <div className="mb-5">
//           <h2 style={{ 
//             fontWeight: "600", 
//             color: "#1F2937", 
//             marginBottom: "2rem",
//             textAlign: "center"
//           }}>
//             Popular Language Courses
//           </h2>
          
//           <Row xs={1} sm={2} md={3} lg={3} className="g-4">
//             {lang.map((language, index) => (
//               <Col key={language}>
//                 <Card
//                   onClick={() => navigate(`/Tutorwale/${language.toLowerCase()}`)}
//                   className="h-100 text-center border-0"
//                   style={{
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     backgroundColor: "white",
//                     borderRadius: "12px",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-5px)";
//                     e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
//                   }}
//                 >
//                   <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
//                     <div style={{
//                       width: "60px",
//                       height: "60px",
//                       borderRadius: "50%",
//                       backgroundColor: "#EFF6FF",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginBottom: "1rem"
//                     }}>
//                       <span style={{ 
//                         fontSize: "1.5rem", 
//                         fontWeight: "700",
//                         color: "#006CFF"
//                       }}>
//                         {language.charAt(0)}
//                       </span>
//                     </div>
//                     <Card.Title style={{ 
//                       fontWeight: "600", 
//                       color: "#1F2937",
//                       marginBottom: "0.5rem"
//                     }}>
//                       {language}
//                     </Card.Title>
//                     <p style={{ 
//                       color: "#6B7280", 
//                       fontSize: "0.9rem",
//                       margin: 0
//                     }}>
//                       Expert {language} tutors
//                     </p>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </div>

//         {/* Explore More Courses Button */}
//         <div className="text-center my-5">
//           <Button
//             onClick={() => navigate("/newcourses")}
//             style={{
//               backgroundColor: "white",
//               color: "#006CFF",
//               border: "1px solid #006CFF",
//               borderRadius: "25px",
//               padding: "0.75rem 2rem",
//               fontWeight: "600",
//               transition: "all 0.3s ease"
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = "#006CFF";
//               e.target.style.color = "white";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = "white";
//               e.target.style.color = "#006CFF";
//             }}
//           >
//             Explore More Courses →
//           </Button>
//         </div>

//         {/* Bookings Section */}
//         <div className="mt-5">
//           <div style={{
//             backgroundColor: "white",
//             borderRadius: "12px",
//             padding: "2rem",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
//           }}>
//             <h2 style={{ 
//               fontWeight: "600", 
//               color: "#1F2937", 
//               marginBottom: "1.5rem",
//               display: "flex",
//               alignItems: "center",
//               gap: "0.5rem"
//             }}>
//               <span style={{
//                 backgroundColor: "#006CFF",
//                 width: "24px",
//                 height: "24px",
//                 borderRadius: "6px",
//                 display: "inline-flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "white",
//                 fontSize: "0.8rem"
//               }}>📅</span>
//               Your Bookings
//             </h2>

//             {bookings.length === 0 ? (
//               <div className="text-center py-4">
//                 <p style={{ color: "#6B7280", marginBottom: "1rem" }}>
//                   No bookings yet. Start by exploring our language courses!
//                 </p>
//                 <Button
//                   onClick={() => navigate("/Tutorwale/english")}
//                   style={{
//                     backgroundColor: "#FF7138",
//                     border: "none",
//                     borderRadius: "6px",
//                     padding: "0.5rem 1.5rem",
//                     fontWeight: "600"
//                   }}
//                 >
//                   Find a Tutor
//                 </Button>
//               </div>
//             ) : (
//               <div className="table-responsive">
//                 <Table borderless className="align-middle mb-0">
//                   <thead>
//                     <tr style={{ borderBottom: "2px solid #E5E7EB" }}>
//                       <th style={{ padding: "1rem", color: "#6B7280", fontWeight: "600" }}>Tutor</th>
//                       <th style={{ padding: "1rem", color: "#6B7280", fontWeight: "600" }}>Start Time</th>
//                       <th style={{ padding: "1rem", color: "#6B7280", fontWeight: "600" }}>End Time</th>
//                       <th style={{ padding: "1rem", color: "#6B7280", fontWeight: "600" }}>Status</th>
//                       <th style={{ padding: "1rem", color: "#6B7280", fontWeight: "600" }}>Message</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {bookings.map((b) => (
//                       <tr key={b.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
//                         <td style={{ padding: "1rem", fontWeight: "600", color: "#1F2937" }}>
//                           {b.tutorUsername}
//                         </td>
//                         <td style={{ padding: "1rem", color: "#6B7280" }}>
//                           {new Date(b.start).toLocaleString()}
//                         </td>
//                         <td style={{ padding: "1rem", color: "#6B7280" }}>
//                           {new Date(b.end).toLocaleString()}
//                         </td>
//                         <td style={{ padding: "1rem" }}>
//                           <span
//                             style={{
//                               padding: "0.25rem 0.75rem",
//                               borderRadius: "20px",
//                               fontSize: "0.8rem",
//                               fontWeight: "600",
//                               backgroundColor: 
//                                 b.status === "Confirmed" ? "#D1FAE5" :
//                                 b.status === "Pending" ? "#FEF3C7" : "#E5E7EB",
//                               color: 
//                                 b.status === "Confirmed" ? "#065F46" :
//                                 b.status === "Pending" ? "#92400E" : "#374151"
//                             }}
//                           >
//                             {b.status}
//                           </span>
//                         </td>
//                         <td style={{ padding: "1rem", color: "#6B7280" }}>
//                           {b.message || <span style={{ color: "#9CA3AF" }}>—</span>}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Stats Section */}
//         <Row className="mt-5 text-center">
//           <Col md={4} className="mb-4">
//             <div style={{ padding: "1.5rem", backgroundColor: "white", borderRadius: "12px" }}>
//               <h3 style={{ color: "#006CFF", fontWeight: "700", marginBottom: "0.5rem" }}>6+</h3>
//               <p style={{ color: "#6B7280", margin: 0 }}>Languages</p>
//             </div>
//           </Col>
//           <Col md={4} className="mb-4">
//             <div style={{ padding: "1.5rem", backgroundColor: "white", borderRadius: "12px" }}>
//               <h3 style={{ color: "#006CFF", fontWeight: "700", marginBottom: "0.5rem" }}>50+</h3>
//               <p style={{ color: "#6B7280", margin: 0 }}>Expert Tutors</p>
//             </div>
//           </Col>
//           <Col md={4} className="mb-4">
//             <div style={{ padding: "1.5rem", backgroundColor: "white", borderRadius: "12px" }}>
//               <h3 style={{ color: "#FF7138", fontWeight: "700", marginBottom: "0.5rem" }}>95%</h3>
//               <p style={{ color: "#6B7280", margin: 0 }}>Satisfaction Rate</p>
//             </div>
//           </Col>
//         </Row>
//       </Container>

//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          
//           body {
//             font-family: 'Poppins', sans-serif;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Table, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { socket } from "./socket"; 
import Tutorcard from "./Tutorcard"; // Make sure to create this component

const Dashboard = () => {
  const navigate = useNavigate();
  const lang = ["English", "Hindi", "French", "Japanese", "Chinese", "Spanish"];
  const [bookings, setBookings] = useState([]);
  const [recommendedTutors, setRecommendedTutors] = useState([]);
  const [loadingTutors, setLoadingTutors] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Fetch student bookings
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    
    const studentUsername = sessionStorage.getItem("studentUsername");
    if (!studentUsername) return;

    setLoadingBookings(true);
    axios
      .get(`http://localhost:4000/student/bookings?username=${studentUsername}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingBookings(false));
  }, [navigate]);

  // Fetch recommended tutors
  useEffect(() => {
    const fetchRecommendedTutors = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/tutors/recommended');
        setRecommendedTutors(response.data);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      } finally {
        setLoadingTutors(false);
      }
    };

    fetchRecommendedTutors();
  }, []);

  useEffect(() => {
    const username = sessionStorage.getItem("studentUsername");
    if (username) socket.emit("student-online", username);
  }, []);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom, #FFFFFF 0%, #F8F9FA 100%)",
      fontFamily: "'Poppins', sans-serif"
    }}>
      <Container className="py-5">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 style={{ 
            fontWeight: "700", 
            color: "#1F2937", 
            marginBottom: "1rem",
            fontSize: "2.5rem"
          }}>
            Welcome to Lang++
          </h1>
          <p style={{ 
            color: "#6B7280", 
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Discover expert tutors and begin your learning journey
          </p>
        </div>

        {/* Recommended Tutors Section */}
        <div className="mb-5">
          <h2 style={{ 
            fontWeight: "600", 
            color: "#1F2937", 
            marginBottom: "2rem",
            textAlign: "center"
          }}>
            ⭐ Recommended Tutors For You
          </h2>
          
          {loadingTutors ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Loading tutors...</p>
            </div>
          ) : (
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {recommendedTutors.map((tutor) => (
                <Col key={tutor.id}>
                  <Tutorcard tutor={tutor} />
                </Col>
              ))}
            </Row>
    
          )}
        </div>

        {/* View All Tutors Button */}
        <div className="text-center my-5">
          <Button
            onClick={() => navigate("/all-tutors")}
            style={{
              backgroundColor: "black",
              color: "#006CFF",
              border: "2px solid #006CFF",
              borderRadius: "25px",
              padding: "0.75rem 2rem",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#006CFF";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "black";
              e.target.style.color = "#006CFF";
            }}
          >
            View All Tutors →
          </Button>
        </div>

        {/* Languages Section */}
        <div className="mb-5">
          <h2 style={{ 
            fontWeight: "600", 
            color: "#1F2937", 
            marginBottom: "2rem",
            textAlign: "center"
          }}>
            Popular Language Courses
          </h2>
          
          <Row xs={1} sm={2} md={3} lg={3} className="g-4">
            {lang.map((language, index) => (
              <Col key={language}>
                <Card
                  onClick={() => navigate(`/tutorwale/${language.toLowerCase()}`)}
                  className="h-100 text-center border-0"
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
                  }}
                >
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
                    <div style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#faa1a1ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem"
                    }}>
                      <span style={{ 
                        fontSize: "1.5rem", 
                        fontWeight: "700",
                        color: "#006CFF"
                      }}>
                        {language.charAt(0)}
                      </span>
                    </div>
                    <Card.Title style={{ 
                      fontWeight: "600", 
                      color: "#1F2937",
                      marginBottom: "0.5rem"
                    }}>
                      {language}
                    </Card.Title>
                    <p style={{ 
                      color: "#6B7280", 
                      fontSize: "0.9rem",
                      margin: 0
                    }}>
                      Expert {language} tutors
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Explore More Courses Button */}
        <div className="text-center my-5">
          <Button
            onClick={() => navigate("/newcourses")}
            style={{
              backgroundColor: "white",
              color: "#006CFF",
              border: "1px solid #006CFF",
              borderRadius: "25px",
              padding: "0.75rem 2rem",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#006CFF";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "white";
              e.target.style.color = "#006CFF";
            }}
          >
            Explore More Courses →
          </Button>
        </div>

        {/* Bookings Section */}
        <div className="mt-5">
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
          }}>
            <h2 style={{ 
              fontWeight: "600", 
              color: "#1F2937", 
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <span style={{
                backgroundColor: "#006CFF",
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "0.8rem"
              }}>📅</span>
              Your Bookings
            </h2>

            {loadingBookings ? (
              <div className="text-center py-4">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-4">
                <p style={{ color: "#6B7280", marginBottom: "1rem" }}>
                  No bookings yet. Start by exploring our language courses!
                </p>
                <Button
                  onClick={() => navigate("/tutorwale/english")}
                  style={{
                    backgroundColor: "#FF7138",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5rem 1.5rem",
                    fontWeight: "600"
                  }}
                >
                  Find a Tutor
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table borderless className="align-middle mb-0">
                  <thead>
                    <tr style={{ borderBottom: "2px solid #E5E7EB" }}>
                      <th style={{ padding: "1rem", color: "#6B7280", fontWeight: "600" }}>Tutor</th>
                      <th style={{ padding: "1rem", color: "#6B7280", fontWeight: "600" }}>Start Time</th>
                      <th style={{ padding: "1rem", color: "#6B7280", fontWeight: "600" }}>End Time</th>
                      <th style={{ padding: "1rem", color: "#6B7280", fontWeight: "600" }}>Status</th>
                      <th style={{ padding: "1rem", color: "#6B7280", fontWeight: "600" }}>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
                        <td style={{ padding: "1rem", fontWeight: "600", color: "#1F2937" }}>
                          {b.tutorUsername}
                        </td>
                        <td style={{ padding: "1rem", color: "#6B7280" }}>
                          {new Date(b.start).toLocaleString()}
                        </td>
                        <td style={{ padding: "1rem", color: "#6B7280" }}>
                          {new Date(b.end).toLocaleString()}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <span
                            style={{
                              padding: "0.25rem 0.75rem",
                              borderRadius: "20px",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                              backgroundColor: 
                                b.status === "Confirmed" ? "#D1FAE5" :
                                b.status === "Pending" ? "#FEF3C7" : "#E5E7EB",
                              color: 
                                b.status === "Confirmed" ? "#065F46" :
                                b.status === "Pending" ? "#92400E" : "#374151"
                            }}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td style={{ padding: "1rem", color: "#6B7280" }}>
                          {b.message || <span style={{ color: "#9CA3AF" }}>—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <Row className="mt-5 text-center">
          <Col md={4} className="mb-4">
            <div style={{ padding: "1.5rem", backgroundColor: "white", borderRadius: "12px" }}>
              <h3 style={{ color: "#006CFF", fontWeight: "700", marginBottom: "0.5rem" }}>6+</h3>
              <p style={{ color: "#6B7280", margin: 0 }}>Languages</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div style={{ padding: "1.5rem", backgroundColor: "white", borderRadius: "12px" }}>
              <h3 style={{ color: "#006CFF", fontWeight: "700", marginBottom: "0.5rem" }}>50+</h3>
              <p style={{ color: "#6B7280", margin: 0 }}>Expert Tutors</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div style={{ padding: "1.5rem", backgroundColor: "white", borderRadius: "12px" }}>
              <h3 style={{ color: "#FF7138", fontWeight: "700", marginBottom: "0.5rem" }}>95%</h3>
              <p style={{ color: "#6B7280", margin: 0 }}>Satisfaction Rate</p>
            </div>
          </Col>
        </Row>
      </Container>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          
          body {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;