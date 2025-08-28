


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

//   const query = new URLSearchParams(location.search);
//   const roomId = query.get("roomId");
//   const userType = query.get("type");
//   const userName = query.get("name");

//   useEffect(() => {
//     let localStream;

//     const pc = new RTCPeerConnection({
//       iceServers: [
//         { urls: "stun:stun.l.google.com:19302" },
//         // Add TURN server if available for better connectivity
//         // { urls: "turn:TURN_SERVER_URL:3478", username: "user", credential: "pass" }
//       ],
//     });
//     pcRef.current = pc;

//     // Local stream
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         localStream = stream;
//         localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));

//         // Notify server that this peer is ready after getting local media
//         socket.emit("peer-ready", { roomId, userType, username: userName });
//       })
//       .catch(err => {
//         console.error("Media error:", err);
//         setStatus("Failed to access camera/mic.");
//       });

//     // Remote stream
//     pc.ontrack = event => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     // ICE candidates
//     pc.onicecandidate = event => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { candidate: event.candidate, roomId });
//       }
//     };

//     // Join room
//     socket.emit("join-room", { roomId, username: userName, userType });

//     // When another peer is ready, teacher creates offer
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






