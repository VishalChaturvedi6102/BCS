



// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';
// // // import Layout from '../Layout';

// // // const TeacherDashboard = () => {
// // //   const [courses, setCourses] = useState([]);
// // //   const navigate = useNavigate();

// // //   const [requests, setRequests] = useState([]);

// // // //   const fetchCourses = async () => {
// // // //     const res = await axios.get('/api/courses/teacher');
// // // //     setCourses(res.data);
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchCourses();
// // // //   }, []);

// // // //   const handleDelete = async id => {
// // // //     await axios.delete(`/api/courses/${id}`);
// // // //     fetchCourses();
// // // //   };

// // //   return (

  
// // //     <>
// // //       <Layout />
// // //       <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px' }}>
// // //         <div className="container mt-4">
          
// // //           {/* 1st Section: Student Requests */}
// // //           <div className="mb-4">
// // //             <h4 className="mb-3 text-primary">Student Requests</h4>
// // //             <div className="card shadow-sm border-info">
// // //               <div className="card-body d-flex justify-content-center align-items-center text-muted" style={{ height: '150px' }}>
// // //                 <span>Coming Soon...</span>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* 2nd Section: New */}
// // //           <div className="mb-4">
// // //             <h4 className="mb-3 text-success">New</h4>
// // //             <div 
// // //               className="card text-center shadow-sm border-success" 
// // //               style={{ cursor: 'pointer', height: '150px' }}
// // //               onClick={() => navigate('/createcourse')}
// // //             >
// // //               <div className="card-body d-flex flex-column justify-content-center align-items-center">
// // //                 <h5 className="card-title text-success mb-2">+ Create New Course</h5>
// // //                 <p className="text-muted mb-0">Click to start adding a new course</p>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* 3rd Section: Your Courses */}
// // //           <div>
// // //             <h4 className="mb-3 text-warning">Your Courses</h4>
// // //             <div className="card shadow-sm border-warning">
// // //               <div className="card-body d-flex justify-content-center align-items-center text-muted" style={{ height: '150px' }}>
// // //                 <span>Coming Soon...</span>
// // //               </div>
// // //             </div>
// // //           </div>

// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default TeacherDashboard;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import Layout from "../Layout";

// // const TeacherDashboard = () => {
// //   const [requests, setRequests] = useState([]);
// //   const navigate = useNavigate();

// //   // TODO: Replace with logged-in tutor's ID from auth state
// //   // const tutorid = 1;
// //   // const tutorid = localStorage.getItem("tutorid");
// //   // abb yaha per main apne teacher ki id ke bajai username bhejunga

// //   const tutorUsername = localStorage.getItem("tutorUsername");

// //   // Fetch student booking requests
// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost:4000/teacher/${tutorUsername}/requests`)
// //       .then((res) => setRequests(res.data))
// //       .catch((err) => console.error("Error fetching requests:", err));
// //   }, [tutorUsername]);

// //   // Approve or reject booking
// //   // const handleDecision = (id, status) => {
// //   //   axios
// //   //     .put(`http://localhost:4000/bookings/${id}`, { status })
// //   //     .then(() => {
// //   //       setRequests((prev) => prev.filter((r) => r.id !== id));
// //   //     })
// //   //     .catch((err) => console.error("Error updating booking:", err));
// //   // };


// //   const handleDecision = (id, decision) => {
// //   axios
// //     .post(`http://localhost:4000/teacher/requests/${id}/decision`, { decision })
// //     .then(() => {
// //       setRequests((prev) => prev.filter((r) => r.id !== id));
// //     })
// //     .catch((err) => console.error("Error updating booking:", err));
// // };


// //   return (
// //     <>
// //       <Layout />
// //       <div
// //         style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }} >
// //         <div className="container mt-4">
// //           {/* 1st Section: Student Requests */}
// //           <div className="mb-4">
// //             <h4 className="mb-3 text-primary">Student Requests</h4>
// //             <div className="card shadow-sm border-info">
// //               <div className="card-body">
// //                 {requests.length === 0 ? (
// //                   <span className="text-muted">No pending requests</span>
// //                 ) : (
// //                   <table className="table table-striped">
// //                     <thead>
// //                       <tr>
// //                         <th>Student</th>
// //                         <th>Start</th>
// //                         <th>End</th>
// //                         <th>Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {requests.map((r) => (
// //                         <tr key={r.id}>
// //                           <td>{r.student_name}</td>
// //                           <td>{new Date(r.start).toLocaleString()}</td>
// //                           <td>{new Date(r.end).toLocaleString()}</td>
// //                           <td>
// //                             <button
// //                               className="btn btn-success btn-sm me-2"
// //                               onClick={() => handleDecision(r.id, "accepted")}
// //                             >
// //                               Accept
// //                             </button>
// //                             <button
// //                               className="btn btn-danger btn-sm"
// //                               onClick={() => handleDecision(r.id, "rejected")}
// //                             >
// //                               Reject
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* 2nd Section: New */}
// //           <div className="mb-4">
// //             <h4 className="mb-3 text-success">New</h4>
// //             <div
// //               className="card text-center shadow-sm border-success"
// //               style={{ cursor: "pointer", height: "150px" }}
// //               onClick={() => navigate("/createcourse")}
// //             >
// //               <div className="card-body d-flex flex-column justify-content-center align-items-center">
// //                 <h5 className="card-title text-success mb-2">
// //                   + Create New Course
// //                 </h5>
// //                 <p className="text-muted mb-0">
// //                   Click to start adding a new course
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* 3rd Section: Your Courses */}
// //           <div>
// //             <h4 className="mb-3 text-warning">Your Courses</h4>
// //             <div className="card shadow-sm border-warning">
// //               <div
// //                 className="card-body d-flex justify-content-center align-items-center text-muted"
// //                 style={{ height: "150px" }}
// //               >
// //                 <span>Coming Soon...</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default TeacherDashboard;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Layout from "../Layout";

// const TeacherDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const navigate = useNavigate();

//   // Using tutorUsername from localStorage (make sure you set this on login)
//   const tutorUsername = localStorage.getItem("tutorUsername");

//   // Fetch student booking requests whenever tutorUsername changes
//   useEffect(() => {
//     if (!tutorUsername) return; // Prevent calls if username missing

//     axios
//       .get(`http://localhost:4000/teacher/${tutorUsername}/requests`)
//       .then((res) => setRequests(res.data))
//       .catch((err) => console.error("Error fetching requests:", err));
//   }, [tutorUsername]);

//   // Accept or reject booking request
//   const handleDecision = (id, decision) => {
//     axios
//       .post(`http://localhost:4000/teacher/requests/${id}/decision`, { decision })
//       .then(() => {
//         // Remove request from list after decision
//         setRequests((prev) => prev.filter((r) => r.id !== id));
//       })
//       .catch((err) => console.error("Error updating booking:", err));
//   };

//   return (
//     <>
//       <Layout />
//       <div style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }}>
//         <div className="container mt-4">
//           {/* 1st Section: Student Requests */}
//           <div className="mb-4">
//             <h4 className="mb-3 text-primary">Student Requests</h4>
//             <div className="card shadow-sm border-info">
//               <div className="card-body">
//                 {requests.length === 0 ? (
//                   <span className="text-muted">No pending requests</span>
//                 ) : (
//                   <table className="table table-striped">
//                     <thead>
//                       <tr>
//                         <th>Student</th>
//                         <th>Start</th>
//                         <th>End</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {requests.map((r) => (
//                         <tr key={r.id}>
//                           <td>{r.student_name}</td>
//                           <td>{new Date(r.start).toLocaleString()}</td>
//                           <td>{new Date(r.end).toLocaleString()}</td>
//                           <td>
//                             <button
//                               className="btn btn-success btn-sm me-2"
//                               onClick={() => handleDecision(r.id, "accepted")}
//                             >
//                               Accept
//                             </button>
//                             <button
//                               className="btn btn-danger btn-sm"
//                               onClick={() => handleDecision(r.id, "rejected")}
//                             >
//                               Reject
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* 2nd Section: New */}
//           <div className="mb-4">
//             <h4 className="mb-3 text-success">New</h4>
//             <div
//               className="card text-center shadow-sm border-success"
//               style={{ cursor: "pointer", height: "150px" }}
//               onClick={() => navigate("/createcourse")}
//             >
//               <div className="card-body d-flex flex-column justify-content-center align-items-center">
//                 <h5 className="card-title text-success mb-2">+ Create New Course</h5>
//                 <p className="text-muted mb-0">Click to start adding a new course</p>
//               </div>
//             </div>
//           </div>

//           {/* 3rd Section: Your Courses */}
//           <div>
//             <h4 className="mb-3 text-warning">Your Courses</h4>
//             <div className="card shadow-sm border-warning">
//               <div
//                 className="card-body d-flex justify-content-center align-items-center text-muted"
//                 style={{ height: "150px" }}
//               >
//                 <span>Coming Soon...</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TeacherDashboard;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Navbar } from "react-bootstrap";
// import Titlewala from "./Titlewala";

// const TeacherDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [currentBookingId, setCurrentBookingId] = useState(null);
//   const [acceptMessage, setAcceptMessage] = useState("");
//   const navigate = useNavigate();

//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   useEffect(() => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/teacher/${tutorUsername}/requests`)
//       .then((res) => setRequests(res.data))
//       .catch((err) => console.error("Error fetching requests:", err));
//   }, [tutorUsername]);

//   const handleReject = (id) => {
//     if (window.confirm("Bhai sure hai request reject karni hai?")) {
//       axios
//         .post(`http://localhost:4000/teacher/requests/${id}/decision`, { decision: "rejected" })
//         .then(() => setRequests((prev) => prev.filter((r) => r.id !== id)))
//         .catch((err) => console.error("Error updating booking:", err));
//     }
//   };

//   const handleOpenAcceptModal = (id) => {
//     setCurrentBookingId(id);
//     setAcceptMessage("");
//     setShowAcceptModal(true);
//   };

//   const handleAcceptSubmit = () => {
//     if (!acceptMessage.trim()) {
//       alert("Please enter a message or link to send.");
//       return;
//     }

//     axios
//       .post(`http://localhost:4000/teacher/requests/${currentBookingId}/decision`, {
//         decision: "accepted",
//         message: acceptMessage,
//       })
//       .then(() => {
//         setRequests((prev) => prev.filter((r) => r.id !== currentBookingId));
//         setShowAcceptModal(false);
//       })
//       .catch((err) => console.error("Error updating booking:", err));
//   };

//   return (
//     <>
//       <Titlewala/>
      
//       <div style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }}>
//         <div className="container mt-4">
//           <div className="mb-4">
//             <h4 className="mb-3 text-primary">Student Requests</h4>
//             <div className="card shadow-sm border-info">
//               <div className="card-body">
//                 {requests.length === 0 ? (
//                   <span className="text-muted">No pending requests</span>
//                 ) : (
//                   <table className="table table-striped">
//                     <thead>
//                       <tr>
//                         <th>Student</th>
//                         <th>Start</th>
//                         <th>End</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {requests.map((r) => (
//                         <tr key={r.id}>
//                           <td>{r.student_name}</td>
//                           <td>{new Date(r.start).toLocaleString()}</td>
//                           <td>{new Date(r.end).toLocaleString()}</td>
//                           <td>
//                             <button
//                               className="btn btn-success btn-sm me-2"
//                               onClick={() => handleOpenAcceptModal(r.id)}
//                             >
//                               Accept
//                             </button>
//                             <button
//                               className="btn btn-danger btn-sm"
//                               onClick={() => handleReject(r.id)}
//                             >
//                               Reject
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Modal for Accept message */}
//           {showAcceptModal && (
//             <div
//               className="modal"
//               style={{
//                 display: "block",
//                 backgroundColor: "rgba(0,0,0,0.5)",
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 zIndex: 1050,
//               }}
//             >
//               <div
//                 className="modal-dialog"
//                 style={{ maxWidth: "500px", margin: "100px auto" }}
//               >
//                 <div className="modal-content p-3">
//                   <h5>Are you sure you want to accept?</h5>
//                   <textarea
//                     className="form-control mb-3"
//                     rows={3}
//                     placeholder="Enter message or video call link for student..."
//                     value={acceptMessage}
//                     onChange={(e) => setAcceptMessage(e.target.value)}
//                   />
//                   <div className="d-flex justify-content-end">
//                     <button
//                       className="btn btn-secondary me-2"
//                       onClick={() => setShowAcceptModal(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button className="btn btn-primary" onClick={handleAcceptSubmit}>
//                       Confirm Accept
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TeacherDashboard;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button, Table, Card, Container, Row, Col, Form } from "react-bootstrap";
// import Titlewala from "./Titlewala";

// const TeacherDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [currentBookingId, setCurrentBookingId] = useState(null);
//   const [acceptMessage, setAcceptMessage] = useState("");
//   const navigate = useNavigate();

//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   useEffect(() => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/teacher/${tutorUsername}/requests`)
//       .then((res) => setRequests(res.data))
//       .catch((err) => console.error("Error fetching requests:", err));
//   }, [tutorUsername]);

//   const handleReject = (id) => {
//     if (window.confirm("Are you sure you want to reject this request?")) {
//       axios
//         .post(`http://localhost:4000/teacher/requests/${id}/decision`, { decision: "rejected" })
//         .then(() => setRequests((prev) => prev.filter((r) => r.id !== id)))
//         .catch((err) => console.error("Error updating booking:", err));
//     }
//   };

//   const handleOpenAcceptModal = (id) => {
//     setCurrentBookingId(id);
//     setAcceptMessage("");
//     setShowAcceptModal(true);
//   };

//   const handleAcceptSubmit = () => {
//     if (!acceptMessage.trim()) {
//       alert("Please enter a message or link to send.");
//       return;
//     }

//     axios
//       .post(`http://localhost:4000/teacher/requests/${currentBookingId}/decision`, {
//         decision: "accepted",
//         message: acceptMessage,
//       })
//       .then(() => {
//         setRequests((prev) => prev.filter((r) => r.id !== currentBookingId));
//         setShowAcceptModal(false);
//       })
//       .catch((err) => console.error("Error updating booking:", err));
//   };

//   return (
//     <>
//       <Titlewala />

//       <div
//         style={{
//           background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
//           minHeight: "100vh",
//           padding: "40px 20px",
//         }}
//       >
//         <Container>
//           <Row className="mb-5">
//             <Col>
//               <h2 className="text-primary fw-bold mb-4 text-center">
//                 📚 Student Requests
//               </h2>

//               <Card className="shadow-sm rounded-4 border-0">
//                 <Card.Body>
//                   {requests.length === 0 ? (
//                     <p className="text-center text-muted fs-5">No pending requests</p>
//                   ) : (
//                     <div className="table-responsive">
//                       <Table hover bordered className="align-middle mb-0 bg-white">
//                         <thead className="table-light">
//                           <tr>
//                             <th className="text-center">Student</th>
//                             <th className="text-center">Start</th>
//                             <th className="text-center">End</th>
//                             <th className="text-center">Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {requests.map((r) => (
//                             <tr key={r.id}>
//                               <td className="text-center fw-semibold">{r.student_name}</td>
//                               <td className="text-center">
//                                 {new Date(r.start).toLocaleString()}
//                               </td>
//                               <td className="text-center">
//                                 {new Date(r.end).toLocaleString()}
//                               </td>
//                               <td className="text-center">
//                                 <Button
//                                   variant="success"
//                                   size="sm"
//                                   className="me-2"
//                                   onClick={() => handleOpenAcceptModal(r.id)}
//                                 >
//                                   Accept
//                                 </Button>
//                                 <Button
//                                   variant="danger"
//                                   size="sm"
//                                   onClick={() => handleReject(r.id)}
//                                 >
//                                   Reject
//                                 </Button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                     </div>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>

//           {/* Back to Dashboard Button */}
//           <div className="text-center mb-5">
//             <Button
//               variant="outline-primary"
//               className="px-5 py-3 fw-bold shadow-sm rounded-pill"
//               onClick={() => navigate("/dashboard")}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = "#0d6efd";
//                 e.currentTarget.style.color = "#fff";
//                 e.currentTarget.style.transform = "scale(1.05)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = "transparent";
//                 e.currentTarget.style.color = "#0d6efd";
//                 e.currentTarget.style.transform = "scale(1)";
//               }}
//             >
//               Back to Dashboard
//             </Button>
//           </div>

//           {/* Accept Modal */}
//           {showAcceptModal && (
//             <div
//               className="modal"
//               style={{
//                 display: "block",
//                 backgroundColor: "rgba(0,0,0,0.5)",
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 zIndex: 1050,
//               }}
//             >
//               <div className="modal-dialog" style={{ maxWidth: "500px", margin: "100px auto" }}>
//                 <div className="modal-content p-4 rounded-4 shadow">
//                   <h5 className="fw-bold mb-3">Accept Request</h5>
//                   <Form.Control
//                     as="textarea"
//                     rows={4}
//                     placeholder="Enter message or video call link for student..."
//                     value={acceptMessage}
//                     onChange={(e) => setAcceptMessage(e.target.value)}
//                     className="mb-3"
//                   />
//                   <div className="d-flex justify-content-end">
//                     <Button
//                       variant="secondary"
//                       className="me-2"
//                       onClick={() => setShowAcceptModal(false)}
//                     >
//                       Cancel
//                     </Button>
//                     <Button variant="primary" onClick={handleAcceptSubmit}>
//                       Confirm Accept
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Container>
//       </div>
//     </>
//   );
// };

// export default TeacherDashboard;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button, Table, Card, Container, Row, Col, Form } from "react-bootstrap";
// import Titlewala from "./Titlewala";

// const TeacherDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [teacherCourses, setTeacherCourses] = useState([]);
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [currentBookingId, setCurrentBookingId] = useState(null);
//   const [acceptMessage, setAcceptMessage] = useState("");
//   const navigate = useNavigate();

//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   // Fetch student requests
//   useEffect(() => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/teacher/${tutorUsername}/requests`)
//       .then((res) => setRequests(res.data))
//       .catch((err) => console.error("Error fetching requests:", err));
//   }, [tutorUsername]);

//   // Fetch courses created by teacher
//   useEffect(() => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/teacher/${tutorUsername}/courses`)
//       .then((res) => setTeacherCourses(res.data))
//       .catch((err) => console.error("Error fetching teacher courses:", err));
//   }, [tutorUsername]);

//   const handleReject = (id) => {
//     if (window.confirm("Are you sure you want to reject this request?")) {
//       axios
//         .post(`http://localhost:4000/teacher/requests/${id}/decision`, { decision: "rejected" })
//         .then(() => setRequests((prev) => prev.filter((r) => r.id !== id)))
//         .catch((err) => console.error("Error updating booking:", err));
//     }
//   };

//   const handleOpenAcceptModal = (id) => {
//     setCurrentBookingId(id);
//     setAcceptMessage("");
//     setShowAcceptModal(true);
//   };

//   const handleAcceptSubmit = () => {
//     if (!acceptMessage.trim()) {
//       alert("Please enter a message or link to send.");
//       return;
//     }

//     axios
//       .post(`http://localhost:4000/teacher/requests/${currentBookingId}/decision`, {
//         decision: "accepted",
//         message: acceptMessage,
//       })
//       .then(() => {
//         setRequests((prev) => prev.filter((r) => r.id !== currentBookingId));
//         setShowAcceptModal(false);
//       })
//       .catch((err) => console.error("Error updating booking:", err));
//   };

//   return (
//     <>
//       <Titlewala />

//       <div
//         style={{
//           background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
//           minHeight: "100vh",
//           padding: "40px 20px",
//         }}
//       >
//         <Container>
//           {/* Student Requests Section */}
//           <Row className="mb-5">
//             <Col>
//               <h2 className="text-primary fw-bold mb-4 text-center">
//                 📚 Student Requests
//               </h2>

//               <Card className="shadow-sm rounded-4 border-0">
//                 <Card.Body>
//                   {requests.length === 0 ? (
//                     <p className="text-center text-muted fs-5">No pending requests</p>
//                   ) : (
//                     <div className="table-responsive">
//                       <Table hover bordered className="align-middle mb-0 bg-white">
//                         <thead className="table-light">
//                           <tr>
//                             <th className="text-center">Student</th>
//                             <th className="text-center">Start</th>
//                             <th className="text-center">End</th>
//                             <th className="text-center">Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {requests.map((r) => (
//                             <tr key={r.id}>
//                               <td className="text-center fw-semibold">{r.student_name}</td>
//                               <td className="text-center">
//                                 {new Date(r.start).toLocaleString()}
//                               </td>
//                               <td className="text-center">
//                                 {new Date(r.end).toLocaleString()}
//                               </td>
//                               <td className="text-center">
//                                 <Button
//                                   variant="success"
//                                   size="sm"
//                                   className="me-2"
//                                   onClick={() => handleOpenAcceptModal(r.id)}
//                                 >
//                                   Accept
//                                 </Button>
//                                 <Button
//                                   variant="danger"
//                                   size="sm"
//                                   onClick={() => handleReject(r.id)}
//                                 >
//                                   Reject
//                                 </Button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                     </div>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>

//           {/* Teacher Courses Section */}
//           <Row className="mb-5">
//             <Col>
//               <h2 className="text-primary fw-bold mb-4 text-center">
//                 🎓 Your Created Courses
//               </h2>

//               <Row xs={1} sm={2} md={3} lg={3} className="g-4">
//                 {teacherCourses.length === 0 ? (
//                   <p className="text-center text-muted fs-5">You have not created any courses yet.</p>
//                 ) : (
//                   teacherCourses.map((course, idx) => (
//                     <Col key={idx} className="animate__animated animate__fadeInUp">
//                       <Card className="h-100 shadow-sm rounded-4 border-0">
//                         <Card.Body>
//                           <Card.Title className="fw-bold">{course.title}</Card.Title>
//                           <Card.Text className="text-muted mb-2">
//                             <strong>Category:</strong>{" "}
//                             {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
//                           </Card.Text>
//                           <Card.Text>{course.description}</Card.Text>
//                         </Card.Body>
//                       </Card>
//                     </Col>
//                   ))
//                 )}
//               </Row>
//             </Col>
//           </Row>

//           {/* Accept Modal */}
//           {showAcceptModal && (
//             <div
//               className="modal"
//               style={{
//                 display: "block",
//                 backgroundColor: "rgba(0,0,0,0.5)",
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 zIndex: 1050,
//               }}
//             >
//               <div className="modal-dialog" style={{ maxWidth: "500px", margin: "100px auto" }}>
//                 <div className="modal-content p-4 rounded-4 shadow">
//                   <h5 className="fw-bold mb-3">Accept Request</h5>
//                   <Form.Control
//                     as="textarea"
//                     rows={4}
//                     placeholder="Enter message or video call link for student..."
//                     value={acceptMessage}
//                     onChange={(e) => setAcceptMessage(e.target.value)}
//                     className="mb-3"
//                   />
//                   <div className="d-flex justify-content-end">
//                     <Button
//                       variant="secondary"
//                       className="me-2"
//                       onClick={() => setShowAcceptModal(false)}
//                     >
//                       Cancel
//                     </Button>
//                     <Button variant="primary" onClick={handleAcceptSubmit}>
//                       Confirm Accept
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Container>
//       </div>
//     </>
//   );
// };

// export default TeacherDashboard;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import Titlewala from "./Titlewala";

// const TeacherDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [currentBookingId, setCurrentBookingId] = useState(null);
//   const [acceptMessage, setAcceptMessage] = useState("");

//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   // Fetch pending requests
//   useEffect(() => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/teacher/${tutorUsername}/requests`)
//       .then((res) => setRequests(res.data))
//       .catch((err) => console.error("Error fetching requests:", err));
//   }, [tutorUsername]);

//   // Fetch courses created by teacher
//   useEffect(() => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/api/courses/by-teacher/${tutorUsername}`)
//       .then((res) => setCourses(res.data))
//       .catch((err) => console.error("Error fetching teacher courses:", err));
//   }, [tutorUsername]);

//   const handleReject = (id) => {
//     if (window.confirm("Bhai sure hai request reject karni hai?")) {
//       axios
//         .post(`http://localhost:4000/teacher/requests/${id}/decision`, { decision: "rejected" })
//         .then(() => setRequests((prev) => prev.filter((r) => r.id !== id)))
//         .catch((err) => console.error("Error updating booking:", err));
//     }
//   };

//   const handleOpenAcceptModal = (id) => {
//     setCurrentBookingId(id);
//     setAcceptMessage("");
//     setShowAcceptModal(true);
//   };

//   const handleAcceptSubmit = () => {
//     if (!acceptMessage.trim()) {
//       alert("Please enter a message or link to send.");
//       return;
//     }

//     axios
//       .post(`http://localhost:4000/teacher/requests/${currentBookingId}/decision`, {
//         decision: "accepted",
//         message: acceptMessage,
//       })
//       .then(() => {
//         setRequests((prev) => prev.filter((r) => r.id !== currentBookingId));
//         setShowAcceptModal(false);
//       })
//       .catch((err) => console.error("Error updating booking:", err));
//   };

//   return (
//     <>
//       {/* <Titlewala /> */}

//       <div style={{ background: "linear-gradient(to right, #f8f9fa, #e9ecef)", minHeight: "100vh", padding: "20px" }}>
//         <div className="container mt-4">
//           {/* Student Requests Section */}
//           <div className="mb-5">
//             <h4 className="mb-3 text-primary">Student Requests</h4>
//             <div className="card shadow-sm border-info">
//               <div className="card-body">
//                 {requests.length === 0 ? (
//                   <span className="text-muted">No pending requests</span>
//                 ) : (
//                   <table className="table table-striped">
//                     <thead>
//                       <tr>
//                         <th>Student</th>
//                         <th>Start</th>
//                         <th>End</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {requests.map((r) => (
//                         <tr key={r.id}>
//                           <td>{r.student_name}</td>
//                           <td>{new Date(r.start).toLocaleString()}</td>
//                           <td>{new Date(r.end).toLocaleString()}</td>
//                           <td>
//                             <button
//                               className="btn btn-success btn-sm me-2"
//                               onClick={() => handleOpenAcceptModal(r.id)}
//                             >
//                               Accept
//                             </button>
//                             <button
//                               className="btn btn-danger btn-sm"
//                               onClick={() => handleReject(r.id)}
//                             >
//                               Reject
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Courses Created by Teacher */}
//           <div className="mb-5">
//             <h4 className="mb-3 text-primary">My Courses</h4>
//             <div className="row">
//               {courses.length === 0 ? (
//                 <span className="text-muted">You haven't created any courses yet.</span>
//               ) : (
//                 courses.map((course) => (
//                   <div className="col-md-4 mb-4" key={course.id}>
//                     <div className="card shadow-sm h-100">
//                       {course.thumbnail && (
//                         <img
//                           src={`http://localhost:4000/uploads/${course.thumbnail}`}
//                           className="card-img-top"
//                           alt={course.title}
//                           style={{ height: "180px", objectFit: "cover" }}
//                         />
//                       )}
//                       <div className="card-body d-flex flex-column">
//                         <h5 className="card-title">{course.title}</h5>
//                         <p className="card-text text-truncate">{course.description}</p>
//                         <p className="mt-auto mb-1">
//                           <strong>Category:</strong> {course.category}
//                         </p>
//                         <p className="mb-1">
//                           <strong>Level:</strong> {course.level} | <strong>Duration:</strong> {course.duration} hrs
//                         </p>
//                         <p className="mb-1">
//                           <strong>Price:</strong> ${course.price}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Modal for Accept message */}
//           {showAcceptModal && (
//             <div
//               className="modal"
//               style={{
//                 display: "block",
//                 backgroundColor: "rgba(0,0,0,0.5)",
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 zIndex: 1050,
//               }}
//             >
//               <div
//                 className="modal-dialog"
//                 style={{ maxWidth: "500px", margin: "100px auto" }}
//               >
//                 <div className="modal-content p-3">
//                   <h5>Are you sure you want to accept?</h5>
//                   <textarea
//                     className="form-control mb-3"
//                     rows={3}
//                     placeholder="Enter message or video call link for student..."
//                     value={acceptMessage}
//                     onChange={(e) => setAcceptMessage(e.target.value)}
//                   />
//                   <div className="d-flex justify-content-end">
//                     <button
//                       className="btn btn-secondary me-2"
//                       onClick={() => setShowAcceptModal(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button className="btn btn-primary" onClick={handleAcceptSubmit}>
//                       Confirm Accept
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </>
//   );
// };

// export default TeacherDashboard;
























// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TeacherDashboard = () => {
//   const [calendarRequests, setCalendarRequests] = useState([]); // Old feature
//   const [liveClassRequests, setLiveClassRequests] = useState([]); // New feature
//   const [courses, setCourses] = useState([]);
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [currentRequest, setCurrentRequest] = useState(null);
//   const [acceptMessage, setAcceptMessage] = useState("");

//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   // ---------------- Fetch old calendar requests ----------------
//   const fetchCalendarRequests = () => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/teacher/${tutorUsername}/requests`)
//       .then((res) => setCalendarRequests(res.data))
//       .catch((err) => console.error("Error fetching calendar requests:", err));
//   };

//   useEffect(() => {
//     fetchCalendarRequests();
//   }, [tutorUsername]);

//   // ---------------- Fetch new live class requests ----------------
//   const fetchLiveClassRequests = () => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/api/liveclass/requests/${tutorUsername}`)
//       .then((res) => setLiveClassRequests(res.data.requests))
//       .catch((err) => console.error("Error fetching live class requests:", err));
//   };

//   useEffect(() => {
//     fetchLiveClassRequests();
//   }, [tutorUsername]);

//   // ---------------- Fetch courses ----------------
//   const fetchCourses = () => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/api/customcourses/${tutorUsername}`)
//       .then((res) => setCourses(res.data.courses))
//       .catch((err) => console.error("Error fetching courses:", err));
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, [tutorUsername]);

//   // ---------------- Handle reject ----------------
//   const handleReject = (id, type) => {
//     if (!window.confirm("Are you sure you want to reject this request?")) return;

//     const url =
//       type === "calendar"
//         ? `http://localhost:4000/teacher/requests/${id}/decision`
//         : `http://localhost:4000/api/liveclass/requests/${id}`;

//     axios
//       .put(url, { status: "rejected" })
//       .then(() => {
//         if (type === "calendar") {
//           setCalendarRequests((prev) => prev.filter((r) => r.id !== id));
//         } else {
//           setLiveClassRequests((prev) => prev.filter((r) => r.id !== id));
//         }
//       })
//       .catch((err) => console.error("Error rejecting request:", err));
//   };

//   // ---------------- Open accept modal ----------------
//   const handleOpenAcceptModal = (request, type) => {
//     setCurrentRequest({ ...request, type });
//     setAcceptMessage("");
//     setShowAcceptModal(true);
//   };

//   // ---------------- Accept request ----------------
//   const handleAcceptSubmit = () => {
//     if (!acceptMessage.trim()) {
//       alert("Please enter a message or link for the student.");
//       return;
//     }

//     const { id, type } = currentRequest;

//     const url =
//       type === "calendar"
//         ? `http://localhost:4000/teacher/requests/${id}/decision`
//         : `http://localhost:4000/api/liveclass/requests/${id}`;

//     const payload =
//       type === "calendar"
//         ? { decision: "accepted", message: acceptMessage }
//         : { status: "accepted", message: acceptMessage };

//     axios
//       .put(url, payload)
//       .then(() => {
//         if (type === "calendar") {
//           setCalendarRequests((prev) => prev.filter((r) => r.id !== id));
//         } else {
//           setLiveClassRequests((prev) => prev.filter((r) => r.id !== id));
//         }
//         setShowAcceptModal(false);
//       })
//       .catch((err) => console.error("Error accepting request:", err));
//   };

//   return (
//     <div style={{ background: "linear-gradient(to right, #f8f9fa, #e9ecef)", minHeight: "100vh", padding: "20px" }}>
//       <div className="container mt-4">

//         {/* ---------------- Old Calendar Requests ---------------- */}
//         <div className="mb-5">
//           <h4 className="mb-3 text-primary">Student Calendar Requests</h4>
//           <div className="card shadow-sm border-info">
//             <div className="card-body">
//               {calendarRequests.length === 0 ? (
//                 <span className="text-muted">No pending calendar requests</span>
//               ) : (
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>Student</th>
//                       <th>Start</th>
//                       <th>End</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {calendarRequests.map((r) => (
//                       <tr key={r.id}>
//                         <td>{r.student_name}</td>
//                         <td>{new Date(r.start).toLocaleString()}</td>
//                         <td>{new Date(r.end).toLocaleString()}</td>
//                         <td>
//                           <button
//                             className="btn btn-success btn-sm me-2"
//                             onClick={() => handleOpenAcceptModal(r, "calendar")}
//                           >
//                             Accept
//                           </button>
//                           <button
//                             className="btn btn-danger btn-sm"
//                             onClick={() => handleReject(r.id, "calendar")}
//                           >
//                             Reject
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ---------------- New Live Class Requests ---------------- */}
//         <div className="mb-5">
//           <h4 className="mb-3 text-primary">Live Class Requests</h4>
//           <div className="card shadow-sm border-info">
//             <div className="card-body">
//               {liveClassRequests.length === 0 ? (
//                 <span className="text-muted">No pending live class requests</span>
//               ) : (
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>Student</th>
//                       <th>Course</th>
//                       <th>Message</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {liveClassRequests.map((r) => (
//                       <tr key={r.id}>
//                         <td>{r.studentUsername}</td>
//                         <td>{r.courseName || "N/A"}</td>
//                         <td>{r.message || "No message"}</td>
//                         <td>
//                           <button
//                             className="btn btn-success btn-sm me-2"
//                             onClick={() => handleOpenAcceptModal(r, "live")}
//                           >
//                             Accept
//                           </button>
//                           <button
//                             className="btn btn-danger btn-sm"
//                             onClick={() => handleReject(r.id, "live")}
//                           >
//                             Reject
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ---------------- Courses Section ---------------- */}
//         <div className="mb-5">
//           <h4 className="mb-3 text-primary">My Courses</h4>
//           <div className="row">
//             {courses.length === 0 ? (
//               <span className="text-muted">You haven't created any courses yet.</span>
//             ) : (
//               courses.map((course) => (
//                 <div className="col-md-4 mb-4" key={course.id}>
//                   <div className="card shadow-sm h-100">
//                     {course.video && (
//                       <video src={`http://localhost:4000${course.video}`} controls style={{ height: "180px", objectFit: "cover" }} />
//                     )}
//                     <div className="card-body d-flex flex-column">
//                       <h5 className="card-title">{course.cname}</h5>
//                       <p className="card-text text-truncate">{course.bdesc || "No description provided"}</p>
//                       <button className="btn btn-primary mt-auto" disabled>
//                         Live Class
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* ---------------- Accept Modal ---------------- */}
//         {showAcceptModal && (
//           <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1050 }}>
//             <div className="modal-dialog" style={{ maxWidth: "500px", margin: "100px auto" }}>
//               <div className="modal-content p-3">
//                 <h5>Send message or link to student</h5>
//                 <textarea
//                   className="form-control mb-3"
//                   rows={3}
//                   placeholder="Enter message or link..."
//                   value={acceptMessage}
//                   onChange={(e) => setAcceptMessage(e.target.value)}
//                 />
//                 <div className="d-flex justify-content-end">
//                   <button className="btn btn-secondary me-2" onClick={() => setShowAcceptModal(false)}>
//                     Cancel
//                   </button>
//                   <button className="btn btn-primary" onClick={handleAcceptSubmit}>
//                     Confirm Accept
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;

















































// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TeacherDashboard = () => {
//   const [calendarRequests, setCalendarRequests] = useState([]); // Old feature
//   const [liveClassRequests, setLiveClassRequests] = useState([]); // New feature
//   const [courses, setCourses] = useState([]);
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [currentRequest, setCurrentRequest] = useState(null);
//   const [acceptMessage, setAcceptMessage] = useState("");

//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   // ---------------- Fetch old calendar requests ----------------
//   const fetchCalendarRequests = () => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/teacher/${tutorUsername}/requests`)
//       .then((res) => setCalendarRequests(res.data || []))
//       .catch((err) => console.error("Error fetching calendar requests:", err));
//   };

//   useEffect(() => {
//     fetchCalendarRequests();
//   }, [tutorUsername]);

//   // ---------------- Fetch new live class requests ----------------
//   const fetchLiveClassRequests = () => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/api/liveclass/requests/${tutorUsername}`)
//       .then((res) => setLiveClassRequests(res.data.requests || []))
//       .catch((err) => console.error("Error fetching live class requests:", err));
//   };

//   useEffect(() => {
//     fetchLiveClassRequests();
//   }, [tutorUsername]);

//   // ---------------- Fetch courses ----------------
//   const fetchCourses = () => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/api/customcourses/${tutorUsername}`)
//       .then((res) => setCourses(res.data.courses || []))
//       .catch((err) => console.error("Error fetching courses:", err));
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, [tutorUsername]);

//   // ---------------- Handle reject ----------------
//   const handleReject = (id, type) => {
//     if (!window.confirm("Are you sure you want to reject this request?")) return;

//     const url =
//       type === "calendar"
//         ? `http://localhost:4000/teacher/requests/${id}/decision`
//         : `http://localhost:4000/api/liveclass/requests/${id}`;

//     const payload = type === "calendar" ? { decision: "rejected" } : { status: "rejected" };

//     axios
//       .put(url, payload)
//       .then(() => {
//         if (type === "calendar") {
//           setCalendarRequests((prev) => prev.filter((r) => r.id !== id));
//         } else {
//           setLiveClassRequests((prev) => prev.filter((r) => r.id !== id));
//         }
//       })
//       .catch((err) => console.error("Error rejecting request:", err));
//   };

//   // ---------------- Open accept modal ----------------
//   const handleOpenAcceptModal = (request, type) => {
//     setCurrentRequest({ ...request, type });
//     setAcceptMessage("");
//     setShowAcceptModal(true);
//   };

//   // ---------------- Accept request ----------------
//   const handleAcceptSubmit = () => {
//     if (!acceptMessage.trim()) {
//       alert("Please enter a message or link for the student.");
//       return;
//     }

//     if (!currentRequest) return;

//     const { id, type } = currentRequest;

//     const url =
//       type === "calendar"
//         ? `http://localhost:4000/teacher/requests/${id}/decision`
//         : `http://localhost:4000/api/liveclass/requests/${id}`;

//     const payload =
//       type === "calendar"
//         ? { decision: "accepted", message: acceptMessage }
//         : { status: "accepted", message: acceptMessage };

//     axios
//       .put(url, payload)
//       .then(() => {
//         if (type === "calendar") {
//           setCalendarRequests((prev) => prev.filter((r) => r.id !== id));
//         } else {
//           setLiveClassRequests((prev) => prev.filter((r) => r.id !== id));
//         }
//         setShowAcceptModal(false);
//         setCurrentRequest(null);
//       })
//       .catch((err) => console.error("Error accepting request:", err));
//   };

//   return (
//     <div style={{ background: "linear-gradient(to right, #f8f9fa, #e9ecef)", minHeight: "100vh", padding: "20px" }}>
//       <div className="container mt-4">

//         {/* ---------------- Old Calendar Requests ---------------- */}
//         <div className="mb-5">
//           <h4 className="mb-3 text-primary">Student Calendar Requests</h4>
//           <div className="card shadow-sm border-info">
//             <div className="card-body">
//               {calendarRequests.length === 0 ? (
//                 <span className="text-muted">No pending calendar requests</span>
//               ) : (
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>Student</th>
//                       <th>Start</th>
//                       <th>End</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {calendarRequests.map((r) => (
//                       <tr key={r.id}>
//                         <td>{r.student_name}</td>
//                         <td>{new Date(r.start).toLocaleString()}</td>
//                         <td>{new Date(r.end).toLocaleString()}</td>
//                         <td>
//                           <button
//                             className="btn btn-success btn-sm me-2"
//                             onClick={() => handleOpenAcceptModal(r, "calendar")}
//                           >
//                             Accept
//                           </button>
//                           <button
//                             className="btn btn-danger btn-sm"
//                             onClick={() => handleReject(r.id, "calendar")}
//                           >
//                             Reject
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ---------------- New Live Class Requests ---------------- */}
//         <div className="mb-5">
//           <h4 className="mb-3 text-primary">Live Class Requests</h4>
//           <div className="card shadow-sm border-info">
//             <div className="card-body">
//               {liveClassRequests.length === 0 ? (
//                 <span className="text-muted">No pending live class requests</span>
//               ) : (
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>Student</th>
//                       <th>Course</th>
//                       <th>Message</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {liveClassRequests.map((r) => (
//                       <tr key={r.id}>
//                         <td>{r.studentUsername}</td>
//                         <td>{r.courseName || r.course_id || "N/A"}</td>
//                         <td>{r.message || "No message"}</td>
//                         <td>
//                           <button
//                             className="btn btn-success btn-sm me-2"
//                             onClick={() => handleOpenAcceptModal(r, "live")}
//                           >
//                             Accept
//                           </button>
//                           <button
//                             className="btn btn-danger btn-sm"
//                             onClick={() => handleReject(r.id, "live")}
//                           >
//                             Reject
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ---------------- Courses Section ---------------- */}
//         <div className="mb-5">
//           <h4 className="mb-3 text-primary">My Courses</h4>
//           <div className="row">
//             {courses.length === 0 ? (
//               <span className="text-muted">You haven't created any courses yet.</span>
//             ) : (
//               courses.map((course) => (
//                 <div className="col-md-4 mb-4" key={course.id}>
//                   <div className="card shadow-sm h-100">
//                     {course.video && (
//                       <video src={`http://localhost:4000${course.video}`} controls style={{ height: "180px", objectFit: "cover" }} />
//                     )}
//                     <div className="card-body d-flex flex-column">
//                       <h5 className="card-title">{course.cname}</h5>
//                       <p className="card-text text-truncate">{course.bdesc || "No description provided"}</p>
//                       <button className="btn btn-primary mt-auto" disabled>
//                         Live Class
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* ---------------- Accept Modal ---------------- */}
//         {showAcceptModal && currentRequest && (
//           <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1050 }}>
//             <div className="modal-dialog" style={{ maxWidth: "500px", margin: "100px auto" }}>
//               <div className="modal-content p-3">
//                 <h5>Send message or link to student</h5>
//                 <textarea
//                   className="form-control mb-3"
//                   rows={3}
//                   placeholder="Enter message or link..."
//                   value={acceptMessage}
//                   onChange={(e) => setAcceptMessage(e.target.value)}
//                 />
//                 <div className="d-flex justify-content-end">
//                   <button className="btn btn-secondary me-2" onClick={() => setShowAcceptModal(false)}>
//                     Cancel
//                   </button>
//                   <button className="btn btn-primary" onClick={handleAcceptSubmit}>
//                     Confirm Accept
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;





import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherDashboard = () => {
  const [calendarRequests, setCalendarRequests] = useState([]);
  const [liveClassRequests, setLiveClassRequests] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [acceptMessage, setAcceptMessage] = useState("");

  const tutorUsername = sessionStorage.getItem("tutorUsername");

  // ---------------- Fetch old calendar requests ----------------
  const fetchCalendarRequests = () => {
    if (!tutorUsername) return;
    axios
      .get(`http://localhost:4000/teacher/${tutorUsername}/requests`)
      .then((res) => setCalendarRequests(res.data || []))
      .catch((err) => console.error("Error fetching calendar requests:", err));
  };

  useEffect(() => {
    fetchCalendarRequests();
  }, [tutorUsername]);

  // ---------------- Fetch new live class requests ----------------
  const fetchLiveClassRequests = () => {
    if (!tutorUsername) return;
    axios
      .get(`http://localhost:4000/api/liveclass/requests/${tutorUsername}`)
      .then((res) => setLiveClassRequests(res.data.requests || []))
      .catch((err) => console.error("Error fetching live class requests:", err));
  };

  useEffect(() => {
    fetchLiveClassRequests();
  }, [tutorUsername]);

  // ---------------- Fetch courses ----------------
  const fetchCourses = () => {
    if (!tutorUsername) return;
    axios
      .get(`http://localhost:4000/api/customcourses/${tutorUsername}`)
      .then((res) => setCourses(res.data.courses || []))
      .catch((err) => console.error("Error fetching courses:", err));
  };

  useEffect(() => {
    fetchCourses();
  }, [tutorUsername]);

  // ---------------- Handle reject ----------------
  const handleReject = (id, type) => {
    if (!window.confirm("Are you sure you want to reject this request?")) return;

    const url =
      type === "calendar"
        ? `http://localhost:4000/teacher/requests/${id}/decision`
        : `http://localhost:4000/api/liveclass/requests/${id}`;

    const payload = type === "calendar" ? { decision: "rejected" } : { status: "rejected" };

    const req =
      type === "calendar"
        ? axios.post(url, payload)
        : axios.put(url, payload);

    req
      .then(() => {
        if (type === "calendar") {
          fetchCalendarRequests();
        } else {
          fetchLiveClassRequests();
        }
      })
      .catch((err) => console.error("Error rejecting request:", err));
  };

  // ---------------- Open accept modal ----------------
  const handleOpenAcceptModal = (request, type) => {
    setCurrentRequest({ ...request, type });
    setAcceptMessage("");
    setShowAcceptModal(true);
  };

  // ---------------- Accept request ----------------
  const handleAcceptSubmit = () => {
    if (!acceptMessage.trim()) {
      alert("Please enter a message or link for the student.");
      return;
    }

    if (!currentRequest) return;

    const { id, type } = currentRequest;

    const url =
      type === "calendar"
        ? `http://localhost:4000/teacher/requests/${id}/decision`
        : `http://localhost:4000/api/liveclass/requests/${id}`;

    const payload =
      type === "calendar"
        ? { decision: "accepted", message: acceptMessage }
        : { status: "accepted", message: acceptMessage };

    const req =
      type === "calendar"
        ? axios.post(url, payload)
        : axios.put(url, payload);

    req
      .then(() => {
        if (type === "calendar") {
          fetchCalendarRequests();
        } else {
          fetchLiveClassRequests();
        }
        setShowAcceptModal(false);
        setCurrentRequest(null);
      })
      .catch((err) => console.error("Error accepting request:", err));
  };

  return (
    <div style={{ background: "linear-gradient(to right, #f8f9fa, #e9ecef)", minHeight: "100vh", padding: "20px" }}>
      <div className="container mt-4">

        {/* ---------------- Old Calendar Requests ---------------- */}
        <div className="mb-5">
          <h4 className="mb-3 text-primary">Student Calendar Requests</h4>
          <div className="card shadow-sm border-info">
            <div className="card-body">
              {calendarRequests.length === 0 ? (
                <span className="text-muted">No pending calendar requests</span>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calendarRequests.map((r) => (
                      <tr key={r.id}>
                        <td>{r.student_name}</td>
                        <td>{new Date(r.start).toLocaleString()}</td>
                        <td>{new Date(r.end).toLocaleString()}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleOpenAcceptModal(r, "calendar")}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleReject(r.id, "calendar")}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* ---------------- New Live Class Requests ---------------- */}
        <div className="mb-5">
          <h4 className="mb-3 text-primary">Live Class Requests</h4>
          <div className="card shadow-sm border-info">
            <div className="card-body">
              {liveClassRequests.length === 0 ? (
                <span className="text-muted">No pending live class requests</span>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveClassRequests.map((r) => (
                      <tr key={r.id}>
                        <td>{r.studentUsername}</td>
                        <td>{r.courseName || r.course_id || "N/A"}</td>
                        <td>{r.message || "No message"}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleOpenAcceptModal(r, "live")}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleReject(r.id, "live")}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* ---------------- Courses Section ---------------- */}
        <div className="mb-5">
          <h4 className="mb-3 text-primary">My Courses</h4>
          <div className="row">
            {courses.length === 0 ? (
              <span className="text-muted">You haven't created any courses yet.</span>
            ) : (
              courses.map((course) => (
                <div className="col-md-4 mb-4" key={course.id}>
                  <div className="card shadow-sm h-100">
                    {course.video && (
                      <video src={`http://localhost:4000${course.video}`} controls style={{ height: "180px", objectFit: "cover" }} />
                    )}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{course.cname}</h5>
                      <p className="card-text text-truncate">{course.bdesc || "No description provided"}</p>
                      <button className="btn btn-primary mt-auto" disabled>
                        Live Class
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ---------------- Accept Modal ---------------- */}
        {showAcceptModal && currentRequest && (
          <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1050 }}>
            <div className="modal-dialog" style={{ maxWidth: "500px", margin: "100px auto" }}>
              <div className="modal-content p-3">
                <h5>Send message or link to student</h5>
                <textarea
                  className="form-control mb-3"
                  rows={3}
                  placeholder="Enter message or link..."
                  value={acceptMessage}
                  onChange={(e) => setAcceptMessage(e.target.value)}
                />
                <div className="d-flex justify-content-end">
                  <button className="btn btn-secondary me-2" onClick={() => setShowAcceptModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleAcceptSubmit}>
                    Confirm Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TeacherDashboard;








































