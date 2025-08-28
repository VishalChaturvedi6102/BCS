


// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Newcourses = () => {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [search, setSearch] = useState("");

//   // Fetch all courses (deduplicate by title)
//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/courses")
//       .then((res) => {
//         const uniqueCourses = Array.from(
//           new Map(res.data.map((course) => [course.title, course])).values()
//         );
//         setCourses(uniqueCourses);
//         setFilteredCourses(uniqueCourses);
//       })
//       .catch((err) => console.error("Error fetching courses:", err));
//   }, []);

//   // Fetch subjects for filter dropdown
//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/courses/subjects")
//       .then((res) => {
//         const uniqueSubjects = [...new Set(res.data.map((s) => s.toLowerCase()))].sort();
//         setSubjects(uniqueSubjects);
//       })
//       .catch((err) => console.error("Error fetching subjects:", err));
//   }, []);

//   // Filter courses when search changes
//   useEffect(() => {
//     if (!search) {
//       setFilteredCourses(courses);
//     } else {
//       setFilteredCourses(
//         courses.filter((course) => course.category.toLowerCase() === search.toLowerCase())
//       );
//     }
//   }, [search, courses]);

//   return (
//     <Container
//       fluid
//       className="py-5"
//       style={{
//         background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Filter Bar */}
//       <Row className="mb-4">
//         <Col md={6} className="mx-auto">
//           <InputGroup className="shadow-sm rounded-pill overflow-hidden">
//             <Form.Control
//               as="select"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="border-0 px-3 py-2"
//               style={{ fontSize: "1rem" }}
//             >
//               <option value="">Filter by Subject</option>
//               {subjects.map((subj, idx) => (
//                 <option key={idx} value={subj}>
//                   {subj.charAt(0).toUpperCase() + subj.slice(1)}
//                 </option>
//               ))}
//             </Form.Control>
//             <Button
//               variant="primary"
//               onClick={() => setSearch("")}
//               className="px-4 fw-bold"
//             >
//               Reset
//             </Button>
//           </InputGroup>
//         </Col>
//       </Row>

//       {/* Courses */}
//       <Row xs={1} sm={2} md={3} className="g-4">
//         {filteredCourses.length > 0 ? (
//           filteredCourses.map((course, idx) => (
//             <Col key={idx}>
//               <Card
//                 className="h-100 shadow-sm border-0 rounded-4"
//                 style={{ cursor: "pointer", transition: "all 0.3s" }}
//                 onClick={() => navigate(`/Tutorwale/${course.category.toLowerCase()}`)} // ✅ go by category
//                 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
//                 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//               >
//                 <Card.Body className="d-flex flex-column justify-content-between">
//                   <Card.Title className="fw-bold" style={{ color: "#0d6efd" }}>
//                     {course.title}
//                   </Card.Title>
//                   <Card.Text className="text-muted mb-2">
//                     {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
//                   </Card.Text>
//                   <Card.Text>{course.description}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         ) : (
//           <Col>
//             <p className="text-center text-muted">No courses found.</p>
//           </Col>
//         )}
//       </Row>

//       {/* Back to Dashboard */}
//       <div className="text-center mt-5">
//         <Button
//           variant="outline-primary"
//           className="px-5 py-3 fw-bold shadow-sm rounded-pill"
//           onClick={() => navigate("/dashboard")}
//         >
//           Back to Dashboard
//         </Button>
//       </div>
//     </Container>
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
        background: "linear-gradient(135deg, #f6f9fc, #edf2f7)",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif"
      }}
    >
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: "#0d47a1", letterSpacing: "1px" }}>
          📚 Explore New Courses
        </h2>
        <p className="text-muted">Discover courses tailored to your learning path</p>
      </div>

      {/* Filter Bar */}
      <Row className="mb-5">
        <Col md={6} className="mx-auto">
          <InputGroup className="shadow rounded-pill overflow-hidden">
            <Form.Control
              as="select"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 px-3 py-3"
              style={{ fontSize: "1rem", background: "#fff" }}
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
              style={{ borderRadius: "0" }}
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
                className="h-100 shadow border-0 rounded-4"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  background: "linear-gradient(145deg, #ffffff, #f1f5f9)",
                  boxShadow: "6px 6px 12px #cbd5e1, -6px -6px 12px #ffffff"
                }}
                onClick={() => navigate(`/Tutorwale/${course.category.toLowerCase()}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "8px 8px 16px #cbd5e1, -8px -8px 16px #ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "6px 6px 12px #cbd5e1, -6px -6px 12px #ffffff";
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title
                    className="fw-bold mb-2"
                    style={{ color: "#1e40af", fontSize: "1.2rem" }}
                  >
                    {course.title}
                  </Card.Title>
                  <Card.Text className="text-muted small mb-2">
                    {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                  </Card.Text>
                  <Card.Text className="flex-grow-1">
                    {course.description || "No description available."}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    className="mt-3 rounded-pill fw-bold"
                  >
                    View Details
                  </Button>
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
          variant="outline-dark"
          className="px-5 py-3 fw-bold shadow-sm rounded-pill"
          onClick={() => navigate("/dashboard")}
        >
          ⬅ Back to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default Newcourses;
