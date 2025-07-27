






// import React, { Component } from "react";

// class Validform extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       email: "",
//       phone: "",
//       age: "",
//       selectedState: "",
//       selectedCity: "",
//       selectedSemType: "",
//       selectedSemester: "",

//       messages: {
//         username: "",
//         email: "",
//         phone: "",
//         age: "",
//       },
//       success: {
//         username: false,
//         email: false,
//         phone: false,
//         age: false,
//       },

//       x: {
//         Uttar_Pradesh: ["Agra", "Mathura", "Lucknow", "Kanpur", "Farah", "Ferozabad"],
//         Maharashtra: ["Mumbai", "Thane"],
//         Gujarat: ["Surat", "Kach", "Rajkot"],
//       },
//       y: {
//         Even: [2, 4, 6, 8],
//         Odd: [1, 3, 5, 7],
//       },
//     };
//   }

//   handleChange = (e) => {
//     const { name, value } = e.target;

//     // Clear dependent fields when parent is changed
//     if (name === "selectedState") {
//       this.setState({ selectedState: value, selectedCity: "" });
//     } else if (name === "selectedSemType") {
//       this.setState({ selectedSemType: value, selectedSemester: "" });
//     } else {
//       this.setState({ [name]: value });
//     }
//   };

//   validateForm = (e) => {
//     e.preventDefault();
//     const { username, email, phone, age } = this.state;
//     let isValid = true;
//     let messages = {};
//     let success = {};

//     if (username.trim() === "") {
//       messages.username = "Username is required!";
//       success.username = false;
//       isValid = false;
//     } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
//       messages.username = "Invalid username! No special characters allowed.";
//       success.username = false;
//       isValid = false;
//     } else {
//       messages.username = "Valid username";
//       success.username = true;
//     }

//     if (email.trim() === "") {
//       messages.email = "Email is required!";
//       success.email = false;
//       isValid = false;
//     } else if (!/^\S+@\S+\.\S+$/.test(email)) {
//       messages.email = "Invalid email address!";
//       success.email = false;
//       isValid = false;
//     } else {
//       messages.email = "Valid email";
//       success.email = true;
//     }

//     if (phone.trim() === "") {
//       messages.phone = "Phone number is required!";
//       success.phone = false;
//       isValid = false;
//     } else if (!/^\d{10}$/.test(phone)) {
//       messages.phone = "Phone must be 10 digits!";
//       success.phone = false;
//       isValid = false;
//     } else {
//       messages.phone = "Valid phone number";
//       success.phone = true;
//     }

//     if (age.trim() === "") {
//       messages.age = "Age is required!";
//       success.age = false;
//       isValid = false;
//     } else if (isNaN(age) || parseInt(age) <= 18) {
//       messages.age = "Age must be above 18!";
//       success.age = false;
//       isValid = false;
//     } else {
//       messages.age = "Valid age";
//       success.age = true;
//     }

//     this.setState({ messages, success });

//     if (isValid) {
//       alert("Form submitted successfully!");
//     }
//   };

//   render() {
//     const {
//       username,
//       email,
//       phone,
//       age,
//       messages,
//       x,
//       y,
//       selectedState,
//       selectedCity,
//       selectedSemType,
//       selectedSemester,
//     } = this.state;

//     const states = Object.keys(x);
//     const cities = selectedState ? x[selectedState] : [];
//     const semesters = selectedSemType ? y[selectedSemType] : [];

//     return (
//       <div className="container">
//         <h2>Registration</h2>
//         <form onSubmit={this.validateForm} className="box">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={username}
//             onChange={this.handleChange}
//           />
//           <p className="message">{messages.username}</p>

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={email}
//             onChange={this.handleChange}
//           />
//           <p className="message">{messages.email}</p>

//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone"
//             value={phone}
//             onChange={this.handleChange}
//           />
//           <p className="message">{messages.phone}</p>

//           <input
//             type="number"
//             name="age"
//             placeholder="Age"
//             value={age}
//             onChange={this.handleChange}
//           />
//           <p className="message">{messages.age}</p>

//           {/* State Dropdown */}
//           <select name="selectedState" value={selectedState} onChange={this.handleChange}>
//             <option value="">Select State</option>
//             {states.map((state, index) => (
//               <option key={index} value={state}>
//                 {state}
//               </option>
//             ))}
//           </select>

//           {/* City Dropdown */}
//           {selectedState && (
//             <select name="selectedCity" value={selectedCity} onChange={this.handleChange}>
//               <option value="">Select City</option>
//               {cities.map((city, index) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//           )}

//           {/* Semester Type Dropdown */}
//           <select name="selectedSemType" value={selectedSemType} onChange={this.handleChange}>
//             <option value="">Select Semester Type</option>
//             <option value="Even">Even</option>
//             <option value="Odd">Odd</option>
//           </select>

//           {/* Semester Dropdown */}
//           {selectedSemType && (
//             <select name="selectedSemester" value={selectedSemester} onChange={this.handleChange}>
//               <option value="">Select Semester</option>
//               {semesters.map((sem, index) => (
//                 <option key={index} value={sem}>
//                   {sem}
//                 </option>
//               ))}
//             </select>
//           )}
          
//        <br />
//        <br />
//        <br />
        
//           <button type="submit" className="buttonwala">Submit</button>
          
//         </form>
//       </div>
//     );
//   }
// }

// export default Validform;


import React, { Component } from "react";

class Validform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phone: "",
      age: "",
      selectedState: "",
      selectedCity: "",
      selectedSemType: "",
      selectedSemester: "",
      citySearchTerm: "",

      messages: {
        username: "",
        email: "",
        phone: "",
        age: "",
      },
      success: {
        username: false,
        email: false,
        phone: false,
        age: false,
      },

      x: {
        Uttar_Pradesh: ["Agra", "Mathura", "Lucknow", "Kanpur", "Farah", "Ferozabad"],
        Maharashtra: ["Mumbai", "Thane"],
        Gujarat: ["Surat", "Kach", "Rajkot"],
      },
      y: {
        Even: [2, 4, 6, 8],
        Odd: [1, 3, 5, 7],
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "selectedState") {
      this.setState({ selectedState: value, selectedCity: "", citySearchTerm: "" });
    } else if (name === "selectedSemType") {
      this.setState({ selectedSemType: value, selectedSemester: "" });
    } else if (name === "citySearchTerm") {
      this.setState({ citySearchTerm: value });
    } else {
      this.setState({ [name]: value });
    }
  };

  validateForm = (e) => {
    e.preventDefault();
    const { username, email, phone, age } = this.state;
    let isValid = true;
    let messages = {};
    let success = {};

    if (username.trim() === "") {
      messages.username = "Username is required!";
      success.username = false;
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      messages.username = "Invalid username! No special characters allowed.";
      success.username = false;
      isValid = false;
    } else {
      messages.username = "Valid username";
      success.username = true;
    }

    if (email.trim() === "") {
      messages.email = "Email is required!";
      success.email = false;
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      messages.email = "Invalid email address!";
      success.email = false;
      isValid = false;
    } else {
      messages.email = "Valid email";
      success.email = true;
    }

    if (phone.trim() === "") {
      messages.phone = "Phone number is required!";
      success.phone = false;
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      messages.phone = "Phone must be 10 digits!";
      success.phone = false;
      isValid = false;
    } else {
      messages.phone = "Valid phone number";
      success.phone = true;
    }

    if (age.trim() === "") {
      messages.age = "Age is required!";
      success.age = false;
      isValid = false;
    } else if (isNaN(age) || parseInt(age) <= 18) {
      messages.age = "Age must be above 18!";
      success.age = false;
      isValid = false;
    } else {
      messages.age = "Valid age";
      success.age = true;
    }

    this.setState({ messages, success });

    if (isValid) {
      alert("Form submitted successfully!");
    }
  };

  render() {
    const {
      username,
      email,
      phone,
      age,
      messages,
      x,
      y,
      selectedState,
      selectedCity,
      selectedSemType,
      selectedSemester,
      citySearchTerm,
    } = this.state;

    const states = Object.keys(x);
    const cities = selectedState ? x[selectedState] : [];
    const filteredCities = cities.filter((city) =>
      city.toLowerCase().includes(citySearchTerm.toLowerCase())
    );
    const semesters = selectedSemType ? y[selectedSemType] : [];

    return (
      <div className="container">
        <h2>Registration</h2>
        <form onSubmit={this.validateForm} className="box">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
          />
          <p className="message">{messages.username}</p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <p className="message">{messages.email}</p>

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={this.handleChange}
          />
          <p className="message">{messages.phone}</p>

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={age}
            onChange={this.handleChange}
          />
          <p className="message">{messages.age}</p>

          {/* State Dropdown */}
          <select name="selectedState" value={selectedState} onChange={this.handleChange}>
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>

          {/* City Search and Dropdown */}
          {selectedState && (
            <>
              <input
                type="text"
                name="citySearchTerm"
                placeholder="Search City"
                value={citySearchTerm}
                onChange={this.handleChange}
              />
              <select name="selectedCity" value={selectedCity} onChange={this.handleChange}>
                <option value="">Select City</option>
                {filteredCities.length > 0 ? (
                  filteredCities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))
                ) : (
                  <option disabled>No city found</option>
                )}
              </select>
            </>
          )}

          {/* Semester Type Dropdown */}
          <select name="selectedSemType" value={selectedSemType} onChange={this.handleChange}>
            <option value="">Select Semester Type</option>
            <option value="Even">Even</option>
            <option value="Odd">Odd</option>
          </select>

          {/* Semester Dropdown */}
          {selectedSemType && (
            <select name="selectedSemester" value={selectedSemester} onChange={this.handleChange}>
              <option value="">Select Semester</option>
              {semesters.map((sem, index) => (
                <option key={index} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          )}

          <br />
          <br />
          <br />

          <button type="submit" className="buttonwala">Submit</button>
        </form>
      </div>
    );
  }
}

export default Validform;
