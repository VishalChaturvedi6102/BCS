// import { useState } from "react"

// import { useState } from "react";

// const Abc = () =>{
//     const[x,setX] = useState([]);
//     const fun = () => {
//         setX([...x, x.length +1])
//       };

// return (
//     <div>
//       <button onClick={fun}>Add</button>
//       {x.map((item, index) => (
//         <p key={index}>{item}</p>
//       ))}
//     </div>
//   );
// };

// export default Abc;

// JSON wala datatype 

// const Abc = () => {
//     const[emp,setEmp] = useState({'name':"",'age': 20})

//     const fun = () => {

//         setEmp({...emp,name: 'kk'})
        
//       };

//        return (
//     <>
//       <button onClick={fun}>Click</button>
//       <p>Name: {emp.name}</p>
//       <p>Age: {emp.age}</p>
//     </>
//   );
// };

// export default Abc;


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// import { useState } from "react";

// const Abc = () => {
//   const [m, setM] = useState([
//                  [1,2,3],
//                  [4,5,6]
//   ]);


//   return (
//     <>
//   <h2>question_1</h2>
//       {m.map((row, value) => (
//         <div key={value}>
//           {row.map((item, index) => (
//             <p key={index}>{item}</p>
//           ))}
//         </div>
//       ))}
//     </>
//   );
// };

// export default Abc;


import { useState } from "react";

const Abc = () =>{

  const [n, setN] = useState([
             { name: "Abc", age: 1,subject: 'OS' },
             { name: "Def", age: 2, subject: 'DBMS'}

  ]);
  const [flag,setFlag]=useState(0);

  const handle=()=>{
    setFlag(1);

  }

  return (
    <div>
      <h3> question_2 </h3>
      <button onClick={handle}>Add</button>
      {flag===0?("welcome"):( n.map((item, index) => (
        <span key={index} > <br />
          Name: {item.name}, Age: {item.age}, Subj: {item.subject}
        </span>
         )))}
    </div>
  );
};

export default Abc;
