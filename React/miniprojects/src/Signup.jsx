import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Nav from "react-bootstrap/Nav";

import "./Loginpage.css";

export const Signup = () => {
  const [formData, setFormData] = useState({ name: "", age: "", pass: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Signup data:", formData);
    setMessage("Account created successfully!");
    setFormData({ name: "", age: "", pass: "" });
  };

  return (
    <>
      dsfjsdkfjdsfk
      <div className="wrapper">
        <div className="kk">
          <Form onSubmit={handleSubmit}>
            <h3 className="mb-4 text-center">Sign Up</h3>

            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age (18-60)"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min={18}
                max={60}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create password"
                name="pass"
                value={formData.pass}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign Up
            </Button>

            {message && (
              <p
                style={{
                  color: message.includes("successfully") ? "green" : "red",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {message}
              </p>
            )}
          </Form>
          <Nav.Link href="/">Login</Nav.Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
