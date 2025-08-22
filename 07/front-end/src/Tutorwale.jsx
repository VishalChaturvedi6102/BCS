

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Badge, Row, Col, ListGroup, Container } from "react-bootstrap";

const Tutorwale = ({ language }) => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    // Save language name in localStorage
    localStorage.setItem("selectedLanguage", language);
    // Navigate to calendar page
    navigate(`/calendar/${language.toLowerCase()}`);
  };

  return (
    <Container className="my-5">
      <Card className="mb-4 shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">Rana B.</h4>
            <small className="text-muted">Vetted Tutor</small>
          </div>
          <div className="text-end">
            <div>⭐ 5 (20)</div>
            <div className="fw-bold">CAD $25/hr</div>
          </div>
        </Card.Header>

        <Card.Body>
          <Button
            variant="success"
            className="mb-3"
            onClick={handleBookingClick}
          >
            Book a Session
          </Button>

          <Card.Title>
            Experienced Tutor with a Passion for Math, English, and Science
          </Card.Title>

          <Card.Text>
            As a highly experienced tutor with over 4 years of teaching students
            from grade 1-12, I have developed a deep understanding of the unique
            needs and learning styles of each individual student. My passion for
            teaching and commitment to student success has driven me to tailor
            lesson plans to meet the specific needs of my students. I specialize
            in math, science, and English, and my creative approach to teaching
            ensures that every session is engaging, interactive, and
            thought-provoking. Whether your child is struggling to keep up or
            looking to excel, I am dedicated to providing personalized support
            that will help them reach their full potential.
          </Card.Text>

          <Row>
            <Col md={6}>
              <h6>Location</h6>
              <p>Vaughan, Ontario, Canada</p>
            </Col>
            <Col md={6}>
              <h6>Language</h6>
              <p>Persian, English</p>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h6>Timezone</h6>
              <p>America/Toronto</p>
            </Col>
            <Col md={6}>
              <h6>Subjects</h6>
              <div>
                {[
                  "Biology",
                  "Chemistry",
                  "English",
                  "English as a Second Language (ESL)",
                  "Farsi",
                  "Math",
                  "Natural Science",
                  "Elementary English",
                  "Elementary Math",
                ].map((subject) => (
                  <Badge bg="info" className="me-1 mb-1" key={subject}>
                    {subject}
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <h6>Levels</h6>
              <div>
                {["Elementary", "Middle School", "High School"].map((level) => (
                  <Badge bg="secondary" className="me-1 mb-1" key={level}>
                    {level}
                  </Badge>
                ))}
              </div>
            </Col>

            <Col md={6}>
              <h6>Education</h6>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  McMaster University <br />
                  <small className="text-muted">2016 - 2020</small> <br />
                  Bachelors, Life Sciences
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={12}>
              <h6>Work Experience</h6>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  MacBridge Academy <br />
                  <small className="text-muted">October 2019 - March 2020</small>{" "}
                  <br />
                  Tutor - Tutoring students from grades 1 to 12 in maths, chem,
                  and biology.
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Tutorwale;
