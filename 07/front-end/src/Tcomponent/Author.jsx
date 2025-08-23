



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


import React, { useState } from 'react';

import SignUpForm from './SignupT' ;
import SignInForm from './LoginT' ;


import './Author.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';

const Author = () => {
    const [isActive, setIsActive] = useState(false);

    function handleSignIn() {
        setIsActive(false) ;
    }

    return (


        <>

        <Navbar bg="dark" variant="dark">
  <Container>
    <Navbar.Brand href="#" className="fw-bold fs-4 text-red">Lang++</Navbar.Brand>
  </Container>
</Navbar>



        <div className='wrapper'>
            <div className={`container2 ${isActive ? 'active' : ''} `} id="container2">
            <div className="form-container2 sign-up text-white">
                <SignUpForm setIsActive={setIsActive} />
            </div>
            <div className="form-container2 sign-in text-white">
                <SignInForm />
            </div>
            <div className="toggle-container2">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1 className='font-bold text-3xl'>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className="" id="login" onClick={handleSignIn}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1 className='font-bold text-3xl'>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className="" id="register" onClick={() => setIsActive(true)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        </div>

        </>
    );
}

export default Author;







