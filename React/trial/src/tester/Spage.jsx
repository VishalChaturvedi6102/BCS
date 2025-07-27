import React, { Component } from "react";
import './Spage.css'

class Spage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 0,
      a: "",
      b: "",
      c: "",
      s1:""
    };
  }

  handle = (e) => {
  
    this.setState({ n: e.target.value });
    //  this.setState({ a: e.target.value });
    //   this.setState({ b: e.target.value });
    //    this.setState({ c: e.target.value });
  };

  // a,b,c ki state handling

 handleA = (e) => { 
  this.setState({[e.target.name] : e.target.value });};





  // Factorial wala function
  fun1 = () => {
    let n = parseInt(this.state.n);
    let f = 1;
    while (n > 0) {
      f = f * n;
      n--;
    }
    this.setState({s1:f});
    alert(`Factorial: ${f}`);
  };

  // Prime number wala function
  fun2 = () => {
    let f=1;
    let n = parseInt(this.state.n); 
    if (n <= 1) {
      alert("NOT a prime number.");
      return;
    }
    for (let i = 2; i <= n / 2; i++) {
      if (n % i === 0) {
        f=0;
        return;
      }
    }
    if(f===1)
    this.setState({s1:"Prime Number"});
  else
  this.setState({s1:"Not Prime"});
  };

  // Reverse a number function
  fun3 = () => {
    let n = parseInt(this.state.n); 
    let rev = 0;
    while (n !== 0) {
      let dig = n % 10;
      rev = rev * 10 + dig;
      n = Math.floor(n / 10);
    }
   this.setState({s1:rev});
  };

  // 3 number ka sum wala function

  fun4 = () => {
   let a = parseInt(this.state.a);
  let b = parseInt(this.state.b);
  let c = parseInt(this.state.c);

      // let sum = 0;
     let sum = (a+b+c);
      this.setState({ s1:sum });
  
    };

  render() {
    return (
      
        <div className="container">
        <div className="input-box">
          <input
            type="text"
            name="t1"
            id="t1"
            onChange={this.handle}
            placeholder="Enter a number"
          />
        </div>

        <div className="box">
          <h3>Factorial</h3>
          <button onClick={this.fun1}>Calculate Factorial</button>
          
        </div>

        <div className="box">
          <h3>Prime Check</h3>
          <button onClick={this.fun2}>Check Prime</button>
          
        </div>

        <div className="box">
          <h3>Reverse Number</h3>
          <button onClick={this.fun3}>Reverse a Number</button>
          
        </div>


         <div className="box">
  <h3>Sum of 3 Numbers</h3>
      <input type="text" name="a" value={this.state.a} placeholder="Enter 1st no." onChange={this.handleA} />
         <input type="text" name="b" value={this.state.b} placeholder="Enter 2nd no. " onChange={this.handleA} />
      <input type="text" name="c" value={this.state.c} placeholder="Enter 3rd no." onChange={this.handleA} />
        <button onClick={this.fun4}>sum of 3 no.</button>
</div>

        <div className="res">
          <span>{this.state.s1}</span>
        </div>
      </div>
      
    );
  }
}

export default Spage;
