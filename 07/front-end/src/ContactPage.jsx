

import React, { useState } from "react";
import { Container, Navbar, Nav, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here (API call or email integration)
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Poppins', sans-serif", color: "#1F2937", backgroundColor: "#ffffff" }}>
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: "#f9f9f9", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }} fixed="top">
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: "700", fontSize: "1.75rem", color: "#f87171" }}>
            Narad
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center" style={{ fontWeight: "500", fontSize: "1rem" }}>
              <Nav.Link href="/" className="px-3" style={{ color: "#1F2937" }}>Home</Nav.Link>
              <Nav.Link href="/about" className="px-3" style={{ color: "#1F2937" }}>About</Nav.Link>
              <Nav.Link href="/contact" className="px-3" style={{ color: "#1F2937" }}>Contact</Nav.Link>
              <Button variant="outline-primary" className="ms-3" onClick={() => navigate("/author")} style={{ color: "#ff8848", borderColor: "#ff9c4b", fontWeight: "500" }}>
                Become a Tutor
              </Button>
              <Button variant="primary" className="ms-2" onClick={() => navigate("/auth")} style={{ backgroundColor: "#ffadad", borderColor: "#006CFF", fontWeight: "500" }}>
                Welcome Student
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer */}
      <div style={{ height: "76px" }} />

      {/* Hero / Contact Intro */}
      <section style={{ padding: "80px 0", backgroundColor: "#F9FAFB", textAlign: "center" }}>
        <Container>
          <h1 style={{ fontWeight: "700", marginBottom: "1rem", color: "#1F2937" }}>Contact BCS Infallible Technology</h1>
          <p style={{ fontSize: "1.2rem", color: "#6B7280", marginBottom: "2rem" }}>
            Have questions about Narad? Reach out to us and we will assist you promptly.
          </p>
        </Container>
      </section>

      {/* Contact Form */}
      <section style={{ padding: "60px 0", backgroundColor: "white" }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button type="submit" style={{ backgroundColor: "#FF7138", borderColor: "#FF7138", borderRadius: "50px", padding: "0.6rem 2rem" }}>
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#1F2937", color: "#D1D5DB", padding: "60px 0 30px" }}>
        <Container>
          <Row>
            <Col lg={6} className="mb-4">
              <h5 style={{ color: "white", fontWeight: "600", marginBottom: "1.5rem" }}>BCS Infallible Technology</h5>
              <p>Technology, Information and Internet </p>
              <p> Agra, Uttar Pradesh </p>
             
            </Col>
            <Col lg={6} className="mb-4">
              <h5 style={{ color: "white", fontWeight: "600", marginBottom: "1.5rem" }}>Follow Us</h5>
              <div className="d-flex">
                <a href="https://www.facebook.com/bcstechone/photos/d41d8cd9/1068639748610998/?_rdr" style={{ color: "#D1D5DB", marginRight: "1rem" }}>FB</a>
                <a href="https://www.linkedin.com/company/bcsclick.com/?originalSubdomain=in" style={{ color: "#D1D5DB", marginRight: "1rem" }}>Lk</a>
                <a href="#" style={{ color: "#D1D5DB", marginRight: "1rem" }}>IG</a>
                <a href="#" style={{ color: "#D1D5DB" }}>YT</a>
              </div>
            </Col>
          </Row>
          <hr style={{ borderColor: "#374151", margin: "2rem 0" }} />
          <div className="text-center">
            <p style={{ fontSize: "0.9rem", color: "#9CA3AF" }}>
              © {new Date().getFullYear()} Narad / BCS Infallible Technology. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default ContactPage;
