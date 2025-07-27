
// import React, {Component} from 'react';
// class Practice extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: [
//                 [1,2,3]
//             [3,4,5]]
//         };        
//     }

//     // handle = (e) => {
//     //     this.setState({data: e.target.value});
        
//     //   };   
// }

//   render() 
//   {
//      return (
//       <>
//         {/* Displaying specific elements */}
//         <p>Element at [0][1]: {this.state.data[0][1]}</p>
//         <p>Element at [1][2]: {this.state.data[1][2]}</p>

//           {/* Displaying full 2D array */}
//         {this.state.data.map((innerArray, i) => (
//           <div key={i}>
//             {innerArray.map((value, j) => (
//               <p key={j}>
//                 Row{i} Col{j} : {value}
//               </p>
//             ))}
//           </div>
//         ))}
//       </>
//     );
//   }
// export default Practice;



// import React, { Component } from 'react';

// class Practice extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [
//         [1, 2, 3],
//         [3, 4, 5]
//       ]
//     };
//   }

//   render() {
//     return (
//       <>
//         {/* Display specific values from 2D array */}
//         <p>Element at [0][1]: {this.state.data[0][1]}</p>
//         <p>Element at [1][2]: {this.state.data[1][2]}</p>

//         {/* Loop through 2D array */}
//         {this.state.data.map((innerArray, i) => (
//           <div key={i}>
//             {innerArray.map((value, j) => (
//               <p key={j}>
//                 Row{i} Col{j} : {value}
//               </p>
//             ))}
//           </div>
//         ))}
//       </>
//     );
//   }
// }

// export default Practice;



// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


import React, { Component } from 'react';

class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        [{ Name: 'ABC' }, 
         { Name: 'XYZ' }],

        [{ Name: 'XY' }, 
         { Name: 'XX' }]
      ]
    };
  }

  render() {
    return (
      <>
        {/* Display specific names */}
        <p>Element at [0][1]: {this.state.data[0][1].Name}</p>
        <p>Element at [1][0]: {this.state.data[1][0].Name}</p>

        {/* Display the full 2D array of objects */}
        {this.state.data.map((row, i) => (
          <div key={i}>
            {row.map((item, j) => (
              <p key={j}>
                Row{i} Col{j} : {item.Name}
              </p>
            ))}
          </div>
        ))}
      </>
    );
  }
}

export default Practice;


