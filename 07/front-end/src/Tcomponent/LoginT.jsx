import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./AuthToggle.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginT= () => {

  const navigate = useNavigate();



  const [data, setdata] = useState({ username: "", pass: "" });

  const handle = (e) => {
    const { name, value } = e.target;
    setdata(prev => ({ ...prev, [name]: value }));
  };

  const handlesubmit =  async (e) => {
    e.preventDefault();

     try {
      const res = await axios.post("http://localhost:4000/loginT", data);

      if (res.status === 200) {
        alert("Login successful!");


            // Save tutorid from backend response in localStorage
        // const tutorid = res.data.teacher.id;
        // localStorage.setItem("tutorid", tutorid);

        const username = res.data.teacher.username;
        // localStorage.setItem("tutorUsername", username);
         sessionStorage.setItem("tutorUsername", username);
         sessionStorage.setItem("token", res.data.teacher.token);
        
        navigate("/teacherdashboard");
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

export default LoginT;






