import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./AuthToggle.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginS = () => {

  const navigate = useNavigate();



  const [data, setdata] = useState({ username: "", pass: "" });

  const handle = (e) => {
    const { name, value } = e.target;
    setdata(prev => ({ ...prev, [name]: value }));
  };

  const handlesubmit =  async (e) => {
    e.preventDefault();

     try {
      const res = await axios.post("http://localhost:4000/loginS", data);

      if (res.status === 200) {
        alert("Login successful!");

const username = res.data.student.username;
// localStorage.setItem("studentUsername", username);
sessionStorage.setItem("studentUsername", username);


sessionStorage.setItem("token", res.data.student.token);


        navigate("/dashboard");
      } else {
        alert("Login failed. Try again.");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during login.");
    }
  };


  return (
    
  <>  
  <div className="form-container sign-in-container">
      <form onSubmit={handlesubmit}>
        <h1>Login to Lang++</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handle}
          required
        />
        <input
          type="text"
          name="pass"
          placeholder="Password"
          value={data.pass}
          onChange={handle}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
};

export default LoginS;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const LoginS = () => {
//   const navigate = useNavigate();

//   const [data, setData] = useState({ username: "", pass: "" });
//   const [error, setError] = useState("");

//   const handle = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:4000/loginS", data);

//       if (res.status === 200 && res.data.token) {
//         // ✅ Save token & username in sessionStorage
//         sessionStorage.setItem("token", res.data.token);
//         sessionStorage.setItem("studentUsername", res.data.student.username);

//         alert("Login successful!");
//         navigate("/dashboard"); // redirect after login
//       } else {
//         setError("Login failed. Try again.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.response?.data?.message || "An error occurred during login.");
//     }
//   };

//   return (
//     <div className="form-container sign-in-container">
//       <form onSubmit={handleSubmit}>
//         <h1>Login to Lang++</h1>

//         {error && (
//           <p className="text-danger text-center mb-3 fw-bold">{error}</p>
//         )}

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={data.username}
//           onChange={handle}
//           required
//         />
//         <input
//           type="text"
//           name="pass"
//           placeholder="Password"
//           value={data.pass}
//           onChange={handle}
//           required
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginS;
