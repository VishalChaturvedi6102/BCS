

// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap';
// import { socket } from './socket';

// const VideoCall = () => {
//   const [searchParams] = useSearchParams();
//   const roomId = searchParams.get('roomId');
//   const userType = searchParams.get('type');
//   const userName = searchParams.get('name');
//   const navigate = useNavigate();
  
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isVideoEnabled, setIsVideoEnabled] = useState(true);
//   const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//   const [error, setError] = useState('');

//   // WebRTC configuration
//   const pcConfig = {
//     iceServers: [
//       { urls: 'stun:stun.l.google.com:19302' },
//       { urls: 'stun:stun1.l.google.com:19302' }
//     ]
//   };
//   const peerConnection = useRef(new RTCPeerConnection(pcConfig));

//   useEffect(() => {
//     if (!roomId || !userType || !userName) {
//       setError('Missing call parameters');
//       return;
//     }

//     initializeCall();
    
//     return () => {
//       // Cleanup
//       if (localStream) {
//         localStream.getTracks().forEach(track => track.stop());
//       }
//       if (peerConnection.current) {
//         peerConnection.current.close();
//       }
//     };
//   }, [roomId, userType, userName]);

//   const initializeCall = async () => {
//     try {
//       // Get user media
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });
      
//       setLocalStream(stream);
//       localVideoRef.current.srcObject = stream;

//       // Add local stream to peer connection
//       stream.getTracks().forEach(track => {
//         peerConnection.current.addTrack(track, stream);
//       });

//       // Setup peer connection event handlers
//       peerConnection.current.ontrack = (event) => {
//         const remoteStream = event.streams[0];
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       };

//       peerConnection.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit('ice-candidate', {
//             roomId,
//             candidate: event.candidate
//           });
//         }
//       };

//       // Join the room
//       socket.emit('join-room', roomId);
//       setIsConnected(true);

//       // Set up socket listeners for WebRTC signaling
//       socket.on('offer', handleOffer);
//       socket.on('answer', handleAnswer);
//       socket.on('ice-candidate', handleIceCandidate);
//       socket.on('user-joined', handleUserJoined);

//       // If teacher, create offer
//       if (userType === 'teacher') {
//         createOffer();
//       }

//     } catch (err) {
//       console.error('Error accessing media devices:', err);
//       setError('Could not access camera/microphone. Please check permissions.');
//     }
//   };

//   const createOffer = async () => {
//     try {
//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(offer);
      
//       socket.emit('offer', {
//         roomId,
//         sdp: offer
//       });
//     } catch (err) {
//       console.error('Error creating offer:', err);
//     }
//   };

//   const handleOffer = async ({ sdp, sender }) => {
//     if (userType === 'student') {
//       await peerConnection.current.setRemoteDescription(sdp);
      
//       const answer = await peerConnection.current.createAnswer();
//       await peerConnection.current.setLocalDescription(answer);
      
//       socket.emit('answer', {
//         roomId,
//         sdp: answer
//       });
//     }
//   };

//   const handleAnswer = async ({ sdp }) => {
//     await peerConnection.current.setRemoteDescription(sdp);
//   };

//   const handleIceCandidate = async ({ candidate }) => {
//     try {
//       await peerConnection.current.addIceCandidate(candidate);
//     } catch (err) {
//       console.error('Error adding ICE candidate:', err);
//     }
//   };

//   const handleUserJoined = (userId) => {
//     console.log('User joined:', userId);
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       const videoTrack = localStream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoEnabled(videoTrack.enabled);
//       }
//     }
//   };

//   const toggleAudio = () => {
//     if (localStream) {
//       const audioTrack = localStream.getAudioTracks()[0];
//       if (audioTrack) {
//         audioTrack.enabled = !audioTrack.enabled;
//         setIsAudioEnabled(audioTrack.enabled);
//       }
//     }
//   };

//   const handleLeaveCall = () => {
//     // Clean up media streams
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//     }
//     if (peerConnection.current) {
//       peerConnection.current.close();
//     }
    
//     // Navigate back
//     navigate(userType === 'teacher' ? '/teachercalendar' : '/calendar');
//   };

//   if (error) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <Alert variant="danger" className="text-center">
//           <h4>Error</h4>
//           <p>{error}</p>
//           <Button onClick={() => navigate(-1)}>Go Back</Button>
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh' }}>
//       <div className="d-flex flex-column" style={{ height: '100vh' }}>
//         {/* Header */}
//         <div className="text-white p-3 d-flex justify-content-between align-items-center">
//           <h4>Video Call - Room: {roomId}</h4>
//           <div>
//             <span className="badge bg-success me-2">
//               {isConnected ? 'Connected' : 'Connecting...'}
//             </span>
//             <Button variant="outline-danger" size="sm" onClick={handleLeaveCall}>
//               Leave Call
//             </Button>
//           </div>
//         </div>

//         {/* Video Area */}
//         <Row className="flex-grow-1 g-2">
//           <Col md={6}>
//             <Card className="h-100 bg-dark text-white">
//               <Card.Body className="p-2 d-flex flex-column">
//                 <h6>You ({userName})</h6>
//                 <div className="flex-grow-1 position-relative">
//                   <video
//                     ref={localVideoRef}
//                     autoPlay
//                     muted
//                     playsInline
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       backgroundColor: '#111'
//                     }}
//                   />
//                   {!isVideoEnabled && (
//                     <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark">
//                       <span>Video disabled</span>
//                     </div>
//                   )}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col md={6}>
//             <Card className="h-100 bg-dark text-white">
//               <Card.Body className="p-2 d-flex flex-column">
//                 <h6>{userType === 'teacher' ? 'Student' : 'Teacher'}</h6>
//                 <div className="flex-grow-1 position-relative">
//                   <video
//                     ref={remoteVideoRef}
//                     autoPlay
//                     playsInline
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       backgroundColor: '#111'
//                     }}
//                   />
//                   {!remoteStream && (
//                     <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark">
//                       <span>Waiting for {userType === 'teacher' ? 'student' : 'teacher'} to join...</span>
//                     </div>
//                   )}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Controls */}
//         <div className="p-3 text-center">
//           <div className="d-flex justify-content-center gap-3">
//             <Button
//               variant={isVideoEnabled ? "primary" : "secondary"}
//               onClick={toggleVideo}
//               size="lg"
//             >
//               {isVideoEnabled ? '📹 Video On' : '📹 Video Off'}
//             </Button>
            
//             <Button
//               variant={isAudioEnabled ? "primary" : "secondary"}
//               onClick={toggleAudio}
//               size="lg"
//             >
//               {isAudioEnabled ? '🎤 Mic On' : '🎤 Mic Off'}
//             </Button>
            
//             <Button variant="success" size="lg">
//               📺 Share Screen
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default VideoCall;




// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap';
// import { socket } from './socket';

// const VideoCall = () => {
//   const [searchParams] = useSearchParams();
//   const roomId = searchParams.get('roomId');
//   const userType = searchParams.get('type');
//   const userName = searchParams.get('name');
//   const navigate = useNavigate();
  
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isVideoEnabled, setIsVideoEnabled] = useState(true);
//   const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//   const [error, setError] = useState('');
//   const [usingMockMedia, setUsingMockMedia] = useState(false);
//   const [retryCount, setRetryCount] = useState(0);

//   const pcConfig = {
//     iceServers: [
//       { urls: 'stun:stun.l.google.com:19302' },
//       { urls: 'stun:stun1.l.google.com:19302' }
//     ]
//   };
//   const peerConnection = useRef(new RTCPeerConnection(pcConfig));

//   useEffect(() => {
//     if (!roomId || !userType || !userName) {
//       setError('Missing call parameters');
//       return;
//     }

//     initializeCall();
    
//     return () => {
//       cleanupMedia();
//     };
//   }, [roomId, userType, userName, retryCount]);

//   const createMockStream = () => {
//     // Create a canvas-based mock video stream
//     const canvas = document.createElement('canvas');
//     canvas.width = 640;
//     canvas.height = 480;
//     const context = canvas.getContext('2d');
    
//     // Draw something on the canvas
//     const drawFrame = () => {
//       context.fillStyle = '#2c3e50';
//       context.fillRect(0, 0, canvas.width, canvas.height);
      
//       context.fillStyle = '#3498db';
//       context.font = '48px Arial';
//       context.textAlign = 'center';
//       context.fillText(`${userName} (${userType})`, canvas.width/2, canvas.height/2);
      
//       context.fillStyle = '#e74c3c';
//       context.font = '24px Arial';
//       context.fillText('Mock Video Stream - Testing Only', canvas.width/2, canvas.height/2 + 50);
      
//       context.fillStyle = '#27ae60';
//       context.beginPath();
//       context.arc(canvas.width/2, canvas.height/3, 50, 0, 2 * Math.PI);
//       context.fill();
//     };
    
//     drawFrame();
    
//     // Capture stream from canvas
//     const stream = canvas.captureStream(15);
    
//     // Add mock audio track (silent)
//     const audioContext = new AudioContext();
//     const oscillator = audioContext.createOscillator();
//     const destination = oscillator.connect(audioContext.createMediaStreamDestination());
//     oscillator.start();
//     const audioTrack = destination.stream.getAudioTracks()[0];
//     stream.addTrack(audioTrack);
    
//     // Continuously update the canvas
//     setInterval(drawFrame, 1000/15);
    
//     return stream;
//   };

//   const initializeCall = async () => {
//     try {
//       setError('');
//       let stream;
      
//       try {
//         // First try to get real media devices
//         stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true
//         });
//         setUsingMockMedia(false);
//       } catch (mediaError) {
//         console.warn('Real media not available, using mock media:', mediaError);
//         stream = createMockStream();
//         setUsingMockMedia(true);
//       }
      
//       setLocalStream(stream);
//       localVideoRef.current.srcObject = stream;

//       // Add local stream to peer connection
//       stream.getTracks().forEach(track => {
//         peerConnection.current.addTrack(track, stream);
//       });

//       // Setup peer connection event handlers
//       peerConnection.current.ontrack = (event) => {
//         const remoteStream = event.streams[0];
//         setRemoteStream(remoteStream);
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = remoteStream;
//         }
//       };

//       peerConnection.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit('ice-candidate', {
//             roomId,
//             candidate: event.candidate
//           });
//         }
//       };

//       // Join the room
//       socket.emit('join-room', roomId);
//       setIsConnected(true);

//       // Set up socket listeners
//       socket.on('offer', handleOffer);
//       socket.on('answer', handleAnswer);
//       socket.on('ice-candidate', handleIceCandidate);
//       socket.on('user-joined', handleUserJoined);

//       // If teacher, create offer
//       if (userType === 'teacher') {
//         createOffer();
//       }

//     } catch (err) {
//       console.error('Error initializing call:', err);
//       setError(err.message || 'Could not initialize call. Please try again.');
//     }
//   };

//   const cleanupMedia = () => {
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//       setLocalStream(null);
//     }
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = new RTCPeerConnection(pcConfig);
//     }
//   };

//   const createOffer = async () => {
//     try {
//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(offer);
      
//       socket.emit('offer', {
//         roomId,
//         sdp: offer
//       });
//     } catch (err) {
//       console.error('Error creating offer:', err);
//       setError('Failed to start call. Please try again.');
//     }
//   };

//   const handleOffer = async ({ sdp, sender }) => {
//     if (userType === 'student') {
//       try {
//         await peerConnection.current.setRemoteDescription(sdp);
        
//         const answer = await peerConnection.current.createAnswer();
//         await peerConnection.current.setLocalDescription(answer);
        
//         socket.emit('answer', {
//           roomId,
//           sdp: answer
//         });
//       } catch (err) {
//         console.error('Error handling offer:', err);
//         setError('Failed to join call. Please try again.');
//       }
//     }
//   };

//   const handleAnswer = async ({ sdp }) => {
//     try {
//       await peerConnection.current.setRemoteDescription(sdp);
//     } catch (err) {
//       console.error('Error handling answer:', err);
//     }
//   };

//   const handleIceCandidate = async ({ candidate }) => {
//     try {
//       await peerConnection.current.addIceCandidate(candidate);
//     } catch (err) {
//       console.error('Error adding ICE candidate:', err);
//     }
//   };

//   const handleUserJoined = (userId) => {
//     console.log('User joined:', userId);
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       const videoTrack = localStream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoEnabled(videoTrack.enabled);
//       }
//     }
//   };

//   const toggleAudio = () => {
//     if (localStream) {
//       const audioTrack = localStream.getAudioTracks()[0];
//       if (audioTrack) {
//         audioTrack.enabled = !audioTrack.enabled;
//         setIsAudioEnabled(audioTrack.enabled);
//       }
//     }
//   };

//   const retryConnection = () => {
//     cleanupMedia();
//     setRetryCount(prev => prev + 1);
//     setError('');
//   };

//   const handleLeaveCall = () => {
//     cleanupMedia();
//     navigate(userType === 'teacher' ? '/teachercalendar' : '/calendar');
//   };

//   if (error) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <Alert variant="danger" className="text-center">
//           <h4>Error</h4>
//           <p>{error}</p>
//           <div className="d-flex gap-2 justify-content-center mt-3">
//             <Button variant="primary" onClick={retryConnection}>
//               Try Again
//             </Button>
//             <Button variant="outline-secondary" onClick={handleLeaveCall}>
//               Leave Call
//             </Button>
//           </div>
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh' }}>
//       <div className="d-flex flex-column" style={{ height: '100vh' }}>
//         {/* Header */}
//         <div className="text-white p-3 d-flex justify-content-between align-items-center">
//           <div>
//             <h4>Video Call - Room: {roomId}</h4>
//             {usingMockMedia && (
//               <span className="badge bg-warning text-dark">Using Test Video</span>
//             )}
//           </div>
//           <div>
//             <span className="badge bg-success me-2">
//               {isConnected ? 'Connected' : 'Connecting...'}
//             </span>
//             <Button variant="outline-danger" size="sm" onClick={handleLeaveCall}>
//               Leave Call
//             </Button>
//           </div>
//         </div>

//         {/* Video Area */}
//         <Row className="flex-grow-1 g-2">
//           <Col md={6}>
//             <Card className="h-100 bg-dark text-white">
//               <Card.Body className="p-2 d-flex flex-column">
//                 <h6>You ({userName}) {usingMockMedia && '(Test Mode)'}</h6>
//                 <div className="flex-grow-1 position-relative">
//                   <video
//                     ref={localVideoRef}
//                     autoPlay
//                     muted
//                     playsInline
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       backgroundColor: '#111'
//                     }}
//                   />
//                   {!isVideoEnabled && (
//                     <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark">
//                       <span>Video disabled</span>
//                     </div>
//                   )}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col md={6}>
//             <Card className="h-100 bg-dark text-white">
//               <Card.Body className="p-2 d-flex flex-column">
//                 <h6>{userType === 'teacher' ? 'Student' : 'Teacher'}</h6>
//                 <div className="flex-grow-1 position-relative">
//                   <video
//                     ref={remoteVideoRef}
//                     autoPlay
//                     playsInline
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       backgroundColor: '#111'
//                     }}
//                   />
//                   {!remoteStream && (
//                     <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark">
//                       <span>Waiting for {userType === 'teacher' ? 'student' : 'teacher'} to join...</span>
//                     </div>
//                   )}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Controls */}
//         <div className="p-3 text-center">
//           <div className="d-flex justify-content-center gap-3">
//             <Button
//               variant={isVideoEnabled ? "primary" : "secondary"}
//               onClick={toggleVideo}
//               size="lg"
//               disabled={usingMockMedia}
//             >
//               {isVideoEnabled ? '📹 Video On' : '📹 Video Off'}
//             </Button>
            
//             <Button
//               variant={isAudioEnabled ? "primary" : "secondary"}
//               onClick={toggleAudio}
//               size="lg"
//               disabled={usingMockMedia}
//             >
//               {isAudioEnabled ? '🎤 Mic On' : '🎤 Mic Off'}
//             </Button>
            
//             <Button variant="success" size="lg" disabled={usingMockMedia}>
//               📺 Share Screen
//             </Button>
//           </div>
//           {usingMockMedia && (
//             <div className="mt-2">
//               <small className="text-warning">
//                 Using test media. Connect a second device for real video/audio.
//               </small>
//             </div>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default VideoCall;





// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap';
// import { socket } from './socket';

// const VideoCall = () => {
//   const [searchParams] = useSearchParams();
//   const roomId = searchParams.get('roomId');
//   const userType = searchParams.get('type');
//   const userName = searchParams.get('name');
//   const navigate = useNavigate();
  
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isVideoEnabled, setIsVideoEnabled] = useState(true);
//   const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//   const [error, setError] = useState('');
//   const [usingMockMedia, setUsingMockMedia] = useState(false);
//   const [retryCount, setRetryCount] = useState(0);
//   const [availableCameras, setAvailableCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState('');

//   const pcConfig = {
//     iceServers: [
//       { urls: 'stun:stun.l.google.com:19302' },
//       { urls: 'stun:stun1.l.google.com:19302' }
//     ]
//   };
//   const peerConnection = useRef(new RTCPeerConnection(pcConfig));

//   useEffect(() => {
//     if (!roomId || !userType || !userName) {
//       setError('Missing call parameters');
//       return;
//     }

//     getAvailableCameras();
//     initializeCall();
    
//     return () => {
//       cleanupMedia();
//     };
//   }, [roomId, userType, userName, retryCount]);

//   const getAvailableCameras = async () => {
//     try {
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       const cameras = devices.filter(device => device.kind === 'videoinput');
//       setAvailableCameras(cameras);
      
//       if (cameras.length > 0) {
//         setSelectedCamera(cameras[0].deviceId);
//       }
//     } catch (err) {
//       console.error('Error getting cameras:', err);
//     }
//   };

//   const createMockStream = () => {
//     // Create a canvas-based mock video stream
//     const canvas = document.createElement('canvas');
//     canvas.width = 640;
//     canvas.height = 480;
//     const context = canvas.getContext('2d');
    
//     // Draw something on the canvas
//     const drawFrame = () => {
//       context.fillStyle = '#2c3e50';
//       context.fillRect(0, 0, canvas.width, canvas.height);
      
//       context.fillStyle = '#3498db';
//       context.font = '48px Arial';
//       context.textAlign = 'center';
//       context.fillText(`${userName} (${userType})`, canvas.width/2, canvas.height/2);
      
//       context.fillStyle = '#e74c3c';
//       context.font = '24px Arial';
//       context.fillText('Mock Video Stream - Testing Only', canvas.width/2, canvas.height/2 + 50);
      
//       context.fillStyle = '#27ae60';
//       context.beginPath();
//       context.arc(canvas.width/2, canvas.height/3, 50, 0, 2 * Math.PI);
//       context.fill();
//     };
    
//     drawFrame();
    
//     // Capture stream from canvas
//     const stream = canvas.captureStream(15);
    
//     // Add mock audio track (silent)
//     const audioContext = new AudioContext();
//     const oscillator = audioContext.createOscillator();
//     const destination = oscillator.connect(audioContext.createMediaStreamDestination());
//     oscillator.start();
//     const audioTrack = destination.stream.getAudioTracks()[0];
//     stream.addTrack(audioTrack);
    
//     // Continuously update the canvas
//     setInterval(drawFrame, 1000/15);
    
//     return stream;
//   };

//   const initializeCall = async () => {
//     try {
//       setError('');
//       let stream;
      
//       try {
//         // First try to get real media devices
//         const constraints = {
//           video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
//           audio: true
//         };
        
//         stream = await navigator.mediaDevices.getUserMedia(constraints);
//         setUsingMockMedia(false);
//       } catch (mediaError) {
//         console.warn('Real media not available, using mock media:', mediaError);
//         stream = createMockStream();
//         setUsingMockMedia(true);
//       }
      
//       setLocalStream(stream);
//       localVideoRef.current.srcObject = stream;

//       // Add local stream to peer connection
//       stream.getTracks().forEach(track => {
//         peerConnection.current.addTrack(track, stream);
//       });

//       // Setup peer connection event handlers
//       peerConnection.current.ontrack = (event) => {
//         const remoteStream = event.streams[0];
//         setRemoteStream(remoteStream);
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = remoteStream;
//         }
//       };

//       peerConnection.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit('ice-candidate', {
//             roomId,
//             candidate: event.candidate
//           });
//         }
//       };

//       // Join the room
//       socket.emit('join-room', roomId);
//       setIsConnected(true);

//       // Set up socket listeners
//       socket.on('offer', handleOffer);
//       socket.on('answer', handleAnswer);
//       socket.on('ice-candidate', handleIceCandidate);
//       socket.on('user-joined', handleUserJoined);

//       // If teacher, create offer
//       if (userType === 'teacher') {
//         createOffer();
//       }

//     } catch (err) {
//       console.error('Error initializing call:', err);
//       setError(err.message || 'Could not initialize call. Please try again.');
//     }
//   };

//   const cleanupMedia = () => {
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//       setLocalStream(null);
//     }
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = new RTCPeerConnection(pcConfig);
//     }
//   };

//   const createOffer = async () => {
//     try {
//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(offer);
      
//       socket.emit('offer', {
//         roomId,
//         sdp: offer
//       });
//     } catch (err) {
//       console.error('Error creating offer:', err);
//       setError('Failed to start call. Please try again.');
//     }
//   };

//   const handleOffer = async ({ sdp, sender }) => {
//     if (userType === 'student') {
//       try {
//         await peerConnection.current.setRemoteDescription(sdp);
        
//         const answer = await peerConnection.current.createAnswer();
//         await peerConnection.current.setLocalDescription(answer);
        
//         socket.emit('answer', {
//           roomId,
//           sdp: answer
//         });
//       } catch (err) {
//         console.error('Error handling offer:', err);
//         setError('Failed to join call. Please try again.');
//       }
//     }
//   };

//   const handleAnswer = async ({ sdp }) => {
//     try {
//       await peerConnection.current.setRemoteDescription(sdp);
//     } catch (err) {
//       console.error('Error handling answer:', err);
//     }
//   };

//   const handleIceCandidate = async ({ candidate }) => {
//     try {
//       await peerConnection.current.addIceCandidate(candidate);
//     } catch (err) {
//       console.error('Error adding ICE candidate:', err);
//     }
//   };

//   const handleUserJoined = (userId) => {
//     console.log('User joined:', userId);
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       const videoTrack = localStream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoEnabled(videoTrack.enabled);
//       }
//     }
//   };

//   const toggleAudio = () => {
//     if (localStream) {
//       const audioTrack = localStream.getAudioTracks()[0];
//       if (audioTrack) {
//         audioTrack.enabled = !audioTrack.enabled;
//         setIsAudioEnabled(audioTrack.enabled);
//       }
//     }
//   };

//   const switchCamera = async (deviceId) => {
//     try {
//       if (localStream) {
//         // Stop current video tracks
//         localStream.getVideoTracks().forEach(track => track.stop());
        
//         // Get new stream with selected camera
//         const constraints = {
//           video: { deviceId: { exact: deviceId } },
//           audio: true
//         };
        
//         const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        
//         // Replace the video track in the local stream
//         const newVideoTrack = newStream.getVideoTracks()[0];
//         const sender = peerConnection.current.getSenders().find(
//           s => s.track && s.track.kind === 'video'
//         );
        
//         if (sender) {
//           await sender.replaceTrack(newVideoTrack);
//         }
        
//         // Update local stream and video element
//         const updatedStream = new MediaStream([
//           newVideoTrack,
//           ...localStream.getAudioTracks()
//         ]);
        
//         setLocalStream(updatedStream);
//         localVideoRef.current.srcObject = updatedStream;
        
//         // Close the temporary stream
//         newStream.getTracks().forEach(track => {
//           if (track.kind === 'audio') track.stop();
//         });
//       }
//     } catch (err) {
//       console.error('Error switching camera:', err);
//       setError('Failed to switch camera. Please try again.');
//     }
//   };

//   const handleCameraChange = (e) => {
//     const deviceId = e.target.value;
//     setSelectedCamera(deviceId);
//     if (!usingMockMedia) {
//       switchCamera(deviceId);
//     }
//   };

//   const retryConnection = () => {
//     cleanupMedia();
//     setRetryCount(prev => prev + 1);
//     setError('');
//   };

//   const handleLeaveCall = () => {
//     cleanupMedia();
//     navigate(userType === 'teacher' ? '/teachercalendar' : '/calendar');
//   };

//   if (error) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <Alert variant="danger" className="text-center">
//           <h4>Error</h4>
//           <p>{error}</p>
//           <div className="d-flex gap-2 justify-content-center mt-3">
//             <Button variant="primary" onClick={retryConnection}>
//               Try Again
//             </Button>
//             <Button variant="outline-secondary" onClick={handleLeaveCall}>
//               Leave Call
//             </Button>
//           </div>
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh' }}>
//       <div className="d-flex flex-column" style={{ height: '100vh' }}>
//         {/* Header */}
//         <div className="text-white p-3 d-flex justify-content-between align-items-center">
//           <div>
//             <h4>Video Call - Room: {roomId}</h4>
//             {usingMockMedia && (
//               <span className="badge bg-warning text-dark">Using Test Video</span>
//             )}
//           </div>
//           <div>
//             <span className="badge bg-success me-2">
//               {isConnected ? 'Connected' : 'Connecting...'}
//             </span>
//             <Button variant="outline-danger" size="sm" onClick={handleLeaveCall}>
//               Leave Call
//             </Button>
//           </div>
//         </div>

//         {/* Video Area */}
//         <Row className="flex-grow-1 g-2">
//           <Col md={6}>
//             <Card className="h-100 bg-dark text-white">
//               <Card.Body className="p-2 d-flex flex-column">
//                 <h6>You ({userName}) {usingMockMedia && '(Test Mode)'}</h6>
//                 <div className="flex-grow-1 position-relative">
//                   <video
//                     ref={localVideoRef}
//                     autoPlay
//                     muted
//                     playsInline
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       backgroundColor: '#111'
//                     }}
//                   />
//                   {!isVideoEnabled && (
//                     <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark">
//                       <span>Video disabled</span>
//                     </div>
//                   )}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col md={6}>
//             <Card className="h-100 bg-dark text-white">
//               <Card.Body className="p-2 d-flex flex-column">
//                 <h6>{userType === 'teacher' ? 'Student' : 'Teacher'}</h6>
//                 <div className="flex-grow-1 position-relative">
//                   <video
//                     ref={remoteVideoRef}
//                     autoPlay
//                     playsInline
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       backgroundColor: '#111'
//                     }}
//                   />
//                   {!remoteStream && (
//                     <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark">
//                       <span>Waiting for {userType === 'teacher' ? 'student' : 'teacher'} to join...</span>
//                     </div>
//                   )}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Controls */}
//         <div className="p-3 text-center">
//           {/* Camera selection dropdown */}
//           {availableCameras.length > 1 && !usingMockMedia && (
//             <div className="mb-3">
//               <select 
//                 onChange={handleCameraChange}
//                 value={selectedCamera}
//                 className="form-select"
//               >
//                 {availableCameras.map(camera => (
//                   <option key={camera.deviceId} value={camera.deviceId}>
//                     {camera.label || `Camera ${availableCameras.indexOf(camera) + 1}`}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
          
//           <div className="d-flex justify-content-center gap-3">
//             <Button
//               variant={isVideoEnabled ? "primary" : "secondary"}
//               onClick={toggleVideo}
//               size="lg"
//               disabled={usingMockMedia}
//             >
//               {isVideoEnabled ? '📹 Video On' : '📹 Video Off'}
//             </Button>
            
//             <Button
//               variant={isAudioEnabled ? "primary" : "secondary"}
//               onClick={toggleAudio}
//               size="lg"
//               disabled={usingMockMedia}
//             >
//               {isAudioEnabled ? '🎤 Mic On' : '🎤 Mic Off'}
//             </Button>
            
//             <Button variant="success" size="lg" disabled={usingMockMedia}>
//               📺 Share Screen
//             </Button>
//           </div>
//           {usingMockMedia && (
//             <div className="mt-2">
//               <small className="text-warning">
//                 Using test media. Connect a second device for real video/audio.
//               </small>
//             </div>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default VideoCall;







// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Container, Card, Button, Alert, Row, Col, Badge } from 'react-bootstrap';

// const VideoCall = () => {
//   const [searchParams] = useSearchParams();
//   const roomId = searchParams.get('roomId');
//   const userType = searchParams.get('type');
//   const userName = searchParams.get('name');
//   const navigate = useNavigate();
  
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isVideoEnabled, setIsVideoEnabled] = useState(true);
//   const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//   const [error, setError] = useState('');
//   const [usingMockMedia, setUsingMockMedia] = useState(false);
//   const [retryCount, setRetryCount] = useState(0);
//   const [availableCameras, setAvailableCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState('');
//   const [connectionStatus, setConnectionStatus] = useState('disconnected');

//   // Mock socket implementation for demonstration
//   const socket = {
//     emit: (event, data) => {
//       console.log(`Emitting ${event}:`, data);
//       // In a real app, this would send data to your signaling server
//     },
//     on: (event, callback) => {
//       console.log(`Listening for ${event}`);
//       // In a real app, this would listen for events from your signaling server
//     }
//   };

//   const pcConfig = {
//     iceServers: [
//       { urls: 'stun:stun.l.google.com:19302' },
//       { urls: 'stun:stun1.l.google.com:19302' }
//     ]
//   };
//   const peerConnection = useRef(null);

//   useEffect(() => {
//     if (!roomId || !userType || !userName) {
//       setError('Missing call parameters');
//       return;
//     }

//     // Initialize peer connection
//     peerConnection.current = new RTCPeerConnection(pcConfig);
    
//     getAvailableCameras();
//     initializeCall();
    
//     return () => {
//       cleanupMedia();
//     };
//   }, [roomId, userType, userName, retryCount]);

//   useEffect(() => {
//     // Simulate connection establishment
//     const timer = setTimeout(() => {
//       if (isConnected) {
//         setConnectionStatus('connected');
//         // Simulate receiving a remote stream after connection
//         simulateRemoteStream();
//       }
//     }, 2000);
    
//     return () => clearTimeout(timer);
//   }, [isConnected]);

//   const getAvailableCameras = async () => {
//     try {
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       const cameras = devices.filter(device => device.kind === 'videoinput');
//       setAvailableCameras(cameras);
      
//       if (cameras.length > 0) {
//         setSelectedCamera(cameras[0].deviceId);
//       }
//     } catch (err) {
//       console.error('Error getting cameras:', err);
//     }
//   };

//   const simulateRemoteStream = () => {
//     // This is a simulation - in a real app, you'd get the actual remote stream
//     const remoteVideo = remoteVideoRef.current;
//     if (remoteVideo) {
//       // Create a mock stream for demonstration
//       const canvas = document.createElement('canvas');
//       canvas.width = 640;
//       canvas.height = 480;
//       const context = canvas.getContext('2d');
      
//       const drawFrame = () => {
//         context.fillStyle = '#1a1a2e';
//         context.fillRect(0, 0, canvas.width, canvas.height);
        
//         context.fillStyle = userType === 'teacher' ? '#4e54c8' : '#f95738';
//         context.font = '32px Arial';
//         context.textAlign = 'center';
//         context.fillText(
//           `${userType === 'teacher' ? 'Student' : 'Teacher'} View`, 
//           canvas.width/2, 
//           canvas.height/2
//         );
        
//         context.fillStyle = '#ffffff';
//         context.font = '18px Arial';
//         context.fillText(
//           'Remote video stream', 
//           canvas.width/2, 
//           canvas.height/2 + 40
//         );
//       };
      
//       drawFrame();
//       const mockStream = canvas.captureStream(15);
//       setRemoteStream(mockStream);
//       remoteVideo.srcObject = mockStream;
      
//       // Continuously update to simulate live video
//       setInterval(drawFrame, 1000/15);
//     }
//   };

//   const createMockStream = () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = 640;
//     canvas.height = 480;
//     const context = canvas.getContext('2d');
    
//     const drawFrame = () => {
//       context.fillStyle = '#2c3e50';
//       context.fillRect(0, 0, canvas.width, canvas.height);
      
//       context.fillStyle = '#3498db';
//       context.font = '32px Arial';
//       context.textAlign = 'center';
//       context.fillText(`${userName} (${userType})`, canvas.width/2, canvas.height/2);
      
//       context.fillStyle = '#e74c3c';
//       context.font = '18px Arial';
//       context.fillText('Local Video Stream', canvas.width/2, canvas.height/2 + 40);
//     };
    
//     drawFrame();
//     const stream = canvas.captureStream(15);
    
//     // Add mock audio track
//     const audioContext = new AudioContext();
//     const oscillator = audioContext.createOscillator();
//     const destination = oscillator.connect(audioContext.createMediaStreamDestination());
//     oscillator.start();
//     const audioTrack = destination.stream.getAudioTracks()[0];
//     stream.addTrack(audioTrack);
    
//     setInterval(drawFrame, 1000/15);
    
//     return stream;
//   };

//   const initializeCall = async () => {
//     try {
//       setError('');
//       let stream;
      
//       try {
//         // Try to get real media devices
//         const constraints = {
//           video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
//           audio: true
//         };
        
//         stream = await navigator.mediaDevices.getUserMedia(constraints);
//         setUsingMockMedia(false);
//       } catch (mediaError) {
//         console.warn('Real media not available, using mock media:', mediaError);
//         stream = createMockStream();
//         setUsingMockMedia(true);
//       }
      
//       setLocalStream(stream);
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }

//       // Set up peer connection event handlers
//       if (peerConnection.current) {
//         peerConnection.current.ontrack = (event) => {
//           const remoteStream = event.streams[0];
//           setRemoteStream(remoteStream);
//           if (remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = remoteStream;
//           }
//         };

//         peerConnection.current.oniceconnectionstatechange = () => {
//           if (peerConnection.current) {
//             setConnectionStatus(peerConnection.current.iceConnectionState);
//           }
//         };
//       }

//       // Simulate joining the room
//       setTimeout(() => {
//         setIsConnected(true);
//         setConnectionStatus('checking');
//       }, 1000);

//     } catch (err) {
//       console.error('Error initializing call:', err);
//       setError(err.message || 'Could not initialize call. Please try again.');
//     }
//   };

//   const cleanupMedia = () => {
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//       setLocalStream(null);
//     }
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       const videoTrack = localStream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoEnabled(videoTrack.enabled);
//       }
//     }
//   };

//   const toggleAudio = () => {
//     if (localStream) {
//       const audioTrack = localStream.getAudioTracks()[0];
//       if (audioTrack) {
//         audioTrack.enabled = !audioTrack.enabled;
//         setIsAudioEnabled(audioTrack.enabled);
//       }
//     }
//   };

//   const switchCamera = async (deviceId) => {
//     try {
//       if (localStream && !usingMockMedia) {
//         // Stop current video tracks
//         localStream.getVideoTracks().forEach(track => track.stop());
        
//         // Get new stream with selected camera
//         const constraints = {
//           video: { deviceId: { exact: deviceId } },
//           audio: true
//         };
        
//         const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        
//         // Update local stream and video element
//         setLocalStream(newStream);
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = newStream;
//         }
//       }
//     } catch (err) {
//       console.error('Error switching camera:', err);
//       setError('Failed to switch camera. Please try again.');
//     }
//   };

//   const handleCameraChange = (e) => {
//     const deviceId = e.target.value;
//     setSelectedCamera(deviceId);
//     if (!usingMockMedia) {
//       switchCamera(deviceId);
//     }
//   };

//   const retryConnection = () => {
//     cleanupMedia();
//     setRetryCount(prev => prev + 1);
//     setError('');
//   };

//   const handleLeaveCall = () => {
//     cleanupMedia();
//     navigate(userType === 'teacher' ? '/teachercalendar' : '/calendar');
//   };

//   const getConnectionStatusVariant = () => {
//     switch(connectionStatus) {
//       case 'connected': return 'success';
//       case 'checking': return 'warning';
//       case 'disconnected': return 'danger';
//       default: return 'secondary';
//     }
//   };

//   if (error) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <Alert variant="danger" className="text-center">
//           <h4>Connection Error</h4>
//           <p>{error}</p>
//           <div className="d-flex gap-2 justify-content-center mt-3">
//             <Button variant="primary" onClick={retryConnection}>
//               Try Again
//             </Button>
//             <Button variant="outline-secondary" onClick={handleLeaveCall}>
//               Leave Call
//             </Button>
//           </div>
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh' }}>
//       <div className="d-flex flex-column" style={{ height: '100vh' }}>
//         {/* Header */}
//         <div className="text-white p-3 d-flex justify-content-between align-items-center">
//           <div>
//             <h4>Video Call - Room: {roomId}</h4>
//             {usingMockMedia && (
//               <Badge bg="warning" text="dark" className="ms-2">Using Test Video</Badge>
//             )}
//           </div>
//           <div>
//             <Badge bg={getConnectionStatusVariant()} className="me-2">
//               {connectionStatus.toUpperCase()}
//             </Badge>
//             <Button variant="outline-danger" size="sm" onClick={handleLeaveCall}>
//               Leave Call
//             </Button>
//           </div>
//         </div>

//         {/* Video Area */}
//         <Row className="flex-grow-1 g-3">
//           <Col md={6}>
//             <Card className="h-100 bg-dark text-white">
//               <Card.Body className="p-2 d-flex flex-column">
//                 <h6>You ({userName})</h6>
//                 <div className="flex-grow-1 position-relative">
//                   <video
//                     ref={localVideoRef}
//                     autoPlay
//                     muted
//                     playsInline
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       backgroundColor: '#111'
//                     }}
//                   />
//                   {!isVideoEnabled && (
//                     <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
//                       <span className="text-white">Video disabled</span>
//                     </div>
//                   )}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col md={6}>
//             <Card className="h-100 bg-dark text-white">
//               <Card.Body className="p-2 d-flex flex-column">
//                 <h6>{userType === 'teacher' ? 'Student' : 'Teacher'}</h6>
//                 <div className="flex-grow-1 position-relative">
//                   <video
//                     ref={remoteVideoRef}
//                     autoPlay
//                     playsInline
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       backgroundColor: '#111'
//                     }}
//                   />
//                   {!remoteStream && (
//                     <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
//                       <div className="text-center">
//                         <div className="spinner-border text-primary mb-2" role="status">
//                           <span className="visually-hidden">Loading...</span>
//                         </div>
//                         <p className="mb-0">Connecting to {userType === 'teacher' ? 'student' : 'teacher'}...</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Controls */}
//         <div className="p-3 text-center">
//           {/* Camera selection dropdown */}
//           {availableCameras.length > 1 && !usingMockMedia && (
//             <div className="mb-3">
//               <select 
//                 onChange={handleCameraChange}
//                 value={selectedCamera}
//                 className="form-select d-inline-block w-auto"
//               >
//                 {availableCameras.map(camera => (
//                   <option key={camera.deviceId} value={camera.deviceId}>
//                     {camera.label || `Camera ${availableCameras.indexOf(camera) + 1}`}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
          
//           <div className="d-flex justify-content-center gap-3 flex-wrap">
//             <Button
//               variant={isVideoEnabled ? "primary" : "outline-primary"}
//               onClick={toggleVideo}
//               size="lg"
//               className="rounded-pill"
//             >
//               {isVideoEnabled ? '📹 Video On' : '📹 Video Off'}
//             </Button>
            
//             <Button
//               variant={isAudioEnabled ? "success" : "outline-success"}
//               onClick={toggleAudio}
//               size="lg"
//               className="rounded-pill"
//             >
//               {isAudioEnabled ? '🎤 Mic On' : '🎤 Mic Off'}
//             </Button>
            
//             <Button variant="info" size="lg" className="rounded-pill">
//               📺 Share Screen
//             </Button>
            
//             <Button variant="warning" size="lg" className="rounded-pill" onClick={retryConnection}>
//               🔄 Retry
//             </Button>
//           </div>
          
//           {usingMockMedia && (
//             <div className="mt-3">
//               <Badge bg="warning" text="dark">
//                 Using test media. Camera and microphone controls are disabled in this mode.
//               </Badge>
//             </div>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default VideoCall;




// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Container, Card, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
// import io from 'socket.io-client';

// const VideoCall = () => {
//   const [searchParams] = useSearchParams();
//   const roomId = searchParams.get('roomId');
//   const userType = searchParams.get('type');
//   const userName = searchParams.get('name');
//   const navigate = useNavigate();
  
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const socketRef = useRef();
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isVideoEnabled, setIsVideoEnabled] = useState(true);
//   const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//   const [error, setError] = useState('');
//   const [usingMockMedia, setUsingMockMedia] = useState(false);
//   const [retryCount, setRetryCount] = useState(0);
//   const [availableCameras, setAvailableCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState('');
//   const [connectionStatus, setConnectionStatus] = useState('disconnected');
//   const [isCallActive, setIsCallActive] = useState(false);

//   const pcConfig = {
//     iceServers: [
//       { urls: 'stun:stun.l.google.com:19302' },
//       { urls: 'stun:stun1.l.google.com:19302' }
//     ]
//   };
//   const peerConnection = useRef(null);

//   useEffect(() => {
//     if (!roomId || !userType || !userName) {
//       setError('Missing call parameters');
//       return;
//     }

//     initializeSocket();
//     initializeMedia();
    
//     return () => {
//       cleanupMedia();
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [roomId, userType, userName, retryCount]);

//   const initializeSocket = () => {
//     try {
//       // Connect to signaling server
//       socketRef.current = io('http://localhost:3000', {
//         transports: ['websocket'],
//       });

//       socketRef.current.on('connect', () => {
//         console.log('Connected to signaling server');
//         setConnectionStatus('connecting');
        
//         // Register user based on type
//         if (userType === 'teacher') {
//           socketRef.current.emit('teacher-online', userName);
//         } else {
//           socketRef.current.emit('student-online', userName);
//         }
        
//         // Join the room
//         socketRef.current.emit('join-room', roomId);
//       });

//       socketRef.current.on('disconnect', () => {
//         console.log('Disconnected from signaling server');
//         setConnectionStatus('disconnected');
//         setIsConnected(false);
//         setError('Disconnected from server. Trying to reconnect...');
//       });

//       socketRef.current.on('user-joined', (data) => {
//         console.log('User joined:', data);
//         if (userType === 'teacher') {
//           // Teacher creates offer when student joins
//           createOffer();
//         }
//       });

//       socketRef.current.on('offer', async (data) => {
//         console.log('Received offer');
//         if (userType === 'student') {
//           await handleOffer(data);
//         }
//       });

//       socketRef.current.on('answer', async (data) => {
//         console.log('Received answer');
//         if (userType === 'teacher') {
//           await handleAnswer(data);
//         }
//       });

//       socketRef.current.on('ice-candidate', async (data) => {
//         console.log('Received ICE candidate');
//         try {
//           await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
//         } catch (err) {
//           console.error('Error adding ICE candidate:', err);
//         }
//       });

//       socketRef.current.on('user-disconnected', () => {
//         console.log('Remote user disconnected');
//         setConnectionStatus('disconnected');
//         setIsConnected(false);
//         setError('Remote user disconnected');
//       });

//       socketRef.current.on('call-ended', () => {
//         console.log('Call ended by remote user');
//         handleLeaveCall();
//       });

//       socketRef.current.on('connect_error', (err) => {
//         console.error('Connection error:', err);
//         setConnectionStatus('disconnected');
//         setError('Could not connect to server. Please check your connection.');
//       });

//     } catch (err) {
//       console.error('Error initializing socket:', err);
//       setError('Failed to connect to server');
//     }
//   };

//   const initializeMedia = async () => {
//     try {
//       setError('');
//       let stream;
      
//       try {
//         // Try to get real media devices
//         const constraints = {
//           video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
//           audio: true
//         };
        
//         stream = await navigator.mediaDevices.getUserMedia(constraints);
//         setUsingMockMedia(false);
//       } catch (mediaError) {
//         console.warn('Real media not available, using mock media:', mediaError);
//         stream = createMockStream();
//         setUsingMockMedia(true);
//       }
      
//       setLocalStream(stream);
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }

//       // Initialize peer connection
//       initializePeerConnection(stream);

//     } catch (err) {
//       console.error('Error initializing media:', err);
//       setError(err.message || 'Could not access camera/microphone. Please check permissions.');
//     }
//   };

//   const initializePeerConnection = (stream) => {
//     try {
//       // Create peer connection
//       peerConnection.current = new RTCPeerConnection(pcConfig);
      
//       // Add local stream tracks to peer connection
//       stream.getTracks().forEach(track => {
//         peerConnection.current.addTrack(track, stream);
//       });
      
//       // Set up event handlers
//       peerConnection.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           console.log('Sending ICE candidate');
//           socketRef.current.emit('ice-candidate', {
//             roomId: roomId,
//             candidate: event.candidate
//           });
//         }
//       };
      
//       peerConnection.current.ontrack = (event) => {
//         console.log('Received remote stream');
//         const remoteStream = event.streams[0];
//         setRemoteStream(remoteStream);
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = remoteStream;
//         }
//         setIsConnected(true);
//         setConnectionStatus('connected');
//       };
      
//       peerConnection.current.oniceconnectionstatechange = () => {
//         if (peerConnection.current) {
//           const state = peerConnection.current.iceConnectionState;
//           setConnectionStatus(state);
//           console.log('ICE connection state:', state);
          
//           if (state === 'connected') {
//             setIsConnected(true);
//             setIsCallActive(true);
//           } else if (state === 'disconnected' || state === 'failed') {
//             setIsConnected(false);
//             setError('Connection lost. Trying to reconnect...');
//           }
//         }
//       };
      
//       peerConnection.current.onnegotiationneeded = () => {
//         console.log('Negotiation needed');
//       };
      
//     } catch (err) {
//       console.error('Error initializing peer connection:', err);
//       setError('Failed to initialize call connection');
//     }
//   };

//   const createOffer = async () => {
//     try {
//       console.log('Creating offer');
//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(offer);
      
//       socketRef.current.emit('offer', {
//         roomId: roomId,
//         sdp: offer
//       });
//     } catch (err) {
//       console.error('Error creating offer:', err);
//       setError('Failed to create call offer');
//     }
//   };

//   const handleOffer = async (data) => {
//     try {
//       console.log('Handling offer');
//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
      
//       const answer = await peerConnection.current.createAnswer();
//       await peerConnection.current.setLocalDescription(answer);
      
//       socketRef.current.emit('answer', {
//         roomId: roomId,
//         sdp: answer
//       });
//     } catch (err) {
//       console.error('Error handling offer:', err);
//       setError('Failed to handle call offer');
//     }
//   };

//   const handleAnswer = async (data) => {
//     try {
//       console.log('Handling answer');
//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
//     } catch (err) {
//       console.error('Error handling answer:', err);
//       setError('Failed to handle call answer');
//     }
//   };

//   const createMockStream = () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = 640;
//     canvas.height = 480;
//     const context = canvas.getContext('2d');
    
//     const drawFrame = () => {
//       context.fillStyle = '#2c3e50';
//       context.fillRect(0, 0, canvas.width, canvas.height);
      
//       context.fillStyle = '#3498db';
//       context.font = '32px Arial';
//       context.textAlign = 'center';
//       context.fillText(`${userName} (${userType})`, canvas.width/2, canvas.height/2);
      
//       context.fillStyle = '#e74c3c';
//       context.font = '18px Arial';
//       context.fillText('Local Video Stream', canvas.width/2, canvas.height/2 + 40);
//     };
    
//     drawFrame();
//     const stream = canvas.captureStream(15);
    
//     // Add mock audio track
//     const audioContext = new AudioContext();
//     const oscillator = audioContext.createOscillator();
//     const destination = oscillator.connect(audioContext.createMediaStreamDestination());
//     oscillator.start();
//     const audioTrack = destination.stream.getAudioTracks()[0];
//     stream.addTrack(audioTrack);
    
//     setInterval(drawFrame, 1000/15);
    
//     return stream;
//   };

//   const cleanupMedia = () => {
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//       setLocalStream(null);
//     }
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }
//     setIsCallActive(false);
//     setIsConnected(false);
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       const videoTrack = localStream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoEnabled(videoTrack.enabled);
//       }
//     }
//   };

//   const toggleAudio = () => {
//     if (localStream) {
//       const audioTrack = localStream.getAudioTracks()[0];
//       if (audioTrack) {
//         audioTrack.enabled = !audioTrack.enabled;
//         setIsAudioEnabled(audioTrack.enabled);
//       }
//     }
//   };

//   const switchCamera = async (deviceId) => {
//     try {
//       if (localStream && !usingMockMedia) {
//         // Stop current video tracks
//         localStream.getVideoTracks().forEach(track => track.stop());
        
//         // Get new stream with selected camera
//         const constraints = {
//           video: { deviceId: { exact: deviceId } },
//           audio: true
//         };
        
//         const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        
//         // Replace the video track in the peer connection
//         const videoTrack = newStream.getVideoTracks()[0];
//         const sender = peerConnection.current.getSenders().find(
//           s => s.track && s.track.kind === 'video'
//         );
        
//         if (sender) {
//           sender.replaceTrack(videoTrack);
//         }
        
//         // Update local stream and video element
//         setLocalStream(newStream);
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = newStream;
//         }
//       }
//     } catch (err) {
//       console.error('Error switching camera:', err);
//       setError('Failed to switch camera. Please try again.');
//     }
//   };

//   const getAvailableCameras = async () => {
//     try {
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       const cameras = devices.filter(device => device.kind === 'videoinput');
//       setAvailableCameras(cameras);
      
//       if (cameras.length > 0) {
//         setSelectedCamera(cameras[0].deviceId);
//       }
//     } catch (err) {
//       console.error('Error getting cameras:', err);
//     }
//   };

//   const handleCameraChange = (e) => {
//     const deviceId = e.target.value;
//     setSelectedCamera(deviceId);
//     if (!usingMockMedia) {
//       switchCamera(deviceId);
//     }
//   };

//   const retryConnection = () => {
//     cleanupMedia();
//     if (socketRef.current) {
//       socketRef.current.disconnect();
//     }
//     setRetryCount(prev => prev + 1);
//     setError('');
//   };

//   const handleLeaveCall = () => {
//     if (socketRef.current) {
//       socketRef.current.emit('end-call', { roomId });
//     }
//     cleanupMedia();
//     if (socketRef.current) {
//       socketRef.current.disconnect();
//     }
//     navigate(userType === 'teacher' ? '/teachercalendar' : '/calendar');
//   };

//   const getConnectionStatusVariant = () => {
//     switch(connectionStatus) {
//       case 'connected': return 'success';
//       case 'checking': return 'warning';
//       case 'disconnected': return 'danger';
//       case 'connecting': return 'info';
//       default: return 'secondary';
//     }
//   };

//   if (error) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <Alert variant="danger" className="text-center">
//           <h4>Connection Error</h4>
//           <p>{error}</p>
//           <div className="d-flex gap-2 justify-content-center mt-3">
//             <Button variant="primary" onClick={retryConnection}>
//               Try Again
//             </Button>
//             <Button variant="outline-secondary" onClick={handleLeaveCall}>
//               Leave Call
//             </Button>
//           </div>
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh' }}>
//       <div className="d-flex flex-column" style={{ height: '100vh' }}>
//         {/* Header */}
//         <div className="text-white p-3 d-flex justify-content-between align-items-center">
//           <div>
//             <h4>Video Call - Room: {roomId}</h4>
//             {usingMockMedia && (
//               <Badge bg="warning" text="dark" className="ms-2">Using Test Video</Badge>
//             )}
//           </div>
//           <div>
//             <Badge bg={getConnectionStatusVariant()} className="me-2">
//               {connectionStatus.toUpperCase()}
//             </Badge>
//             <Button variant="outline-danger" size="sm" onClick={handleLeaveCall}>
//               Leave Call
//             </Button>
//           </div>
//         </div>

//         {/* Video Area */}
//         <Row className="flex-grow-1 g-3">
//           <Col md={6}>
//             <Card className="h-100 bg-dark text-white">
//               <Card.Body className="p-2 d-flex flex-column">
//                 <h6>You ({userName})</h6>
//                 <div className="flex-grow-1 position-relative">
//                   <video
//                     ref={localVideoRef}
//                     autoPlay
//                     muted
//                     playsInline
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       backgroundColor: '#111'
//                     }}
//                   />
//                   {!isVideoEnabled && (
//                     <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
//                       <span className="text-white">Video disabled</span>
//                     </div>
//                   )}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col md={6}>
//             <Card className="h-100 bg-dark text-white">
//               <Card.Body className="p-2 d-flex flex-column">
//                 <h6>{userType === 'teacher' ? 'Student' : 'Teacher'}</h6>
//                 <div className="flex-grow-1 position-relative">
//                   <video
//                     ref={remoteVideoRef}
//                     autoPlay
//                     playsInline
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       backgroundColor: '#111'
//                     }}
//                   />
//                   {!isConnected && (
//                     <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
//                       <div className="text-center">
//                         <div className="spinner-border text-primary mb-2" role="status">
//                           <span className="visually-hidden">Loading...</span>
//                         </div>
//                         <p className="mb-0">Connecting to {userType === 'teacher' ? 'student' : 'teacher'}...</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Controls */}
//         <div className="p-3 text-center">
//           {/* Camera selection dropdown */}
//           {availableCameras.length > 1 && !usingMockMedia && (
//             <div className="mb-3">
//               <select 
//                 onChange={handleCameraChange}
//                 value={selectedCamera}
//                 className="form-select d-inline-block w-auto"
//               >
//                 {availableCameras.map(camera => (
//                   <option key={camera.deviceId} value={camera.deviceId}>
//                     {camera.label || `Camera ${availableCameras.indexOf(camera) + 1}`}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
          
//           <div className="d-flex justify-content-center gap-3 flex-wrap">
//             <Button
//               variant={isVideoEnabled ? "primary" : "outline-primary"}
//               onClick={toggleVideo}
//               size="lg"
//               className="rounded-pill"
//               disabled={usingMockMedia}
//             >
//               {isVideoEnabled ? '📹 Video On' : '📹 Video Off'}
//             </Button>
            
//             <Button
//               variant={isAudioEnabled ? "success" : "outline-success"}
//               onClick={toggleAudio}
//               size="lg"
//               className="rounded-pill"
//               disabled={usingMockMedia}
//             >
//               {isAudioEnabled ? '🎤 Mic On' : '🎤 Mic Off'}
//             </Button>
            
//             <Button variant="info" size="lg" className="rounded-pill" disabled={usingMockMedia}>
//               📺 Share Screen
//             </Button>
            
//             <Button variant="warning" size="lg" className="rounded-pill" onClick={retryConnection}>
//               🔄 Retry
//             </Button>
//           </div>
          
//           {usingMockMedia && (
//             <div className="mt-3">
//               <Badge bg="warning" text="dark">
//                 Using test media. Camera and microphone controls are disabled in this mode.
//               </Badge>
//             </div>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default VideoCall;





// import React, { useRef, useEffect, useState } from "react";
// import io from "socket.io-client";

// const VideoCall = ({ userType, username, booking }) => {
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerConnection = useRef(null);
//   const [socket, setSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [incomingCall, setIncomingCall] = useState(null);

//   useEffect(() => {
//     const newSocket = io("http://localhost:4000", {
//       transports: ['websocket', 'polling']
//     });

//     newSocket.on("connect", () => {
//       console.log("✅ Connected to server");
//       setIsConnected(true);
      
//       // Announce online status
//       newSocket.emit("user-online", { username, userType });
//     });

//     newSocket.on("disconnect", () => {
//       console.log("❌ Disconnected");
//       setIsConnected(false);
//     });

//     // Handle incoming call
//     newSocket.on("incoming-call", (data) => {
//       setIncomingCall(data);
//     });

//     // WebRTC signaling
//     newSocket.on("offer", async (data) => {
//       if (peerConnection.current) {
//         await peerConnection.current.setRemoteDescription(
//           new RTCSessionDescription(data.sdp)
//         );
//         const answer = await peerConnection.current.createAnswer();
//         await peerConnection.current.setLocalDescription(answer);
//         newSocket.emit("answer", { roomId: currentRoom, sdp: answer });
//       }
//     });

//     newSocket.on("answer", async (data) => {
//       if (peerConnection.current) {
//         await peerConnection.current.setRemoteDescription(
//           new RTCSessionDescription(data.sdp)
//         );
//       }
//     });

//     newSocket.on("ice-candidate", async (data) => {
//       if (peerConnection.current && data.candidate) {
//         await peerConnection.current.addIceCandidate(
//           new RTCIceCandidate(data.candidate)
//         );
//       }
//     });

//     newSocket.on("call-ended", () => {
//       endCall();
//     });

//     setSocket(newSocket);

//     return () => newSocket.close();
//   }, []);

//   const startLocalVideo = async () => {
//     try {
//       peerConnection.current = new RTCPeerConnection({
//         iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
//       });

//       peerConnection.current.onicecandidate = (event) => {
//         if (event.candidate && socket) {
//           socket.emit("ice-candidate", {
//             roomId: currentRoom,
//             candidate: event.candidate
//           });
//         }
//       };

//       peerConnection.current.ontrack = (event) => {
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = event.streams[0];
//         }
//       };

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });
      
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }

//       stream.getTracks().forEach(track => {
//         peerConnection.current.addTrack(track, stream);
//       });
//     } catch (error) {
//       console.error("Error starting video:", error);
//     }
//   };

//   const startCall = async () => {
//     if (!socket || !booking) return;

//     try {
//       await startLocalVideo();
      
//       socket.emit("start-call", {
//         tutorUsername: username,
//         studentUsername: booking.studentUsername,
//         bookingId: booking.id
//       });

//       socket.once("call-started", async (data) => {
//         setCurrentRoom(data.roomId);
//         socket.emit("join-call", data.roomId);
        
//         const offer = await peerConnection.current.createOffer();
//         await peerConnection.current.setLocalDescription(offer);
//         socket.emit("offer", { roomId: data.roomId, sdp: offer });
//       });
//     } catch (error) {
//       console.error("Error starting call:", error);
//     }
//   };

//   const acceptCall = async () => {
//     if (!incomingCall || !socket) return;

//     try {
//       await startLocalVideo();
//       setCurrentRoom(incomingCall.roomId);
//       socket.emit("join-call", incomingCall.roomId);
//       setIncomingCall(null);
//     } catch (error) {
//       console.error("Error accepting call:", error);
//     }
//   };

//   const rejectCall = () => {
//     setIncomingCall(null);
//   };

//   const endCall = () => {
//     if (socket && currentRoom) {
//       socket.emit("end-call", currentRoom);
//     }
    
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }
    
//     setCurrentRoom(null);
//     setIncomingCall(null);
//   };

//   return (
//     <div>
//       <h2>🎥 Video Call</h2>
      
//       {incomingCall && (
//         <div className="incoming-call">
//           <h3>Incoming Call from {incomingCall.tutorUsername}</h3>
//           <button onClick={acceptCall}>Accept</button>
//           <button onClick={rejectCall}>Reject</button>
//         </div>
//       )}

//       {userType === 'teacher' && booking && (
//         <button onClick={startCall} disabled={!booking.studentOnline}>
//           📞 Start Call {!booking.studentOnline && "(Student Offline)"}
//         </button>
//       )}

//       {currentRoom && (
//         <button onClick={endCall}>❌ End Call</button>
//       )}

//       <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
//         <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px" }} />
//         <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px" }} />
//       </div>
//     </div>
//   );
// };

// export default VideoCall;




// import React, { useRef, useEffect, useState } from "react";
// import io from "socket.io-client";

// const VideoCall = ({ userType, username, booking }) => {
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerConnection = useRef(null);
//   const [socket, setSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [incomingCall, setIncomingCall] = useState(null);
//   const [callStatus, setCallStatus] = useState("idle");

//   useEffect(() => {
//     const newSocket = io("http://localhost:4000", {
//       transports: ['websocket', 'polling']
//     });

//     newSocket.on("connect", () => {
//       console.log("✅ Connected to server");
//       setIsConnected(true);
      
//       // FIXED: Emit specific events that server expects
//       if (booking) {
//         if (userType === 'teacher') {
//           newSocket.emit("teacher-online", { 
//             teacherId: booking.tutorId,
//             username 
//           });
//         } else {
//           newSocket.emit("student-online", { 
//             studentId: booking.studentId,
//             username 
//           });
//         }
//       }
//     });

//     newSocket.on("disconnect", () => {
//       console.log("❌ Disconnected");
//       setIsConnected(false);
//     });

//     // Handle incoming call
//     newSocket.on("incoming-call", (data) => {
//       setIncomingCall(data);
//       setCallStatus("ringing");
//     });

//     // Handle call accepted
//     newSocket.on("call-accepted", (data) => {
//       setCallStatus("connected");
//     });

//     // Handle call rejected
//     newSocket.on("call-rejected", () => {
//       setIncomingCall(null);
//       setCallStatus("idle");
//       alert("Call was rejected");
//     });

//     // WebRTC signaling
//     newSocket.on("offer", async (data) => {
//       if (peerConnection.current) {
//         try {
//           await peerConnection.current.setRemoteDescription(
//             new RTCSessionDescription(data.offer)
//           );
//           const answer = await peerConnection.current.createAnswer();
//           await peerConnection.current.setLocalDescription(answer);
//           newSocket.emit("answer", { 
//             roomId: data.roomId, 
//             answer: answer,
//             to: data.from // Send answer to the caller
//           });
//         } catch (error) {
//           console.error("Error handling offer:", error);
//         }
//       }
//     });

//     newSocket.on("answer", async (data) => {
//       if (peerConnection.current) {
//         try {
//           await peerConnection.current.setRemoteDescription(
//             new RTCSessionDescription(data.answer)
//           );
//           setCallStatus("connected");
//         } catch (error) {
//           console.error("Error handling answer:", error);
//         }
//       }
//     });

//     newSocket.on("ice-candidate", async (data) => {
//       if (peerConnection.current && data.candidate) {
//         try {
//           await peerConnection.current.addIceCandidate(
//             new RTCIceCandidate(data.candidate)
//           );
//         } catch (error) {
//           console.error("Error adding ICE candidate:", error);
//         }
//       }
//     });

//     newSocket.on("call-ended", () => {
//       endCall();
//       setCallStatus("idle");
//       alert("Call has ended");
//     });

//     newSocket.on("user-unavailable", () => {
//       alert("The user is not available for a call");
//       setCallStatus("idle");
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.close();
//       if (peerConnection.current) {
//         peerConnection.current.close();
//       }
//     };
//   }, [booking, userType, username]);

//   // Add null checks for booking in all functions
//   const startLocalVideo = async () => {
//     try {
//       peerConnection.current = new RTCPeerConnection({
//         iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
//       });

//       peerConnection.current.onicecandidate = (event) => {
//         if (event.candidate && socket && currentRoom && booking) {
//           socket.emit("ice-candidate", {
//             roomId: currentRoom,
//             candidate: event.candidate,
//             to: userType === 'teacher' ? booking.studentId : booking.tutorId
//           });
//         }
//       };

//       peerConnection.current.ontrack = (event) => {
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = event.streams[0];
//         }
//       };

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });
      
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }

//       stream.getTracks().forEach(track => {
//         peerConnection.current.addTrack(track, stream);
//       });
//     } catch (error) {
//       console.error("Error starting video:", error);
//     }
//   };

//   const startCall = async () => {
//     if (!socket || !booking) return;

//     try {
//       await startLocalVideo();
//       setCallStatus("calling");
      
//       socket.emit("start-call", {
//         tutorId: booking.tutorId,
//         studentId: booking.studentId,
//         bookingId: booking.id
//       });

//       socket.once("call-started", async (data) => {
//         setCurrentRoom(data.roomId);
        
//         const offer = await peerConnection.current.createOffer();
//         await peerConnection.current.setLocalDescription(offer);
        
//         socket.emit("offer", { 
//           roomId: data.roomId, 
//           offer: offer,
//           to: booking.studentId // Send to student
//         });
//       });
//     } catch (error) {
//       console.error("Error starting call:", error);
//       setCallStatus("idle");
//     }
//   };

//   const acceptCall = async () => {
//     if (!incomingCall || !socket) return;

//     try {
//       await startLocalVideo();
//       setCurrentRoom(incomingCall.roomId);
//       setCallStatus("connecting");
      
//       // Notify the caller that the call was accepted
//       socket.emit("accept-call", {
//         roomId: incomingCall.roomId,
//         to: incomingCall.from
//       });
      
//       setIncomingCall(null);
//     } catch (error) {
//       console.error("Error accepting call:", error);
//       setCallStatus("idle");
//     }
//   };

//   const rejectCall = () => {
//     if (socket && incomingCall) {
//       socket.emit("reject-call", {
//         roomId: incomingCall.roomId,
//         to: incomingCall.from
//       });
//     }
//     setIncomingCall(null);
//     setCallStatus("idle");
//   };

//   const endCall = () => {
//     if (socket && currentRoom && booking) {
//       socket.emit("end-call", {
//         roomId: currentRoom,
//         to: userType === 'teacher' ? booking.studentId : booking.tutorId
//       });
//     }
    
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }
    
//     // Stop all media tracks
//     if (localVideoRef.current && localVideoRef.current.srcObject) {
//       localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
//     }
    
//     setCurrentRoom(null);
//     setIncomingCall(null);
//     setCallStatus("idle");
//   };

//   return (
//     <div>
//       <h2>🎥 Video Call</h2>
//       <p>Status: {callStatus}</p>
      
//       {incomingCall && (
//         <div className="incoming-call">
//           <h3>Incoming Call from {incomingCall.callerName}</h3>
//           <button onClick={acceptCall}>Accept</button>
//           <button onClick={rejectCall}>Reject</button>
//         </div>
//       )}

//       {userType === 'teacher' && booking && (
//         <button 
//           onClick={startCall} 
//           disabled={!isConnected || callStatus !== "idle"}
//         >
//           {callStatus === "calling" ? "Calling..." : "📞 Start Call"}
//         </button>
//       )}

//       {(currentRoom || callStatus === "connected") && (
//         <button onClick={endCall}>❌ End Call</button>
//       )}

//       <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
//         <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px" }} />
//         <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px" }} />
//       </div>
//     </div>
//   );
// };

// export default VideoCall;





// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// /*
//   VideoCall component (drop-in replacement)

//   Props:
//     - userType: 'teacher' or 'student'
//     - username: the logged-in user's username
//     - booking: object containing booking details (should include tutorId, studentId, id)
//     - roomIdOptional: optional existing roomId (if call already created)
  
//   Behavior:
//     - Connects to Socket.IO server
//     - Announces online status (teacher/student)
//     - Joins room (booking-based or provided roomId)
//     - Uses 'peer-ready' event to get a target socketId
//     - Teacher initiates offer to the specific target (to avoid glare)
//     - Student answers targeted offer
//     - ICE candidates are routed using 'to' field
// */

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

// const DEFAULT_ICE = [
//   { urls: "stun:stun.l.google.com:19302" },
//   // Add TURN server here for reliability:
//   // {
//   //   urls: "turn:YOUR_TURN_HOST:3478",
//   //   username: "TURN_USERNAME",
//   //   credential: "TURN_SECRET"
//   // }
// ];

// const VideoCall = ({ userType = "student", username = "anon", booking = null, roomIdOptional = null }) => {
//   const localRef = useRef(null);
//   const remoteRef = useRef(null);
//   const pcRef = useRef(null);
//   const socketRef = useRef(null);
//   const targetSocketRef = useRef(null); // the other peer's socket id
//   const [connected, setConnected] = useState(false);
//   const [localStream, setLocalStream] = useState(null);
//   const [callState, setCallState] = useState("idle"); // idle | calling | ringing | connecting | connected
//   const [currentRoom, setCurrentRoom] = useState(roomIdOptional || null);
//   const [incoming, setIncoming] = useState(null); // { from, roomId, callerName }

//   useEffect(() => {
//     // init socket
//     const socket = io(API_URL, { transports: ["websocket", "polling"] });
//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("[socket] connected", socket.id);
//       setConnected(true);

//       // Announce user online (backend expects teacher-online / student-online with object)
//       if (userType === "teacher") {
//         socket.emit("teacher-online", { username, userId: booking?.tutorId || username });
//       } else {
//         socket.emit("student-online", { username, userId: booking?.studentId || username });
//       }

//       // If we already have a roomId (maybe started via /start-call), join it
//       if (currentRoom) {
//         socket.emit("join-room", { roomId: currentRoom, username, userType, bookingId: booking?.id || null });
//       }
//     });

//     // When server indicates a peer to call (targeted routing)
//     socket.on("peer-ready", (data) => {
//       // data: { to: '<other-socket-id>' } or { to: '<other-socket-id>', roomId }
//       console.log("[socket] peer-ready", data);
//       if (data && data.to) {
//         targetSocketRef.current = data.to;
//       }
//     });

//     // When somebody joins the room (room-level notification)
//     socket.on("user-joined", (data) => {
//       console.log("[socket] user-joined", data);
//       // backend may broadcast user-joined; we don't automatically call everyone unless peer-ready told us
//     });

//     // Incoming offer from a remote peer (targeted)
//     socket.on("offer", async (data) => {
//       console.log("[socket] offer received", data?.from, "room:", data?.roomId);
//       // Data shape expected: { sdp: <RTCSessionDescriptionInit> OR offer, from: socketId, roomId }
//       const from = data?.from;
//       const sdp = data?.offer || data?.sdp || data?.sdpOffer || null;
//       if (!from || !sdp) {
//         console.warn("Invalid offer payload", data);
//         return;
//       }

//       // If we do not have pc ready, create it
//       await ensurePeerConnection();

//       try {
//         await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//       } catch (err) {
//         console.error("setRemoteDescription (offer) failed:", err);
//         return;
//       }

//       // Create local answer
//       try {
//         const answer = await pcRef.current.createAnswer();
//         await pcRef.current.setLocalDescription(answer);

//         // Send answer back targeted to the caller
//         socket.emit("answer", {
//           to: from,
//           roomId: data.roomId,
//           answer: answer,
//           from: socket.id
//         });

//         setCurrentRoom(data.roomId);
//         setCallState("connected");
//         console.log("[webrtc] answered offer and sent answer");
//       } catch (err) {
//         console.error("Failed to create/send answer:", err);
//       }
//     });

//     // Incoming answer to an offer we sent
//     socket.on("answer", async (data) => {
//       console.log("[socket] answer received", data?.from, data);
//       const sdp = data?.answer || data?.sdp;
//       if (!sdp) {
//         console.warn("Invalid answer payload", data);
//         return;
//       }
//       try {
//         if (!pcRef.current) {
//           console.warn("No RTCPeerConnection available to handle answer");
//           return;
//         }
//         await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//         setCallState("connected");
//         console.log("[webrtc] set remote description (answer)");
//       } catch (err) {
//         console.error("Error applying answer sdp:", err);
//       }
//     });

//     // Incoming ICE candidate
//     socket.on("ice-candidate", async (data) => {
//       // data: { candidate, from, roomId }
//       if (!data || !data.candidate) return;
//       try {
//         if (pcRef.current) {
//           await pcRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
//           // console.log('[webrtc] added remote ICE candidate');
//         } else {
//           console.warn("[webrtc] no pc to add candidate to - ignoring");
//         }
//       } catch (err) {
//         console.error("Error adding remote ice candidate:", err);
//       }
//     });

//     // Incoming-call notification (REST or server triggered start)
//     socket.on("incoming-call", (payload) => {
//       console.log("[socket] incoming-call", payload);
//       // payload { roomId, tutorUsername, bookingId, from? }
//       setIncoming({ ...payload });
//       setCallState("ringing");
//     });

//     // call-ended
//     socket.on("call-ended", () => {
//       console.log("[socket] remote ended call");
//       cleanupCall();
//       setCallState("idle");
//       setIncoming(null);
//     });

//     // disconnect
//     socket.on("disconnect", (reason) => {
//       console.log("[socket] disconnected:", reason);
//       setConnected(false);
//     });

//     // cleanup on unmount
//     return () => {
//       if (socket && socket.connected) socket.disconnect();
//       cleanupCall();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // run once

//   // Ensure an RTCPeerConnection exists and set handlers
//   const ensurePeerConnection = async () => {
//     if (pcRef.current) return;

//     const pc = new RTCPeerConnection({ iceServers: DEFAULT_ICE });
//     pcRef.current = pc;

//     // send local ICE candidates to peer (targeted if we know targetSocketRef)
//     pc.onicecandidate = (event) => {
//       if (event.candidate && socketRef.current) {
//         const payload = {
//           roomId: currentRoom,
//           candidate: event.candidate,
//           from: socketRef.current.id
//         };
//         // prefer sending to a specific peer (avoid broadcast)
//         if (targetSocketRef.current) payload.to = targetSocketRef.current;
//         socketRef.current.emit("ice-candidate", payload);
//       }
//     };

//     // When remote track arrives set it to <video>
//     pc.ontrack = (event) => {
//       console.log("[webrtc] ontrack", event);
//       const [stream] = event.streams;
//       if (remoteRef.current) {
//         remoteRef.current.srcObject = stream;
//         remoteRef.current.play?.().catch(() => {});
//       }
//     };

//     pc.onconnectionstatechange = () => {
//       const s = pc.connectionState || pc.iceConnectionState;
//       console.log("[webrtc] connection state:", s);
//       if (s === "connected" || s === "completed") {
//         setCallState("connected");
//       } else if (s === "disconnected" || s === "failed" || s === "closed") {
//         setCallState("idle");
//       }
//     };
//   };

//   // Start local camera/mic and attach to pc
//   const startLocalMedia = async () => {
//     try {
//       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//         throw new Error("getUserMedia not supported in this browser");
//       }
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setLocalStream(stream);
//       if (localRef.current) {
//         localRef.current.srcObject = stream;
//         localRef.current.muted = true;
//         localRef.current.play?.().catch(() => {});
//       }

//       // ensure pc exists and add tracks
//       await ensurePeerConnection();
//       stream.getTracks().forEach((t) => {
//         try {
//           pcRef.current.addTrack(t, stream);
//         } catch (e) {
//           console.warn("addTrack failed:", e);
//         }
//       });
//     } catch (err) {
//       console.error("startLocalMedia error:", err);
//       alert("Could not access camera/microphone. Please allow permissions and retry.");
//       throw err;
//     }
//   };

//   // Teacher starts the call (create room via REST or call server's start-call)
//   // Here we assume server will respond with a roomId (via 'call-started' or 'call-started' event)
//   const teacherStartCall = async () => {
//     if (!socketRef.current || !booking) {
//       alert("Missing socket or booking info");
//       return;
//     }

//     try {
//       await startLocalMedia();
//       setCallState("calling");

//       // Call /start-call endpoint via emit or REST — backend supports POST /start-call
//       // We'll emit 'start-call' event to server and wait for 'call-started' server response OR use REST fetch
//       socketRef.current.emit("start-call", {
//         tutorUsername: booking.tutorUsername || booking.tutorId || username,
//         studentUsername: booking.studentUsername || booking.studentId,
//         bookingId: booking.id
//       });

//       // wait for server to reply with the roomId (server may emit 'call-started' or return via REST)
//       // We'll listen for 'call-started' event for convenience:
//       socketRef.current.once("call-started", async (data) => {
//         const roomId = data?.roomId;
//         if (!roomId) {
//           console.error("call-started missing roomId", data);
//           setCallState("idle");
//           return;
//         }
//         setCurrentRoom(roomId);
//         // join the room
//         socketRef.current.emit("join-room", { roomId, username, userType, bookingId: booking.id });

//         // Wait briefly for peer-ready event to populate targetSocketRef; if not, we can attempt to call all peers in room
//         // but we will rely on peer-ready to tell us who to call
//         // create an offer after small delay if target known
//         setTimeout(async () => {
//           // If peer-ready provided target, use it. Otherwise we attempt to call "room" (server routing can be changed)
//           await ensurePeerConnection();
//           const offer = await pcRef.current.createOffer();
//           await pcRef.current.setLocalDescription(offer);

//           const payload = {
//             roomId,
//             offer,
//             from: socketRef.current.id
//           };
//           if (targetSocketRef.current) payload.to = targetSocketRef.current;
//           socketRef.current.emit("offer", payload);
//           setCallState("connecting");
//           console.log("[webrtc] offer sent", payload);
//         }, 500);
//       });

//       // In some setups server may respond via HTTP to /start-call. If you prefer REST, change above to fetch() and then emit join-room + offer.
//     } catch (err) {
//       console.error("teacherStartCall error:", err);
//       setCallState("idle");
//     }
//   };

//   // Student accepts incoming call (or auto-join)
//   const acceptIncoming = async () => {
//     if (!incoming || !socketRef.current) return;
//     try {
//       await startLocalMedia();
//       setCallState("connecting");
//       setCurrentRoom(incoming.roomId);

//       // Join the room so server tracks membership
//       socketRef.current.emit("join-room", { roomId: incoming.roomId, username, userType, bookingId: booking?.id || null });

//       // Optionally notify caller we accepted via accept-call event
//       if (incoming.from) {
//         socketRef.current.emit("accept-call", { roomId: incoming.roomId, to: incoming.from });
//       }

//       // remote offer should arrive right after join or was already delivered; on 'offer' handler we will answer
//       setIncoming(null);
//     } catch (err) {
//       console.error("acceptIncoming error:", err);
//       setCallState("idle");
//     }
//   };

//   // End call and cleanup
//   const endCall = () => {
//     if (socketRef.current && currentRoom) {
//       const payload = { roomId: currentRoom, from: socketRef.current.id };
//       if (targetSocketRef.current) payload.to = targetSocketRef.current;
//       socketRef.current.emit("end-call", payload);
//     }
//     cleanupCall();
//     setCallState("idle");
//   };

//   // Universal cleanup helper
//   const cleanupCall = () => {
//     // stop local tracks
//     try {
//       if (localStream) {
//         localStream.getTracks().forEach((t) => t.stop());
//       } else if (localRef.current?.srcObject) {
//         localRef.current.srcObject.getTracks().forEach((t) => t.stop());
//       }
//     } catch (e) { /* ignore */ }

//     // close peer connection
//     try {
//       if (pcRef.current) {
//         pcRef.current.onicecandidate = null;
//         pcRef.current.ontrack = null;
//         pcRef.current.close();
//         pcRef.current = null;
//       }
//     } catch (e) { /* ignore */ }

//     // clear video elements
//     if (localRef.current) {
//       try { localRef.current.srcObject = null; } catch {}
//     }
//     if (remoteRef.current) {
//       try { remoteRef.current.srcObject = null; } catch {}
//     }

//     setLocalStream(null);
//     targetSocketRef.current = null;
//     setCurrentRoom(null);
//     setIncoming(null);
//   };

//   // UI helpers
//   const canStart = userType === "teacher" && booking && callState === "idle" && connected;
//   const canAccept = incoming && callState === "ringing";

//   return (
//     <div style={{ padding: 16 }}>
//       <h3>Video Call (Room: {currentRoom || "—"})</h3>
//       <p>User: {username} ({userType})</p>
//       <p>Status: {callState}</p>

//       <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
//         <div>
//           <h5>Your video</h5>
//           <video
//             ref={localRef}
//             autoPlay
//             playsInline
//             muted
//             style={{ width: 320, height: 240, backgroundColor: "#000" }}
//           />
//         </div>

//         <div>
//           <h5>Remote video</h5>
//           <video
//             ref={remoteRef}
//             autoPlay
//             playsInline
//             style={{ width: 320, height: 240, backgroundColor: "#000" }}
//           />
//         </div>
//       </div>

//       <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
//         {canStart && (
//           <button onClick={teacherStartCall}>📞 Start Call (Teacher)</button>
//         )}

//         {canAccept && (
//           <>
//             <button onClick={acceptIncoming}>✅ Accept</button>
//             <button onClick={() => { setIncoming(null); setCallState("idle"); }}>❌ Reject</button>
//           </>
//         )}

//         {(callState === "connected" || callState === "connecting" || callState === "calling") && (
//           <button onClick={endCall}>End Call</button>
//         )}

//         {!localStream && (
//           <button onClick={() => startLocalMedia().catch(()=>{})}>
//             Start Camera
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoCall;




// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { socket } from "./socket";

// const VideoCall = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();

//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnection = useRef(null);
//   const localStream = useRef(null);

//   const [incomingCall, setIncomingCall] = useState(null);

//   // ICE servers config
//   const servers = {
//     iceServers: [
//       { urls: "stun:stun.l.google.com:19302" },
//       { urls: "stun:stun1.l.google.com:19302" },
//     ],
//   };

//   // get user media
//   const initLocalStream = async () => {
//     try {
//       localStream.current = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream.current;
//       }
//     } catch (err) {
//       console.error("Error accessing media devices:", err);
//     }
//   };

//   // create peer connection
//   const createPeerConnection = () => {
//     peerConnection.current = new RTCPeerConnection(servers);

//     // add local tracks
//     localStream.current.getTracks().forEach((track) => {
//       peerConnection.current.addTrack(track, localStream.current);
//     });

//     // remote stream
//     peerConnection.current.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     // ice candidates
//     peerConnection.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", {
//           candidate: event.candidate,
//           roomId,
//         });
//       }
//     };
//   };

//   // start call (teacher side)
//   const startCall = async () => {
//     createPeerConnection();
//     const offer = await peerConnection.current.createOffer();
//     await peerConnection.current.setLocalDescription(offer);

//     socket.emit("offer", { offer, roomId });
//   };

//   // accept call (student side)
//   const acceptCall = async () => {
//     setIncomingCall(null);
//     createPeerConnection();
//     await peerConnection.current.setRemoteDescription(
//       new RTCSessionDescription(incomingCall.offer)
//     );
//     const answer = await peerConnection.current.createAnswer();
//     await peerConnection.current.setLocalDescription(answer);

//     socket.emit("answer", { answer, roomId });
//   };

//   // reject call
//   const rejectCall = () => {
//     setIncomingCall(null);
//     socket.emit("reject", { roomId });
//   };

//   // end call
//   const endCall = () => {
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }
//     if (localStream.current) {
//       localStream.current.getTracks().forEach((track) => track.stop());
//     }
//     navigate("/");
//   };

//   // socket listeners
//   useEffect(() => {
//     initLocalStream();

//     socket.emit("join-room", { roomId });

//     socket.on("offer", (data) => {
//       setIncomingCall(data);
//     });

//     socket.on("answer", async (data) => {
//       await peerConnection.current.setRemoteDescription(
//         new RTCSessionDescription(data.answer)
//       );
//     });

//     socket.on("ice-candidate", async (data) => {
//       try {
//         await peerConnection.current.addIceCandidate(data.candidate);
//       } catch (err) {
//         console.error("Error adding ICE candidate:", err);
//       }
//     });

//     socket.on("rejected", () => {
//       alert("Call rejected");
//       endCall();
//     });

//     return () => {
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//       socket.off("rejected");
//     };
//   }, []);

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h2>Video Call Room: {roomId}</h2>
//       <div>
//         <video ref={localVideoRef} autoPlay playsInline muted width="300" />
//         <video ref={remoteVideoRef} autoPlay playsInline width="300" />
//       </div>

//       {incomingCall && (
//         <div>
//           <p>Incoming Call...</p>
//           <button onClick={acceptCall}>Accept</button>
//           <button onClick={rejectCall}>Reject</button>
//         </div>
//       )}

//       <div style={{ marginTop: "20px" }}>
//         <button onClick={startCall}>Start Call</button>
//         <button onClick={endCall}>End Call</button>
//       </div>
//     </div>
//   );
// };

// export default VideoCall;




// import React, { useEffect, useRef, useState } from "react";
// import { socket } from "./socket"; // adjust path if needed

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerRef = useRef(null);

//   const [roomId] = useState(() => {
//     let saved = sessionStorage.getItem("roomId");
//     if (!saved) {
//       saved = Math.random().toString(36).substring(2, 8);
//       sessionStorage.setItem("roomId", saved);
//     }
//     return saved;
//   });

//   useEffect(() => {
//     const startCall = async () => {
//       try {
//         // get local media
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });

//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }

//         // create RTCPeerConnection
//         const peer = new RTCPeerConnection({
//           iceServers: [
//             { urls: "stun:stun.l.google.com:19302" },
//           ],
//         });
//         peerRef.current = peer;

//         // add local tracks
//         stream.getTracks().forEach((track) => peer.addTrack(track, stream));

//         // handle remote track
//         peer.ontrack = (event) => {
//           if (remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = event.streams[0];
//           }
//         };

//         // send ICE candidates
//         peer.onicecandidate = (event) => {
//           if (event.candidate) {
//             socket.emit("ice-candidate", { candidate: event.candidate, roomId });
//           }
//         };

//         // socket listeners
//         socket.emit("join-room", roomId);

//         socket.on("offer", async ({ offer }) => {
//           await peer.setRemoteDescription(new RTCSessionDescription(offer));
//           const answer = await peer.createAnswer();
//           await peer.setLocalDescription(answer);
//           socket.emit("answer", { answer, roomId });
//         });

//         socket.on("answer", async ({ answer }) => {
//           await peer.setRemoteDescription(new RTCSessionDescription(answer));
//         });

//         socket.on("ice-candidate", async ({ candidate }) => {
//           try {
//             await peer.addIceCandidate(new RTCIceCandidate(candidate));
//           } catch (err) {
//             console.error("Error adding received ice candidate", err);
//           }
//         });

//         // if you’re first in the room, create offer
//         socket.on("ready", async () => {
//           const offer = await peer.createOffer();
//           await peer.setLocalDescription(offer);
//           socket.emit("offer", { offer, roomId });
//         });
//       } catch (err) {
//         console.error("Error starting call:", err);
//       }
//     };

//     startCall();

//     return () => {
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//       socket.off("ready");
//       peerRef.current && peerRef.current.close();
//     };
//   }, [roomId]);

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <h2 className="text-xl font-bold">Room: {roomId}</h2>
//       <video
//         ref={localVideoRef}
//         autoPlay
//         playsInline
//         muted
//         className="w-64 border rounded"
//       />
//       <video
//         ref={remoteVideoRef}
//         autoPlay
//         playsInline
//         className="w-64 border rounded"
//       />
//     </div>
//   );
// };

// export default VideoCall;





// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:4000"); // adjust if different

// export default function VideoCall({ userType, userName, peerId }) {
//   const [roomId, setRoomId] = useState(null);
//   const [remoteId, setRemoteId] = useState(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnection = useRef(null);

//   useEffect(() => {
//     async function initCall() {
//       try {
//         let response;
//         if (userType === "teacher") {
//           // Teacher starts the call
//           response = await axios.post("http://localhost:4000/start-call", {
//             teacher: userName,
//           });
//           setRoomId(response.data.roomId);
//         } else {
//           // Student joins with teacherId
//           response = await axios.post("http://localhost:4000/get-call", {
//             teacher: peerId,
//           });
//           setRoomId(response.data.roomId);
//         }

//         // Join the socket room
//         socket.emit("join-room", response.data.roomId, userName);
//       } catch (err) {
//         console.error("Error starting/joining call:", err);
//       }
//     }

//     initCall();
//   }, [userType, userName, peerId]);

//   useEffect(() => {
//     // Setup media
//     async function setupMedia() {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       localVideoRef.current.srcObject = stream;

//       // Create PeerConnection
//       peerConnection.current = new RTCPeerConnection();

//       // Add local tracks
//       stream.getTracks().forEach((track) =>
//         peerConnection.current.addTrack(track, stream)
//       );

//       // Remote stream
//       peerConnection.current.ontrack = (event) => {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       };

//       // Handle ICE
//       peerConnection.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//         }
//       };
//     }

//     setupMedia();

//     // Signaling
//     socket.on("offer", async ({ offer }) => {
//       await peerConnection.current.setRemoteDescription(
//         new RTCSessionDescription(offer)
//       );
//       const answer = await peerConnection.current.createAnswer();
//       await peerConnection.current.setLocalDescription(answer);
//       socket.emit("answer", { roomId, answer });
//     });

//     socket.on("answer", async ({ answer }) => {
//       await peerConnection.current.setRemoteDescription(
//         new RTCSessionDescription(answer)
//       );
//     });

//     socket.on("ice-candidate", async ({ candidate }) => {
//       try {
//         await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//       } catch (err) {
//         console.error("Error adding ICE candidate:", err);
//       }
//     });

//     return () => {
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

//   async function startOffer() {
//     if (!peerConnection.current) return;
//     const offer = await peerConnection.current.createOffer();
//     await peerConnection.current.setLocalDescription(offer);
//     socket.emit("offer", { roomId, offer });
//   }

//   return (
//     <div>
//       <h2>
//         {userType === "teacher" ? "Teacher" : "Student"} - Room: {roomId}
//       </h2>
//       <video ref={localVideoRef} autoPlay playsInline muted />
//       <video ref={remoteVideoRef} autoPlay playsInline />
//       {userType === "teacher" && (
//         <button onClick={startOffer}>Start Call</button>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { socket } from "./socket";

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [error, setError] = useState("");
//   const [status, setStatus] = useState("Initializing...");
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get URL params
//   const query = new URLSearchParams(location.search);
//   const bookingId = query.get("bookingId");
//   const studentUsername = query.get("studentUsername");
//   const userType = query.get("type"); // teacher or student
//   const userName = query.get("name");

//   // Ensure bookingId exists
//   useEffect(() => {
//     if (!bookingId) {
//       setError("Booking ID is missing!");
//       console.error("bookingId is missing!");
//       return;
//     }
//   }, [bookingId]);

//   useEffect(() => {
//     let localStream;
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     const handleRemoteStream = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     pc.ontrack = handleRemoteStream;
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("webrtc-candidate", { candidate: event.candidate, bookingId, to: otherSocketId });
//       }
//     };

//     let otherSocketId = null;

//     const initCall = async () => {
//       try {
//         localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
//         localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

//         if (userType === "teacher") {
//           socket.emit("teacher-join", { bookingId, studentUsername, teacherName: userName });
//           setStatus("Waiting for student...");
//         } else {
//           socket.emit("student-join", { bookingId, studentName: userName });
//           setStatus("Connecting to teacher...");
//         }
//       } catch (err) {
//         console.error("Media access error:", err);
//         setError("Failed to access camera/microphone.");
//       }
//     };

//     initCall();

//     // Socket listeners
//     socket.on("call-start", async ({ offer, fromSocketId }) => {
//       otherSocketId = fromSocketId;
//       await pc.setRemoteDescription(new RTCSessionDescription(offer));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit("webrtc-answer", { answer, to: fromSocketId, bookingId });
//       setStatus("Call connected!");
//     });

//     socket.on("webrtc-answer", async ({ answer }) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(answer));
//       setStatus("Call connected!");
//     });

//     socket.on("webrtc-candidate", async ({ candidate }) => {
//       if (candidate) {
//         try {
//           await pc.addIceCandidate(new RTCIceCandidate(candidate));
//         } catch (err) {
//           console.error("Error adding ICE candidate:", err);
//         }
//       }
//     });

//     socket.on("end-call", () => {
//       setStatus("Call ended by other party.");
//       cleanup();
//     });

//     const cleanup = () => {
//       if (localStream) localStream.getTracks().forEach((t) => t.stop());
//       if (pc) pc.close();
//       navigate("/"); // Redirect to dashboard
//     };

//     return () => {
//       cleanup();
//       socket.off("call-start");
//       socket.off("webrtc-answer");
//       socket.off("webrtc-candidate");
//       socket.off("end-call");
//     };
//   }, [bookingId, studentUsername, userType, userName, navigate]);

//   const endCall = () => {
//     socket.emit("end-call", { bookingId });
//     setStatus("Ending call...");
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <h4>{status}</h4>
//       <div className="d-flex mt-3 gap-3">
//         <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//         <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//       </div>
//       <button className="btn btn-danger mt-3" onClick={endCall}>End Call</button>
//     </div>
//   );
// };

// export default VideoCall;




// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { socket } from "./socket";

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [error, setError] = useState("");
//   const [status, setStatus] = useState("Initializing...");
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get URL params
//   const query = new URLSearchParams(location.search);
//   const bookingId = query.get("bookingId");
//   const studentUsername = query.get("studentUsername");
//   const userType = query.get("type"); // teacher or student
//   const userName = query.get("name");

//   // Ensure bookingId exists
//   useEffect(() => {
//     if (!bookingId) {
//       setError("Booking ID is missing!");
//       alert("Booking ID is missing! Redirecting...");
//       navigate(-1); // redirect back if missing
//     }
//   }, [bookingId, navigate]);

//   useEffect(() => {
//     if (!bookingId) return; // stop if bookingId missing

//     let localStream;
//     let otherSocketId = null;
//     const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
//     pcRef.current = pc;

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate && otherSocketId) {
//         socket.emit("webrtc-candidate", { candidate: event.candidate, bookingId, to: otherSocketId });
//       }
//     };

//     const initCall = async () => {
//       try {
//         localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
//         localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

//         // Emit join events only if bookingId exists
//         if (userType === "teacher") {
//           socket.emit("teacher-join", { bookingId, studentUsername, teacherName: userName });
//           setStatus("Waiting for student...");
//         } else {
//           socket.emit("student-join", { bookingId, studentName: userName });
//           setStatus("Connecting to teacher...");
//         }
//       } catch (err) {
//         console.error("Media access error:", err);
//         setError("Failed to access camera/microphone.");
//       }
//     };

//     initCall();

//     // Socket listeners
//     socket.on("call-start", async ({ offer, fromSocketId }) => {
//       otherSocketId = fromSocketId;
//       await pc.setRemoteDescription(new RTCSessionDescription(offer));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit("webrtc-answer", { answer, to: fromSocketId, bookingId });
//       setStatus("Call connected!");
//     });

//     socket.on("webrtc-answer", async ({ answer }) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(answer));
//       setStatus("Call connected!");
//     });

//     socket.on("webrtc-candidate", async ({ candidate }) => {
//       if (candidate) {
//         try {
//           await pc.addIceCandidate(new RTCIceCandidate(candidate));
//         } catch (err) {
//           console.error("Error adding ICE candidate:", err);
//         }
//       }
//     });

//     socket.on("end-call", () => {
//       setStatus("Call ended by other party.");
//       cleanup();
//     });

//     const cleanup = () => {
//       if (localStream) localStream.getTracks().forEach((t) => t.stop());
//       if (pc) pc.close();
//       socket.emit("leave-room", { bookingId });
//     };

//     return () => {
//       cleanup();
//       socket.off("call-start");
//       socket.off("webrtc-answer");
//       socket.off("webrtc-candidate");
//       socket.off("end-call");
//     };
//   }, [bookingId, studentUsername, userType, userName]);

//   const endCall = () => {
//     if (!bookingId) return;
//     socket.emit("end-call", { bookingId });
//     setStatus("Ending call...");
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <h4>{status}</h4>
//       <div className="d-flex mt-3 gap-3">
//         <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//         <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//       </div>
//       <button className="btn btn-danger mt-3" onClick={endCall}>End Call</button>
//     </div>
//   );
// };

// export default VideoCall;




// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { socket } from "./socket";

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [error, setError] = useState("");
//   const [status, setStatus] = useState("Initializing...");
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get URL params
//   const query = new URLSearchParams(location.search);
//   const bookingId = query.get("bookingId");
//   const roomId = query.get("roomId") || bookingId; // fallback to bookingId
//   const studentUsername = query.get("studentUsername");
//   const userType = query.get("type"); // teacher or student
//   const userName = query.get("name");

//   // Ensure bookingId exists
//   useEffect(() => {
//     if (!bookingId) {
//       setError("Booking ID is missing!");
//       console.error("bookingId is missing!");
//       return;
//     }
//   }, [bookingId]);

//   useEffect(() => {
//     let localStream;
//     let otherSocketId = null;
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate && otherSocketId) {
//         socket.emit("webrtc-candidate", { candidate: event.candidate, roomId, to: otherSocketId });
//       }
//     };

//     const initCall = async () => {
//       try {
//         localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
//         localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

//         if (userType === "teacher") {
//           socket.emit("teacher-join", { bookingId, roomId, studentUsername, teacherName: userName });
//           setStatus("Waiting for student...");
//         } else {
//           socket.emit("student-join", { bookingId, roomId, studentName: userName });
//           setStatus("Connecting to teacher...");
//         }
//       } catch (err) {
//         console.error("Media access error:", err);
//         setError("Failed to access camera/microphone.");
//       }
//     };

//     initCall();

//     // Socket listeners
//     socket.on("call-start", async ({ offer, fromSocketId }) => {
//       otherSocketId = fromSocketId;
//       await pc.setRemoteDescription(new RTCSessionDescription(offer));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit("webrtc-answer", { answer, to: fromSocketId, roomId });
//       setStatus("Call connected!");
//     });

//     socket.on("webrtc-answer", async ({ answer }) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(answer));
//       setStatus("Call connected!");
//     });

//     socket.on("webrtc-candidate", async ({ candidate }) => {
//       if (candidate) {
//         try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); }
//         catch (err) { console.error("Error adding ICE candidate:", err); }
//       }
//     });

//     socket.on("end-call", () => {
//       setStatus("Call ended by other party.");
//       cleanup();
//     });

//     const cleanup = () => {
//       if (localStream) localStream.getTracks().forEach((t) => t.stop());
//       if (pc) pc.close();
//       navigate("/"); // Redirect to dashboard
//     };

//     return () => {
//       cleanup();
//       socket.off("call-start");
//       socket.off("webrtc-answer");
//       socket.off("webrtc-candidate");
//       socket.off("end-call");
//     };
//   }, [bookingId, roomId, studentUsername, userType, userName, navigate]);

//   const endCall = () => {
//     socket.emit("end-call", { roomId });
//     setStatus("Ending call...");
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <h4>{status}</h4>
//       <div className="d-flex mt-3 gap-3">
//         <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//         <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//       </div>
//       <button className="btn btn-danger mt-3" onClick={endCall}>End Call</button>
//     </div>
//   );
// };

// export default VideoCall;




// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { socket } from "./socket";

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [status, setStatus] = useState("Initializing...");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const query = new URLSearchParams(location.search);
//   const roomId = query.get("roomId");
//   const userType = query.get("type");
//   const userName = query.get("name");

//   useEffect(() => {
//     let localStream;
//     const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
//     pcRef.current = pc;

//     // Local stream
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         localStream = stream;
//         localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));
//       })
//       .catch(err => {
//         console.error("Media error:", err);
//         setStatus("Failed to access camera/mic.");
//       });

//     // Remote track
//     pc.ontrack = event => { remoteVideoRef.current.srcObject = event.streams[0]; };

//     // ICE candidate
//     pc.onicecandidate = event => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { candidate: event.candidate, roomId });
//       }
//     };

//     // Join room
//     socket.emit("join-room", { roomId, username: userName, userType });

//     // Peer ready -> create offer if needed
//     socket.on("peer-ready", async ({ to }) => {
//       if (userType === "teacher" || userType === "student") {
//         const offer = await pc.createOffer();
//         await pc.setLocalDescription(offer);
//         socket.emit("offer", { sdp: offer, to, roomId });
//       }
//     });

//     // Offer received
//     socket.on("offer", async ({ sdp, from }) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit("answer", { sdp: answer, to: from, roomId });
//       setStatus("Call connected!");
//     });

//     // Answer received
//     socket.on("answer", async ({ sdp }) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//       setStatus("Call connected!");
//     });

//     // ICE received
//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (candidate) {
//         try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); }
//         catch (err) { console.error("Error adding ICE candidate:", err); }
//       }
//     });

//     // Cleanup
//     const cleanup = () => {
//       if (localStream) localStream.getTracks().forEach(t => t.stop());
//       if (pc) pc.close();
//       navigate("/");
//     };

//     return () => {
//       cleanup();
//       socket.off("peer-ready");
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId, userType, userName, navigate]);

//   const endCall = () => {
//     socket.emit("leave-room", { roomId, username: userName });
//     setStatus("Ending call...");
//     navigate("/");
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
//       <h4>{status}</h4>
//       <div className="d-flex mt-3 gap-3">
//         <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//         <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//       </div>
//       <button className="btn btn-danger mt-3" onClick={endCall}>End Call</button>
//     </div>
//   );
// };

// export default VideoCall;





// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { socket } from "./socket";

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const remoteDescriptionSet = useRef(false);
//   const iceCandidateQueue = useRef([]);
//   const [status, setStatus] = useState("Initializing...");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const query = new URLSearchParams(location.search);
//   const roomId = query.get("roomId");
//   const userType = query.get("type");
//   const userName = query.get("name");

//   useEffect(() => {
//     let localStream;
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     // Get local media
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         localStream = stream;
//         localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));
//       })
//       .catch(err => {
//         console.error("Media error:", err);
//         setStatus("Failed to access camera/mic.");
//       });

//     // Remote track
//     pc.ontrack = event => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     // ICE candidate
//     pc.onicecandidate = event => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { candidate: event.candidate, roomId });
//       }
//     };

//     // Join room
//     socket.emit("join-room", { roomId, username: userName, userType });

//     // Peer ready -> create offer if teacher
//     socket.on("peer-ready", async ({ to }) => {
//       if (userType === "teacher") {
//         try {
//           const offer = await pc.createOffer();
//           await pc.setLocalDescription(offer);
//           socket.emit("offer", { sdp: offer, to, roomId });
//         } catch (err) {
//           console.error("Error creating offer:", err);
//         }
//       }
//     });

//     // Offer received
//     socket.on("offer", async ({ sdp, from }) => {
//       if (!remoteDescriptionSet.current) {
//         try {
//           await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//           const answer = await pc.createAnswer();
//           await pc.setLocalDescription(answer);
//           socket.emit("answer", { sdp: answer, to: from, roomId });
//           remoteDescriptionSet.current = true;
//           setStatus("Call connected!");
//         } catch (err) {
//           console.error("Error handling offer:", err);
//         }
//       }
//     });

//     // Answer received
//     socket.on("answer", async ({ sdp }) => {
//       if (!remoteDescriptionSet.current) {
//         try {
//           await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//           remoteDescriptionSet.current = true;

//           // Add any queued ICE candidates
//           for (let c of iceCandidateQueue.current) {
//             await pc.addIceCandidate(new RTCIceCandidate(c));
//           }
//           iceCandidateQueue.current = [];
//           setStatus("Call connected!");
//         } catch (err) {
//           console.error("Error setting remote answer:", err);
//         }
//       }
//     });

//     // ICE candidate received
//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (candidate) {
//         if (remoteDescriptionSet.current) {
//           try {
//             await pc.addIceCandidate(new RTCIceCandidate(candidate));
//           } catch (err) {
//             console.error("Error adding ICE candidate:", err);
//           }
//         } else {
//           iceCandidateQueue.current.push(candidate);
//         }
//       }
//     });

//     // Cleanup
//     const cleanup = () => {
//       if (localStream) localStream.getTracks().forEach(t => t.stop());
//       if (pc) pc.close();
//       navigate("/");
//     };

//     return () => {
//       cleanup();
//       socket.off("peer-ready");
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId, userType, userName, navigate]);

//   const endCall = () => {
//     socket.emit("leave-room", { roomId, username: userName });
//     setStatus("Ending call...");
//     navigate("/");
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
//       <h4>{status}</h4>
//       <div className="d-flex mt-3 gap-3">
//         <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//         <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//       </div>
//       <button className="btn btn-danger mt-3" onClick={endCall}>End Call</button>
//     </div>
//   );
// };

// export default VideoCall;








// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { socket } from "./socket";

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const iceCandidateQueue = useRef([]);
//   const [status, setStatus] = useState("Initializing...");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const query = new URLSearchParams(location.search);
//   const roomId = query.get("roomId");
//   const userType = query.get("type");
//   const userName = query.get("name");

//   useEffect(() => {
//     let localStream;
//     const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
//     pcRef.current = pc;

//     // Get local media
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         localStream = stream;
//         localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));
//       })
//       .catch(err => {
//         console.error("Media error:", err);
//         setStatus("Failed to access camera/mic.");
//       });

//     // Remote track
//     pc.ontrack = event => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     // ICE candidate
//     pc.onicecandidate = event => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { candidate: event.candidate, roomId });
//       }
//     };

//     // Join room
//     socket.emit("join-room", { roomId, username: userName, userType });

//     // Teacher creates offer
//     socket.on("peer-ready", async ({ to }) => {
//       if (userType === "teacher") {
//         try {
//           const offer = await pc.createOffer();
//           await pc.setLocalDescription(offer);
//           socket.emit("offer", { sdp: offer, to, roomId });
//         } catch (err) {
//           console.error("Error creating offer:", err);
//         }
//       }
//     });

//     // Offer received (student side)
//     socket.on("offer", async ({ sdp, from }) => {
//       try {
//         await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);
//         socket.emit("answer", { sdp: answer, to: from, roomId });

//         // Apply queued ICE candidates
//         for (let c of iceCandidateQueue.current) {
//           await pc.addIceCandidate(new RTCIceCandidate(c));
//         }
//         iceCandidateQueue.current = [];
//         setStatus("Call connected!");
//       } catch (err) {
//         console.error("Error handling offer:", err);
//       }
//     });

//     // Answer received (teacher side)
//     socket.on("answer", async ({ sdp }) => {
//       try {
//         await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//         setStatus("Call connected!");

//         // Apply queued ICE candidates
//         for (let c of iceCandidateQueue.current) {
//           await pc.addIceCandidate(new RTCIceCandidate(c));
//         }
//         iceCandidateQueue.current = [];
//       } catch (err) {
//         console.error("Error setting remote answer:", err);
//       }
//     });

//     // ICE candidate received
//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (candidate) {
//         try {
//           if (pc.remoteDescription && pc.remoteDescription.type) {
//             await pc.addIceCandidate(new RTCIceCandidate(candidate));
//           } else {
//             iceCandidateQueue.current.push(candidate);
//           }
//         } catch (err) {
//           console.error("Error adding ICE candidate:", err);
//         }
//       }
//     });

//     // Cleanup
//     const cleanup = () => {
//       if (localStream) localStream.getTracks().forEach(t => t.stop());
//       if (pc) pc.close();
//       navigate("/");
//     };

//     return () => {
//       cleanup();
//       socket.off("peer-ready");
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId, userType, userName, navigate]);

//   const endCall = () => {
//     socket.emit("leave-room", { roomId, username: userName });
//     setStatus("Ending call...");
//     navigate("/");
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
//       <h4>{status}</h4>
//       <div className="d-flex mt-3 gap-3">
//         <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//         <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//       </div>
//       <button className="btn btn-danger mt-3" onClick={endCall}>End Call</button>
//     </div>
//   );
// };

// export default VideoCall;


// ______________is main student kis side teacher ka video aa raha hai

// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { socket } from "./socket";

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const iceQueue = useRef([]);
//   const [status, setStatus] = useState("Initializing...");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const query = new URLSearchParams(location.search);
//   const roomId = query.get("roomId");
//   const userType = query.get("type"); // 'teacher' or 'student'
//   const userName = query.get("name");

//   useEffect(() => {
//     let localStream;
//     const pc = new RTCPeerConnection({
//       iceServers: [
//         { urls: "stun:stun.l.google.com:19302" },
//         // Add TURN server if needed for NAT issues
//       ],
//     });
//     pcRef.current = pc;

//     // 1️⃣ Get local media
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         localStream = stream;
//         localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));
//       })
//       .catch(err => {
//         console.error("Media error:", err);
//         setStatus("Failed to access camera/mic.");
//       });

//     // 2️⃣ Remote track handler
//     pc.ontrack = event => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     // 3️⃣ ICE candidate
//     pc.onicecandidate = event => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { candidate: event.candidate, roomId });
//       }
//     };

//     // 4️⃣ Join room
//     socket.emit("join-room", { roomId, username: userName, userType });

//     // 5️⃣ Offer/answer logic
//     const createOffer = async (to) => {
//       try {
//         const offer = await pc.createOffer();
//         await pc.setLocalDescription(offer);
//         socket.emit("offer", { sdp: offer, to, roomId });
//       } catch (err) {
//         console.error("Error creating offer:", err);
//       }
//     };

//     socket.on("offer", async ({ sdp, from }) => {
//       try {
//         await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);
//         socket.emit("answer", { sdp: answer, to: from, roomId });
//         setStatus("Call connected!");
//         // Add queued ICE candidates
//         for (let c of iceQueue.current) {
//           await pc.addIceCandidate(new RTCIceCandidate(c));
//         }
//         iceQueue.current = [];
//       } catch (err) {
//         console.error("Error handling offer:", err);
//       }
//     });

//     socket.on("answer", async ({ sdp }) => {
//       try {
//         await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//         setStatus("Call connected!");
//         // Add queued ICE candidates
//         for (let c of iceQueue.current) {
//           await pc.addIceCandidate(new RTCIceCandidate(c));
//         }
//         iceQueue.current = [];
//       } catch (err) {
//         console.error("Error setting remote answer:", err);
//       }
//     });

//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (!candidate) return;
//       try {
//         if (pc.remoteDescription && pc.remoteDescription.type) {
//           await pc.addIceCandidate(new RTCIceCandidate(candidate));
//         } else {
//           iceQueue.current.push(candidate);
//         }
//       } catch (err) {
//         console.error("Error adding ICE candidate:", err);
//       }
//     });

//     socket.on("peer-ready", ({ to }) => {
//       // Only teacher creates offer
//       if (userType === "teacher") createOffer(to);
//     });

//     // 6️⃣ Cleanup
//     const cleanup = () => {
//       if (localStream) localStream.getTracks().forEach(t => t.stop());
//       if (pc) pc.close();
//       navigate("/");
//     };

//     return () => {
//       cleanup();
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//       socket.off("peer-ready");
//     };
//   }, [roomId, userType, userName, navigate]);

//   const endCall = () => {
//     socket.emit("leave-room", { roomId, username: userName });
//     setStatus("Ending call...");
//     navigate("/");
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
//       <h4>{status}</h4>
//       <div className="d-flex mt-3 gap-3">
//         <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//         <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//       </div>
//       <button className="btn btn-danger mt-3" onClick={endCall}>End Call</button>
//     </div>
//   );
// };

// export default VideoCall;









import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { socket } from "./socket";

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const [status, setStatus] = useState("Initializing...");
  const navigate = useNavigate();
  const location = useLocation();
  const remoteDescriptionSet = useRef(false);
  const iceCandidateQueue = useRef([]);

  const query = new URLSearchParams(location.search);
  const roomId = query.get("roomId");
  const userType = query.get("type");
  const userName = query.get("name");

  useEffect(() => {
    let localStream;

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        // Add TURN server if available for better connectivity
        // { urls: "turn:TURN_SERVER_URL:3478", username: "user", credential: "pass" }
      ],
    });
    pcRef.current = pc;

    // Local stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localStream = stream;
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        // Notify server that this peer is ready after getting local media
        socket.emit("peer-ready", { roomId, userType, username: userName });
      })
      .catch(err => {
        console.error("Media error:", err);
        setStatus("Failed to access camera/mic.");
      });

    // Remote stream
    pc.ontrack = event => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // ICE candidates
    pc.onicecandidate = event => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, roomId });
      }
    };

    // Join room
    socket.emit("join-room", { roomId, username: userName, userType });

    // When another peer is ready, teacher creates offer
    socket.on("peer-ready", async ({ to }) => {
      if (userType === "teacher") {
        try {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socket.emit("offer", { sdp: offer, to, roomId });
        } catch (err) {
          console.error("Error creating offer:", err);
        }
      }
    });

    // Offer received
    socket.on("offer", async ({ sdp, from }) => {
      if (!remoteDescriptionSet.current) {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("answer", { sdp: answer, to: from, roomId });
          remoteDescriptionSet.current = true;
          setStatus("Call connected!");
        } catch (err) {
          console.error("Error handling offer:", err);
        }
      }
    });

    // Answer received
    socket.on("answer", async ({ sdp }) => {
      if (!remoteDescriptionSet.current) {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          remoteDescriptionSet.current = true;

          // Add any queued ICE candidates
          for (let c of iceCandidateQueue.current) {
            await pc.addIceCandidate(new RTCIceCandidate(c));
          }
          iceCandidateQueue.current = [];
          setStatus("Call connected!");
        } catch (err) {
          console.error("Error setting remote answer:", err);
        }
      }
    });

    // ICE candidate received
    socket.on("ice-candidate", async ({ candidate }) => {
      if (candidate) {
        if (remoteDescriptionSet.current) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (err) {
            console.error("Error adding ICE candidate:", err);
          }
        } else {
          iceCandidateQueue.current.push(candidate);
        }
      }
    });

    // Cleanup
    const cleanup = () => {
      if (localStream) localStream.getTracks().forEach(t => t.stop());
      if (pc) pc.close();
      navigate("/");
    };

    return () => {
      cleanup();
      socket.off("peer-ready");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [roomId, userType, userName, navigate]);

  const endCall = () => {
    socket.emit("leave-room", { roomId, username: userName });
    setStatus("Ending call...");
    navigate("/");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <h4>{status}</h4>
      <div className="d-flex mt-3 gap-3">
        <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", borderRadius: "8px", background: "black" }} />
        <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", background: "black" }} />
      </div>
      <button className="btn btn-danger mt-3" onClick={endCall}>End Call</button>
    </div>
  );
};

export default VideoCall;






// -------------------------------yeah with backend changes ke saath run kiya hai

// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { socket } from "./socket";

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [status, setStatus] = useState("Initializing...");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const remoteDescriptionSet = useRef(false);
//   const iceCandidateQueue = useRef([]);
//   const peerSocketId = useRef(null);

//   const query = new URLSearchParams(location.search);
//   const roomId = query.get("roomId");
//   const userType = query.get("type");
//   const userName = query.get("name");

//   useEffect(() => {
//     let localStream;
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     // 1️⃣ Get local media
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         localStream = stream;
//         localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));

//         // Only now announce readiness
//         socket.emit("peer-ready", { roomId, userType, username: userName });
//         setStatus("Waiting for peer...");
//       })
//       .catch(err => {
//         console.error("Media error:", err);
//         setStatus("Failed to access camera/mic.");
//       });

//     // 2️⃣ Remote tracks
//     pc.ontrack = event => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//       setStatus("Call connected!");
//     };

//     // 3️⃣ ICE candidates
//     pc.onicecandidate = event => {
//       if (event.candidate && peerSocketId.current) {
//         socket.emit("ice-candidate", { candidate: event.candidate, to: peerSocketId.current, roomId });
//       }
//     };

//     // 4️⃣ Join room
//     socket.emit("join-room", { roomId, username: userName, userType });

//     // 5️⃣ Peer ready: teacher creates offer, student just waits
//     socket.on("peer-ready", ({ to }) => {
//       peerSocketId.current = to; // store the peer to send offer/ICE
//       if (userType === "teacher") {
//         createAndSendOffer(to);
//       }
//     });

//     // 6️⃣ Offer received
//     socket.on("offer", async ({ sdp, from }) => {
//       peerSocketId.current = from;
//       if (!remoteDescriptionSet.current) {
//         await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);
//         socket.emit("answer", { sdp: answer, to: from, roomId });
//         remoteDescriptionSet.current = true;

//         // Add queued ICE
//         for (let c of iceCandidateQueue.current) {
//           await pc.addIceCandidate(new RTCIceCandidate(c));
//         }
//         iceCandidateQueue.current = [];
//       }
//     });

//     // 7️⃣ Answer received
//     socket.on("answer", async ({ sdp }) => {
//       if (!remoteDescriptionSet.current) {
//         await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//         remoteDescriptionSet.current = true;

//         // Add queued ICE
//         for (let c of iceCandidateQueue.current) {
//           await pc.addIceCandidate(new RTCIceCandidate(c));
//         }
//         iceCandidateQueue.current = [];
//       }
//     });

//     // 8️⃣ ICE candidate received
//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (candidate) {
//         if (remoteDescriptionSet.current) {
//           await pc.addIceCandidate(new RTCIceCandidate(candidate));
//         } else {
//           iceCandidateQueue.current.push(candidate);
//         }
//       }
//     });

//     // Cleanup
//     const cleanup = () => {
//       if (localStream) localStream.getTracks().forEach(t => t.stop());
//       if (pc) pc.close();
//       navigate("/");
//     };

//     return () => {
//       cleanup();
//       socket.off("peer-ready");
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId, userType, userName, navigate]);

//   const createAndSendOffer = async (to) => {
//     try {
//       const pc = pcRef.current;
//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       socket.emit("offer", { sdp: offer, to, roomId });
//     } catch (err) {
//       console.error("Error creating offer:", err);
//     }
//   };

//   const endCall = () => {
//     socket.emit("leave-room", { roomId, username: userName });
//     setStatus("Ending call...");
//     navigate("/");
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
//       <h4>{status}</h4>
//       <div className="d-flex mt-3 gap-3">
//         <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//         <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", background: "black" }} />
//       </div>
//       <button className="btn btn-danger mt-3" onClick={endCall}>End Call</button>
//     </div>
//   );
// };

// export default VideoCall;





// import React, { useEffect, useRef, useState } from "react";
// import { socket } from "./socket"; // your socket.io-client instance
// import { useParams } from "react-router-dom";

// const VideoCall = ({ userType, username }) => {
//   const { roomId } = useParams(); // or pass roomId as prop
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const pcRef = useRef(null);

//   const [stream, setStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [peerReady, setPeerReady] = useState(false);

//   const servers = {
//     iceServers: [
//       { urls: "stun:stun.l.google.com:19302" },
//       // add TURN if needed
//     ],
//   };

//   useEffect(() => {
//     const init = async () => {
//       try {
//         // 1️⃣ get local media
//         const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setStream(localStream);
//         localVideoRef.current.srcObject = localStream;

//         // 2️⃣ create peer connection
//         const pc = new RTCPeerConnection(servers);
//         pcRef.current = pc;

//         // 3️⃣ add tracks to peer connection
//         localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

//         // 4️⃣ handle remote tracks
//         const remote = new MediaStream();
//         setRemoteStream(remote);
//         remoteVideoRef.current.srcObject = remote;

//         pc.ontrack = (event) => {
//           event.streams[0].getTracks().forEach(track => remote.addTrack(track));
//         };

//         // 5️⃣ handle ICE candidates
//         pc.onicecandidate = (event) => {
//           if (event.candidate) {
//             socket.emit("ice-candidate", {
//               to: peerIdRef.current,
//               candidate: event.candidate,
//               roomId,
//             });
//           }
//         };

//         // 6️⃣ join room
//         socket.emit(userType === "teacher" ? "teacher-online" : "student-online", { username });
//         socket.emit("join-room", { roomId, username, userType });

//       } catch (err) {
//         console.error("Media init error:", err);
//       }
//     };

//     init();

//     return () => {
//       pcRef.current?.close();
//       stream?.getTracks().forEach(track => track.stop());
//     };
//   }, []);

//   const peerIdRef = useRef(null);

//   // --- signaling ---
//   useEffect(() => {
//     // peer-ready event from backend
//     socket.on("peer-ready", ({ to }) => {
//       peerIdRef.current = to;
//       setPeerReady(true);
//       createOffer();
//     });

//     socket.on("offer", async ({ sdp, from }) => {
//       peerIdRef.current = from;
//       await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//       const answer = await pcRef.current.createAnswer();
//       await pcRef.current.setLocalDescription(answer);
//       socket.emit("answer", { sdp: answer, to: from, roomId });
//     });

//     socket.on("answer", async ({ sdp }) => {
//       await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//     });

//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (candidate) {
//         try {
//           await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//         } catch (err) {
//           console.error("Add ICE candidate error:", err);
//         }
//       }
//     });

//     return () => {
//       socket.off("peer-ready");
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, []);

//   // --- create offer ---
//   const createOffer = async () => {
//     if (!peerIdRef.current) return;
//     try {
//       const offer = await pcRef.current.createOffer();
//       await pcRef.current.setLocalDescription(offer);
//       socket.emit("offer", { sdp: offer, to: peerIdRef.current, roomId });
//     } catch (err) {
//       console.error("Offer error:", err);
//     }
//   };

//   return (
//     <div style={{ display: "flex", gap: "10px" }}>
//       <div>
//         <h3>Local ({username})</h3>
//         <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px" }} />
//       </div>
//       <div>
//         <h3>Remote</h3>
//         <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px" }} />
//       </div>
//     </div>
//   );
// };

// export default VideoCall;
