import React, { Component } from "react";

class Arrwala extends Component {


  constructor() {
    super();
    this.state = {
      x: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      output: 0,
      value: "",
      res:"" 
    };
  }


   handle = (e) => {
     this.setState({ value: e.target.x});
    this.setState({ value: e.target.value });
  };


  largest = () => {
    const arr = this.state.x;
    let larg = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > larg) {
        larg = arr[i];
      }
    }

    this.setState({ output: larg });
  };


  // search wala function
  search = () => {
  let f = 0; 
  const value = parseInt(this.state.value);
  const arr = this.state.x;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      f = 1;
      break;
    }
  }



  if (f === 1) {
    this.setState({ res: `${value} is present in the array.` });
  } else {
    this.setState({ res: `${value} is NOT present in the array.` });
  }
};

  


  render() {
    return (
      <>
      <div className="box">
        <h2>Array</h2>

        <h4>Largest Number</h4>

        <button onClick={this.largest}>Largest No.</button>
        <p>Largest Number: {this.state.output}</p>

          <h4>Search Number</h4>
       <input type="number" value={this.state.value} onChange={this.handle} placeholder="Enter number to search"
          />
         <button onClick={this.search}>Search No.</button>
        <p>Largest Number: {this.state.res}</p>
        </div>
      </>
    );
  }
}

export default Arrwala;
