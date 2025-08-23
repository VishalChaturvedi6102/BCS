



// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Navbar,
//   Nav,
//   Card,
//   Button,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { CheckCircleFill } from "react-bootstrap-icons"; // for check icons
// import "bootstrap/dist/css/bootstrap.min.css";

// const Frontpage = () => {
//   const navigate = useNavigate();

//   // For triggering animations on scroll
//   const [visibleSections, setVisibleSections] = useState({
//     features: false,
//     howItWorks: false,
//     testimonials: false,
//   });

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY + window.innerHeight;

//       const features = document.getElementById("features");
//       const howItWorks = document.getElementById("how-it-works");
//       const testimonials = document.getElementById("testimonials");

//       if (features && scrollY > features.offsetTop + 100) {
//         setVisibleSections((v) => ({ ...v, features: true }));
//       }
//       if (howItWorks && scrollY > howItWorks.offsetTop + 100) {
//         setVisibleSections((v) => ({ ...v, howItWorks: true }));
//       }
//       if (testimonials && scrollY > testimonials.offsetTop + 100) {
//         setVisibleSections((v) => ({ ...v, testimonials: true }));
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // initial check

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       style={{
//         background:
//           "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         fontFamily: "'Poppins', sans-serif",
//         color: "#f0f0f0",
//         scrollBehavior: "smooth",
//       }}
//     >
//       {/* Navbar */}
//       <Navbar
//         expand="lg"
//         variant="dark"
//         style={{
//           backgroundColor: "rgba(0,0,0,0.85)",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.7)",
//         }}
//         fixed="top"
//       >
//         <Container>
//           <Navbar.Brand
//             href="/"
//             style={{
//               fontWeight: "900",
//               fontSize: "1.75rem",
//               letterSpacing: "2px",
//               color: "#61dafb",
//               textShadow: "0 0 8px #61dafb",
//             }}
//           >
//             Lang++
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbar-nav" />
//           <Navbar.Collapse id="navbar-nav">
//             <Nav
//               className="ms-auto"
//               style={{ fontWeight: "600", fontSize: "1.1rem" }}
//             >
//               <Nav.Link href="/" className="px-3" style={{ color: "#a0d8f7" }}>
//                 Home
//               </Nav.Link>
//               <Nav.Link
//                 href="/about"
//                 className="px-3"
//                 style={{ color: "#a0d8f7" }}
//               >
//                 About
//               </Nav.Link>
//               <Nav.Link
//                 href="/contact"
//                 className="px-3"
//                 style={{ color: "#a0d8f7" }}
//               >
//                 Contact
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Spacer for fixed navbar */}
//       <div style={{ height: "70px" }} />

//       {/* Hero Section */}
//       <Container
//         className="flex-grow-1 d-flex align-items-center justify-content-center"
//         style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
//       >
//         <div
//           className="p-5 rounded-4 shadow-lg bg-light"
//           style={{
//             maxWidth: "900px",
//             width: "100%",
//             animation: "fadeInUp 1s ease forwards",
//             borderRadius: "30px",
//           }}
//         >
//           <h2
//             className="text-center mb-5"
//             style={{
//               fontWeight: "800",
//               color: "#2c3e50",
//               letterSpacing: "1.5px",
//               textTransform: "uppercase",
//               animation: "fadeIn 1.5s ease forwards",
//             }}
//           >
//             Welcome to Lang++
//           </h2>
//           <Row>
//             {/* Student Card */}
//             <Col md={6} className="mb-4">
//               <Card
//                 className="h-100 shadow border-0"
//                 style={{
//                   borderRadius: "20px",
//                   overflow: "hidden",
//                   cursor: "pointer",
//                   transition: "transform 0.4s ease, box-shadow 0.4s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "scale(1.05)";
//                   e.currentTarget.style.boxShadow =
//                     "0 15px 30px rgba(97, 218, 251, 0.6)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "scale(1)";
//                   e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
//                 }}
//               >
//                 <Card.Img
//                   variant="top"
//                   src="https://imgs.search.brave.com/vxUenfK6dVrHa28Z7Ef3CD7nz0vXApZ8fEtSkhioRJw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXQt/dGVhY2hlci1pdHMt/c3R1ZGVudHMtd3Jv/dGUtY2hhbGtib2Fy/ZC13ZWxjb21lLWJh/Y2stdG8tc2Nob29s/LWNsYXNzcm9vbS0y/MDExMDc2NTQuanBn"
//                   style={{ height: "230px", objectFit: "cover" }}
//                 />
//                 <Card.Body className="d-flex flex-column">
//                   <Card.Title
//                     className="text-center"
//                     style={{
//                       fontWeight: "700",
//                       fontSize: "1.5rem",
//                       color: "#007bff",
//                     }}
//                   >
//                     Student
//                   </Card.Title>
//                   <Card.Text
//                     className="text-center text-secondary flex-grow-1"
//                     style={{ fontSize: "1rem" }}
//                   >
//                     Access lessons, track progress, and connect with expert
//                     teachers.
//                   </Card.Text>
//                   <Button
//                     variant="primary"
//                     size="lg"
//                     className="mt-auto"
//                     onClick={() => navigate("/auth")}
//                     style={{
//                       fontWeight: "600",
//                       letterSpacing: "1px",
//                       boxShadow: "0 5px 15px rgba(0,123,255,0.4)",
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = "#0056b3";
//                       e.currentTarget.style.boxShadow =
//                         "0 8px 20px rgba(0,86,179,0.7)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = "";
//                       e.currentTarget.style.boxShadow =
//                         "0 5px 15px rgba(0,123,255,0.4)";
//                     }}
//                   >
//                     Continue as Student
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* Teacher Card */}
//             <Col md={6} className="mb-4">
//               <Card
//                 className="h-100 shadow border-0"
//                 style={{
//                   borderRadius: "20px",
//                   overflow: "hidden",
//                   cursor: "pointer",
//                   transition: "transform 0.4s ease, box-shadow 0.4s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "scale(1.05)";
//                   e.currentTarget.style.boxShadow =
//                     "0 15px 30px rgba(40, 167, 69, 0.6)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "scale(1)";
//                   e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
//                 }}
//               >
//                 <Card.Img
//                   variant="top"
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTYQYD69EjuwaAjTCT8j1c_S59vDkahfyUhw&s"
//                   style={{ height: "230px", objectFit: "cover" }}
//                 />
//                 <Card.Body className="d-flex flex-column">
//                   <Card.Title
//                     className="text-center"
//                     style={{
//                       fontWeight: "700",
//                       fontSize: "1.5rem",
//                       color: "#28a745",
//                     }}
//                   >
//                     Teacher
//                   </Card.Title>
//                   <Card.Text
//                     className="text-center text-secondary flex-grow-1"
//                     style={{ fontSize: "1rem" }}
//                   >
//                     Create courses, manage students, and share your expertise.
//                   </Card.Text>
//                   <Button
//                     variant="success"
//                     size="lg"
//                     className="mt-auto"
//                     onClick={() => navigate("/author")}
//                     style={{
//                       fontWeight: "600",
//                       letterSpacing: "1px",
//                       boxShadow: "0 5px 15px rgba(40,167,69,0.4)",
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = "#1e7e34";
//                       e.currentTarget.style.boxShadow =
//                         "0 8px 20px rgba(30,126,52,0.7)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = "";
//                       e.currentTarget.style.boxShadow =
//                         "0 5px 15px rgba(40,167,69,0.4)";
//                     }}
//                   >
//                     Continue as Teacher
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </Container>

//       {/* Features Section */}
//       <section
//         id="features"
//         className={`py-5 px-3 px-md-5`}
//         style={{
//           backgroundColor: "#f7f9fc",
//           color: "#222",
//           borderRadius: "30px 30px 0 0",
//           marginTop: "3rem",
//           maxWidth: "1200px",
//           marginLeft: "auto",
//           marginRight: "auto",
//           opacity: visibleSections.features ? 1 : 0,
//           transform: visibleSections.features ? "translateY(0)" : "translateY(40px)",
//           transition: "all 0.8s ease",
//         }}
//       >
//         <Container>
//           <h3 className="text-center mb-4" style={{ fontWeight: "700", color: "#0d6efd" }}>
//             Why Choose Lang++?
//           </h3>
//           <Row className="gx-4 gy-4 justify-content-center">
//             {[
//               "Personalized Learning Paths tailored for every student.",
//               "Live interactive sessions with expert teachers.",
//               "Track your progress and get real-time feedback.",
//               "Create and manage courses easily as a teacher.",
//               "Community-driven platform for peer support.",
//             ].map((feature, i) => (
//               <Col key={i} xs={12} md={6} lg={4}>
//                 <div
//                   className="d-flex align-items-start"
//                   style={{
//                     gap: "10px",
//                     padding: "1rem",
//                     backgroundColor: "#e9f1ff",
//                     borderRadius: "12px",
//                     boxShadow: "0 5px 15px rgba(13,110,253,0.2)",
//                     fontWeight: "600",
//                     fontSize: "1rem",
//                     color: "#0d6efd",
//                   }}
//                 >
//                   <CheckCircleFill size={24} color="#0d6efd" />
//                   <span>{feature}</span>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>

//       {/* How It Works Section */}
//       <section
//         id="how-it-works"
//         className={`py-5 px-3 px-md-5 mt-5`}
//         style={{
//           backgroundColor: "#0d6efd",
//           color: "white",
//           borderRadius: "30px",
//           maxWidth: "1200px",
//           marginLeft: "auto",
//           marginRight: "auto",
//           opacity: visibleSections.howItWorks ? 1 : 0,
//           transform: visibleSections.howItWorks
//             ? "translateY(0)"
//             : "translateY(40px)",
//           transition: "all 0.8s ease",
//         }}
//       >
//         <Container>
//           <h3 className="text-center mb-4" style={{ fontWeight: "700" }}>
//             How It Works
//           </h3>
//           <Row className="gx-4 gy-4 justify-content-center">
//             {[
//               {
//                 title: "Sign Up & Choose Role",
//                 desc: "Select whether you want to learn as a student or teach as an instructor.",
//               },
//               {
//                 title: "Explore Courses & Content",
//                 desc: "Students can browse courses, watch lessons, and track progress easily.",
//               },
//               {
//                 title: "Create & Share",
//                 desc: "Teachers create engaging content, quizzes, and track students’ success.",
//               },
//               {
//                 title: "Community & Support",
//                 desc: "Engage with peers and instructors to enhance learning outcomes.",
//               },
//             ].map(({ title, desc }, i) => (
//               <Col key={i} xs={12} md={6} lg={3}>
//                 <div
//                   style={{
//                     backgroundColor: "rgba(255, 255, 255, 0.15)",
//                     borderRadius: "15px",
//                     padding: "1.5rem",
//                     height: "100%",
//                     boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     textAlign: "center",
//                   }}
//                 >
//                   <h5 style={{ fontWeight: "700" }}>{title}</h5>
//                   <p style={{ fontSize: "0.95rem", marginTop: "0.8rem" }}>
//                     {desc}
//                   </p>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>

//       {/* Testimonials Section */}
//       <section
//         id="testimonials"
//         className={`py-5 px-3 px-md-5 mt-5 mb-5`}
//         style={{
//           backgroundColor: "#f7f9fc",
//           color: "#222",
//           borderRadius: "30px",
//           maxWidth: "1200px",
//           marginLeft: "auto",
//           marginRight: "auto",
//           opacity: visibleSections.testimonials ? 1 : 0,
//           transform: visibleSections.testimonials
//             ? "translateY(0)"
//             : "translateY(40px)",
//           transition: "all 0.8s ease",
//         }}
//       >
//         <Container>
//           <h3 className="text-center mb-5" style={{ fontWeight: "700", color: "#0d6efd" }}>
//             What Our Users Say
//           </h3>
//           <Row className="gx-4 gy-4 justify-content-center">
//             {[
//               {
//                 name: "Emily R.",
//                 role: "Student",
//                 quote:
//                   "Lang++ has completely transformed the way I learn. The personalized lessons and progress tracking keep me motivated.",
//               },
//               {
//                 name: "James K.",
//                 role: "Teacher",
//                 quote:
//                   "Creating courses on Lang++ is so intuitive. The community support makes teaching rewarding.",
//               },
//               {
//                 name: "Sofia M.",
//                 role: "Student",
//                 quote:
//                   "The interactive sessions and feedback helped me improve my language skills faster than I expected!",
//               },
//             ].map(({ name, role, quote }, i) => (
//               <Col key={i} xs={12} md={4}>
//                 <Card
//                   style={{
//                     borderRadius: "20px",
//                     boxShadow: "0 8px 30px rgba(13,110,253,0.15)",
//                     height: "100%",
//                   }}
//                 >
//                   <Card.Body className="d-flex flex-column justify-content-between">
//                     <blockquote className="blockquote mb-3" style={{ fontStyle: "italic", fontSize: "1rem", color: "#555" }}>
//                       “{quote}”
//                     </blockquote>
//                     <footer
//                       className="blockquote-footer"
//                       style={{ fontWeight: "600", color: "#0d6efd" }}
//                     >
//                       {name} <cite title="role">({role})</cite>
//                     </footer>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>

//       {/* Footer */}
//       <footer
//         style={{
//           background: "rgba(20, 20, 20, 0.9)",
//           color: "#bbb",
//           textAlign: "center",
//           padding: "20px 0",
//           fontSize: "0.9rem",
//           fontWeight: "500",
//           letterSpacing: "1px",
//           userSelect: "none",
//         }}
//       >
//         <Container>
//           <p className="mb-0" style={{ fontStyle: "italic" }}>
//             © {new Date().getFullYear()} Lang++. All rights reserved.
//           </p>
//         </Container>
//       </footer>

//       {/* Animations */}
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');
//           @keyframes fadeInUp {
//             0% { opacity: 0; transform: translateY(30px); }
//             100% { opacity: 1; transform: translateY(0); }
//           }
//           @keyframes fadeIn {
//             0% { opacity: 0; }
//             100% { opacity: 1; }
//           }
//           /* Smooth fade + scale for cards */
//           .card {
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//           }
//           .card:hover {
//             transform: scale(1.05);
//             box-shadow: 0 15px 30px rgba(0,0,0,0.15);
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Frontpage;









// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Navbar,
//   Nav,
//   Button,
//   Row,
//   Col,
//   Form,
//   Card,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { Search } from "react-bootstrap-icons";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./superprof.css"; // Correctly imports the external CSS file

// const Frontpage = () => {
//   const navigate = useNavigate();

//   const [visibleSections, setVisibleSections] = useState({
//     howItWorks: false,
//     testimonials: false,
//   });

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY + window.innerHeight;
//       const howItWorks = document.getElementById("how-it-works");
//       const testimonials = document.getElementById("testimonials");

//       if (howItWorks && scrollY > howItWorks.offsetTop + 100) {
//         setVisibleSections((v) => ({ ...v, howItWorks: true }));
//       }
//       if (testimonials && scrollY > testimonials.offsetTop + 100) {
//         setVisibleSections((v) => ({ ...v, testimonials: true }));
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Initial check

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="superprof-theme">
//       {/* Navbar (re-styled) */}
//       <Navbar expand="lg" variant="light" className="fixed-top superprof-navbar">
//         <Container>
//           <Navbar.Brand href="/" className="superprof-logo">
//             <span style={{ color: "var(--base-color-black)" }}>Lang</span>
//             <span style={{ color: "var(--base-color-blue)" }}>++</span>
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbar-nav" />
//           <Navbar.Collapse id="navbar-nav">
//             <Nav className="ms-auto" style={{ fontWeight: "600" }}>
//               <Nav.Link href="/auth" className="me-2">
//                 Log in
//               </Nav.Link>
//               <Nav.Link href="/auth">
//                 <Button className="rounded-pill signup-button">
//                   Sign up
//                 </Button>
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <div style={{ height: "70px" }} />

//       {/* Hero Section: Centered search bar */}
//       <Container className="hero-section">
//         <h1 className="hero-title">
//           Learn anything, anywhere with a private tutor
//         </h1>
//         <p className="hero-subtitle">
//           From academic subjects to languages and music.
//         </p>
//         <Form className="hero-search-form">
//           <Form.Group className="d-flex position-relative">
//             <Form.Control
//               type="text"
//               placeholder="What do you want to learn?"
//               className="search-input"
//             />
//             <Button variant="primary" className="search-button">
//               <Search size={20} />
//             </Button>
//           </Form.Group>
//         </Form>
//       </Container>
      
//       <Container className="py-5">
//         <h2 className="text-center mb-5 superprof-heading">
//           Join Us as a Learner or Teacher
//         </h2>
//         <Row className="justify-content-center g-4">
//           <Col md={6} lg={4}>
//             <Card className="role-card student-card">
//               <Card.Body>
//                 <Card.Title className="text-center mb-4">Student</Card.Title>
//                 <Card.Text className="text-center text-muted">
//                   Access lessons, track progress, and connect with expert teachers.
//                 </Card.Text>
//                 <div className="d-grid gap-2">
//                   <Button variant="primary" className="mt-auto" onClick={() => navigate("/auth")}>
//                     Find a Tutor
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={6} lg={4}>
//             <Card className="role-card teacher-card">
//               <Card.Body>
//                 <Card.Title className="text-center mb-4">Teacher</Card.Title>
//                 <Card.Text className="text-center text-muted">
//                   Create courses, manage students, and share your expertise.
//                 </Card.Text>
//                 <div className="d-grid gap-2">
//                   <Button variant="success" className="mt-auto" onClick={() => navigate("/author")}>
//                     Become a Tutor
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>

//       {/* Features Section - Styling adapted for the new theme */}
//       <section id="features" className={`py-5`}>
//         <Container>
//           <h2 className="text-center mb-5 superprof-heading">
//             Why Choose Lang++?
//           </h2>
//           <Row className="g-4 justify-content-center">
//             {[
//               "Personalized Learning Paths tailored for every student.",
//               "Live interactive sessions with expert teachers.",
//               "Track your progress and get real-time feedback.",
//               "Create and manage courses easily as a teacher.",
//               "Community-driven platform for peer support.",
//             ].map((feature, i) => (
//               <Col key={i} xs={12} md={6} lg={4}>
//                 <div className="feature-item">
//                   <span style={{ color: "var(--base-color-blue)" }}>&#10003;</span>
//                   <span>{feature}</span>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>

//       {/* How It Works Section - Styling adapted for the new theme */}
//       <section
//         id="how-it-works"
//         className={`py-5`}
//         style={{
//           opacity: visibleSections.howItWorks ? 1 : 0,
//           transform: visibleSections.howItWorks ? "translateY(0)" : "translateY(40px)",
//           transition: "all 0.8s ease",
//         }}
//       >
//         <Container>
//           <h2 className="text-center mb-5 superprof-heading">
//             How It Works
//           </h2>
//           <Row className="g-4 text-center justify-content-center">
//             {[
//               { title: "Search", desc: "Find your ideal tutor by subject, location, and price." },
//               { title: "Connect", desc: "Contact tutors directly to discuss your learning goals." },
//               { title: "Book", desc: "Schedule and book your first lesson safely and securely." },
//               { title: "Learn", desc: "Start your personalized learning journey with your new tutor." },
//             ].map(({ title, desc }, i) => (
//               <Col key={i} xs={12} md={6} lg={3}>
//                 <div className="how-it-works-item">
//                   <div className="step-number">{i + 1}</div>
//                   <h5 className="how-it-works-title">{title}</h5>
//                   <p className="text-muted">{desc}</p>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>

//       {/* Testimonials Section - Styling adapted for the new theme */}
//       <section
//         id="testimonials"
//         className={`py-5`}
//         style={{
//           opacity: visibleSections.testimonials ? 1 : 0,
//           transform: visibleSections.testimonials ? "translateY(0)" : "translateY(40px)",
//           transition: "all 0.8s ease",
//         }}
//       >
//         <Container>
//           <h2 className="text-center mb-5 superprof-heading">
//             What Our Users Say
//           </h2>
//           <Row className="g-4 justify-content-center">
//             {[
//               { name: "Emily R.", role: "Student", quote: "Lang++ has completely transformed the way I learn. The personalized lessons and progress tracking keep me motivated." },
//               { name: "James K.", role: "Teacher", quote: "Creating courses on Lang++ is so intuitive. The community support makes teaching rewarding." },
//               { name: "Sofia M.", role: "Student", quote: "The interactive sessions and feedback helped me improve my language skills faster than I expected!" },
//             ].map(({ name, role, quote }, i) => (
//               <Col key={i} xs={12} md={4}>
//                 <Card className="testimonial-card">
//                   <Card.Body>
//                     <blockquote className="blockquote mb-3">
//                       <p className="mb-0">“{quote}”</p>
//                     </blockquote>
//                     <footer className="blockquote-footer">
//                       <strong>{name}</strong> <cite>({role})</cite>
//                     </footer>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>

//       {/* Footer */}
//       <footer className="superprof-footer">
//         <Container>
//           <p className="mb-0">
//             © {new Date().getFullYear()} Lang++. All rights reserved.
//           </p>
//         </Container>
//       </footer>
//     </div>
//   );
// };

// export default Frontpage;



import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Card,
  Button,
  Row,
  Col,
  Form,
  InputGroup
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Search, CheckCircle, Star, StarFill, PlayCircle } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Frontpage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // For triggering animations on scroll
  const [visibleSections, setVisibleSections] = useState({
    features: false,
    howItWorks: false,
    testimonials: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight;

      const features = document.getElementById("features");
      const howItWorks = document.getElementById("how-it-works");
      const testimonials = document.getElementById("testimonials");

      if (features && scrollY > features.offsetTop + 100) {
        setVisibleSections((v) => ({ ...v, features: true }));
      }
      if (howItWorks && scrollY > howItWorks.offsetTop + 100) {
        setVisibleSections((v) => ({ ...v, howItWorks: true }));
      }
      if (testimonials && scrollY > testimonials.offsetTop + 100) {
        setVisibleSections((v) => ({ ...v, testimonials: true }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample tutor data
  const featuredTutors = [
    {
      id: 1,
      name: "Sarah Johnson",
      subject: "English Language",
      rating: 4.9,
      reviews: 127,
      price: "₹699/hr",
      offer: "first lesson free!",
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      id: 2,
      name: "David Chen",
      subject: "Mathematics",
      rating: 4.8,
      reviews: 94,
      price: "₹799/hr",
      offer: "first lesson free!",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 3,
      name: "Priya Sharma",
      subject: "Hindi Literature",
      rating: 4.7,
      reviews: 63,
      price: "₹599/hr",
      offer: "first lesson free!",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 4,
      name: "Michael Rodriguez",
      subject: "Spanish Language",
      rating: 4.9,
      reviews: 112,
      price: "₹899/hr",
      offer: "first lesson free!",
      image: "https://randomuser.me/api/portraits/men/42.jpg"
    }
  ];

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "English", "Hindi", 
    "Computer Science", "Biology", "Economics", "History", "Geography",
    "French", "Spanish", "German", "Music", "Art", "Yoga", "Programming"
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Poppins', sans-serif",
        color: "#1F2937",
        scrollBehavior: "smooth",
        backgroundColor: "#ffffffff"
      }}
    >
      {/* Navbar - Updated to match Superprof */}
      <Navbar
        expand="lg"
        style={{
          backgroundColor: "#f9f9f9ff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
        fixed="top"
      >
        <Container>
          <Navbar.Brand
            href="/"
            style={{
              fontWeight: "700",
              fontSize: "1.75rem",
              color: "#f87171ff",
            }}
          >
            Lang++
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav
              className="ms-auto align-items-center"
              style={{ fontWeight: "500", fontSize: "1rem" }}
            >
              <Nav.Link href="/" className="px-3" style={{ color: "#1F2937" }}>
                Home
              </Nav.Link>
              <Nav.Link
                href="/about"
                className="px-3"
                style={{ color: "#1F2937" }}
              >
                About
              </Nav.Link>
              <Nav.Link
                href="/contact"
                className="px-3"
                style={{ color: "#1F2937" }}
              >
                Contact
              </Nav.Link>
              
              {/* Become a Tutor Button */}
              <Button 
                variant="outline-primary" 
                className="ms-3"
                onClick={() => navigate("/author")}
                style={{ 
                  color: "#ff8848ff", 
                  borderColor: "#ff9c4bff",
                  fontWeight: "500"
                }}
              >
                Become a Tutor
              </Button>
              
              {/* Login Button */}
              <Button 
                variant="primary" 
                className="ms-2"
                onClick={() => navigate("/auth")}
                style={{ 
                  backgroundColor: "#ffadadff", 
                  borderColor: "#006CFF",
                  fontWeight: "500"
                }}
              >
                Welcome Student
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer for fixed navbar */}
      <div style={{ height: "76px" }} />

      {/* Hero Section with Search */}
      <section style={{ 
        padding: "60px 0", 
        background: "linear-gradient(to bottom, #e0fdffff 0%, #f8b7b7ff 100%)",
        borderBottom: "1px solid #FFE4D2"
      }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h1 style={{ fontWeight: "700", fontSize: "2.5rem", marginBottom: "1rem", color: "#1F2937" }}>
                Find your perfect tutor
              </h1>
              <p style={{ fontSize: "1.2rem", color: "#6B7280", marginBottom: "2.5rem" }}>
                Thousands of experienced tutors for every subject and level
              </p>
              
              {/* Search Bar */}
              <div style={{ backgroundColor: "white", borderRadius: "50px", padding: "0.5rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                <Row className="g-0">
                  <Col md={5}>
                    <InputGroup style={{ border: "none" }}>
                      <InputGroup.Text style={{ backgroundColor: "transparent", border: "none" }}>
                        <Search color="#6B7280" />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="What do you want to learn?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ border: "none", fontSize: "1rem" }}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={5}>
                    <InputGroup>
                      <InputGroup.Text style={{ backgroundColor: "transparent", border: "none" }}>
                        <Search color="#6B7280" />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Location or online"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        style={{ border: "none", fontSize: "1rem", borderLeft: "1px solid #E5E7EB" }}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={2}>
                    <Button 
                      variant="primary" 
                      style={{ 
                        borderRadius: "50px", 
                        padding: "0.6rem", 
                        width: "100%",
                        backgroundColor: "#FF7138", 
                        borderColor: "#FF7138" 
                      }}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </div>
              
              <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                {["Maths", "Physics", "English", "Programming", "Music"].map((subject, i) => (
                  <Button 
                    key={i}
                    variant="outline-secondary" 
                    size="sm"
                    style={{ borderRadius: "20px", fontSize: "0.9rem" }}
                  >
                    {subject}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "40px 0", backgroundColor: "white" }}>
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-3">
              <h3 style={{ fontWeight: "700", color: "#006CFF", marginBottom: "0.5rem" }}>20,000+</h3>
              <p style={{ color: "#6B7280" }}>Tutors</p>
            </Col>
            <Col md={3} className="mb-3">
              <h3 style={{ fontWeight: "700", color: "#006CFF", marginBottom: "0.5rem" }}>1000+</h3>
              <p style={{ color: "#6B7280" }}>Subjects</p>
            </Col>
            <Col md={3} className="mb-3">
              <h3 style={{ fontWeight: "700", color: "#006CFF", marginBottom: "0.5rem" }}>5,00,000+</h3>
              <p style={{ color: "#6B7280" }}>Students</p>
            </Col>
            <Col md={3} className="mb-3">
              <h3 style={{ fontWeight: "700", color: "#FF7138", marginBottom: "0.5rem" }}>95%</h3>
              <p style={{ color: "#6B7280" }}>Satisfaction Rate</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Tutors Section */}
      <section style={{ padding: "60px 0", backgroundColor: "#F9FAFB" }}>
        <Container>
          <h2 style={{ fontWeight: "700", marginBottom: "2rem", textAlign: "center", color: "#1F2937" }}>
            Featured Tutors
          </h2>
          <Row>
            {featuredTutors.map((tutor) => (
              <Col lg={3} md={6} className="mb-4" key={tutor.id}>
                <Card className="h-100 shadow-sm" style={{ border: "none", borderRadius: "12px", transition: "transform 0.2s" }}>
                  <div style={{ position: "relative" }}>
                    <Card.Img 
                      variant="top" 
                      src={tutor.image}
                      style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                    />
                    <div style={{ 
                      position: "absolute", 
                      top: "10px", 
                      right: "10px", 
                      backgroundColor: "#FF7138", 
                      color: "white", 
                      padding: "4px 8px", 
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      fontWeight: "600"
                    }}>
                      {tutor.offer}
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <Card.Title style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.2rem" }}>
                          {tutor.name}
                        </Card.Title>
                        <Card.Text style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                          {tutor.subject}
                        </Card.Text>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex">
                        {[...Array(5)].map((_, i) => (
                          i < Math.floor(tutor.rating) ? 
                            <StarFill key={i} color="#FFC107" size={14} /> : 
                            <Star key={i} color="#E5E7EB" size={14} />
                        ))}
                      </div>
                      <span style={{ marginLeft: "5px", fontSize: "0.9rem", color: "#6B7280" }}>
                        ({tutor.reviews} reviews)
                      </span>
                    </div>
                    <div className="mt-auto">
                      <div style={{ fontWeight: "600", color: "#1F2937", marginBottom: "0.5rem" }}>
                        {tutor.price}
                      </div>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        style={{ 
                          width: "100%",
                          color: "#FF7138",
                          borderColor: "#FF7138"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#FF7138";
                          e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#FF7138";
                        }}
                      >
                        Contact Tutor
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button 
              variant="primary" 
              onClick={() => navigate("/tutors")}
              style={{ backgroundColor: "#FF7138", borderColor: "#FF7138" }}
            >
              View All Tutors
            </Button>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        style={{
          padding: "60px 0",
          backgroundColor: "white",
          opacity: visibleSections.howItWorks ? 1 : 0,
          transform: visibleSections.howItWorks ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s ease",
        }}
      >
        <Container>
          <h2 style={{ fontWeight: "700", marginBottom: "3rem", textAlign: "center", color: "#1F2937" }}>
            How Lang++ Works
          </h2>
          <Row className="g-4">
            <Col md={4} className="text-center">
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#EFF6FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}>
                  <span style={{ fontSize: "2rem", fontWeight: "700", color: "#006CFF" }}>1</span>
                </div>
                <h5 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Find Your Tutor</h5>
                <p style={{ color: "#6B7280" }}>
                  Search by subject, location, or level and browse tutor profiles with reviews.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#FFF6F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}>
                  <span style={{ fontSize: "2rem", fontWeight: "700", color: "#FF7138" }}>2</span>
                </div>
                <h5 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Contact Free</h5>
                <p style={{ color: "#6B7280" }}>
                  Message tutors for free and many offer their first lesson at no cost.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#EFF6FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}>
                  <span style={{ fontSize: "2rem", fontWeight: "700", color: "#006CFF" }}>3</span>
                </div>
                <h5 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Learn & Grow</h5>
                <p style={{ color: "#6B7280" }}>
                  Organize your lessons and track your progress with your perfect tutor.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Subjects Section */}
      <section style={{ padding: "60px 0", backgroundColor: "#F9FAFB" }}>
        <Container>
          <h2 style={{ fontWeight: "700", marginBottom: "2rem", textAlign: "center", color: "#1F2937" }}>
            Popular Subjects
          </h2>
          <Row>
            {subjects.map((subject, i) => (
              <Col lg={3} md={4} sm={6} key={i} className="mb-3">
                <div style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "all 0.2s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFF6F0";
                  e.currentTarget.style.color = "#FF7138";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#1F2937";
                }}
                >
                  {subject}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "80px 0", backgroundColor: "#006CFF", color: "white" }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 style={{ fontWeight: "700", marginBottom: "1.5rem" }}>Ready to start learning?</h2>
              <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
                Join thousands of students finding their perfect tutor on Lang++
              </p>
              <Button 
                variant="light" 
                size="lg" 
                style={{ 
                  borderRadius: "50px", 
                  padding: "0.75rem 2rem",
                  fontWeight: "600",
                  color: "#006CFF"
                }}
                onClick={() => navigate("/auth")}
              >
                Find Your Tutor Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#1F2937", color: "#D1D5DB", padding: "60px 0 30px" }}>
        <Container>
          <Row>
            <Col lg={4} className="mb-4">
              <h5 style={{ color: "white", fontWeight: "600", marginBottom: "1.5rem" }}>Lang++</h5>
              <p>Connecting students with the perfect tutors for personalized learning experiences.</p>
            </Col>
            <Col lg={2} md={4} className="mb-4">
              <h6 style={{ color: "white", fontWeight: "600", marginBottom: "1rem" }}>Company</h6>
              <div className="d-flex flex-column">
                <a href="/about" style={{ color: "#D1D5DB", textDecoration: "none", marginBottom: "0.5rem" }}>About Us</a>
                <a href="/contact" style={{ color: "#D1D5DB", textDecoration: "none", marginBottom: "0.5rem" }}>Contact</a>
                <a href="/careers" style={{ color: "#D1D5DB", textDecoration: "none", marginBottom: "0.5rem" }}>Careers</a>
              </div>
            </Col>
            <Col lg={2} md={4} className="mb-4">
              <h6 style={{ color: "white", fontWeight: "600", marginBottom: "1rem" }}>Resources</h6>
              <div className="d-flex flex-column">
                <a href="/blog" style={{ color: "#D1D5DB", textDecoration: "none", marginBottom: "0.5rem" }}>Blog</a>
                <a href="/help" style={{ color: "#D1D5DB", textDecoration: "none", marginBottom: "0.5rem" }}>Help Center</a>
                <a href="/faq" style={{ color: "#D1D5DB", textDecoration: "none", marginBottom: "0.5rem" }}>FAQ</a>
              </div>
            </Col>
            <Col lg={2} md={4} className="mb-4">
              <h6 style={{ color: "white", fontWeight: "600", marginBottom: "1rem" }}>Legal</h6>
              <div className="d-flex flex-column">
                <a href="/terms" style={{ color: "#D1D5DB", textDecoration: "none", marginBottom: "0.5rem" }}>Terms of Use</a>
                <a href="/privacy" style={{ color: "#D1D5DB", textDecoration: "none", marginBottom: "0.5rem" }}>Privacy Policy</a>
                <a href="/cookies" style={{ color: "#D1D5DB", textDecoration: "none", marginBottom: "0.5rem" }}>Cookie Policy</a>
              </div>
            </Col>
            <Col lg={2} className="mb-4">
              <h6 style={{ color: "white", fontWeight: "600", marginBottom: "1rem" }}>Follow Us</h6>
              <div className="d-flex">
                <a href="#" style={{ color: "#D1D5DB", marginRight: "1rem" }}>FB</a>
                <a href="#" style={{ color: "#D1D5DB", marginRight: "1rem" }}>TW</a>
                <a href="#" style={{ color: "#D1D5DB", marginRight: "1rem" }}>IG</a>
                <a href="#" style={{ color: "#D1D5DB" }}>YT</a>
              </div>
            </Col>
          </Row>
          <hr style={{ borderColor: "#374151", margin: "2rem 0" }} />
          <div className="text-center">
            <p style={{ fontSize: "0.9rem", color: "#9CA3AF" }}>
              © {new Date().getFullYear()} Lang++. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>

      {/* Animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
          }
        `}
      </style>
    </div>
  );
};

export default Frontpage;