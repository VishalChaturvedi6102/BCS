
// import React, { useState } from 'react';
// import axios from 'axios';

// // import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const SignupT = () => {
//   const [data, setdata] = useState({
//     namer: "",
//     username: "",
//     email:"",
//     pass: "",
//   });

//   const handle = (e) => {
//     setdata({ ...data, [e.target.name]: e.target.value });
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault();
   

//     try {
//       const res = await axios.post("http://localhost:4000/signupT", data);

//       if (res.status === 200) {
//         alert("Signup successful!");
//         setIsActive(false);
//       } else {
//         alert("Signup failure phirse Try kar ");
//       }

//     } catch (err) {
//       console.error("Signup error:", err);
//       alert("Arrey error aa raha hai during signup.");
//     }
//   };

//   return (
//     <>
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6 col-lg-5">
//           <div className="card shadow">
//             <div className="card-body">
//               <h3 className="text-center mb-4">Sign Up for Lang++</h3>
//               <form onSubmit={handlesubmit}>
//                 <div className="mb-3">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     name="namer"
//                     className="form-control"
//                     placeholder="Enter full name"
//                     value={data.namer}
//                     onChange={handle}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Username</label>
//                   <input
//                     type="text"
//                     name="username"
//                     className="form-control"
//                     placeholder="Choose a username"
//                     value={data.username}
//                     onChange={handle}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     placeholder="Enter email address"
//                     value={data.email}
//                     onChange={handle}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     type="password"
//                     name="pass"
//                     className="form-control"
//                     placeholder="Create a password"
//                     value={data.pass}
//                     onChange={handle}
//                     required
//                   />
//                 </div>

//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-primary">
//                     Register
//                   </button>
//                 </div>
//               </form>

//               <div className="mt-3 text-center">
//                 <a href="#" className="text-decoration-none">
//                   Go backkkk
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

    
//     </>
//   );
// };

// export default SignupT;


import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { useNavigate } from 'react-router-dom';

const SignupT = ({setIsActive}) => {
  // const navigate = useNavigate();
  const [data, setdata] = useState({
    namer: "",
    username: "",
    email: "",
    pass: "",
  });

  const handle = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/signupT", data);
      if (res.status === 200) {
        alert("Signup successful!");
        setIsActive(false);
      } else {
        alert("Signup failure, phirse try karo.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Error aa gaya during signup.");
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
    name="email"
    placeholder="e-mail"
    value={data.email}
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


</form>

    </>   
     
  );
};

export default SignupT;

