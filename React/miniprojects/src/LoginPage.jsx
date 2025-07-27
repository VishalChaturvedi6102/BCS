import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Loginpage.css";
import Dashboard from "./Dashboard";

const LoginPage = () => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const VALID_USERNAME = "user";
  const VALID_PASSWORD = "password";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.name);
    console.log(formData.password);
    if (
      formData.name === VALID_USERNAME &&
      formData.password === VALID_PASSWORD
    ) {
      navigate("/dashboard");
    } else {
      setMessage("Invalid credentials! Please try again.");
    }
  };

  return (
    <>
      <br />
      <br />
      <div className="wrapper">
        <div className="kk">
          <Form onSubmit={handleSubmit}>
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

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
            {message && (
              <p
                style={{
                  color: message.includes("successful") ? "green" : "red",
                  marginTop: "10px",
                }}
              >
                {message}
              </p>
            )}
          </Form>

          <Nav.Link href="/signup">Register</Nav.Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
