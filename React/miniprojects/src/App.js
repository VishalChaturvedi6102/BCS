// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import LoginPage from "./LoginPage";
// import Signup from "./Signup";
// import Dashboard from "./Dashboard";

// function App() {
//   return (
//     <>
//     <Allcall />;
//       <Router>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./LoginPage";
// import Signup from "./Signup";
// import Dashboard from "./Dashboard";
// // import Allcall from "./Allcall";
// import UserContext from "./Usercontext";
// import { useState } from "react";

// function App() {
//   const [user, setUser] = useState({
//     name: "User",
//     email: "001@gmail.com",
//     role: "Admin",
//   });

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/dashboard"
//           element={
//             <UserContext.Provider value={user}>
//               <Dashboard />
//             </UserContext.Provider>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Signup from "./Signup";
import Allcall from "./Allcall"; 
// import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        {/* yeah dashboard wale route main nested routing hoo ri hai i.w. (/*) use hua hai  */}
        <Route path="/dashboard/*" element={<Allcall />} /> 
     

      {/* <Route path="/dashboard" element={<Allcall />} />
        <Route path="/home" element={<Home />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
