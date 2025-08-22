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




import React, { useState, useEffect } from "react";
// import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import axios from "axios";
 import { socket } from "./socket"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const lang = ["English", "Hindi", "French", "Japanese", "Chinese", "Spanish"];

  const [bookings, setBookings] = useState([]);

  // Fetch student bookings
  useEffect(() => {



    const token = sessionStorage.getItem("token");

  if (!token) {
    navigate("/"); // redirect to frontpage if not logged in
    return;
  }
    const studentUsername = sessionStorage.getItem("studentUsername");
    if (!studentUsername) return;

    axios
      .get(`http://localhost:4000/student/bookings?username=${studentUsername}`,
        {
          headers: {
        Authorization: `Bearer ${token}`, // ✅ send JWT with request
      },
        }
      )
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);




 

useEffect(() => {
  const username = sessionStorage.getItem("studentUsername");
  if (username) socket.emit("student-online", username);
}, []);


  return (
    <>
      {/* <Layout /> */}
      <Container
        fluid
        className="py-5"
        style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}
      >
        {/* Section Title */}
        <h1
          className="text-center mb-5 fw-bold animate__animated animate__fadeInDown"
          style={{ color: "#0d6efd" }}
        >
          Choose Your Tutor Language
        </h1>

        {/* Languages Section */}
        <Row xs={1} sm={2} md={3} lg={3} className="g-4 mb-5 px-3">
          {lang.map((language, index) => (
            <Col
              key={language}
              className="animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card
                onClick={() => navigate(`/Tutorwale/${language.toLowerCase()}`)}
                className="h-100 text-center border-0 shadow-lg rounded-4"
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fdfdfd",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Body className="d-flex flex-column justify-content-center align-items-center py-5">
                  <Card.Title
                    className="fs-3 fw-bold"
                    style={{ color: "#0d6efd" }}
                  >
                    {language}
                  </Card.Title>
                  <p className="text-muted mt-2">
                    Learn {language} from expert tutors
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Explore More Courses Button */}
        <div className="d-flex align-items-center my-5">
          <div className="flex-grow-1 border-top"></div>
          <Button
            onClick={() => navigate("/newcourses")}
            variant="outline-primary"
            className="rounded-circle mx-3 px-4 py-4 fw-bold shadow-sm"
            style={{
              fontSize: "0.9rem",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0d6efd";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#0d6efd";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Explore More Courses
          </Button>
          <div className="flex-grow-1 border-top"></div>
        </div>

        {/* Divider */}
        <hr className="my-5" />

        {/* Bookings Section */}
        <h2
          className="text-center mb-4 fw-bold animate__animated animate__fadeIn"
          style={{ color: "#0d6efd" }}
        >
          📅 Your Bookings
        </h2>

        <div className="px-3 animate__animated animate__fadeInUp">
          {bookings.length === 0 ? (
            <p className="text-center text-muted">No bookings yet.</p>
          ) : (
            <div className="table-responsive shadow-sm rounded-4">
              <Table bordered hover className="align-middle mb-0 bg-white">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">Tutor</th>
                    <th className="text-center">Start</th>
                    <th className="text-center">End</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="text-center fw-semibold">
                        {b.tutorUsername}
                      </td>
                      <td className="text-center">
                        {new Date(b.start).toLocaleString()}
                      </td>
                      <td className="text-center">
                        {new Date(b.end).toLocaleString()}
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge rounded-pill px-3 py-2 ${
                            b.status === "Confirmed"
                              ? "bg-success"
                              : b.status === "Pending"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="text-center">
                        {b.message || <span className="text-muted">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
