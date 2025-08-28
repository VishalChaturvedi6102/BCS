

// import React from "react";
// import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// import { Outlet, Link } from "react-router-dom";

// const Titlewala = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear teacher session/localStorage and redirect to login
//     localStorage.removeItem("teacherUsername");
//     sessionStorage.removeItem("tutorUsername");
//     sessionStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <>
//     <Navbar bg="success" variant="dark" expand="lg" sticky="top">
//       <Container>
//         <Navbar.Brand
//           style={{ cursor: "pointer" }}
//           // onClick={() => navigate("")}
//         >
//           Teacher Portal
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="teacher-navbar-nav" />
//         <Navbar.Collapse id="teacher-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link onClick={() => navigate("/Teacherdashboard")}>
//               Dashboard
//             </Nav.Link>
//             <Nav.Link onClick={() => navigate("/informationteach")}>
//               Teacher info
//             </Nav.Link>
//             <Nav.Link onClick={() => navigate("/Createcourse")}>
//               Header Subjects
//             </Nav.Link>
//             <Nav.Link onClick={() => navigate("/Teachercalendar")}>
//               Calendar
//             </Nav.Link>
//             <Nav.Link onClick={() => navigate("/Customcourses")}>
//               Create Course
//             </Nav.Link>
//           </Nav>

//           <Nav>
//             <NavDropdown title="Profile" id="teacher-nav-dropdown" align="end">
//               <NavDropdown.Item onClick={() => navigate("/teacher/profile")}>
//                 View Profile
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>


//  <Container className="mt-0 pt-0">
//         <Outlet /> 
//       </Container>
//       </>
//   );
// };

// export default Titlewala;






// import React from "react";
// import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import { useNavigate, Outlet } from "react-router-dom";

// const Titlewala = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear teacher session/localStorage and redirect to login
//     localStorage.removeItem("teacherUsername");
//     sessionStorage.removeItem("tutorUsername");
//     sessionStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <>
//       <Navbar
//         expand="lg"
//         sticky="top"
//         style={{
//           background: "linear-gradient(to right, #fff1f1ff, #ffa1a1ff, #7ff4ffff, blue)", // Narad gradient
//         }}
//         variant="dark"
//         className="shadow-lg"
//       >
//         <Container>
//           <Navbar.Brand
//             style={{
//               cursor: "pointer",
//               fontWeight: "bold",
//               fontSize: "1.8rem",
//               color: "#f43f5e", // Narad red accent
//               letterSpacing: "1px",
//             }}
//             onClick={() => navigate("/Teacherdashboard")}
//           >
//             Narad
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="teacher-navbar-nav" />
//           <Navbar.Collapse id="teacher-navbar-nav">
//             <Nav className="me-auto">
//               {[
//                 { path: "/Teacherdashboard", label: "Dashboard" },
//                 { path: "/informationteach", label: "Teacher Info" },
//                 { path: "/Createcourse", label: "Header Subjects" },
//                 { path: "/Teachercalendar", label: "Calendar" },
//                 { path: "/Customcourses", label: "Create Course" },
//               ].map((link, idx) => (
//                 <Nav.Link
//                   key={idx}
//                   onClick={() => navigate(link.path)}
//                   style={{
//                     color: "white",
//                     marginRight: "0.8rem",
//                     fontWeight: 500,
//                   }}
//                   className="nav-link-hover"
//                 >
//                   {link.label}
//                 </Nav.Link>
//               ))}
//             </Nav>

//             <Nav>
//               <NavDropdown
//                 title="Profile"
//                 id="teacher-nav-dropdown"
//                 align="end"
//                 menuVariant="dark"
//               >
//                 <NavDropdown.Item onClick={() => navigate("/teacher/profile")}>
//                   View Profile
//                 </NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item onClick={handleLogout}>
//                   Logout
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Container className="mt-3">
//         <Outlet />
//       </Container>

//       <style>
//         {`
//           .nav-link-hover {
//             transition: color 0.2s ease-in-out;
//           }
//           .nav-link-hover:hover {
//             color: #f43f5e !important; /* Narad red hover */
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Titlewala;














import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";

const Titlewala = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear teacher session/localStorage and redirect to login
    localStorage.removeItem("teacherUsername");
    sessionStorage.removeItem("tutorUsername");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        style={{
          background:
            "linear-gradient(to right, #fff1f1ff, #ffa1a1ff, #7ff4ffff, blue)", // Narad gradient
        }}
        variant="dark"
        className="shadow-lg"
      >
        <Container>
          <Navbar.Brand
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.8rem",
              color: "#f43f5e", // Narad red accent
              letterSpacing: "1px",
            }}
            onClick={() => navigate("/Teacherdashboard")}
          >
            Narad
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="teacher-navbar-nav" />
          <Navbar.Collapse id="teacher-navbar-nav">
            <Nav className="me-auto">
              {[
                { path: "/Teacherdashboard", label: "Dashboard" },
                { path: "/informationteach", label: "Teacher Info" },
                { path: "/Createcourse", label: "Header Subjects" },
                { path: "/Teachercalendar", label: "Calendar" },
                { path: "/Customcourses", label: "Create Course" },
              ].map((link, idx) => (
                <Nav.Link
                  key={idx}
                  onClick={() => navigate(link.path)}
                  style={{
                    color: "white",
                    marginRight: "0.8rem",
                    fontWeight: 500,
                  }}
                  className="nav-link-hover"
                >
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>

            <Button
              variant="outline-danger"
              onClick={handleLogout}
              style={{ fontWeight: 600 }}
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Outlet />
      </Container>

      <style>
        {`
          .nav-link-hover {
            transition: color 0.2s ease-in-out;
          }
          .nav-link-hover:hover {
            color: #f43f5e !important; /* Narad red hover */
          }
        `}
      </style>
    </>
  );
};

export default Titlewala;
