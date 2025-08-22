
// import React from "react";
// import { Navigate } from "react-router-dom";
// import {jwtDecode} from "jwt-decode";


// const Privateroutes = ({ children }) => {

//   const token = sessionStorage.getItem("token");
 
//   const isTokenValid = (token) =>{
//     try{
//         const decoded = jwtDecode(token);
//         const currentTime = Date.now() / 1000;
//         return decoded.exp > currentTime;
//     }  catch(err){
//         return false;
//     }
//   };

//   // Check JWT token
//   if (token) {
//     if (isTokenValid(token)) return children;
   
//     sessionStorage.removeItem("token");

//     return <Navigate to="/" replace />;
//   }
// };

// export default Privateroutes;




// import React from "react";
// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const PrivateRoutes = ({ children }) => {
//   const token = sessionStorage.getItem("token");

//   const isTokenValid = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const currentTime = Date.now() / 1000;
//       return decoded.exp > currentTime;
//     } catch (err) {
//       return false;
//     }
//   };

//   // If token exists and is valid → allow access
//   if (token && isTokenValid(token)) {
//     return children;
//   }

//   // If token exists but invalid → remove & redirect
//   if (token && !isTokenValid(token)) {
//     sessionStorage.removeItem("token");
//   }

//   // If no token → redirect
//   return <Navigate to="/" replace />;
// };

// export default PrivateRoutes;



// import React from "react";
// import jwtDecode from "jwt-decode";


// const Privateroutes = ({ children }) => {
//   const token = sessionStorage.getItem("token");

//   const isTokenValid = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const currentTime = Date.now() / 1000;
//       return decoded.exp > currentTime;
//     } catch (err) {
//       return false;
//     }
//   };

//   if (token && isTokenValid(token)) {
//     // ✅ If children is passed (like Layout/Titlewala), render it
//     return children ? children : <Outlet />;
//   }

//   // Remove invalid token
//   if (token && !isTokenValid(token)) {
//     sessionStorage.removeItem("token");
//   }

//   // Redirect if no/invalid token
//   return <Navigate to="/" replace />;
// };

// export default Privateroutes;




import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Privateroutes = ({ children }) => {
  const token = sessionStorage.getItem("token");

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp && decoded.exp > currentTime;
    } catch {
      return false;
    }
  };

  if (token && isTokenValid(token)) {
    return children ? children : <Outlet />;
  }

  sessionStorage.removeItem("token");
  return <Navigate to="/" replace />;
};

export default Privateroutes;
