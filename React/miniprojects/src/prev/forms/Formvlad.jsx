
import React,{useState} from "react";
import Button from 'react-bootstrap/Button';


const Formvlad = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
  });

    const [flag,setFlag] = useState(0);

    const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);


   const handle = (e) => {
  const { name, value } = e.target;
  setData((prev) => ({
    ...prev,
      [name]: value,
    }));
};


    const hit = (e) => {
    if (validate(e)) {
      setFlag(1);
    } else {
      setFlag(0);
    }
  };
         const validate = (e) => {
    e.preventDefault();
    const { name } = data;

    if (name.trim() === "") {
      setMessage("Name is required!");
      setSuccess(false);
      return false;
    } else if (!/^[a-zA-Z0-9]+$/.test(name)) {
      setMessage("Invalid name! No special characters allowed.");
      setSuccess(false);
      return false;
    } else {
      setMessage("Valid name");
      setSuccess(true);
      return true;
    }

          };

           if (flag === 1) {
    return (
      <>
        <h4>Submitted Data:</h4>
        <p>Name: {data.name}</p>
        <p>Password: {data.password}</p>
      </>
    );
  }
  else

    return (
        <>
            <input type="text" value={data.name} onChange={handle} name="name" />
              <p>{message}</p>
            <br />
            <input type="text" value={data.password} onChange={handle} name="password"/>
            <hr />
            <Button as="input" type="submit" value="Submit" onClick={hit}/>

            


         
          </>

         

  );
}
export default Formvlad;
    

