



// // Auth.jsx
// import React, { useState } from 'react';
// import SignInForm from './LoginS';
// import SignUpForm from './SignupS';
// import './AuthToggle.css';

// const Auth = () => {
//   const [isSignUp, setIsSignUp] = useState(false);

//   const toggleMode = () => setIsSignUp(prev => !prev);

//   return (
//     <div className={`auth-container ${isSignUp ? 'right-panel-active' : ''}`}>
//       <div className="form-container sign-up-container">
//         <SignUpForm />
//       </div>
//       <div className="form-container sign-in-container">
//         <SignInForm />
//       </div>
//       <div className="overlay-container">
//         <div className="overlay">
//           <div className="overlay-panel overlay-left">
//             <h1>Welcome Back!</h1>
//             <p>To keep connected with us please login with your personal info</p>
//             <button className="ghost btn btn-outline-light" onClick={toggleMode}>Sign In</button>
//           </div>
//           <div className="overlay-panel overlay-right">
//             <h1>Hello, Friend!</h1>
//             <p>Enter your personal details and start your journey with us</p>
//             <button className="ghost btn btn-outline-light" onClick={toggleMode}>Sign Up</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;


// import React, { useState } from 'react';
// import SignUpForm from './SignupT';
// import SignInForm from './LoginT';
// import './Author.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Container } from 'react-bootstrap';

// const Author = () => {
//   const [isActive, setIsActive] = useState(false);

//   function handleSignIn() {
//     setIsActive(false);
//   }

//   return (
//     <>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="#" className="fw-bold fs-4 text-red">
//             Narad
//           </Navbar.Brand>
//         </Container>
//       </Navbar>

//       <div className="wrapper">
//         <div
//           className={`container2 ${isActive ? 'active' : ''}`}
//           id="container2"
//         >
//           {/* Sign Up */}
//           <div className="form-container2 sign-up text-white">
//             <SignUpForm setIsActive={setIsActive} />
//           </div>

//           {/* Sign In */}
//           <div className="form-container2 sign-in text-white">
//             <SignInForm />
//           </div>

//           {/* Toggle Container */}
//           <div className="toggle-container2">
//             <div className="toggle">
//               <div className="toggle-panel toggle-left">
//                 <h1 className="font-bold text-3xl">Welcome Back Teachers!</h1>
//                 <p>Enter your personal details to use all of site features</p>
//                 <button className="btn btn-light" id="login" onClick={handleSignIn}>
//                   Sign In
//                 </button>
//               </div>
//               <div className="toggle-panel toggle-right">
//                 <h1 className="font-bold text-3xl">Be a Teacher!</h1>
//                 <p>Register with your personal details to use all of site features</p>
//                 <button
//                   className="btn btn-light"
//                   id="register"
//                   onClick={() => setIsActive(true)}
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Author;






import React, { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignupT";
import SignInForm from "./LoginT";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Author.css";

const Author = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  function handleSignIn() {
    setIsActive(false);
  }

  return (
    <>
      {/* Narad Navbar (same as Auth page) */}
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
              color: "#7C3AED", // purple for Teacher theme
            }}
          >
            Narad
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
              <Nav.Link href="/About" className="px-3" style={{ color: "#1F2937" }}>
                About
              </Nav.Link>
              <Nav.Link href="/contact" className="px-3" style={{ color: "#1F2937" }}>
                Contact
              </Nav.Link>

              {/* Back Button */}
              <Button
                variant="outline-primary"
                className="ms-3"
                onClick={() => navigate(-1)}
                style={{
                  color: "#7C3AED",
                  borderColor: "#7C3AED",
                  fontWeight: "500",
                }}
              >
                Back
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer for fixed navbar */}
      <div style={{ height: "76px" }} />

      {/* Auth Wrapper */}
      <div className="wrapper">
        <div
          className={`container2 ${isActive ? "active" : ""}`}
          id="container2"
        >
          {/* Sign Up */}
          <div className="form-container2 sign-up text-white">
            <SignUpForm setIsActive={setIsActive} />
          </div>

          {/* Sign In */}
          <div className="form-container2 sign-in text-white">
            <SignInForm />
          </div>

          {/* Toggle Container */}
          <div className="toggle-container2">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1 className="font-bold text-3xl">Welcome Back Teachers!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button
                  className="btn"
                  id="login"
                  style={{
                    backgroundColor: "#7C3AED",
                    color: "white",
                    fontWeight: "600",
                    borderRadius: "25px",
                    padding: "10px 25px",
                  }}
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1 className="font-bold text-3xl">Be a Teacher!</h1>
                <p>Register with your personal details to use all of site features</p>
                <button
                  className="btn"
                  id="register"
                  style={{
                    backgroundColor: "#7C3AED",
                    color: "white",
                    fontWeight: "600",
                    borderRadius: "25px",
                    padding: "10px 25px",
                  }}
                  onClick={() => setIsActive(true)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Author;
