




import React,{useState, useEffect} from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Container, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
// import './KK.css';
// import {jwtDecode} from "jwt-decode";
// import Cookies from "js-cookie";







const Layout = () => {
  //  const guser = JSON.parse(localStorage.getItem("guser"));

    const navigate = useNavigate();

    // themechanger with (localstorage)
    // const[theme, settheme] = useState("light");
    // // mood with cookies
    // const [mood, setMood] = useState("");



   




  
  const handleLogout = () => {
    // localStorage.removeItem("token");
     sessionStorage.removeItem("token");
    navigate("/"); 
  };



  
  
  return (
    <>
      <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/"> Lang ++</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">

 <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>


              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
              <Nav.Link as={Link} to="/newcourses">New Courses</Nav.Link>
              <NavDropdown title="More">
                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/registerform">Resgistration Form</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/multiform">Multi Form</NavDropdown.Item>

              </NavDropdown>
            </Nav>


    {/*  */}

 



        <Form className="d-flex">
              <Form.Control type="search" placeholder="Search" className="me-2" />
              <Button variant="outline-success" className="me-2">Search</Button>
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </Form>



         
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-0 pt-0">
        <Outlet /> 
      </Container>
    </>
  );
};

export default Layout;
