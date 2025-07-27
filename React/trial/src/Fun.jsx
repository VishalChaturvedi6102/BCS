// import Abc from './Abc';

// const Fun = () => {
//   return (
//     <>
//     {/* name(props) and Hello(meri state hai i.e. value inside prop) */}
//       <Abc name="Hello" />
//     </>
//   );
// };

// export default Fun;

// // yeah componet 1 se component 2 ko data transfer ka method hai through props.

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



// object ko fect karane wala program hai through function component;
import Abc from './Abc';

const Fun = () => {
  const obj = {
    name: "kk Shama",
    age: 25,
   
  };
  
  return (
    <>
      
      <Abc obj={obj} />
    </>
  );
};

export default Fun;
