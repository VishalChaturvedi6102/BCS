
// import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';

// const Login = () => {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
    
//     password: "",
//   });

//   const [flag, setFlag] = useState(0);
//   const [message, setMessage] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validate = (e) => {
//     e.preventDefault();
//     const { name } = data;

//     if (name.trim() === "") {
//       setMessage("Name is required!");
//       setSuccess(false);
//       return false;
//     } else if (!/^[a-zA-Z0-9]+$/.test(name)) {
//       setMessage("Invalid name! No special characters allowed.");
//       setSuccess(false);
//       return false;
//     } else {
//       setMessage("Valid name");
//       setSuccess(true);
//       return true;
//     }
//   };

//   const handleSubmit = (e) => {
//     if (validate(e)) {
//       setFlag(1);  // show dashboard
//     } else {
//       setFlag(0);  // stay on login
//     }
//   };

//   if (flag === 1) {
//     return (
//       <>
//         <h2>Dashboard</h2>
//         <p><strong>Name:</strong> {data.name}</p>

//         <p><strong>Email:</strong> {data.email}</p>
       
//         <p><strong>Password:</strong> {data.password}</p>
//       </>
//     );
//   }

//   return (
//     <>
//       <h3>Login Page</h3>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={data.name}
//         onChange={handleChange}
//       />
//       <p>{message}</p>

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={data.email}
//         onChange={handleChange}
//       />
//       <br /><br />

     
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={data.password}
//         onChange={handleChange}
//       />
//       <br /><br />

//       <Button as="input" type="submit" value="Login" onClick={handleSubmit} />
//     </>
//   );
// };

// export default Login;




// import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';

// const Login = () => {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [flag, setFlag] = useState(0);
//   const [message, setMessage] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validate = (e) => {
//     e.preventDefault();
//     const { name } = data;

//     if (name.trim() === "") {
//       setMessage("Name is required!");
//       setSuccess(false);

//       // Reset form
//       setData({ name: "", email: "", password: "" });
//       setFlag(0);
//       return false;
//     } else if (!/^[a-zA-Z0-9]+$/.test(name)) {
//       setMessage("Invalid name! No special characters allowed.");
//       setSuccess(false);

//       // Reset form
//       setData({ name: "", email: "", password: "" });
//       setFlag(0);
//       return false;
//     } else {
//       setMessage("Valid name");
//       setSuccess(true);
//       return true;
//     }
//   };

//   const handleSubmit = (e) => {
//     if (validate(e)) {
//       setFlag(1);  // go to dashboard
//     } else {
//       setFlag(0);  // stay on login
//     }
//   };

//   if (flag === 1) {
//     return (
//       <>
//         <h2>Dashboard</h2>
//         <p><strong>Name:</strong> {data.name}</p>
//         <p><strong>Email:</strong> {data.email}</p>
//         <p><strong>Password:</strong> {data.password}</p>
//       </>
//     );
//   }

//   return (
//     <>
//       <h3>Login Page</h3>

//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={data.name}
//         onChange={handleChange}
//       />
//       <p style={{ color: success ? "green" : "red" }}>{message}</p>

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={data.email}
//         onChange={handleChange}
//       />
//       <br /><br />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={data.password}
//         onChange={handleChange}
//       />
//       <br /><br />

//       <Button as="input" type="submit" value="Login" onClick={handleSubmit} />
//     </>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';

// const Login = () => {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [flag, setFlag] = useState(0);
//   const [message, setMessage] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validate = (e) => {
//     e.preventDefault();
//     const { name } = data;

//     if (name.trim() === "") {
//       alert("Name is required! Reloading page...");
//       window.location.reload(); // Reload the entire page
//       return false;
//     } else if (!/^[a-zA-Z0-9]+$/.test(name)) {
//       alert("Invalid name! No special characters allowed. Reloading page...");
//       window.location.reload(); // Reload the entire page
//       return false;
//     } else {
//       setMessage("Valid name");
//       setSuccess(true);
//       return true;
//     }
//   };

//   const handleSubmit = (e) => {
//     if (validate(e)) {
//       setFlag(1);  // go to dashboard
//     } else {
//       setFlag(0);  // this won't matter after reload
//     }
//   };

//   if (flag === 1) {
//     return (
//       <>
//         <h2>Dashboard</h2>
//         <p><strong>Name:</strong> {data.name}</p>
//         <p><strong>Email:</strong> {data.email}</p>
//         <p><strong>Password:</strong> {data.password}</p>
//       </>
//     );
//   }

//   return (
//     <>
//       <h3>Login Page</h3>

//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={data.name}
//         onChange={handleChange}
//       />
//       <p style={{ color: success ? "green" : "red" }}>{message}</p>

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={data.email}
//         onChange={handleChange}
//       />
//       <br /><br />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={data.password}
//         onChange={handleChange}
//       />
//       <br /><br />

//       <Button as="input" type="submit" value="Login" onClick={handleSubmit} />
//     </>
//   );
// };

// export default Login;







import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const { name } = data;

    if (name.trim() === "") {
      setMessage("Name is required!");
      setSuccess(false);
      return false;
    } else if (!/^[a-zA-Z0-9]+$/.test(name)) {
      setMessage("Invalid name! No special characters allowed.");
      setSuccess(false);
      return false;
    } else {
      setMessage("");
      setSuccess(true);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoggedIn(true); // Switch to dashboard
    }
  };

  if (isLoggedIn) {
    return (
      <>
        <h2>Dashboard</h2>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Password:</strong> {data.password}</p>
      </>
    );
  }

  return (
    <>
      <h3>Login Page</h3>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
      />
      <p style={{ color: success ? "green" : "red" }}>{message}</p>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
      />
      <br /><br />

      <Button as="input" type="submit" value="Login" onClick={handleSubmit} />
    </>
  );
};

export default App;
