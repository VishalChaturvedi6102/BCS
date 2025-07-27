
// const Abc = ({ name }) => {
//   return (
//     <>
//    <span> {name} </span>   
//     </>
//   );
// };

// export default Abc;


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

const Abc = ({ obj}) => {
  return (
    <>
  
    <h4>Object fecting with function component</h4>
      <div>Name: {obj.name}</div>
      <br />
      <span>Age: {obj.age}</span>
     
    </>
  );
};

export default Abc;

