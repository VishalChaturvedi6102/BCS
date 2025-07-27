import React, { Component } from "react";
import { Link } from "react-router-dom";

class DefMain extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul style={styles.navbar}>
{/*  */}
            <li>
              <Link to="/home" style={styles.link}>
              HOME
              </Link>
            </li>
{/*  */}
            <li>
              <Link to="/about" style={styles.link}>
              ABOUT
              </Link>
            </li>
{/*  */}

        <li>
              <Link to="/view" style={styles.link}>
              VIEW 
              </Link>
            </li> 
            {/*  */}
            <li>
              <Link to="/contact" style={styles.link}>
              CONTACT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}




const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    listStyleType: "none",
    backgroundColor: "#333",
    padding: "10px",
    margin: 0, 
  },

  
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default DefMain;
