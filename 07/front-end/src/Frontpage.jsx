



import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CheckCircleFill } from "react-bootstrap-icons"; // for check icons
import "bootstrap/dist/css/bootstrap.min.css";

const Frontpage = () => {
  const navigate = useNavigate();

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

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Poppins', sans-serif",
        color: "#f0f0f0",
        scrollBehavior: "smooth",
      }}
    >
      {/* Navbar */}
      <Navbar
        expand="lg"
        variant="dark"
        style={{
          backgroundColor: "rgba(0,0,0,0.85)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.7)",
        }}
        fixed="top"
      >
        <Container>
          <Navbar.Brand
            href="/"
            style={{
              fontWeight: "900",
              fontSize: "1.75rem",
              letterSpacing: "2px",
              color: "#61dafb",
              textShadow: "0 0 8px #61dafb",
            }}
          >
            Lang++
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav
              className="ms-auto"
              style={{ fontWeight: "600", fontSize: "1.1rem" }}
            >
              <Nav.Link href="/" className="px-3" style={{ color: "#a0d8f7" }}>
                Home
              </Nav.Link>
              <Nav.Link
                href="/about"
                className="px-3"
                style={{ color: "#a0d8f7" }}
              >
                About
              </Nav.Link>
              <Nav.Link
                href="/contact"
                className="px-3"
                style={{ color: "#a0d8f7" }}
              >
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer for fixed navbar */}
      <div style={{ height: "70px" }} />

      {/* Hero Section */}
      <Container
        className="flex-grow-1 d-flex align-items-center justify-content-center"
        style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
      >
        <div
          className="p-5 rounded-4 shadow-lg bg-light"
          style={{
            maxWidth: "900px",
            width: "100%",
            animation: "fadeInUp 1s ease forwards",
            borderRadius: "30px",
          }}
        >
          <h2
            className="text-center mb-5"
            style={{
              fontWeight: "800",
              color: "#2c3e50",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              animation: "fadeIn 1.5s ease forwards",
            }}
          >
            Welcome to Lang++
          </h2>
          <Row>
            {/* Student Card */}
            <Col md={6} className="mb-4">
              <Card
                className="h-100 shadow border-0"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(97, 218, 251, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                }}
              >
                <Card.Img
                  variant="top"
                  src="https://imgs.search.brave.com/vxUenfK6dVrHa28Z7Ef3CD7nz0vXApZ8fEtSkhioRJw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXQt/dGVhY2hlci1pdHMt/c3R1ZGVudHMtd3Jv/dGUtY2hhbGtib2Fy/ZC13ZWxjb21lLWJh/Y2stdG8tc2Nob29s/LWNsYXNzcm9vbS0y/MDExMDc2NTQuanBn"
                  style={{ height: "230px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    className="text-center"
                    style={{
                      fontWeight: "700",
                      fontSize: "1.5rem",
                      color: "#007bff",
                    }}
                  >
                    Student
                  </Card.Title>
                  <Card.Text
                    className="text-center text-secondary flex-grow-1"
                    style={{ fontSize: "1rem" }}
                  >
                    Access lessons, track progress, and connect with expert
                    teachers.
                  </Card.Text>
                  <Button
                    variant="primary"
                    size="lg"
                    className="mt-auto"
                    onClick={() => navigate("/auth")}
                    style={{
                      fontWeight: "600",
                      letterSpacing: "1px",
                      boxShadow: "0 5px 15px rgba(0,123,255,0.4)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#0056b3";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(0,86,179,0.7)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.boxShadow =
                        "0 5px 15px rgba(0,123,255,0.4)";
                    }}
                  >
                    Continue as Student
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Teacher Card */}
            <Col md={6} className="mb-4">
              <Card
                className="h-100 shadow border-0"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(40, 167, 69, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                }}
              >
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTYQYD69EjuwaAjTCT8j1c_S59vDkahfyUhw&s"
                  style={{ height: "230px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    className="text-center"
                    style={{
                      fontWeight: "700",
                      fontSize: "1.5rem",
                      color: "#28a745",
                    }}
                  >
                    Teacher
                  </Card.Title>
                  <Card.Text
                    className="text-center text-secondary flex-grow-1"
                    style={{ fontSize: "1rem" }}
                  >
                    Create courses, manage students, and share your expertise.
                  </Card.Text>
                  <Button
                    variant="success"
                    size="lg"
                    className="mt-auto"
                    onClick={() => navigate("/author")}
                    style={{
                      fontWeight: "600",
                      letterSpacing: "1px",
                      boxShadow: "0 5px 15px rgba(40,167,69,0.4)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#1e7e34";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(30,126,52,0.7)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.boxShadow =
                        "0 5px 15px rgba(40,167,69,0.4)";
                    }}
                  >
                    Continue as Teacher
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Features Section */}
      <section
        id="features"
        className={`py-5 px-3 px-md-5`}
        style={{
          backgroundColor: "#f7f9fc",
          color: "#222",
          borderRadius: "30px 30px 0 0",
          marginTop: "3rem",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          opacity: visibleSections.features ? 1 : 0,
          transform: visibleSections.features ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s ease",
        }}
      >
        <Container>
          <h3 className="text-center mb-4" style={{ fontWeight: "700", color: "#0d6efd" }}>
            Why Choose Lang++?
          </h3>
          <Row className="gx-4 gy-4 justify-content-center">
            {[
              "Personalized Learning Paths tailored for every student.",
              "Live interactive sessions with expert teachers.",
              "Track your progress and get real-time feedback.",
              "Create and manage courses easily as a teacher.",
              "Community-driven platform for peer support.",
            ].map((feature, i) => (
              <Col key={i} xs={12} md={6} lg={4}>
                <div
                  className="d-flex align-items-start"
                  style={{
                    gap: "10px",
                    padding: "1rem",
                    backgroundColor: "#e9f1ff",
                    borderRadius: "12px",
                    boxShadow: "0 5px 15px rgba(13,110,253,0.2)",
                    fontWeight: "600",
                    fontSize: "1rem",
                    color: "#0d6efd",
                  }}
                >
                  <CheckCircleFill size={24} color="#0d6efd" />
                  <span>{feature}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className={`py-5 px-3 px-md-5 mt-5`}
        style={{
          backgroundColor: "#0d6efd",
          color: "white",
          borderRadius: "30px",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          opacity: visibleSections.howItWorks ? 1 : 0,
          transform: visibleSections.howItWorks
            ? "translateY(0)"
            : "translateY(40px)",
          transition: "all 0.8s ease",
        }}
      >
        <Container>
          <h3 className="text-center mb-4" style={{ fontWeight: "700" }}>
            How It Works
          </h3>
          <Row className="gx-4 gy-4 justify-content-center">
            {[
              {
                title: "Sign Up & Choose Role",
                desc: "Select whether you want to learn as a student or teach as an instructor.",
              },
              {
                title: "Explore Courses & Content",
                desc: "Students can browse courses, watch lessons, and track progress easily.",
              },
              {
                title: "Create & Share",
                desc: "Teachers create engaging content, quizzes, and track students’ success.",
              },
              {
                title: "Community & Support",
                desc: "Engage with peers and instructors to enhance learning outcomes.",
              },
            ].map(({ title, desc }, i) => (
              <Col key={i} xs={12} md={6} lg={3}>
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderRadius: "15px",
                    padding: "1.5rem",
                    height: "100%",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <h5 style={{ fontWeight: "700" }}>{title}</h5>
                  <p style={{ fontSize: "0.95rem", marginTop: "0.8rem" }}>
                    {desc}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className={`py-5 px-3 px-md-5 mt-5 mb-5`}
        style={{
          backgroundColor: "#f7f9fc",
          color: "#222",
          borderRadius: "30px",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          opacity: visibleSections.testimonials ? 1 : 0,
          transform: visibleSections.testimonials
            ? "translateY(0)"
            : "translateY(40px)",
          transition: "all 0.8s ease",
        }}
      >
        <Container>
          <h3 className="text-center mb-5" style={{ fontWeight: "700", color: "#0d6efd" }}>
            What Our Users Say
          </h3>
          <Row className="gx-4 gy-4 justify-content-center">
            {[
              {
                name: "Emily R.",
                role: "Student",
                quote:
                  "Lang++ has completely transformed the way I learn. The personalized lessons and progress tracking keep me motivated.",
              },
              {
                name: "James K.",
                role: "Teacher",
                quote:
                  "Creating courses on Lang++ is so intuitive. The community support makes teaching rewarding.",
              },
              {
                name: "Sofia M.",
                role: "Student",
                quote:
                  "The interactive sessions and feedback helped me improve my language skills faster than I expected!",
              },
            ].map(({ name, role, quote }, i) => (
              <Col key={i} xs={12} md={4}>
                <Card
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0 8px 30px rgba(13,110,253,0.15)",
                    height: "100%",
                  }}
                >
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <blockquote className="blockquote mb-3" style={{ fontStyle: "italic", fontSize: "1rem", color: "#555" }}>
                      “{quote}”
                    </blockquote>
                    <footer
                      className="blockquote-footer"
                      style={{ fontWeight: "600", color: "#0d6efd" }}
                    >
                      {name} <cite title="role">({role})</cite>
                    </footer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "rgba(20, 20, 20, 0.9)",
          color: "#bbb",
          textAlign: "center",
          padding: "20px 0",
          fontSize: "0.9rem",
          fontWeight: "500",
          letterSpacing: "1px",
          userSelect: "none",
        }}
      >
        <Container>
          <p className="mb-0" style={{ fontStyle: "italic" }}>
            © {new Date().getFullYear()} Lang++. All rights reserved.
          </p>
        </Container>
      </footer>

      {/* Animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          /* Smooth fade + scale for cards */
          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .card:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
};

export default Frontpage;
