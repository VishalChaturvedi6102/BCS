// yaha se main user se data luunga [yeah PARENT hai]

import React, { useState } from "react";
import Abc from "./Abc";
import './Fun.css'

const Fun = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    gen: "",   
    sem: ""
  });

  const [submit, setSubmit] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {

    e.preventDefault(); 
    setSubmit(data);    
  };

  return (


    <div className="kk">

      <h2>Function Component </h2>

      <form onSubmit={handleSubmit}>
      <div className="aj">
        <label>Name: </label>
        <input type="text" name="name" value={data.name} onChange={handleChange} required />
        <br /><br />

        <label>Age: </label>
        <input type="number" name="age" value={data.age} onChange={handleChange} min={18} max={60} required />
        <br /><br />

        <label>Email: </label>
        <input type="email" name="email" value={data.email} onChange={handleChange} required />
        <br /><br />

        <label>Phone No.: </label>
        <input type="number" name="phone" value={data.phone} onChange={handleChange} required />
        <br /><br />

        <label>Gender: </label>
        Male <input type="radio" name="gen" value="Male" checked={data.gen === "Male"} onChange={handleChange} />
        <br />
        Female <input type="radio" name="gen" value="Female" checked={data.gen === "Female"} onChange={handleChange} />
        <br /><br />

        <label>Semester: </label>
        <select name="sem" value={data.sem} onChange={handleChange} required>
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

         <br /><br />
         </div>
         <div >
        <button type="submit" className="but">Submit</button>
        </div>
        <hr />
      </form>

      {/* Show data in Child after submission */}
      {submit && <Abc data={submit} />}
      <br /><br />
    </div>
  );
};

export default Fun;


