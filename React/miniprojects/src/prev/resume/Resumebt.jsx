



// import React,{useState} from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Badge from 'react-bootstrap/Badge';




// const Resumebt = () => {

//     const [data, setData] = useState({
//      uname: "",
//       age: "",
//       address: "",
//       email: "",
//       mobile: "",

//       // Education
//       qualification: "",
//       college: "",
//       year: "",

//       // Skills
//       skills: "",

//       // Experience
//       company: "",
//       role: "",
//       duration: "",

//       // Projects
//       title: "",
//       project: "",

//       })

//     const handleSubmit = (e) => {

//     e.preventDefault(); 
//     setSubmit(data);    
//   };


//   render(

//     <div>
//        <h1>
//         Resume Generator <Badge bg="secondary">New</Badge>
//       </h1>


// <h4>Personal Info.</h4>

//          <Navbar bg="dark" data-bs-theme="dark">
//         <Container>
//           <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#features">Features</Nav.Link>
//             <Nav.Link href="#pricing">Pricing</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar> 

//       <br />

//         <InputGroup className="mb-3">
//       <InputGroup.Text>First and last name</InputGroup.Text>
//       <Form.Control aria-label="First name" />
//       <Form.Control aria-label="Last name" />
//     </InputGroup>
//     <br />


//   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="email" placeholder="name@example.com" />
//       </Form.Group>
//       <br />

      
//      <label htmlFor=""> Age :</label>
//  <Form.Label>Range</Form.Label>
//       <Form.Range />
//       <br />


//        <InputGroup className="mb-3">
//       <InputGroup.Text>Mobile No.</InputGroup.Text>
//       <Form.Control aria-label="First name" />
//       </InputGroup>
//     <br />

//     <h4>Education</h4>
//     <br />
//     <DropdownButton id="dropdown-basic-button" title="Degree">
//       <Dropdown.Item href="#/action-1">B.Tech</Dropdown.Item>
//       <Dropdown.Item href="#/action-2">M.Tech</Dropdown.Item>
//       <Dropdown.Item href="#/action-3">Phd</Dropdown.Item>
//     </DropdownButton>
//     <br />

//      <Form.Group className="mb-3" controlId="exampleInput">
//       <Form.Label>College</Form.Label>
//       <Form.Control type="text" placeholder="Enter your College" />
//     </Form.Group>
//     <br />


//     <Dropdown as={ButtonGroup}>
//       <Button variant="success">Passout Year</Button>
//       <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1">2023</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">2024</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">2025</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//     <br />



//   <h4>Skills</h4>

//   <Form>
//       {['checkbox', 'radio'].map((type) => (
//         <div key={inline-${type}} className="mb-3">
//           <Form.Check
//             inline
//             label="Java"
//             name="group1"
//             type={type}
//             id={inline-${type}-1}
//           />
//           <Form.Check
//             inline
//             label="C++"
//             name="group1"
//             type={type}
//             id={inline-${type}-2}
//           />
//           <Form.Check
//             inline
           
//             label="React"
//             type={type}
//             id={inline-${type}-3}
//           />
//           <Form.Check
//             inline
            
//             label="Javascript"
//             type={type}
//             id={inline-${type}-3}
//           />
//           <Form.Check
//             inline
           
//             label="Nodejs"
//             type={type}
//             id={inline-${type}-3}
//           />
//         </div>
//       ))}
//     </Form>


// <h4>Experience</h4>

//  <Form.Group className="mb-3" controlId="exampleInput">
//       <Form.Label>Company Name</Form.Label>
//       <Form.Control type="text" placeholder="Enter your College" />
//     </Form.Group>
//     <br />


//   <Dropdown as={ButtonGroup}>
//       <Button variant="success">Role</Button>
//       <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1">Technical</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Management</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Teacher</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//     <br />

//     <Form.Group className="mb-3" controlId="exampleInput">
//       <Form.Label>Duration</Form.Label>
//       <Form.Control type="text" placeholder="time worked" />
//     </Form.Group>
//     <br />

// <Form>
      
//       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//         <Form.Label>Something about company</Form.Label>
//         <Form.Control as="textarea" rows={3} />
//       </Form.Group>
//     </Form>
//     <br />

//     <h4>Project</h4>
//     <Form>
//       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//         <Form.Label>Project Name</Form.Label>
//         <Form.Control type="email" placeholder="Project" />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//         <Form.Label>Project Titel</Form.Label>
//         <Form.Control as="textarea" rows={3} />
//       </Form.Group>
//     </Form>

//     <br />
//     <Form.Group controlId="formFileMultiple" className="mb-3">
//         <Form.Label>Proof of work</Form.Label>
//         <Form.Control type="file" multiple />
//       </Form.Group>

//     </div>

//   );




















// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX




// import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Badge from 'react-bootstrap/Badge';

// const Resumebt = () => {
//   const [data, setData] = useState({
//     uname: "",
//     age: "",
//     address: "",
//     email: "",
//     mobile: "",

//     // Education
//     qualification: "",
//     college: "",
//     year: "",

//     // Skills - You'll likely want an array or object for multiple skills
//     skills: {
//       java: false,
//       cpp: false,
//       react: false,
//       javascript: false,
//       nodejs: false,
//     },

//     // Experience
//     company: "",
//     role: "",
//     duration: "",
//     companyDescription: "", // Added for the textarea

//     // Projects
//     title: "",
//     project: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.startsWith('skill_')) {
//       setData((prevData) => ({
//         ...prevData,
//         skills: {
//           ...prevData.skills,
//           [name.replace('skill_', '')]: checked,
//         },
//       }));
//     } else {
//       setData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleDropdownChange = (name, value) => {
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the `data` to a server or process it
//     console.log("Form Data Submitted:", data);
//     alert("Form submitted! Check the console for data.");
//   };

//   return (
//     <Container className="my-4"> {/* Added a Container for better layout */}
//       <h1>
//         Resume Generator <Badge bg="secondary">New</Badge>
//       </h1>

//       <Navbar bg="dark" data-bs-theme="dark" className="my-3">
//         <Container>
//           <Navbar.Brand href="#home">Resume Builder</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="#personal-info">Personal Info</Nav.Link>
//             <Nav.Link href="#education">Education</Nav.Link>
//             <Nav.Link href="#skills">Skills</Nav.Link>
//             <Nav.Link href="#experience">Experience</Nav.Link>
//             <Nav.Link href="#projects">Projects</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>

//       {/* --- */}
//       <h4 id="personal-info">Personal Info.</h4>
//       <Form onSubmit={handleSubmit}> {/* Wrap your form elements in a <Form> and add onSubmit */}
//         <InputGroup className="mb-3">
//           <InputGroup.Text>First and last name</InputGroup.Text>
//           <Form.Control
//             aria-label="First name"
//             name="uname" // Using a single 'uname' for simplicity, you might want separate first/last names
//             value={data.uname}
//             onChange={handleChange}
//             placeholder="John Doe"
//           />
//         </InputGroup>

//         <Form.Group className="mb-3" controlId="formEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="name@example.com"
//             name="email"
//             value={data.email}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formAgeRange">
//           <Form.Label>Age: {data.age}</Form.Label>
//           <Form.Range
//             name="age"
//             value={data.age}
//             onChange={handleChange}
//             min="18" // Example min/max
//             max="65"
//           />
//         </Form.Group>

//         <InputGroup className="mb-3">
//           <InputGroup.Text>Mobile No.</InputGroup.Text>
//           <Form.Control
//             aria-label="Mobile Number"
//             name="mobile"
//             value={data.mobile}
//             onChange={handleChange}
//             placeholder="e.g., +91 9876543210"
//           />
//         </InputGroup>

//         <Form.Group className="mb-3" controlId="formAddress">
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             name="address"
//             value={data.address}
//             onChange={handleChange}
//             placeholder="Your full address"
//           />
//         </Form.Group>

//         {/* --- */}
//         <h4 id="education">Education</h4>
//         <DropdownButton
//           id="dropdown-degree"
//           title={data.qualification || "Select Degree"}
//           onSelect={(eventKey) => handleDropdownChange('qualification', eventKey)}
//           className="mb-3"
//         >
//           <Dropdown.Item eventKey="B.Tech">B.Tech</Dropdown.Item>
//           <Dropdown.Item eventKey="M.Tech">M.Tech</Dropdown.Item>
//           <Dropdown.Item eventKey="Phd">Phd</Dropdown.Item>
//         </DropdownButton>

//         <Form.Group className="mb-3" controlId="formCollege">
//           <Form.Label>College</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your College"
//             name="college"
//             value={data.college}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Dropdown as={ButtonGroup} className="mb-3">
//           <Button variant="success">{data.year || "Passout Year"}</Button>
//           <Dropdown.Toggle split variant="success" id="dropdown-year" />
//           <Dropdown.Menu>
//             <Dropdown.Item onClick={() => handleDropdownChange('year', '2023')}>2023</Dropdown.Item>
//             <Dropdown.Item onClick={() => handleDropdownChange('year', '2024')}>2024</Dropdown.Item>
//             <Dropdown.Item onClick={() => handleDropdownChange('year', '2025')}>2025</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>

//         {/* --- */}
//         <h4 id="skills">Skills</h4>
//         <div className="mb-3">
//           {Object.keys(data.skills).map((skillName) => (
//             <Form.Check
//               key={`skill_${skillName}`}
//               inline
//               label={skillName.charAt(0).toUpperCase() + skillName.slice(1)} // Capitalize first letter
//               name={`skill_${skillName}`}
//               type="checkbox" // Using checkbox for multiple selections
//               id={`inline-checkbox-${skillName}`}
//               checked={data.skills[skillName]}
//               onChange={handleChange}
//             />
//           ))}
//         </div>

//         {/* --- */}
//         <h4 id="experience">Experience</h4>
//         <Form.Group className="mb-3" controlId="formCompany">
//           <Form.Label>Company Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter company name"
//             name="company"
//             value={data.company}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Dropdown as={ButtonGroup} className="mb-3">
//           <Button variant="success">{data.role || "Role"}</Button>
//           <Dropdown.Toggle split variant="success" id="dropdown-role" />
//           <Dropdown.Menu>
//             <Dropdown.Item onClick={() => handleDropdownChange('role', 'Technical')}>Technical</Dropdown.Item>
//             <Dropdown.Item onClick={() => handleDropdownChange('role', 'Management')}>Management</Dropdown.Item>
//             <Dropdown.Item onClick={() => handleDropdownChange('role', 'Teacher')}>Teacher</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>

//         <Form.Group className="mb-3" controlId="formDuration">
//           <Form.Label>Duration</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="e.g., 2 years, Jan 2020 - Dec 2022"
//             name="duration"
//             value={data.duration}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formCompanyDescription">
//           <Form.Label>Something about company/your role</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             name="companyDescription"
//             value={data.companyDescription}
//             onChange={handleChange}
//             placeholder="Describe your responsibilities and achievements..."
//           />
//         </Form.Group>

//         {/* --- */}
//         <h4 id="projects">Project</h4>
//         <Form.Group className="mb-3" controlId="formProjectName">
//           <Form.Label>Project Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="e.g., E-commerce Platform"
//             name="title"
//             value={data.title}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formProjectDescription">
//           <Form.Label>Project Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             name="project"
//             value={data.project}
//             onChange={handleChange}
//             placeholder="Describe your project, technologies used, and your role."
//           />
//         </Form.Group>

//         <Form.Group controlId="formFileMultiple" className="mb-3">
//           <Form.Label>Proof of work (e.g., project screenshots, link to GitHub)</Form.Label>
//           <Form.Control type="file" multiple />
//         </Form.Group>

//         <Button variant="primary" type="submit" className="mt-3">
//           Generate Resume
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default Resumebt;





// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';

const Resumebt = () => {
  const [data, setData] = useState({
    uname: "",
    age: "",
    address: "",
    email: "",
    mobile: "",
    qualification: "",
    college: "",
    year: "",
    skills: [],
    company: "",
    role: "",
    duration: "",
    title: "",
    project: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data); 
  };

  return (
    <Container className="my-5">
      <h1>
        Resume Generator <Badge bg="secondary">New</Badge>
      </h1>

      {/* Navbar */}
      <Navbar bg="dark" variant="dark" className="my-3">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Form onSubmit={handleSubmit}>
        <h4>Personal Info.</h4>
        {/* <InputGroup className="mb-3">
          <InputGroup.Text>First and last name</InputGroup.Text>
          <Form.Control
            name="uname"
            value={data.uname}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </InputGroup> */}

        <InputGroup className="mb-3">
      <InputGroup.Text>First and last name</InputGroup.Text>
      <Form.Control aria-label="First name" name="uname"
            value={data.uname}
            onChange={handleChange} />
      <Form.Control aria-label="Last name" />
    </InputGroup>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={data.age}
            onChange={handleChange}
          />
        </Form.Group>

        <InputGroup className="mb-3">
          <InputGroup.Text>Mobile No.</InputGroup.Text>
          <Form.Control
            name="mobile"
            value={data.mobile}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
  <InputGroup.Text>Address</InputGroup.Text>
  <Form.Control
    as="textarea"
    name="address"
    value={data.address}
    onChange={handleChange}
    aria-label="Address textarea"
    placeholder="address"
  />
</InputGroup>

        <hr />

        <h4>Education</h4>
       <DropdownButton
  id="dropdown-degree"
  title={data.qualification || "Select Degree"}
  className="mb-3"
  onSelect={(val) => setData((prev) => ({ ...prev, qualification: val }))}
>
  <Dropdown.Item eventKey="B.Tech">B.Tech</Dropdown.Item>
  <Dropdown.Item eventKey="M.Tech">M.Tech</Dropdown.Item>
  <Dropdown.Item eventKey="PhD">PhD</Dropdown.Item>
</DropdownButton>

        <Form.Group className="mb-3">
          <Form.Label>College</Form.Label>
          <Form.Control
            type="text"
            name="college"
            value={data.college}
            onChange={handleChange}
          />
        </Form.Group>
        <hr />

        <h4>Skills</h4>
        {["Java", "C++", "React", "JavaScript", "Node.js"].map((skill) => (
          <Form.Check
            key={skill}
            inline
            label={skill}
            type="checkbox"
            id={`skill-${skill}`}
          />
        ))}

        <h4>Experience</h4>
        <Form.Group className="mb-3">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={data.company}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <hr />


      {/* project */}
      <h4>Project</h4>
      <Form.Group className="mb-3" controlId="formProjectName">
          <Form.Label>Project Name</Form.Label>
         <Form.Control
            type="text"
            placeholder="e.g., E-commerce Platform"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formProjectDescription">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="project"
            value={data.project}
            onChange={handleChange}
           
          />
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Proof</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>



        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>

      {/* Preview */}
      <hr />
      <h2>Preview</h2>
      <p>Name: {data.uname}</p>
      <p>Age : {data.age}</p>
      <p>Email: {data.email}</p>
      <p>Phone: {data.mobile}</p>
      <p>Address: {data.address}</p>
<p>Qualification: {data.qualification}</p>
<p>College: {data.college}</p>
<p>Passing Year: {data.year}</p>
<p>Skills: {data.skills.join(", ")}</p>
<p>Company: {data.company}</p>
<p>Role: {data.role}</p>
<p>Duration: {data.duration}</p>
<p>Project Title: {data.title}</p>
<p>Project Description: {data.project}</p>
    </Container>
  );
};

export default Resumebt;
