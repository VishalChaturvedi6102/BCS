import React, { Component } from "react";

class Addadder extends Component {
  constructor() {
    super();
    this.state = {
      x: [],
      inputvalue: ""
    };
  }

  handleChange = (e) => {
    this.setState({ inputvalue: e.target.value });
  };

  fun = () => {
    this.setState((e) => ({
      x: [...e.x, (e.inputvalue)],    
      // parseInt(e.inputvalue) se parseint ko hataya tha kyuki woh string value ko Nan return kar raha tha
      inputvalue: ""
    }));
  };

  render() {


    return (
      <>
        <input type="text" value={this.state.inputvalue} onChange={this.handleChange}
        />
        <button onClick={this.fun}>Add</button>



        <div >
           <h3>Dropdown:</h3>
        <select name="ddadd" onChange={this.handleChange} value={this.state.ddadd}>

          <option value="">dropdown</option>
          {this.state.x.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        </div>
      </>
    );
  }
}

export default Addadder;


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// import React, { Component } from "react";

// class Addadder extends Component {
//   constructor() {
//     super();
//     this.state = {
//       x: [],
//       inputvalue: ""
//     };
//   }

//   handleChange = (e) => {
//     this.setState({ inputvalue: e.target.value });
//   };

//   fun = () => {
//     this.setState((e) => ({
//       x: [...e.x, parseInt(e.inputvalue)],
//       inputvalue: ""
//     }));
//   };

//   render() {


//     return (
//       <>
//         <input type="text" value={this.state.inputvalue} onChange={this.handleChange}
//         />
//         <button onClick={this.fun}>Add</button>
//         <div>
//           <h3>Array:</h3>
//           <ul>
//             {this.state.x.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       </>
//     );
//   }
// }

// export default Addadder; 
