



import React, { Component } from "react";

import './Resgen.css'

class Resgen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Personal Info
      uname: "",
      age: "",
      address: "",
      email: "",
      mobile: "",

      // Education
      qualification: "",
      college: "",
      year: "",

      // Skills
      skills: "",

      // Experience
      company: "",
      role: "",
      duration: "",

      // Projects
      title: "",
      project: "",

    //  submitted: false
    };
  }

  submit = (e) => {
    e.preventDefault();
   
    console.log(this.state);
  };

  handle = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <div className="container">
        <form onSubmit={this.submit}>
          <div className="just">  
        <h1> Resume Generator</h1>


          <h2>Personal Information</h2>


          <input type="text" name="uname" placeholder="Name" value={this.state.uname} onChange={this.handle} />
            <br></br>
          <input type="text" name="age" placeholder="Age" value={this.state.age} onChange={this.handle} />
          <br></br>
          <input type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.handle} />
          <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handle} />
          <input type="text" name="mobile" placeholder="Mobile" value={this.state.mobile} onChange={this.handle} />

          <h2>Education</h2>
          <input type="text" name="qualification" placeholder="Qualification" value={this.state.qualification} onChange={this.handle} />
          <input type="text" name="college" placeholder="College" value={this.state.college} onChange={this.handle} />
          <input type="text" name="year" placeholder="Year of Passing" value={this.state.year} onChange={this.handle} />

          <h2>Skills</h2>
          <input type="text" name="skills" placeholder="Skills " value={this.state.skills} onChange={this.handle} />

          <h2>Experience</h2>
          <input type="text" name="company" placeholder="Company Name" value={this.state.company} onChange={this.handle} />
          <input type="text" name="role" placeholder="Your Role" value={this.state.role} onChange={this.handle} />
          <input type="text" name="duration" placeholder="Duration" value={this.state.duration} onChange={this.handle} />

          <h2>Projects</h2>

          <input type="text" name="title" placeholder="Project Title"  value={this.state.projectTitle} onChange={this.handle} />
          <br></br>
          <br></br>
          <textarea name="project" placeholder="Description" value={this.state.projectDesc} onChange={this.handle}></textarea>

          <br /><br />

          </div>
        
         <input type="Submit" value="Submit"></input> 
        </form>

        <hr />

        
          <div className="justice">
            <h2>Resume Preview</h2>

            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {this.state.uname}</p>
            <p><strong>Age:</strong> {this.state.age}</p>
            <p><strong>Address:</strong> {this.state.address}</p>
            <p><strong>Email:</strong> {this.state.email}</p>
            <p><strong>Mobile:</strong> {this.state.mobile}</p>

            <h3>Education</h3>
            <p><strong>Qualification:</strong> {this.state.qualification}</p>
            <p><strong>College:</strong> {this.state.college}</p>
            <p><strong>Year:</strong> {this.state.year}</p>

            <h3>Skills</h3>
            <p>{this.state.skills}</p>

            <h3>Experience</h3>
            <p><strong>Company:</strong> {this.state.company}</p>
            <p><strong>Role:</strong> {this.state.role}</p>
            <p><strong>Duration:</strong> {this.state.duration}</p>

            <h3>Projects</h3>
            <p><strong>Title:</strong> {this.state.title}</p>
            <p>{this.state.project}</p>
          </div>
          </div>
        
      </>
    );
  }
}

export default Resgen;