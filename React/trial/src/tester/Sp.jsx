import React, { Component } from "react";


class Sp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
       <p> Name : {this.props.name} </p>
       <p> City : {this.props.city} </p> 
      </>
    );
  }
}

export default Sp;
