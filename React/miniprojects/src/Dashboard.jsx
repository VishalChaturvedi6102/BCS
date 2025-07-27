

// import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
// Corrected: Removed duplicate import for Container
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Carousel from 'react-bootstrap/Carousel';

import Card from 'react-bootstrap/Card'; // Already imported, good.

// Corrected: Removed duplicate imports for Container, Row, Col
// These should be imported once at the top with other React-Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UserContext from "./Usercontext";
import React, { useContext } from 'react';

import { Outlet, Link } from "react-router-dom";





import Home from "./Home";

// Define the ExampleCarouselImage component
const ExampleCarouselImage = ({ imageUrl, altText }) => {
  return (
    <img
      className="d-block w-100"
      src={imageUrl} // Use the provided imageUrl
      alt={altText}
      style={{ height: '400px', objectFit: 'cover' }}
      
      onError={(e) => {
        console.error(`Failed to load image: ${imageUrl}`);
       
      }}
    />
  );
};

// const Dashboard = () => {
//   const Dashboard = () => {
//   const user = useContext(UserContext);

//   const Home = () => {
//   const user = useContext(UserContext);
// }


const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);

  


  return (
    <>
   
      {/* Navbar*/}

      <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
        <Container fluid>
{/* yaha data import karaya hai */}
          <Navbar.Brand href="#"> Hellooooo, {user.name} ({user.email}) </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* <Nav.Link href="./Home">Home</Nav.Link> */}
              <Nav.Link as={Link} to="/dashboard/home">Home</Nav.Link>

              {/* <Nav.Link as={Link} to="/home">Home</Nav.Link> */}



              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
  <h2>User Info</h2>
  <p><strong>Name:</strong> {user.name}</p>
  <p><strong>Email:</strong> {user.email}</p>
  <p><strong>Role:</strong> {user.role}</p>
</Container>

{/* yeah mera nested data for Home.jsx ke liye hai */}
  <Container>
        <Outlet /> 
      </Container>


      {/* Carousel (images wala section) */}
       <div className="bg-dark text-white min-vh-100">
      <Carousel>
        <Carousel.Item>
          <ExampleCarouselImage
            imageUrl="https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=903&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            altText="Beautiful Beach Sunset"
          />
          <Carousel.Caption>
            <h3>First slide</h3>
            <p>A stunning beach sunset with warm colors.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <ExampleCarouselImage
            imageUrl="https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=786&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            altText="Mountain Landscape with Lake"
          />
          <Carousel.Caption>
            <h3>Second slide</h3>
            <p>Peaceful mountain range reflected in a clear lake.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <ExampleCarouselImage
            imageUrl="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            altText="City Night View"
          />
          <Carousel.Caption>
            <h3>Third slide</h3>
            <p>Vibrant city lights at night from a high vantage point.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* New images you provided */}
        <Carousel.Item>
          <ExampleCarouselImage
            imageUrl="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D"
            altText="Misty Mountain Forest"
          />
          <Carousel.Caption>
            <h3>Fourth slide</h3>
            <p>A tranquil forest shrouded in mist, very atmospheric.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <ExampleCarouselImage
            imageUrl="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFuZHNjYXBlfGVufDB8fDB8fHww"
            altText="Warm Sunset Landscape"
          />
          <Carousel.Caption>
            <h3>Fifth slide</h3>
            <p>Rolling hills bathed in the golden light of sunset.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


{/*  */}
      <Container className="my-4"> 
        <h2 className="mb-3">Cards wala section</h2> 
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
          {[
            'Primary',
            'Secondary',
            'Success',
            'Danger',
            'Warning',
            'Info',
            'Light',
            'Dark',
          ].map((variant) => (
            <Col key={variant}>
              <Card
                bg={variant.toLowerCase()}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="h-100" 
              >
                <Card.Header>Header</Card.Header>
                <Card.Body>
                  <Card.Title>{variant} Card Title </Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <br />
      </div>
    
    </>
  );
};

export default Dashboard;