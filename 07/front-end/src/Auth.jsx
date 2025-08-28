

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
// import './Auth.css';
// import SignUpForm from './SignupS' ;
// import SignInForm from './LoginS' ;

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Container } from 'react-bootstrap';

// const Auth = () => {
//     const [isActive, setIsActive] = useState(false);

//     function handleSignIn() {
//         setIsActive(false) ;
//     }

//     return (


//         <>

//         <Navbar bg="dark" variant="dark">
//   <Container>
//     <Navbar.Brand href="#" className="fw-bold fs-4 text-red">Lang++</Navbar.Brand>
//   </Container>
// </Navbar>



//         <div className='wrapper'>
//             <div className={`container2 ${isActive ? 'active' : ''} `} id="container2">
//             <div className="form-container2 sign-up text-white">
//                 <SignUpForm setIsActive={setIsActive} />
//             </div>
//             <div className="form-container2 sign-in text-white">
//                 <SignInForm />
//             </div>
//             <div className="toggle-container2">
//                 <div className="toggle">
//                     <div className="toggle-panel toggle-left">
//                         <h1 className='font-bold text-3xl'>Welcome Back!</h1>
//                         <p>Enter your personal details to use all of site features</p>
//                         <button className="" id="login" onClick={handleSignIn}>Sign In</button>
//                     </div>
//                     <div className="toggle-panel toggle-right">
//                         <h1 className='font-bold text-3xl'>Hello, Friend!</h1>
//                         <p>Register with your personal details to use all of site features</p>
//                         <button className="" id="register" onClick={() => setIsActive(true)}>Sign Up</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </div>

//         </>
//     );
// }

// export default Auth;




// import React, { useState } from 'react';
// import './Auth.css';
// import SignUpForm from './SignupS';
// import SignInForm from './LoginS';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Container } from 'react-bootstrap';

// const Auth = () => {
//     const [isActive, setIsActive] = useState(false);

//     function handleSignIn() {
//         setIsActive(false);
//     }

//     return (
//         <>
//             <Navbar bg="dark" variant="dark">
//                 <Container>
//                     <Navbar.Brand href="#" className="fw-bold fs-4 text-red">Narad</Navbar.Brand>
//                 </Container>
//             </Navbar>

//             <div className='auth-wrapper'>
//                 <div className={`auth-container ${isActive ? 'auth-active' : ''}`} id="auth-container">
//                     <div className="auth-form-container auth-sign-up text-white">
//                         <SignUpForm setIsActive={setIsActive} />
//                     </div>
//                     <div className="auth-form-container auth-sign-in text-white">
//                         <SignInForm />
//                     </div>
//                     <div className="auth-toggle-container">
//                         <div className="auth-toggle">
//                             <div className="auth-toggle-panel auth-toggle-left">
//                                 <h1 className='font-bold text-3xl'>Welcome Back Students!</h1>
//                                 <p>Enter your personal details to use all of site features</p>
//                                 <button id="login" onClick={handleSignIn}>Sign In</button>
//                             </div>
//                             <div className="auth-toggle-panel auth-toggle-right">
//                                 <h1 className='font-bold text-3xl'>Hiii Students!</h1>
//                                 <p>Register with your personal details to use all of site features</p>
//                                 <button id="register" onClick={() => setIsActive(true)}>Sign Up</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Auth;




import React, { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignupS";
import SignInForm from "./LoginS";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";

const Auth = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => setIsActive(false);

  return (
    <>
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
            style={{
              fontWeight: "700",
              fontSize: "1.75rem",
              color: "#f87171ff",
            }}
          >
            Narad
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center" style={{ fontWeight: "500", fontSize: "1rem" }}>
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
                  color: "#ff8848ff",
                  borderColor: "#ff9c4bff",
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

      {/* Auth Form Section */}
      <div
        className="auth-wrapper"
        style={{
          minHeight: "calc(100vh - 76px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom, #e0fdffff 0%, #f8b7b7ff 100%)",
        }}
      >
        <div className={`auth-container ${isActive ? "auth-active" : ""}`} id="auth-container">
          {/* Sign Up Form */}
          <div className="auth-form-container auth-sign-up text-white">
            <SignUpForm setIsActive={setIsActive} />
          </div>

          {/* Sign In Form */}
          <div className="auth-form-container auth-sign-in text-white">
            <SignInForm />
          </div>

          {/* Toggle Panels */}
          <div className="auth-toggle-container">
            <div className="auth-toggle">
              <div className="auth-toggle-panel auth-toggle-left">
                <h1 className="font-bold text-3xl">Welcome Back Students!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button id="login" onClick={handleSignIn}>
                  Sign In
                </button>
              </div>
              <div className="auth-toggle-panel auth-toggle-right">
                <h1 className="font-bold text-3xl">Hiii Students!</h1>
                <p>Register with your personal details to use all of site features</p>
                <button id="register" onClick={() => setIsActive(true)}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Fonts and Animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          .auth-container {
            transition: all 0.6s ease-in-out;
          }
          .auth-active .auth-sign-in {
            transform: translateX(100%);
          }
          .auth-active .auth-sign-up {
            transform: translateX(100%);
          }
        `}
      </style>
    </>
  );
};

export default Auth;
