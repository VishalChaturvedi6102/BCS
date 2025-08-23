


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Tutorlist = () => {
//   const { language } = useParams(); // english, hindi etc.
//   const [tutors, setTutors] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch teachers by language from backend
//     axios
//       .get(`http://localhost:4000/api/teachers?lang=${language}`)
//       .then((res) => {
//         setTutors(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching tutors:", err);
//       });
//   }, [language]);

//   return (
//     <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", paddingTop: "40px" }}>
//       <Container>
//         <h1 className="text-center fw-bold mb-5" style={{ color: "#2c3e50" }}>
//           Tutors for {language.charAt(0).toUpperCase() + language.slice(1)}
//         </h1>

//         <Row xs={1} md={2} lg={3} className="g-4">
//           {tutors.length > 0 ? (
//             tutors.map((tutor) => (
//               <Col key={tutor.id}>
//                 <Card
//                   className="h-100 shadow-lg border-0"
//                   style={{
//                     borderRadius: "15px",
//                     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-8px)";
//                     e.currentTarget.style.boxShadow =
//                       "0 8px 25px rgba(0,0,0,0.15)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow =
//                       "0 4px 12px rgba(0,0,0,0.1)";
//                   }}
//                 >
//                   <Card.Body className="d-flex flex-column">
//                     <Card.Title
//                       className="fw-bold mb-3"
//                       style={{ color: "#007bff", fontSize: "1.3rem" }}
//                     >
//                       {tutor.namer}
//                     </Card.Title>

//                     <Card.Text className="flex-grow-1 text-muted" style={{ fontSize: "0.95rem" }}>
//                       <strong>Intro:</strong> {tutor.oneline} <br />
//                       <strong>Language:</strong> {tutor.lang} <br />
//                       <strong>Subject:</strong> {tutor.subjects} <br />
//                       <strong>Level:</strong> {tutor.level} <br />
//                       <strong>Experience:</strong> {tutor.exp} years <br />
//                       <strong>About:</strong> {tutor.about}
//                     </Card.Text>

//                     <div className="text-center mt-3">
//                       <Button
//                         variant="success"
//                         className="px-4 py-2 fw-semibold"
//                         style={{
//                           borderRadius: "30px",
//                           fontSize: "0.95rem",
//                           boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//                         }}
//                         onClick={() => navigate(`/booksession/${tutor.username}`)}
//                       >
//                         Book Session
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <p className="text-center text-muted fs-5">
//               No tutors available for this language
//             </p>
//           )}
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Tutorlist;





// Tutorlist.jsx - Updated
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import Tutorcard from "./Tutorcard";

const Tutorlist = () => {
  const { language } = useParams();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/tutors?lang=${language}`)
      .then((res) => {
        setTutors(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tutors:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [language]);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom, #FFFFFF 0%, #F8F9FA 100%)",
      paddingTop: "40px",
      fontFamily: "'Poppins', sans-serif"
    }}>
      <Container>
        <div className="text-center mb-5">
          <h1 style={{ 
            fontWeight: "700", 
            color: "#1F2937", 
            marginBottom: "0.5rem"
          }}>
            {language.charAt(0).toUpperCase() + language.slice(1)} Tutors
          </h1>
          <p style={{ 
            color: "#6B7280", 
            fontSize: "1.1rem"
          }}>
            Connect with expert {language.toLowerCase()} tutors
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Loading tutors...</p>
          </div>
        ) : tutors.length > 0 ? (
          <>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {tutors.map((tutor) => (
                <Col key={tutor.id}>
                  <Tutorcard tutor={tutor} />
                </Col>
              ))}
            </Row>
            
            {/* Back to Dashboard Button */}
            <div className="text-center mt-5">
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline-primary"
                style={{
                  borderRadius: "25px",
                  padding: "0.75rem 2rem",
                  fontWeight: "600"
                }}
              >
                ← Back to Dashboard
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <p style={{ color: "#6B7280", fontSize: "1.1rem" }}>
              No tutors available for {language.toLowerCase()} yet.
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="primary"
              style={{
                borderRadius: "25px",
                padding: "0.75rem 2rem",
                fontWeight: "600",
                marginTop: "1rem"
              }}
            >
              Explore Other Languages
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Tutorlist;