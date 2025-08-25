import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';

const Call = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const userType = searchParams.get('type');
  const userName = searchParams.get('name');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!roomId || !userType || !userName) {
      setError('Missing call parameters');
      setLoading(false);
      return;
    }

    // Initialize video call here (you'll need to implement WebRTC logic)
    console.log('Joining call:', { roomId, userType, userName });
    setLoading(false);
  }, [roomId, userType, userName]);

  const handleLeaveCall = () => {
    navigate(userType === 'teacher' ? '/teacher-calendar' : '/student-calendar');
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Card className="shadow">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4>Video Call - Room: {roomId}</h4>
          <Button variant="outline-danger" onClick={handleLeaveCall}>
            Leave Call
          </Button>
        </Card.Header>
        <Card.Body>
          <div className="text-center">
            <p>Welcome, {userName} ({userType})</p>
            <div style={{ 
              width: '100%', 
              height: '400px', 
              backgroundColor: '#000', 
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              marginBottom: '20px'
            }}>
              Video call interface will be here
              <div style={{ marginTop: '20px' }}>
                <p>Implement WebRTC video streams here</p>
              </div>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <Button variant="primary">Mute</Button>
              <Button variant="primary">Video Off</Button>
              <Button variant="success">Share Screen</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Call;