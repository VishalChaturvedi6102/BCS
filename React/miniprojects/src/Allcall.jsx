


// import React, { useState } from "react";
// import UserContext from "./Usercontext";
// import Dashboard from "./Dashboard";
// import Home from "./Home";
// import { Routes, Route } from "react-router-dom";

// const Allcall = () => {
//   const [user, setUser] = useState({
//     name: "Noname",
//     email: "001@email.com",
//     role: "  ",
//   });

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       <Routes>
//         <Route path="/" element={<Dashboard />}>
//           <Route path="home" element={<Home />} />
//         </Route>
//       </Routes>
//     </UserContext.Provider>
//   );
// };

// export default Allcall;



import React, { useState } from "react";
import UserContext from "./Usercontext";
import Dashboard from "./Dashboard";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";

const Allcall = () => {
  const [user, setUser] = useState({
    name: "Noname",
    email: "001@email.com",
    role: "jobless",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="home" element={<Home />} /> {/* /dashboard/home ✅ */}
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default Allcall;
