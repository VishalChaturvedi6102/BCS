

// SyllabusViewer.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Syllabusviewer = ({ syllabusFilename }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const syllabusUrl = syllabusFilename 
    ? `http://localhost:4000/uploads/${syllabusFilename}`
    : null;

  return (
    <>
      <Button variant="outline-primary" size="sm" onClick={handleShow}>
        <i className="bi bi-file-earmark-pdf me-1"></i>
        View Syllabus
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Course Syllabus</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '70vh' }}>
          {syllabusUrl ? (
            <iframe 
              src={syllabusUrl} 
              width="100%" 
              height="100%" 
              title="Course Syllabus"
              style={{ border: 'none' }}
            />
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-file-earmark-x display-1 text-muted"></i>
              <p className="mt-3">No syllabus available for this course.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {syllabusUrl && (
            <Button 
              variant="primary" 
              onClick={() => window.open(syllabusUrl, '_blank')}
            >
              Download PDF
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Syllabusviewer;