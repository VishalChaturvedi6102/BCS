
// import { useState } from "react";

// const FunctionForms =() => {
  
//   const[n, setN] = useState("")
//   const handle = (e) => {
//     setN(e.target.value);
//   };



// return (
//     <div>
//        <label>Name</label>
//         <input type="text" name="name" onChange={handle}></input>
//         {n}
//     </div>
// )
// };
// export default FunctionForms;


import './FunctionForms.css'
import { useState } from "react";

const FunctionForms =() => {
  
  const[n, setN] = useState({
    name: "",
    age: "",
    gender: "",
    sem:"",
    hobbies: [],
  });

// const handleChange = (e) => {
//    setN(e.target.value);
// };

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === "checkbox" && name === "hobbies") {
    setN((prev) => ({
      ...prev,
      hobbies: checked
        ? [...prev.hobbies, value]
        : prev.hobbies.filter((hobby) => hobby !== value),
    }));
  } else {
    setN((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const [sd,setSd] = useState(null);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    setSd(n);
   
    };
return (
    <div className="kk">
    <h2>Form with Function_Component</h2>
    <form action="" onSubmit={handleSubmit}>
    <div className='box'>
       <label>Name : </label>
        <input id='1' type="text" name="name" value={n.name} onChange={handleChange} required></input>
        <br />
        <br />

    <label>Age : </label>
        <input id='2' type="number" name="age" value={n.age} onChange={handleChange} required min={18} max={60}></input>
        <br />
        <br />

        <label>Gender : </label>
        Male
        <input type="radio" name="gender" value="Male" onChange={handleChange} required></input>
         Female
        <input type="radio" name="gender" value="Female" onChange={handleChange} required></input>
        <br />
        <br />

         {/*  */}
         <label>Semester :</label>
         <select name="sem" value={n.sem} onChange={handleChange} required> 

          <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>


         </select>
         <br />
        <br />

         <label>Hobby : </label>
         Reading <input type="checkbox" name="hobbies" value="Reading" onChange={handleChange} checked={n.hobbies.includes("Reading")} />

Writing <input type="checkbox" name="hobbies" value="Writing" onChange={handleChange} checked={n.hobbies.includes("Writing")} />

Game <input type="checkbox" name="hobbies" value="Game" onChange={handleChange} checked={n.hobbies.includes("Game")} />

Sports <input type="checkbox" name="hobbies" value="Sports" onChange={handleChange} checked={n.hobbies.includes("Sports")} />

Running <input type="checkbox" name="hobbies" value="Running" onChange={handleChange} checked={n.hobbies.includes("Running")} />

<br /> <br />

         {/* submit wala */}
         <button type="submit" className='but'>Submit</button>
         <br />
         <br />
         <br />

         </div>

         {sd &&(
            <div>
                <h2>Submitted Data</h2>
                <p> Name :  {sd.name} </p>
                <p> Age :  {sd.age} </p>
                <p> Gender :  {sd.gender} </p>
                <p> Semester :  {sd.sem} </p>
                <p> Hobby :   {sd.hobbies}  </p>
                <br /><br />
            </div>
         )}

    </form>
    </div>
)
};
export default FunctionForms;


