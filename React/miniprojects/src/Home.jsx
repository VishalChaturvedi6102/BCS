
// import React,{useContext} from "react";
// import UserContext from "./Usercontext";

// const Home = () =>
// {
//     const {user,setUser} = useContext(UserContext);
//     const changeName = () => {

//         setUser({name: "Hacker"})
        
//       };

//       return(
//         <>
//             <div>
//                 <h2>Byeeee,{user.name}</h2>
//                 <button onClick={changeName}> Changing</button>
//             </div>
//         </>
//       );
// };

// export default Home;


import React, { useContext } from "react";
import UserContext from "./Usercontext";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  const changeName = () => {
    setUser({ ...user, name: "Hacker" });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to Home Page</h2>
      <p><strong>Name:</strong> {user.name}</p>
      {/* <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p> */}
      <button onClick={changeName}>Change Name---</button>
    </div>
  );
};

export default Home;
