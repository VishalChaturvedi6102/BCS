import React, { Component } from "react";

import Sp from "./Sp";

class Mp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: "xyz"
    };
  }

  render() {
    return (
      <>
      <h2>Parent Component: Mp</h2>
        <Sp name="ABC" city="Agra"></Sp>
      </>
    );
  }
}

export default Mp;
