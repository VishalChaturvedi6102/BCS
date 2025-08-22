

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
// import Layout from "./Layout";

// const Newcourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredCourses, setFilteredCourses] = useState([]);

//   useEffect(() => {
//     const tutorUsername = sessionStorage.getItem("tutorUsername");

//     if (!tutorUsername) {
//       console.warn("No tutor username found in sessionStorage");
//       // Optional: you can redirect to login or show a message
//       setCourses([]);
//       setFilteredCourses([]);
//       return;
//     }

//     axios
//       .get("http://localhost:4000/api/courses", {
//         params: { tutorUsername },
//       })
//       .then((res) => {
//         setCourses(res.data);
//         setFilteredCourses(res.data);
//       })
//       .catch((err) => console.error("Error fetching courses:", err));
//   }, []);

//   useEffect(() => {
//     const searchTerm = search.toLowerCase();

//     setFilteredCourses(
//       courses.filter((course) => {
//         const title = course.title || "";
//         const category = course.category || "";
//         const teacher = course.tutorUsername || "";

//         return (
//           title.toLowerCase().includes(searchTerm) ||
//           category.toLowerCase().includes(searchTerm) ||
//           teacher.toLowerCase().includes(searchTerm)
//         );
//       })
//     );
//   }, [search, courses]);

//   return (
//     <>
//       <Layout />
//       <Container className="my-5">
//         <h2 className="text-center mb-4">📚 Your Courses</h2>

//         {/* Search bar */}
//         <InputGroup className="mb-4">
//           <Form.Control
//             placeholder="Search by title, category, or teacher..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <Button variant="primary" onClick={() => setSearch("")}>
//             Clear
//           </Button>
//         </InputGroup>

//         {/* Courses list */}
//         <Row>
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map((course) => (
//               <Col md={4} sm={6} xs={12} key={course.id} className="mb-4">
//                 <Card className="h-100 shadow-sm">
//                   <Card.Img
//                     variant="top"
//                     src={course.thumbnail ? `http://localhost:4000/uploads/${course.thumbnail}` : "/default-thumbnail.jpg"}
//                     style={{ height: "180px", objectFit: "cover" }}
//                   />
//                   <Card.Body>
//                     <Card.Title>{course.title}</Card.Title>
//                     <Card.Text className="text-muted">{course.description}</Card.Text>
//                     <p>
//                       <strong>Category:</strong> {course.category}
//                     </p>
//                     <p>
//                       <strong>Level:</strong> {course.level}
//                     </p>
//                     <p>
//                       <strong>Duration:</strong> {course.duration}
//                     </p>
//                     <p>
//                       <strong>Price:</strong> ${course.price}
//                     </p>
//                     <p>
//                       <small className="text-muted">By {course.tutorUsername}</small>
//                     </p>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <p className="text-center text-muted">No courses found.</p>
//           )}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Newcourses;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Layout from "./Layout";

// const Newcourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const tutorUsername = sessionStorage.getItem("tutorUsername");

//     if (!tutorUsername) {
//       console.warn("No tutor username found in sessionStorage");
//       setCourses([]);
//       setFilteredCourses([]);
//       return;
//     }

//     axios
//       .get("http://localhost:4000/api/courses", { params: { tutorUsername } })
//       .then((res) => {
//         setCourses(res.data);
//         setFilteredCourses(res.data);
//       })
//       .catch((err) => console.error("Error fetching courses:", err));
//   }, []);

//   useEffect(() => {
//     const searchTerm = search.toLowerCase();

//     setFilteredCourses(
//       courses.filter((course) => {
//         const title = course.title || "";
//         const category = course.category || "";
//         const teacher = course.tutorUsername || "";

//         return (
//           title.toLowerCase().includes(searchTerm) ||
//           category.toLowerCase().includes(searchTerm) ||
//           teacher.toLowerCase().includes(searchTerm)
//         );
//       })
//     );
//   }, [search, courses]);

//   const handleCourseClick = (course) => {
//     // Store tutorUsername & subject in sessionStorage
//     sessionStorage.setItem("tutorUsername", course.tutorUsername);
//     sessionStorage.setItem("subjectName", course.title);

//     // Navigate to Booksession page
//     navigate(`/booksession/${course.tutorUsername}`);
//   };

//   return (
//     <>
//       <Layout />
//       <Container className="my-5">
//         <h2 className="text-center mb-4">📚 Your Courses</h2>

//         {/* Search bar */}
//         <InputGroup className="mb-4">
//           <Form.Control
//             placeholder="Search by title, category, or teacher..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <Button variant="primary" onClick={() => setSearch("")}>
//             Clear
//           </Button>
//         </InputGroup>

//         {/* Courses list */}
//         <Row>
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map((course) => (
//               <Col md={4} sm={6} xs={12} key={course.id} className="mb-4">
//                 <Card
//                   className="h-100 shadow-sm"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => handleCourseClick(course)}
//                 >
//                   <Card.Img
//                     variant="top"
//                     src={course.thumbnail ? `http://localhost:4000/uploads/${course.thumbnail}` : "/default-thumbnail.jpg"}
//                     style={{ height: "180px", objectFit: "cover" }}
//                   />
//                   <Card.Body>
//                     <Card.Title>{course.title}</Card.Title>
//                     <Card.Text className="text-muted">{course.description}</Card.Text>
//                     <p><strong>Category:</strong> {course.category}</p>
//                     <p><strong>Level:</strong> {course.level}</p>
//                     <p><strong>Duration:</strong> {course.duration}</p>
//                     <p><strong>Price:</strong> ${course.price}</p>
//                     <p><small className="text-muted">By {course.tutorUsername}</small></p>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <p className="text-center text-muted">No courses found.</p>
//           )}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Newcourses;










// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   InputGroup,
//   Button,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Layout from "./Layout";

// const Newcourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const tutorUsername = sessionStorage.getItem("tutorUsername");

//     if (!tutorUsername) {
//       console.warn("No tutor username found in sessionStorage");
//       setCourses([]);
//       setFilteredCourses([]);
//       return;
//     }

//     axios
//       .get("http://localhost:4000/api/courses", { params: { tutorUsername } })
//       .then((res) => {
//         setCourses(res.data);
//         setFilteredCourses(res.data);
//       })
//       .catch((err) => console.error("Error fetching courses:", err));
//   }, []);

//   useEffect(() => {
//     const searchTerm = search.toLowerCase();

//     setFilteredCourses(
//       courses.filter((course) => {
//         const title = course.title || "";
//         const category = course.category || "";
//         const teacher = course.tutorUsername || "";

//         return (
//           title.toLowerCase().includes(searchTerm) ||
//           category.toLowerCase().includes(searchTerm) ||
//           teacher.toLowerCase().includes(searchTerm)
//         );
//       })
//     );
//   }, [search, courses]);

//   const handleCourseClick = (course) => {
//     sessionStorage.setItem("tutorUsername", course.tutorUsername);
//     sessionStorage.setItem("subjectName", course.title);
//     navigate(`/booksession/${course.tutorUsername}`);
//   };

//   return (
//     <>
//       <Layout />
//       <Container className="py-5" fluid style={{ backgroundColor: "#ffffff" }}>
//         <h2
//           className="text-center mb-5 fw-bold animate__animated animate__fadeInDown"
//           style={{ color: "#0d6efd" }}
//         >
//           📚 Explore Courses
//         </h2>

//         {/* Search bar */}
//         <InputGroup className="mb-5 px-3">
//           <Form.Control
//             placeholder="Search by title, category, or teacher..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <Button variant="primary" onClick={() => setSearch("")}>
//             Clear
//           </Button>
//         </InputGroup>

//         {/* Courses grid with Dashboard-style cards */}
//         <Row xs={1} sm={2} md={3} lg={3} className="g-4 px-3">
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map((course, index) => (
//               <Col
//                 key={course.id}
//                 className="animate__animated animate__fadeInUp"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <Card
//                   onClick={() => handleCourseClick(course)}
//                   className="h-100 text-center border-0 shadow-lg rounded-4"
//                   style={{
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     backgroundColor: "#fdfdfd",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.transform = "scale(1.05)")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.transform = "scale(1)")
//                   }
//                 >
//                   {/* Thumbnail */}
//                   <Card.Img
//                     variant="top"
//                     src={
//                       course.thumbnail
//                         ? `http://localhost:4000/uploads/${course.thumbnail}`
//                         : "/default-thumbnail.jpg"
//                     }
//                     style={{
//                       height: "200px",
//                       objectFit: "cover",
//                       borderTopLeftRadius: "1rem",
//                       borderTopRightRadius: "1rem",
//                     }}
//                   />

//                   <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
//                     <Card.Title
//                       className="fs-4 fw-bold"
//                       style={{ color: "#0d6efd" }}
//                     >
//                       {course.title}
//                     </Card.Title>
//                     <p className="text-muted">{course.description}</p>
//                     <p className="mb-1">
//                       <strong>Category:</strong> {course.category}
//                     </p>
//                     <p className="mb-1">
//                       <strong>Level:</strong> {course.level}
//                     </p>
//                     <p className="mb-1">
//                       <strong>Duration:</strong> {course.duration}
//                     </p>
//                     <p className="fw-bold text-primary mb-2">
//                       💰 ${course.price}
//                     </p>
//                     <p className="text-muted mb-0">
//                       👨‍🏫 {course.tutorUsername}
//                     </p>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <p className="text-center text-muted">No courses found.</p>
//           )}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Newcourses;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import Layout from "./Layout";

// const Newcourses = () => {
//   const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:4000/courses/subjects") // <-- API for unique subjects
//       .then((res) => {
//         setSubjects(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleClick = (subject) => {
//     window.location.href = `/subject/${subject}`; // redirect to subject page
//   };

//   return (
//     <Layout>
//       <Container className="py-5">
//         <h2 className="text-center mb-4">Explore Courses</h2>
//         <Row>
//           {subjects.map((subj, index) => (
//             <Col key={index} md={4} className="mb-4">
//               <Card
//                 className="text-center shadow-sm subject-card"
//                 onClick={() => handleClick(subj)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <Card.Body>
//                   <Card.Title>{subj}</Card.Title>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </Layout>
//   );
// };

// export default Newcourses;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Layout from "./Layout";
// import { Container, Row, Col, Card } from "react-bootstrap";

// const Newcourses = () => {
//   const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/courses/subjects");
//         console.log("Subjects fetched:", res.data);
//         setSubjects(res.data);
//       } catch (error) {
//         console.error("Error fetching subjects:", error);
//       }
//     };
//     fetchSubjects();
//   }, []);

//   return (
//     <Layout>
//       <Container className="mt-4">
//         <h2 className="text-center mb-4">📚 Available Subjects</h2>
//         <Row>
//           {subjects.map((subject, index) => (
//             <Col key={index} md={4} className="mb-4">
//               <Card
//                 className="shadow-lg border-0 rounded-3 text-center subject-card"
//                 style={{ background: "linear-gradient(135deg, #74ebd5, #ACB6E5)" }}
//               >
//                 <Card.Body>
//                   <Card.Title className="fw-bold text-white fs-4">
//                     {subject}
//                   </Card.Title>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </Layout>
//   );
// };

// export default Newcourses;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
// import Layout from "./Layout";

// const Newcourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [search, setSearch] = useState("");

//   // Fetch all courses
//   useEffect(() => {
//     axios.get("http://localhost:4000/courses")
//       .then(res => {
//         setCourses(res.data);
//         setFilteredCourses(res.data);
//       })
//       .catch(err => console.error("Error fetching courses:", err));
//   }, []);

//   // Fetch subjects for dropdown
//   useEffect(() => {
//     axios.get("http://localhost:4000/courses/subjects")
//       .then(res => setSubjects(res.data))
//       .catch(err => console.error("Error fetching subjects:", err));
//   }, []);

//   // Filter courses when search changes
//   useEffect(() => {
//     if (!search) {
//       setFilteredCourses(courses);
//     } else {
//       setFilteredCourses(
//         courses.filter(course => course.category.toLowerCase() === search.toLowerCase())
//       );
//     }
//   }, [search, courses]);

//   return (
//     <>
//     <Layout/>
//       <Container className="mt-4">
//         <Row className="mb-3">
//           <Col md={6} className="mx-auto">
//             <InputGroup>
//               <Form.Control
//                 as="select"
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//               >
//                 <option value="">Select Subject</option>
//                 {subjects.map((subj, idx) => (
//                   <option key={idx} value={subj}>
//                     {subj.charAt(0).toUpperCase() + subj.slice(1)}
//                   </option>
//                 ))}
//               </Form.Control>
//               <Button variant="secondary" onClick={() => setSearch("")}>
//                 Reset
//               </Button>
//             </InputGroup>
//           </Col>
//         </Row>

//         <Row>
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map((course, idx) => (
//               <Col md={4} key={idx} className="mb-4">
//                 <Card>
//                   <Card.Body>
//                     <Card.Title>{course.title}</Card.Title>
//                     <Card.Text>
//                       <strong>Category:</strong>{" "}
//                       {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
//                     </Card.Text>
//                     <Card.Text>{course.description}</Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <Col>
//               <p className="text-center">No courses found.</p>
//             </Col>
//           )}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Newcourses;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
// import Layout from "./Layout";

// const Newcourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [search, setSearch] = useState("");

//   // Fetch all courses
//   useEffect(() => {
//     axios.get("http://localhost:4000/courses")
//       .then(res => {
//         setCourses(res.data);
//         setFilteredCourses(res.data);
//       })
//       .catch(err => console.error("Error fetching courses:", err));
//   }, []);

//   // Fetch unique subjects for dropdown
//   useEffect(() => {
//     axios.get("http://localhost:4000/courses/subjects")
//       .then(res => {
//         const uniqueSubjects = [...new Set(res.data.map(subj => subj.toLowerCase()))];
//         setSubjects(uniqueSubjects);
//       })
//       .catch(err => console.error("Error fetching subjects:", err));
//   }, []);

//   // Filter courses and remove duplicates by title
//   useEffect(() => {
//     let filtered = search
//       ? courses.filter(course => course.category.toLowerCase() === search.toLowerCase())
//       : courses;

//     const uniqueCourses = filtered.filter(
//       (course, index, self) =>
//         index === self.findIndex(c => c.title.toLowerCase() === course.title.toLowerCase())
//     );

//     setFilteredCourses(uniqueCourses);
//   }, [search, courses]);

//   return (
//     <>
//       <Layout />

//       <Container className="mt-4">
//         <Row className="mb-3">
//           <Col md={6} className="mx-auto">
//             <InputGroup>
//               <Form.Control
//                 as="select"
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//               >
//                 <option value="">Select Subject</option>
//                 {subjects.map((subj, idx) => (
//                   <option key={idx} value={subj}>
//                     {subj.charAt(0).toUpperCase() + subj.slice(1)}
//                   </option>
//                 ))}
//               </Form.Control>
//               <Button variant="secondary" onClick={() => setSearch("")}>
//                 Reset
//               </Button>
//             </InputGroup>
//           </Col>
//         </Row>

//         <Row>
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map((course, idx) => (
//               <Col md={4} key={idx} className="mb-4">
//                 <Card>
//                   <Card.Body>
//                     <Card.Title>{course.title}</Card.Title>
//                     <Card.Text>
//                       <strong>Category:</strong>{" "}
//                       {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
//                     </Card.Text>
//                     <Card.Text>{course.description}</Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <Col>
//               <p className="text-center">No courses found.</p>
//             </Col>
//           )}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Newcourses;



// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import Layout from "./Layout";

// const Newcourses = () => {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [search, setSearch] = useState("");

//   // Fetch all courses and remove duplicates by title
//   useEffect(() => {
//     axios.get("http://localhost:4000/courses")
//       .then(res => {
//         const uniqueCourses = Array.from(
//           new Map(res.data.map(course => [course.title, course])).values()
//         );
//         setCourses(uniqueCourses);
//         setFilteredCourses(uniqueCourses);
//       })
//       .catch(err => console.error("Error fetching courses:", err));
//   }, []);

//   // Fetch unique subjects for dropdown
//   useEffect(() => {
//     axios.get("http://localhost:4000/courses/subjects")
//       .then(res => {
//         const uniqueSubjects = [...new Set(res.data.map(subj => subj.toLowerCase()))].sort();
//         setSubjects(uniqueSubjects);
//       })
//       .catch(err => console.error("Error fetching subjects:", err));
//   }, []);

//   // Filter courses when search changes
//   useEffect(() => {
//     if (!search) {
//       setFilteredCourses(courses);
//     } else {
//       setFilteredCourses(
//         courses.filter(course => course.category.toLowerCase() === search.toLowerCase())
//       );
//     }
//   }, [search, courses]);

//   return (
//     <>
//       {/* <Layout /> */}
//       <Container
//         fluid
//         className="py-5"
//         style={{
//           background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
//           minHeight: "100vh",
//         }}
//       >
//         {/* Search Bar */}
//         <Row className="mb-4">
//           <Col md={6} className="mx-auto">
//             <InputGroup className="shadow-sm rounded-pill overflow-hidden">
//               <Form.Control
//                 as="select"
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 className="border-0 px-3 py-2"
//                 style={{ fontSize: "1rem" }}
//               >
//                 <option value="">Filter by Subject</option>
//                 {subjects.map((subj, idx) => (
//                   <option key={idx} value={subj}>
//                     {subj.charAt(0).toUpperCase() + subj.slice(1)}
//                   </option>
//                 ))}
//               </Form.Control>
//               <Button
//                 variant="primary"
//                 onClick={() => setSearch("")}
//                 className="px-4 fw-bold"
//               >
//                 Reset
//               </Button>
//             </InputGroup>
//           </Col>
//         </Row>

//         {/* Courses */}
//         <Row xs={1} sm={2} md={3} className="g-4">
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map((course, idx) => (
//               <Col key={idx}>
//                 <Card
//                   className="h-100 shadow-sm border-0 rounded-4"
//                   style={{ cursor: "pointer", transition: "all 0.3s" }}
//                   onClick={() => navigate(`/Tutorwale/${course.title.toLowerCase()}`)}
//                   onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
//                   onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
//                 >
//                   <Card.Body className="d-flex flex-column justify-content-between">
//                     <Card.Title className="fw-bold" style={{ color: "#0d6efd" }}>
//                       {course.title}
//                     </Card.Title>
//                     <Card.Text className="text-muted mb-2">
//                       {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
//                     </Card.Text>
//                     <Card.Text>{course.description}</Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <Col>
//               <p className="text-center text-muted">No courses found.</p>
//             </Col>
//           )}
//         </Row>

//         {/* Back to Dashboard Button */}
//         <div className="text-center mt-5">
//           <Button
//             variant="outline-primary"
//             className="px-5 py-3 fw-bold shadow-sm rounded-pill"
//             onClick={() => navigate("/dashboard")}
//             onMouseEnter={e => {
//               e.currentTarget.style.backgroundColor = "#0d6efd";
//               e.currentTarget.style.color = "#fff";
//               e.currentTarget.style.transform = "scale(1.05)";
//             }}
//             onMouseLeave={e => {
//               e.currentTarget.style.backgroundColor = "transparent";
//               e.currentTarget.style.color = "#0d6efd";
//               e.currentTarget.style.transform = "scale(1)";
//             }}
//           >
//             Back to Dashboard
//           </Button>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default Newcourses;


















import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Newcourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all courses (deduplicate by title)
  useEffect(() => {
    axios
      .get("http://localhost:4000/courses")
      .then((res) => {
        const uniqueCourses = Array.from(
          new Map(res.data.map((course) => [course.title, course])).values()
        );
        setCourses(uniqueCourses);
        setFilteredCourses(uniqueCourses);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // Fetch subjects for filter dropdown
  useEffect(() => {
    axios
      .get("http://localhost:4000/courses/subjects")
      .then((res) => {
        const uniqueSubjects = [...new Set(res.data.map((s) => s.toLowerCase()))].sort();
        setSubjects(uniqueSubjects);
      })
      .catch((err) => console.error("Error fetching subjects:", err));
  }, []);

  // Filter courses when search changes
  useEffect(() => {
    if (!search) {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) => course.category.toLowerCase() === search.toLowerCase())
      );
    }
  }, [search, courses]);

  return (
    <Container
      fluid
      className="py-5"
      style={{
        background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
        minHeight: "100vh",
      }}
    >
      {/* Filter Bar */}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <InputGroup className="shadow-sm rounded-pill overflow-hidden">
            <Form.Control
              as="select"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 px-3 py-2"
              style={{ fontSize: "1rem" }}
            >
              <option value="">Filter by Subject</option>
              {subjects.map((subj, idx) => (
                <option key={idx} value={subj}>
                  {subj.charAt(0).toUpperCase() + subj.slice(1)}
                </option>
              ))}
            </Form.Control>
            <Button
              variant="primary"
              onClick={() => setSearch("")}
              className="px-4 fw-bold"
            >
              Reset
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Courses */}
      <Row xs={1} sm={2} md={3} className="g-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, idx) => (
            <Col key={idx}>
              <Card
                className="h-100 shadow-sm border-0 rounded-4"
                style={{ cursor: "pointer", transition: "all 0.3s" }}
                onClick={() => navigate(`/Tutorwale/${course.category.toLowerCase()}`)} // ✅ go by category
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title className="fw-bold" style={{ color: "#0d6efd" }}>
                    {course.title}
                  </Card.Title>
                  <Card.Text className="text-muted mb-2">
                    {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                  </Card.Text>
                  <Card.Text>{course.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted">No courses found.</p>
          </Col>
        )}
      </Row>

      {/* Back to Dashboard */}
      <div className="text-center mt-5">
        <Button
          variant="outline-primary"
          className="px-5 py-3 fw-bold shadow-sm rounded-pill"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default Newcourses;
