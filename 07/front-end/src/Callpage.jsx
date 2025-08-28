









// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { socket } from "./socket";

// const Callpage = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [callStarted, setCallStarted] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Create PeerConnection once
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     // Display remote video
//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     // Send ICE candidates to student
//     pc.onicecandidate = (event) => {
//       if (event.candidate) socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//     };

//     // Join room
//     socket.emit("join-room", roomId);

//     // Listen for student answers
//     socket.on("answer", async ({ sdp }) => {
//       try {
//         if (pcRef.current && pcRef.current.signalingState !== "closed") {
//           await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//         }
//       } catch (err) {
//         console.error("Error setting remote description:", err);
//       }
//     });

//     // Listen for ICE candidates from student
//     socket.on("ice-candidate", async ({ candidate }) => {
//       try {
//         if (pcRef.current && pcRef.current.signalingState !== "closed") {
//           await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//         }
//       } catch (err) {
//         console.error("Error adding ICE candidate:", err);
//       }
//     });

//     return () => {
//       // Cleanup safely
//       if (pcRef.current && pcRef.current.signalingState !== "closed") {
//         pcRef.current.close();
//       }
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

//   const startCall = async () => {
//     try {
//       // Get user media
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;

//       // Add tracks only if PeerConnection is open
//       if (pcRef.current && pcRef.current.signalingState !== "closed") {
//         stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));

//         // Create and send offer
//         const offer = await pcRef.current.createOffer();
//         await pcRef.current.setLocalDescription(offer);
//         socket.emit("offer", { roomId, sdp: offer });

//         setCallStarted(true);
//       } else {
//         setError("PeerConnection is closed. Cannot start call.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to access camera/microphone or start call.");
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "30px" }}>
//       {error && <p className="text-danger">{error}</p>}

//       <div>
//         <h5>Your Video</h5>
//         <video ref={localVideoRef} autoPlay muted style={{ width: "400px", borderRadius: "8px" }} />
//       </div>

//       <div>
//         <h5>Student Video</h5>
//         <video ref={remoteVideoRef} autoPlay style={{ width: "400px", borderRadius: "8px" }} />
//       </div>

//       {!callStarted && (
//         <button className="btn btn-primary mt-3" onClick={startCall}>
//           Start Call
//         </button>
//       )}
//     </div>
//   );
// };

// export default Callpage;














































// import React, { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const Callpage = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnectionRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const startCall = async () => {
//       console.log("📡 Starting Teacher Call...");
//       peerConnectionRef.current = new RTCPeerConnection();

//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         if (localVideoRef.current) localVideoRef.current.srcObject = stream;

//         stream.getTracks().forEach(track => {
//           peerConnectionRef.current.addTrack(track, stream);
//         });

//         peerConnectionRef.current.ontrack = event => {
//           if (remoteVideoRef.current && event.streams[0]) {
//             console.log("✅ Remote stream received");
//             remoteVideoRef.current.srcObject = event.streams[0];
//           }
//         };
//       } catch (error) {
//         console.error("❌ Error accessing media devices:", error);
//       }
//     };

//     startCall();
//     return () => {
//       console.log("♻️ Cleaning up Teacher Call...");
//       endCall(false);
//     };
//   }, []);

//   const endCall = (redirect = true) => {
//     console.log("📴 Ending Teacher Call...");
//     if (peerConnectionRef.current) {
//       peerConnectionRef.current.getSenders().forEach(sender => sender.track?.stop());
//       peerConnectionRef.current.close();
//       peerConnectionRef.current = null;
//     }
//     if (localVideoRef.current?.srcObject) {
//       localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       localVideoRef.current.srcObject = null;
//     }
//     if (remoteVideoRef.current?.srcObject) {
//       remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       remoteVideoRef.current.srcObject = null;
//     }
//     if (redirect) navigate("/teachercalendar");
//   };

//   return (
//     <div className="container py-4">
//       <div className="text-center mb-4">
//         <h2 className="fw-bold text-primary">🎥 Teacher Call Page</h2>
//       </div>
//       <div className="row g-3">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-header text-center fw-bold">Your Video</div>
//             <div className="card-body p-0">
//               <video ref={localVideoRef} autoPlay muted playsInline className="w-100 rounded" />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-header text-center fw-bold">Student Video</div>
//             <div className="card-body p-0">
//               <video ref={remoteVideoRef} autoPlay playsInline className="w-100 rounded" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="text-center mt-4">
//         <button onClick={() => endCall(true)} className="btn btn-danger btn-lg rounded-pill shadow">
//           End Call
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Callpage;


