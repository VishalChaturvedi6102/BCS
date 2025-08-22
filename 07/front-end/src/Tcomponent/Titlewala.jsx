

import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Outlet, Link } from "react-router-dom";

const Titlewala = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear teacher session/localStorage and redirect to login
    localStorage.removeItem("teacherUsername");
    navigate("/teacher/login");
  };

  return (
    <>
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/teacher/dashboard")}
        >
          Teacher Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="teacher-navbar-nav" />
        <Navbar.Collapse id="teacher-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/Teacherdashboard")}>
              Dashboard
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/informationteach")}>
              Teacher info
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/Createcourse")}>
              Create Course
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/Teachercalendar")}>
              Calendar
            </Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown title="Profile" id="teacher-nav-dropdown" align="end">
              <NavDropdown.Item onClick={() => navigate("/teacher/profile")}>
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


 <Container className="mt-0 pt-0">
        <Outlet /> 
      </Container>
      </>
  );
};

export default Titlewala;
