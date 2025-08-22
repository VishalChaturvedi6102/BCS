import React, { useState } from 'react';
import axios from 'axios';

// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupS = ({setIsActive}) => {
  const [data, setdata] = useState({
    namer: "",
    username: "",
    pass: "",
  });

  const handle = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.post("http://localhost:4000/signupS", data);

      if (res.status === 200) {
        alert("Signup successful!");
        setIsActive(false);
      } else {
        alert("Signup failure phirse Try kar ");
      }

    } catch (err) {
      console.error("Signup error:", err);
      alert("Arrey error aa raha hai during signup.");
    }
  };

  return (
   <>
   
   <form onSubmit={handlesubmit}>
  <input
    type="text"
    name="namer"
    placeholder="Full Name"
    value={data.namer}
    onChange={handle}
    required
  />
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
  <button type="submit">Register</button>

  <br /><br/> 
  <a href="SignupS">Teacher banogay kyaaa ????????????</a>

</form>




    </>
  );
};

export default SignupS;
