
// import Dashboard from './Dashboard';
// import React, { useState } from "react";

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

// import './Loginpage.css';

// import { useNavigate } from "react-router-dom";






// const Loginpage = () => {
//   const [data, setData] = useState({
//     name: "",
//     password: "",
//   });


//   const [login, setLogin] = useState(false);
//   const [message, setMessage] = useState("");


//   const handle = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validate = (e) => {
//     e.preventDefault();
//     const { name, password } = data;

//     if (name === "ABC" && password === "ABC123") {
//       setMessage("Login successful!");
//       setLogin(true);
//     } else {
//       setMessage("Invalid credentials! Try again.");
//       setLogin(false);
//     }
//   };

  // Dummy Dashboard component
  // const Dashboard = () => {
  //   return (
  //     <div>
  //       <h2>Welcome to the Dashboard!</h2>
  //       <p>You have successfully logged in.</p>
  //     </div>
  //   );
  // };

  // Show dashboard if logged in

//   if (login) {
//     return <Dashboard />;
//   }

// else


// const Loginpage = ({ data }) => {
//   const [data, setData] = useState({ name: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };


//   const handle = (e) => {
//     e.preventDefault();
//     if (
//       data.name === data.name &&
//       data.password === data.password
//     ) {
//       setMessage("Login successful!");
//       navigate("/dashboard");
//     } else {
//       setMessage("Invalid credentials! Try again.");
//     }
//   };


//   return (
//     <>

//     <Navbar bg="dark" data-bs-theme="dark">
//         <Container>
//           <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#features">Features</Nav.Link>
//             <Nav.Link href="#pricing">Pricing</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//       <br /><br />
//       <div className="wrapper">

//       <div className='kk'
//       >
//       <Form onSubmit={validate}>
//         <Form.Group className="mb-3" controlId="formGroupName">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter name"
//             name="name"
//             value={data.name}
//             onChange={handle}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formGroupPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter password"
//             name="password"
//             value={data.password}
//             onChange={handle}
//           />
//         </Form.Group>
        

//         <Button variant="primary" type="submit">Login</Button>
//         <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>
//       </Form>
//       </div>
//       </div>
//     </>
//   );
// };

// export default Loginpage;





// const Loginpage = ({ signupData }) => {
//   const [data, setData] = useState({ name: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (
//       data.name === signupData.name &&
//       data.password === signupData.password
//     ) {
//       setMessage("Login successful!");
//       navigate("/dashboard");
//     } else {
//       setMessage("Invalid credentials! Try again.");
//     }
//   };

//   return (
//     <>
//       <h2>Login Page</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Enter Name"
//           value={data.name}
//           onChange={handleChange}
//         /><br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Password"
//           value={data.password}
//           onChange={handleChange}
//         /><br />
//         <button type="submit">Login</button>
//       </form>
//       <br />
//       <button onClick={() => navigate("/signup")}>Go to Signup</button>
//       <p style={{ color: message.includes("success") ? "green" : "red" }}>
//         {message}
//       </p>
//     </>
//   );
// };

// export default Loginpage;
