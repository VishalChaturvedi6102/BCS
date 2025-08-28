

import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState({
    mission: false,
    features: false,
    team: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight;

      const mission = document.getElementById("mission");
      const features = document.getElementById("features");
      const team = document.getElementById("team");

      if (mission && scrollY > mission.offsetTop + 100) {
        setVisibleSections((v) => ({ ...v, mission: true }));
      }
      if (features && scrollY > features.offsetTop + 100) {
        setVisibleSections((v) => ({ ...v, features: true }));
      }
      if (team && scrollY > team.offsetTop + 100) {
        setVisibleSections((v) => ({ ...v, team: true }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", color: "#1F2937", scrollBehavior: "smooth" }}>
      {/* Navbar */}
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
            style={{ fontWeight: "700", fontSize: "1.75rem", color: "#f87171ff" }}
          >
            Narad
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center" style={{ fontWeight: "500", fontSize: "1rem" }}>
              <Nav.Link href="/" className="px-3" style={{ color: "#1F2937" }}>Home</Nav.Link>
              <Nav.Link href="/about" className="px-3" style={{ color: "#1F2937" }}>About</Nav.Link>
              <Nav.Link href="/contact" className="px-3" style={{ color: "#1F2937" }}>Contact</Nav.Link>
              <Button
                variant="outline-primary"
                className="ms-3"
                onClick={() => navigate("/author")}
                style={{ color: "#ff8848ff", borderColor: "#ff9c4bff", fontWeight: "500" }}
              >
                Become a Tutor
              </Button>
              <Button
                variant="primary"
                className="ms-2"
                onClick={() => navigate("/auth")}
                style={{ backgroundColor: "#ffadadff", borderColor: "#006CFF", fontWeight: "500" }}
              >
                Welcome Student
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer */}
      <div style={{ height: "76px" }} />

      {/* Hero Section */}
      <section style={{
        padding: "80px 0",
        background: "linear-gradient(to bottom, #e0fdffff 0%, #f8b7b7ff 100%)",
        textAlign: "center"
      }}>
        <Container>
          <h1 style={{ fontWeight: "700", fontSize: "2.5rem", marginBottom: "1rem", color: "#1F2937" }}>
            About Narad
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#6B7280", maxWidth: "700px", margin: "0 auto" }}>
            Narad is your ultimate platform connecting students with the perfect tutors for every subject, level, and learning style. 
            Our mission is to make learning personalized, accessible, and engaging for everyone.
          </p>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section
        id="mission"
        style={{
          padding: "60px 0",
          backgroundColor: "white",
          opacity: visibleSections.mission ? 1 : 0,
          transform: visibleSections.mission ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s ease",
        }}
      >
        <Container>
          <Row className="g-4 text-center">
            <Col md={6}>
              <h3 style={{ fontWeight: "700", color: "#006CFF", marginBottom: "1rem" }}>Our Mission</h3>
              <p style={{ color: "#6B7280" }}>
                To empower students by connecting them with experienced tutors who make learning engaging, personalized, and effective.
              </p>
            </Col>
            <Col md={6}>
              <h3 style={{ fontWeight: "700", color: "#FF7138", marginBottom: "1rem" }}>Our Vision</h3>
              <p style={{ color: "#6B7280" }}>
                To be the leading platform for online and offline learning, where students find the perfect tutor to achieve their academic goals.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section
        id="features"
        style={{
          padding: "60px 0",
          backgroundColor: "#F9FAFB",
          opacity: visibleSections.features ? 1 : 0,
          transform: visibleSections.features ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s ease",
        }}
      >
        <Container>
          <h2 style={{ fontWeight: "700", marginBottom: "2rem", textAlign: "center", color: "#1F2937" }}>Why Choose Narad</h2>
          <Row className="g-4 text-center">
            <Col md={4}>
              <Card className="h-100 shadow-sm" style={{ border: "none", borderRadius: "12px", padding: "2rem" }}>
                <h4 style={{ color: "#006CFF", marginBottom: "1rem" }}>Expert Tutors</h4>
                <p style={{ color: "#6B7280" }}>Our platform hosts highly qualified tutors with verified credentials and real reviews.</p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm" style={{ border: "none", borderRadius: "12px", padding: "2rem" }}>
                <h4 style={{ color: "#FF7138", marginBottom: "1rem" }}>Flexible Learning</h4>
                <p style={{ color: "#6B7280" }}>Schedule lessons at your convenience, online or offline, and learn at your own pace.</p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm" style={{ border: "none", borderRadius: "12px", padding: "2rem" }}>
                <h4 style={{ color: "#006CFF", marginBottom: "1rem" }}>Progress Tracking</h4>
                <p style={{ color: "#6B7280" }}>Track your learning journey and see measurable improvements with every lesson.</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

     

      {/* CTA Section */}
      <section style={{ padding: "80px 0", backgroundColor: "#006CFF", color: "white", textAlign: "center" }}>
        <Container>
          <h2 style={{ fontWeight: "700", marginBottom: "1.5rem" }}>Join Narad Today</h2>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            Start your learning journey with expert tutors who guide you to success.
          </p>
          <Button
            variant="light"
            size="lg"
            style={{ borderRadius: "50px", padding: "0.75rem 2rem", fontWeight: "600", color: "#006CFF" }}
            onClick={() => navigate("/")}
          >
            Find Your Tutor Now
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default About;
