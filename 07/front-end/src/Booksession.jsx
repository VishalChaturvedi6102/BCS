






// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
// import Syllabusviewer from "./Syllabusviewer";
// import CustomCourseCard from "./Customcard";

// const Booksession = () => {
//   const { tutorUsername } = useParams();
//   const [tutor, setTutor] = useState(null);
//   const [teacherData, setTeacherData] = useState(null);
//   const [customCourses, setCustomCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const tutorResp = await axios.get(`http://localhost:4000/api/tutors/username/${tutorUsername}`);
//         const tutorData = Array.isArray(tutorResp.data) ? tutorResp.data[0] : tutorResp.data;
//         setTutor(tutorData);

//         if (tutorData.syllabus) setTeacherData(tutorData);
//         else {
//           try {
//             const teacherResp = await axios.get(`http://localhost:4000/api/teachers/username/${tutorUsername}`);
//             setTeacherData(teacherResp.data);
//           } catch (err) {
//             console.error("Error fetching teacher data:", err);
//           }
//         }

//         // Fetch custom courses
//         const coursesResp = await axios.get(`http://localhost:4000/api/customcourses/${tutorUsername}`);
//         setCustomCourses(coursesResp.data.courses || []);

//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [tutorUsername]);

//   const scrollCarousel = (direction) => {
//     if (!carouselRef.current) return;
//     const scrollAmount = 300;
//     carouselRef.current.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   if (loading) return (
//     <div className="text-center py-5" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <Spinner animation="border" variant="primary" />
//       <p className="mt-3 text-muted">Loading tutor profile...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="text-center py-5">
//       <p className="text-muted">Error: {error}</p>
//       <Button onClick={() => navigate('/dashboard')} variant="primary">Back to Dashboard</Button>
//     </div>
//   );

//   if (!tutor) return (
//     <div className="text-center py-5">
//       <p className="text-muted">Tutor not found</p>
//       <Button onClick={() => navigate('/dashboard')} variant="primary">Back to Dashboard</Button>
//     </div>
//   );

//   return (
//     <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #FFFFFF 0%, #F8F9FA 100%)", padding: "2rem 0", fontFamily: "'Poppins', sans-serif" }}>
//       <Container>
//         <Row>
//           {/* Tutor Profile Details */}
//           <Col lg={8}>
//             <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "2.5rem", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)", marginBottom: "2rem" }}>
//               <div className="d-flex align-items-start mb-4">
//                 <div style={{ position: "relative" }}>
//                   <img 
//                     src={tutor.profile_image ? `http://localhost:4000/uploads/${tutor.profile_image}` : 'https://via.placeholder.com/120x120?text=Tutor'} 
//                     alt={tutor.namer || tutor.username}
//                     style={{ width: "120px", height: "120px", borderRadius: "16px", objectFit: "cover", marginRight: "1.5rem", border: "4px solid #EFF6FF" }}
//                   />
//                   <div style={{ position: "absolute", bottom: "-8px", right: "20px", background: "#10B981", width: "24px", height: "24px", borderRadius: "50%", border: "3px solid white" }}></div>
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <h2 style={{ color: "#1F2937", marginBottom: "0.5rem", fontWeight: "700" }}>{tutor.namer || tutor.username}</h2>
//                   <div className="d-flex align-items-center mb-2">
//                     <span style={{ color: "#FFC107", fontWeight: "bold", marginRight: "0.5rem", fontSize: "1.1rem" }}>⭐ {tutor.rating || '4.9'}</span>
//                     <span style={{ color: "#6B7280" }}>({tutor.reviews || '25'} reviews)</span>
//                   </div>
//                   <div className="d-flex flex-wrap gap-2">
//                     <Badge bg="warning" text="dark" style={{ padding: "0.5rem 0.8rem", borderRadius: "8px", fontSize: "0.85rem" }}>🎓 1st free class</Badge>
//                     <Badge bg="success" style={{ padding: "0.5rem 0.8rem", borderRadius: "8px", fontSize: "0.85rem" }}>⚡ Online</Badge>
//                     <Badge bg="info" style={{ padding: "0.5rem 0.8rem", borderRadius: "8px", fontSize: "0.85rem" }}>📚 {tutor.exp || tutor.experience} years exp</Badge>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-4" style={{ borderTop: "1px solid #F3F4F6", paddingTop: "1.5rem" }}>
//                 <div className="col-md-6">
//                   <div style={{ marginBottom: "1rem" }}>
//                     <p style={{ color: "#6B7280", margin: "0", fontSize: "0.9rem" }}>Subject</p>
//                     <p style={{ color: "#1F2937", margin: "0", fontWeight: "600" }}>{tutor.subjects || tutor.subject}</p>
//                   </div>
//                   <div style={{ marginBottom: "1rem" }}>
//                     <p style={{ color: "#6B7280", margin: "0", fontSize: "0.9rem" }}>Experience</p>
//                     <p style={{ color: "#1F2937", margin: "0", fontWeight: "600" }}>{tutor.exp || tutor.experience} years</p>
//                   </div>
//                   <div>
//                     <p style={{ color: "#6B7280", margin: "0", fontSize: "0.9rem" }}>Hourly Rate</p>
//                     <p style={{ color: "#006CFF", margin: "0", fontWeight: "700", fontSize: "1.1rem" }}>{tutor.hourlyRate || '₹2,500/hr'}</p>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div style={{ marginBottom: "1rem" }}>
//                     <p style={{ color: "#6B7280", margin: "0", fontSize: "0.9rem" }}>Response Time</p>
//                     <p style={{ color: "#1F2937", margin: "0", fontWeight: "600" }}>{tutor.responseTime || 'Within 2 hours'}</p>
//                   </div>
//                   <div style={{ marginBottom: "1rem" }}>
//                     <p style={{ color: "#6B7280", margin: "0", fontSize: "0.9rem" }}>Language</p>
//                     <p style={{ color: "#1F2937", margin: "0", fontWeight: "600" }}>{tutor.lang}</p>
//                   </div>
//                   <div>
//                     <p style={{ color: "#6B7280", margin: "0", fontSize: "0.9rem" }}>Level</p>
//                     <p style={{ color: "#1F2937", margin: "0", fontWeight: "600" }}>{tutor.level}</p>
//                   </div>
//                 </div>
//               </div>

//               <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: "1.5rem" }}>
//                 <h5 style={{ color: "#1F2937", marginBottom: "1rem", fontWeight: "600" }}>About Me</h5>
//                 <p style={{ color: "#6B7280", lineHeight: "1.7", fontSize: "1rem" }}>{tutor.about || tutor.oneline || "Experienced tutor passionate about teaching."}</p>
//               </div>

//               {tutor.education && (
//                 <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
//                   <h5 style={{ color: "#1F2937", marginBottom: "1rem", fontWeight: "600" }}>Education</h5>
//                   <p style={{ color: "#6B7280", lineHeight: "1.7" }}>{tutor.education}</p>
//                 </div>
//               )}

//               {/* -------- Courses Section (Carousel) -------- */}
//               {/* {customCourses.length > 0 && (
//                 <div style={{ marginTop: "2.5rem", background: "#F9FAFB", padding: "1.8rem", borderRadius: "16px", border: "1px solid #E5E7EB" }}>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <h4 style={{ color: "#1F2937", margin: "0", fontWeight: "600" }}>Courses by Tutor</h4>
//                     <div>
//                       <button onClick={() => scrollCarousel("left")} style={arrowStyle("left")}>&lt;</button>
//                       <button onClick={() => scrollCarousel("right")} style={arrowStyle("right")}>&gt;</button>
//                     </div>
//                   </div>
//                   <div ref={carouselRef} style={{ display: "flex", overflowX: "auto", gap: "1.2rem", scrollBehavior: "smooth", padding: "0.5rem 0.2rem", scrollbarWidth: "none", msOverflowStyle: "none" }}>
//                     {customCourses.map(course => <CustomCourseCard key={course.id} course={course} />)}
//                     <style>{`
//                       div::-webkit-scrollbar { display: none; }
//                     `}</style>
//                   </div>
//                 </div>
//               )}
//             </div>
//           {/* </Col> */} 

//           {/* -------- Courses Section (Vertical Scroll) -------- */}
// {customCourses.length > 0 && (
//   <div
//     style={{
//       marginTop: "2.5rem",
//       background: "#F9FAFB",
//       padding: "1.8rem",
//       borderRadius: "16px",
//       border: "1px solid #E5E7EB",
//     }}
//   >
//     <div className="d-flex justify-content-between align-items-center mb-3">
//       <h4
//         style={{ color: "#1F2937", margin: "0", fontWeight: "600" }}
//       >
//         Courses by Tutor
//       </h4>
//     </div>
//     <div
//       ref={carouselRef}
//       style={{
//         display: "block",
//         maxHeight: "400px",   // adjust as needed
//         overflowY: "auto",
//         padding: "0.5rem 0.2rem",
//         scrollbarWidth: "thin",
//         msOverflowStyle: "auto",
//       }}
//     >
//       {customCourses.map((course) => (
//         <div key={course.id} style={{ marginBottom: "1.2rem" }}>
//           <CustomCourseCard course={course} />
//         </div>
//       ))}
//       <style>{`
//         div::-webkit-scrollbar {
//           width: 6px;
//         }
//         div::-webkit-scrollbar-thumb {
//           background-color: rgba(0,0,0,0.2);
//           border-radius: 3px;
//         }
//       `}</style>
//     </div>
//   </div>
// )}


//           {/* Booking Card */}
//           <Col lg={4}>
//             <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)", position: "sticky", top: "2rem" }}>
//               <h4 style={{ color: "#1F2937", marginBottom: "1rem", fontWeight: "600" }}>Ready to Learn?</h4>
//               <p style={{ color: "#6B7280", marginBottom: "1.5rem", lineHeight: "1.6" }}>Book your first session with {tutor.namer || tutor.username} and start your learning journey!</p>
              
//               <div style={{ backgroundColor: "#EFF6FF", borderRadius: "12px", padding: "1.2rem", marginBottom: "1.5rem", border: "1px solid #BFDBFE" }}>
//                 <div className="d-flex align-items-center">
//                   <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#006CFF", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "1rem", flexShrink: 0 }}>
//                     <span style={{ color: "white", fontWeight: "bold" }}>🎓</span>
//                   </div>
//                   <div>
//                     <p style={{ margin: "0", fontWeight: "700", color: "#006CFF", fontSize: "1.1rem" }}>First lesson free!</p>
//                     <p style={{ margin: "0", color: "#6B7280", fontSize: "0.9rem" }}>No commitment, cancel anytime</p>
//                   </div>
//                 </div>
//               </div>
              
//               <Button 
//                 style={{ 
//                   backgroundColor: "#FF7138", 
//                   border: "none", 
//                   borderRadius: "12px", 
//                   padding: "1rem 2rem", 
//                   fontWeight: "700", 
//                   width: "100%", 
//                   marginBottom: "1rem",
//                   fontSize: "1.1rem",
//                   boxShadow: "0 4px 6px rgba(255, 113, 56, 0.25)"
//                 }}
//                 onClick={() => { sessionStorage.setItem("tutorUsername", tutor.username); navigate("/calendar"); }}
//               >
//                 Book Your Free Session
//               </Button>
              
//               <Button 
//                 variant="outline-primary" 
//                 style={{ 
//                   border: "2px solid #006CFF", 
//                   color: "#006CFF", 
//                   borderRadius: "12px", 
//                   padding: "0.8rem 1.5rem", 
//                   fontWeight: "600", 
//                   width: "100%",
//                   backgroundColor: "transparent"
//                 }}
//                 onClick={() => navigate(`/tutorwale/${tutor.lang?.toLowerCase()}`)}
//               >
//                 ← Back to Tutors
//               </Button>
              
//               <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #E5E7EB" }}>
//                 <div className="d-flex" style={{ marginBottom: "0.8rem" }}>
//                   <div style={{ color: "#006CFF", marginRight: "0.8rem" }}>✓</div>
//                   <p style={{ color: "#6B7280", margin: "0", fontSize: "0.9rem" }}>Personalized learning plan</p>
//                 </div>
//                 <div className="d-flex" style={{ marginBottom: "0.8rem" }}>
//                   <div style={{ color: "#006CFF", marginRight: "0.8rem" }}>✓</div>
//                   <p style={{ color: "#6B7280", margin: "0", fontSize: "0.9rem" }}>Flexible scheduling</p>
//                 </div>
//                 <div className="d-flex">
//                   <div style={{ color: "#006CFF", marginRight: "0.8rem" }}>✓</div>
//                   <p style={{ color: "#6B7280", margin: "0", fontSize: "0.9rem" }}>Satisfaction guarantee</p>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );

//   function arrowStyle(position) {
//     return {
//       background: "#fff",
//       border: "1px solid #E5E7EB",
//       borderRadius: "50%",
//       width: "38px",
//       height: "38px",
//       fontSize: "16px",
//       cursor: "pointer",
//       boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
//       marginLeft: position === "right" ? "0.5rem" : "0",
//       color: "#4B5563",
//       display: "inline-flex",
//       alignItems: "center",
//       justifyContent: "center",
//       transition: "all 0.2s ease",
//       fontWeight: "bold"
//     };
//   }        
// };

// export default Booksession;



import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import CustomCourseCard from "./Customcard";

const Booksession = () => {
  const { tutorUsername } = useParams();
  const [tutor, setTutor] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [customCourses, setCustomCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutorResp = await axios.get(
          `http://localhost:4000/api/tutors/username/${tutorUsername}`
        );
        const tutorData = Array.isArray(tutorResp.data)
          ? tutorResp.data[0]
          : tutorResp.data;
        setTutor(tutorData);

        if (tutorData.syllabus) setTeacherData(tutorData);
        else {
          try {
            const teacherResp = await axios.get(
              `http://localhost:4000/api/teachers/username/${tutorUsername}`
            );
            setTeacherData(teacherResp.data);
          } catch (err) {
            console.error("Error fetching teacher data:", err);
          }
        }

        // Fetch custom courses
        const coursesResp = await axios.get(
          `http://localhost:4000/api/customcourses/${tutorUsername}`
        );
        setCustomCourses(coursesResp.data.courses || []);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [tutorUsername]);

  if (loading)
    return (
      <div
        className="text-center py-5"
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading tutor profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-5">
        <p className="text-muted">Error: {error}</p>
        <Button onClick={() => navigate("/dashboard")} variant="primary">
          Back to Dashboard
        </Button>
      </div>
    );

  if (!tutor)
    return (
      <div className="text-center py-5">
        <p className="text-muted">Tutor not found</p>
        <Button onClick={() => navigate("/dashboard")} variant="primary">
          Back to Dashboard
        </Button>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #FFFFFF 0%, #F8F9FA 100%)",
        padding: "2rem 0",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container>
        <Row>
          {/* Tutor Profile + Courses */}
          <Col lg={8}>
            {/* Profile Card */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "2.5rem",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                marginBottom: "2rem",
              }}
            >
              <div className="d-flex align-items-start mb-4">
                <div style={{ position: "relative" }}>
                  <img
                    src={
                      tutor.profile_image
                        ? `http://localhost:4000/uploads/${tutor.profile_image}`
                        : "https://via.placeholder.com/120x120?text=Tutor"
                    }
                    alt={tutor.namer || tutor.username}
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "16px",
                      objectFit: "cover",
                      marginRight: "1.5rem",
                      border: "4px solid #EFF6FF",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-8px",
                      right: "20px",
                      background: "#10B981",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      border: "3px solid white",
                    }}
                  ></div>
                </div>
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      color: "#1F2937",
                      marginBottom: "0.5rem",
                      fontWeight: "700",
                    }}
                  >
                    {tutor.namer || tutor.username}
                  </h2>
                  <div className="d-flex align-items-center mb-2">
                    <span
                      style={{
                        color: "#FFC107",
                        fontWeight: "bold",
                        marginRight: "0.5rem",
                        fontSize: "1.1rem",
                      }}
                    >
                      ⭐ {tutor.rating || "4.9"}
                    </span>
                    <span style={{ color: "#6B7280" }}>
                      ({tutor.reviews || "25"} reviews)
                    </span>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <Badge
                      bg="warning"
                      text="dark"
                      style={{
                        padding: "0.5rem 0.8rem",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                      }}
                    >
                      🎓 1st free class
                    </Badge>
                    <Badge
                      bg="success"
                      style={{
                        padding: "0.5rem 0.8rem",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                      }}
                    >
                      ⚡ Online
                    </Badge>
                    <Badge
                      bg="info"
                      style={{
                        padding: "0.5rem 0.8rem",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                      }}
                    >
                      📚 {tutor.exp || tutor.experience} years exp
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div
                className="row mb-4"
                style={{ borderTop: "1px solid #F3F4F6", paddingTop: "1.5rem" }}
              >
                <div className="col-md-6">
                  <div style={{ marginBottom: "1rem" }}>
                    <p
                      style={{
                        color: "#6B7280",
                        margin: "0",
                        fontSize: "0.9rem",
                      }}
                    >
                      Subject
                    </p>
                    <p
                      style={{
                        color: "#1F2937",
                        margin: "0",
                        fontWeight: "600",
                      }}
                    >
                      {tutor.subjects || tutor.subject}
                    </p>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <p
                      style={{
                        color: "#6B7280",
                        margin: "0",
                        fontSize: "0.9rem",
                      }}
                    >
                      Experience
                    </p>
                    <p
                      style={{
                        color: "#1F2937",
                        margin: "0",
                        fontWeight: "600",
                      }}
                    >
                      {tutor.exp || tutor.experience} years
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#6B7280",
                        margin: "0",
                        fontSize: "0.9rem",
                      }}
                    >
                      Hourly Rate
                    </p>
                    <p
                      style={{
                        color: "#006CFF",
                        margin: "0",
                        fontWeight: "700",
                        fontSize: "1.1rem",
                      }}
                    >
                      {tutor.hourlyRate || "₹2,500/hr"}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{ marginBottom: "1rem" }}>
                    <p
                      style={{
                        color: "#6B7280",
                        margin: "0",
                        fontSize: "0.9rem",
                      }}
                    >
                      Response Time
                    </p>
                    <p
                      style={{
                        color: "#1F2937",
                        margin: "0",
                        fontWeight: "600",
                      }}
                    >
                      {tutor.responseTime || "Within 2 hours"}
                    </p>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <p
                      style={{
                        color: "#6B7280",
                        margin: "0",
                        fontSize: "0.9rem",
                      }}
                    >
                      Language
                    </p>
                    <p
                      style={{
                        color: "#1F2937",
                        margin: "0",
                        fontWeight: "600",
                      }}
                    >
                      {tutor.lang}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#6B7280",
                        margin: "0",
                        fontSize: "0.9rem",
                      }}
                    >
                      Level
                    </p>
                    <p
                      style={{
                        color: "#1F2937",
                        margin: "0",
                        fontWeight: "600",
                      }}
                    >
                      {tutor.level}
                    </p>
                  </div>
                </div>
              </div>

              {/* About */}
              <div
                style={{ borderTop: "1px solid #F3F4F6", paddingTop: "1.5rem" }}
              >
                <h5
                  style={{
                    color: "#1F2937",
                    marginBottom: "1rem",
                    fontWeight: "600",
                  }}
                >
                  About Me
                </h5>
                <p
                  style={{
                    color: "#6B7280",
                    lineHeight: "1.7",
                    fontSize: "1rem",
                  }}
                >
                  {tutor.about ||
                    tutor.oneline ||
                    "Experienced tutor passionate about teaching."}
                </p>
              </div>

              {tutor.education && (
                <div
                  style={{
                    borderTop: "1px solid #F3F4F6",
                    paddingTop: "1.5rem",
                    marginTop: "1.5rem",
                  }}
                >
                  <h5
                    style={{
                      color: "#1F2937",
                      marginBottom: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    Education
                  </h5>
                  <p style={{ color: "#6B7280", lineHeight: "1.7" }}>
                    {tutor.education}
                  </p>
                </div>
              )}
            </div>

            {/* -------- Courses Section (Vertical Scroll) -------- */}
            {customCourses.length > 0 && (
              <div
                style={{
                  marginTop: "2.5rem",
                  background: "#F9FAFB",
                  padding: "1.8rem",
                  borderRadius: "16px",
                  border: "1px solid #E5E7EB",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4
                    style={{ color: "#1F2937", margin: "0", fontWeight: "600" }}
                  >
                    Courses by Tutor
                  </h4>
                </div>
                <div
                  ref={carouselRef}
                  style={{
                    display: "block",
                    maxHeight: "400px",
                    overflowY: "auto",
                    padding: "0.5rem 0.2rem",
                    scrollbarWidth: "thin",
                    msOverflowStyle: "auto",
                  }}
                >
                  {customCourses.map((course) => (
                    <div key={course.id} style={{ marginBottom: "1.2rem" }}>
                      <CustomCourseCard course={course} />
                    </div>
                  ))}
                  <style>{`
                    div::-webkit-scrollbar {
                      width: 6px;
                    }
                    div::-webkit-scrollbar-thumb {
                      background-color: rgba(0,0,0,0.2);
                      border-radius: 3px;
                    }
                  `}</style>
                </div>
              </div>
            )}
          </Col>

          {/* Booking Card */}
          <Col lg={4}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                position: "sticky",
                top: "2rem",
              }}
            >
              <h4
                style={{
                  color: "#1F2937",
                  marginBottom: "1rem",
                  fontWeight: "600",
                }}
              >
                Ready to Learn?
              </h4>
              <p
                style={{
                  color: "#6B7280",
                  marginBottom: "1.5rem",
                  lineHeight: "1.6",
                }}
              >
                Book your first session with {tutor.namer || tutor.username} and
                start your learning journey!
              </p>

              <div
                style={{
                  backgroundColor: "#EFF6FF",
                  borderRadius: "12px",
                  padding: "1.2rem",
                  marginBottom: "1.5rem",
                  border: "1px solid #BFDBFE",
                }}
              >
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      backgroundColor: "#006CFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      🎓
                    </span>
                  </div>
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontWeight: "700",
                        color: "#006CFF",
                        fontSize: "1.1rem",
                      }}
                    >
                      First lesson free!
                    </p>
                    <p
                      style={{
                        margin: "0",
                        color: "#6B7280",
                        fontSize: "0.9rem",
                      }}
                    >
                      No commitment, cancel anytime
                    </p>
                  </div>
                </div>
              </div>

              <Button
                style={{
                  backgroundColor: "#FF7138",
                  border: "none",
                  borderRadius: "12px",
                  padding: "1rem 2rem",
                  fontWeight: "700",
                  width: "100%",
                  marginBottom: "1rem",
                  fontSize: "1.1rem",
                  boxShadow: "0 4px 6px rgba(255, 113, 56, 0.25)",
                }}
                onClick={() => {
                  sessionStorage.setItem("tutorUsername", tutor.username);
                  navigate("/calendar");
                }}
              >
                Book Your Free Session
              </Button>

              <Button
                variant="outline-primary"
                style={{
                  border: "2px solid #006CFF",
                  color: "#006CFF",
                  borderRadius: "12px",
                  padding: "0.8rem 1.5rem",
                  fontWeight: "600",
                  width: "100%",
                  backgroundColor: "transparent",
                }}
                onClick={() =>
                  navigate(`/tutorwale/${tutor.lang?.toLowerCase()}`)
                }
              >
                ← Back to Tutors
              </Button>

              <div
                style={{
                  marginTop: "1.5rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid #E5E7EB",
                }}
              >
                <div className="d-flex" style={{ marginBottom: "0.8rem" }}>
                  <div style={{ color: "#006CFF", marginRight: "0.8rem" }}>✓</div>
                  <p
                    style={{
                      color: "#6B7280",
                      margin: "0",
                      fontSize: "0.9rem",
                    }}
                  >
                    Personalized learning plan
                  </p>
                </div>
                <div className="d-flex" style={{ marginBottom: "0.8rem" }}>
                  <div style={{ color: "#006CFF", marginRight: "0.8rem" }}>✓</div>
                  <p
                    style={{
                      color: "#6B7280",
                      margin: "0",
                      fontSize: "0.9rem",
                    }}
                  >
                    Flexible scheduling
                  </p>
                </div>
                <div className="d-flex">
                  <div style={{ color: "#006CFF", marginRight: "0.8rem" }}>✓</div>
                  <p
                    style={{
                      color: "#6B7280",
                      margin: "0",
                      fontSize: "0.9rem",
                    }}
                  >
                    Satisfaction guarantee
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Booksession;
