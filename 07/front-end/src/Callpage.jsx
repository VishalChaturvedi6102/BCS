

// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000");

// const Callpage = () => {
//   const { roomId } = useParams(); // get roomId from URL
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [joined, setJoined] = useState(false);

//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [
//         { urls: "stun:stun.l.google.com:19302" }, // free STUN server
//       ],
//     });
//     pcRef.current = pc;

//     // Handle remote stream
//     pc.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     // Handle local ICE candidates
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//       }
//     };

//     // Get local media
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach((track) => pc.addTrack(track, stream));
//       })
//       .catch((err) => console.error("Error accessing media devices:", err));

//     // Join room
//     socket.emit("join-room", roomId);

//     // When another user joins, create offer
//     socket.on("user-joinedddd", async (userId) => {
//       if (!joined) {
//         const offer = await pc.createOffer();
//         await pc.setLocalDescription(offer);
//         socket.emit("offer", { roomId, sdp: offer });
//         setJoined(true);
//       }
//     });

//     // Handle incoming offer
//     socket.on("offer", async (data) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit("answer", { roomId, sdp: answer });
//     });

//     // Handle incoming answer
//     socket.on("answer", async (data) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//     });

//     // Handle incoming ICE candidates
//     socket.on("ice-candidate", async (data) => {
//       try {
//         await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
//       } catch (err) {
//         console.error("Error adding received ICE candidate", err);
//       }
//     });

//     // Cleanup on unmount
//     return () => {
//       pc.close();
//       socket.disconnect();
//     };
//   }, [roomId, joined]);

//   return (
//     <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
//       <div>
//         <h3>Local Video</h3>
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           style={{ width: "400px", borderRadius: "8px", marginRight: "20px" }}
//         />
//       </div>
//       <div>
//         <h3>Remote Video</h3>
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           style={{ width: "400px", borderRadius: "8px" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Callpage;




// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket"; // centralized socket instance

// const Callpage = () => {
//   const { roomId } = useParams(); // get roomId from URL
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [waiting, setWaiting] = useState(true);

//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     // handle remote stream
//     pc.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//       setWaiting(false);
//     };

//     // handle ICE candidates
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//       }
//     };

//     // get local media
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach((track) => pc.addTrack(track, stream));
//       })
//       .catch((err) => console.error("Error accessing media devices:", err));

//     // join room
//     socket.emit("join-room", roomId);

//     // when another user joins, create offer if this is first user
//     socket.on("user-joinedddd", async (userId) => {
//       if (pcRef.current && localVideoRef.current.srcObject) {
//         const offer = await pc.createOffer();
//         await pc.setLocalDescription(offer);
//         socket.emit("offer", { roomId, sdp: offer });
//       }
//     });

//     // handle incoming offer
//     socket.on("offer", async (data) => {
//       if (!pcRef.current) return;
//       await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit("answer", { roomId, sdp: answer });
//     });

//     // handle incoming answer
//     socket.on("answer", async (data) => {
//       if (!pcRef.current) return;
//       await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//     });

//     // handle incoming ICE candidates
//     socket.on("ice-candidate", async (data) => {
//       try {
//         await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
//       } catch (err) {
//         console.error("Error adding ICE candidate", err);
//       }
//     });

//     // cleanup
//     return () => {
//       pc.close();
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//       socket.off("user-joinedddd");
//     };
//   }, [roomId]);

//   return (
//     <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
//       <div style={{ marginRight: "20px" }}>
//         <h3>Local Video</h3>
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           style={{ width: "400px", borderRadius: "8px" }}
//         />
//       </div>
//       <div>
//         <h3>Remote Video</h3>
//         {waiting && <p style={{ textAlign: "center" }}>Waiting for student...</p>}
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           style={{ width: "400px", borderRadius: "8px" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Callpage;





// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket"; // centralized socket instance

// const Callpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [waiting, setWaiting] = useState(true);

//   useEffect(() => {
//     // create peer connection
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     // handle remote stream
//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//         setWaiting(false);
//       }
//     };

//     // handle ICE candidates
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//       }
//     };

//     // get local media
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
//         // only add tracks if connection is still open
//         if (pcRef.current && pcRef.current.signalingState !== "closed") {
//           stream.getTracks().forEach((track) => pc.addTrack(track, stream));
//         }
//       })
//       .catch((err) => console.error("Error accessing media devices:", err));

//     // join the room
//     socket.emit("join-room", roomId);

//     // when another user joins
//     socket.on("user-joinedddd", async () => {
//       if (
//         pcRef.current &&
//         pcRef.current.signalingState !== "closed" &&
//         localVideoRef.current?.srcObject
//       ) {
//         try {
//           const offer = await pc.createOffer();
//           await pc.setLocalDescription(offer);
//           socket.emit("offer", { roomId, sdp: offer });
//         } catch (err) {
//           console.error("Error creating offer:", err);
//         }
//       }
//     });

//     // handle incoming offer
//     socket.on("offer", async (data) => {
//       if (!pcRef.current || pcRef.current.signalingState === "closed") return;
//       try {
//         await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);
//         socket.emit("answer", { roomId, sdp: answer });
//       } catch (err) {
//         console.error("Error handling offer:", err);
//       }
//     });

//     // handle incoming answer
//     socket.on("answer", async (data) => {
//       if (!pcRef.current || pcRef.current.signalingState === "closed") return;
//       try {
//         await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//       } catch (err) {
//         console.error("Error handling answer:", err);
//       }
//     });

//     // handle incoming ICE candidate
//     socket.on("ice-candidate", async (data) => {
//       if (!pcRef.current || pcRef.current.signalingState === "closed") return;
//       try {
//         await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
//       } catch (err) {
//         console.error("Error adding ICE candidate:", err);
//       }
//     });

//     // cleanup
//     return () => {
//       if (pcRef.current) {
//         pcRef.current.close();
//       }
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//       socket.off("user-joinedddd");
//     };
//   }, [roomId]);

//   return (
//     <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
//       <div style={{ marginRight: "20px" }}>
//         <h3>Local Video</h3>
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           playsInline
//           style={{ width: "400px", borderRadius: "8px", background: "#000" }}
//         />
//       </div>
//       <div>
//         <h3>Remote Video</h3>
//         {waiting && <p style={{ textAlign: "center" }}>Waiting for other user...</p>}
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           playsInline
//           style={{ width: "400px", borderRadius: "8px", background: "#000" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Callpage;





// import React, { useEffect, useRef } from "react";
// import io from "socket.io-client";

// const Callpage = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     // ✅ Create peer connection
//     pcRef.current = new RTCPeerConnection();

//     // ✅ Setup remote video
//     pcRef.current.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     // ✅ Initialize socket
//     socketRef.current = io("http://localhost:4000");

//     // Handle offers from teacher
//     socketRef.current.on("offer", async (offer) => {
//       if (!pcRef.current) return;
//       await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
//       const answer = await pcRef.current.createAnswer();
//       await pcRef.current.setLocalDescription(answer);
//       socketRef.current.emit("answer", answer);
//     });

//     // Handle answers
//     socketRef.current.on("answer", async (answer) => {
//       if (!pcRef.current) return;
//       await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
//     });

//     // Handle ICE candidates
//     socketRef.current.on("candidate", async (candidate) => {
//       try {
//         if (pcRef.current) {
//           await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//         }
//       } catch (err) {
//         console.error("Error adding ICE candidate", err);
//       }
//     });

//     // Send ICE candidates
//     pcRef.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socketRef.current.emit("candidate", event.candidate);
//       }
//     };

//     // ✅ Get media stream with FIX
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }

//         // 🛠️ FIX: only add tracks if connection is still open
//         if (pcRef.current && pcRef.current.signalingState !== "closed") {
//           stream.getTracks().forEach((track) => {
//             try {
//               pcRef.current.addTrack(track, stream);
//             } catch (err) {
//               console.warn("Skipped adding track, connection closed:", err);
//             }
//           });
//         }
//       })
//       .catch((err) => console.error("Error accessing media devices:", err));

//     // Cleanup on unmount
//     return () => {
//       if (pcRef.current) {
//         pcRef.current.close();
//         pcRef.current = null;
//       }
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, []);

//   return (
//     <div className="call-container">
//       <h2>Video Call</h2>
//       <video
//         ref={localVideoRef}
//         autoPlay
//         playsInline
//         muted
//         style={{ width: "300px", border: "2px solid green" }}
//       />
//       <video
//         ref={remoteVideoRef}
//         autoPlay
//         playsInline
//         style={{ width: "300px", border: "2px solid red" }}
//       />
//     </div>
//   );
// };

// export default Callpage;






// import React, { useEffect, useRef } from "react";
// import { socket } from "./socket";

// const Callpage = ({ roomId }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);

//   // useEffect(() => {
//   //   const pc = new RTCPeerConnection({
//   //     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//   //   });
//   //   pcRef.current = pc;

//   //   pc.ontrack = (event) => {
//   //     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//   //   };

//   //   pc.onicecandidate = (event) => {
//   //     if (event.candidate) {
//   //       socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//   //     }
//   //   };

//   //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//   //     .then((stream) => {
//   //       if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//   //       stream.getTracks().forEach(track => pc.addTrack(track, stream));
//   //     });

//   //   // Listen for answers from students
//   //   socket.on("answer", async ({ sdp }) => {
//   //     await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//   //   });

//   //   // Start call button or automatic offer
//   //   const startCall = async () => {
//   //     const offer = await pc.createOffer();
//   //     await pc.setLocalDescription(offer);
//   //     socket.emit("offer", { roomId, sdp: offer });
//   //   };

//   //   // auto-start for demo (or trigger with a button)
//   //   startCall();

//   //   return () => {
//   //     pc.close();
//   //     socket.off("answer");
//   //   };
//   // }, [roomId]);





// useEffect(() => {
//   const pc = new RTCPeerConnection({
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//   });
//   pcRef.current = pc;

//   // Show remote video
//   pc.ontrack = (event) => {
//     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//   };

//   // Send ICE candidates to student
//   pc.onicecandidate = (event) => {
//     if (event.candidate) {
//       socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//     }
//   };

//   // Get teacher camera & mic
//   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//     .then((stream) => {
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//       stream.getTracks().forEach(track => pc.addTrack(track, stream));
//     });

//   // Join room
//   socket.emit("join-room", roomId);

//   // Listen for answer from student
//   socket.on("answer", async ({ sdp }) => {
//     await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//   });

//   // Listen for ICE from student
//   socket.on("ice-candidate", async ({ candidate }) => {
//     await pc.addIceCandidate(new RTCIceCandidate(candidate));
//   });

//   // Create offer to student
//   const startCall = async () => {
//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);
//     socket.emit("offer", { roomId, sdp: offer });
//   };

//   startCall();

//   return () => {
//     pc.close();
//     socket.off("answer");
//     socket.off("ice-candidate");
//   };
// }, [roomId]);







//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       <video ref={localVideoRef} autoPlay muted style={{ width: "400px" }} />
//       <video ref={remoteVideoRef} autoPlay style={{ width: "400px" }} />
//     </div>
//   );
// };

// export default Callpage;






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
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     // Show remote video
//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     // Send ICE candidates to student
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//       }
//     };

//     // Get teacher camera & mic
//     const initMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));
//       } catch (err) {
//         setError("Could not access camera/microphone. Please allow permissions.");
//         console.error(err);
//       }
//     };

//     initMedia();

//     // Join room
//     socket.emit("join-room", roomId);

//     // Listen for answer from student
//     socket.on("answer", async ({ sdp }) => {
//       try {
//         await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//       } catch (err) {
//         console.error("Error setting remote description:", err);
//       }
//     });

//     // Listen for ICE from student
//     socket.on("ice-candidate", async ({ candidate }) => {
//       try {
//         await pc.addIceCandidate(new RTCIceCandidate(candidate));
//       } catch (err) {
//         console.error("Error adding ICE candidate:", err);
//       }
//     });

//     return () => {
//       pc.close();
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

//   const startCall = async () => {
//     try {
//       const pc = pcRef.current;
//       if (!pc) return;

//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       socket.emit("offer", { roomId, sdp: offer });
//       setCallStarted(true);
//     } catch (err) {
//       console.error("Error starting call:", err);
//       setError("Failed to start call. Try again.");
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
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



import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Callpage = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startCall = async () => {
      console.log("📡 Starting Teacher Call...");
      peerConnectionRef.current = new RTCPeerConnection();

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        stream.getTracks().forEach(track => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        peerConnectionRef.current.ontrack = event => {
          if (remoteVideoRef.current && event.streams[0]) {
            console.log("✅ Remote stream received");
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };
      } catch (error) {
        console.error("❌ Error accessing media devices:", error);
      }
    };

    startCall();
    return () => {
      console.log("♻️ Cleaning up Teacher Call...");
      endCall(false);
    };
  }, []);

  const endCall = (redirect = true) => {
    console.log("📴 Ending Teacher Call...");
    if (peerConnectionRef.current) {
      peerConnectionRef.current.getSenders().forEach(sender => sender.track?.stop());
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      remoteVideoRef.current.srcObject = null;
    }
    if (redirect) navigate("/teachercalendar");
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">🎥 Teacher Call Page</h2>
      </div>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-center fw-bold">Your Video</div>
            <div className="card-body p-0">
              <video ref={localVideoRef} autoPlay muted playsInline className="w-100 rounded" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-center fw-bold">Student Video</div>
            <div className="card-body p-0">
              <video ref={remoteVideoRef} autoPlay playsInline className="w-100 rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button onClick={() => endCall(true)} className="btn btn-danger btn-lg rounded-pill shadow">
          End Call
        </button>
      </div>
    </div>
  );
};

export default Callpage;


// src/pages/Callpage.js
// import React, { useEffect, useRef } from "react";
// import { socket } from "./socket";
// import { getCameraStream } from "./getCameraStream";

// const Callpage = () => {
//   const myVideoRef = useRef(null);
//   const peerVideoRef = useRef(null);
//   const peerConnectionRef = useRef(null);

//   useEffect(() => {
//     let stream;

//     const startCall = async () => {
//       stream = await getCameraStream();
//       if (myVideoRef.current) {
//         myVideoRef.current.srcObject = stream;
//       }

//       peerConnectionRef.current = new RTCPeerConnection();

//       // Send tracks
//       stream.getTracks().forEach((track) => {
//         peerConnectionRef.current.addTrack(track, stream);
//       });

//       // Receive remote tracks
//       peerConnectionRef.current.ontrack = (event) => {
//         if (peerVideoRef.current) {
//           peerVideoRef.current.srcObject = event.streams[0];
//         }
//       };

//       // ICE handling
//       peerConnectionRef.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit("ice-candidate", event.candidate);
//         }
//       };

//       // Socket listeners
//       socket.on("offer", async (offer) => {
//         await peerConnectionRef.current.setRemoteDescription(offer);
//         const answer = await peerConnectionRef.current.createAnswer();
//         await peerConnectionRef.current.setLocalDescription(answer);
//         socket.emit("answer", answer);
//       });

//       socket.on("answer", async (answer) => {
//         await peerConnectionRef.current.setRemoteDescription(answer);
//       });

//       socket.on("ice-candidate", async (candidate) => {
//         try {
//           await peerConnectionRef.current.addIceCandidate(candidate);
//         } catch (err) {
//           console.error("Error adding received ice candidate", err);
//         }
//       });
//     };

//     startCall();

//     return () => {
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//       stream?.getTracks().forEach((t) => t.stop());
//       peerConnectionRef.current?.close();
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center">
//       <video ref={myVideoRef} autoPlay playsInline muted className="w-1/3" />
//       <video ref={peerVideoRef} autoPlay playsInline className="w-1/3" />
//     </div>
//   );
// };

// export default Callpage;



// import React, { useEffect, useRef } from "react";
// import { socket } from "./socket";
// import { getCameraStream, cleanupCameraStream } from "./getCameraStream";

// const Callpage = () => {
//   const myVideoRef = useRef(null);
//   const peerVideoRef = useRef(null);
//   const peerConnectionRef = useRef(null);
//   let localStream;

//   useEffect(() => {
//     const startCall = async () => {
//       try {
//         localStream = await getCameraStream();
//         if (myVideoRef.current) {
//           myVideoRef.current.srcObject = localStream;
//         }

//         peerConnectionRef.current = new RTCPeerConnection();

//         // Send tracks
//         localStream.getTracks().forEach((track) => {
//           peerConnectionRef.current.addTrack(track, localStream);
//         });

//         // Remote tracks
//         peerConnectionRef.current.ontrack = (event) => {
//           if (peerVideoRef.current) {
//             peerVideoRef.current.srcObject = event.streams[0];
//           }
//         };

//         // ICE candidates
//         peerConnectionRef.current.onicecandidate = (event) => {
//           if (event.candidate) {
//             socket.emit("ice-candidate", event.candidate);
//           }
//         };

//         // Socket listeners
//         socket.on("offer", async (offer) => {
//           await peerConnectionRef.current.setRemoteDescription(offer);
//           const answer = await peerConnectionRef.current.createAnswer();
//           await peerConnectionRef.current.setLocalDescription(answer);
//           socket.emit("answer", answer);
//         });

//         socket.on("answer", async (answer) => {
//           await peerConnectionRef.current.setRemoteDescription(answer);
//         });

//         socket.on("ice-candidate", async (candidate) => {
//           try {
//             await peerConnectionRef.current.addIceCandidate(candidate);
//           } catch (err) {
//             console.error("Error adding received ice candidate", err);
//           }
//         });
//       } catch (err) {
//         console.error("❌ Callpage startCall failed:", err);
//       }
//     };

//     startCall();

//     return () => {
//       // Clean listeners
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");

//       // Stop cloned stream (but not global shared stream)
//       localStream?.getTracks().forEach((t) => t.stop());

//       // Close peer
//       peerConnectionRef.current?.close();
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center">
//       <video ref={myVideoRef} autoPlay playsInline muted className="w-1/3" />
//       <video ref={peerVideoRef} autoPlay playsInline className="w-1/3" />
//     </div>
//   );
// };

// export default Callpage;



// // src/pages/Callpage.jsx
// import React, { useEffect, useRef } from "react";
// import { socket } from "./socket";
// import { getCameraStream } from "./getCameraStream";

// const Callpage = () => {
//   const localVideoRef = useRef(null);

//   useEffect(() => {
//     let localStream;

//     const startStream = async () => {
//       try {
//         localStream = await getCameraStream();
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = localStream;
//         }

//         socket.emit("student-online", "teacher"); // example identity
//       } catch (err) {
//         console.error("Error accessing camera/mic:", err);
//       }
//     };

//     startStream();

//     return () => {
//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Teacher Call Page</h2>
//       <video ref={localVideoRef} autoPlay playsInline muted />
//     </div>
//   );
// };

// export default Callpage;








// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket";

// const Callpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [callStarted, setCallStarted] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
//     pcRef.current = pc;

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate) socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//     };

//     socket.on("answer", async ({ sdp }) => {
//       try {
//         if (pcRef.current && pcRef.current.signalingState !== "closed") {
//           await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//         }
//       } catch (err) {
//         console.error("Error setting remote description:", err);
//       }
//     });

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
//       if (pcRef.current && pcRef.current.signalingState !== "closed") pcRef.current.close();
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

//   const startCall = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//       stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));

//       const offer = await pcRef.current.createOffer();
//       await pcRef.current.setLocalDescription(offer);
//       socket.emit("offer", { roomId, sdp: offer });

//       setCallStarted(true);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to start call. Check camera/microphone permissions.");
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
//       {!callStarted && <button className="btn btn-primary mt-3" onClick={startCall}>Start Call</button>}
//     </div>
//   );
// };

// export default Callpage;





// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket";

// const Callpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
//     });
//     pcRef.current = pc;

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate && pcRef.current.signalingState !== "closed") {
//         socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//       }
//     };

//     // Handle answer from student
//     socket.on("answer", async ({ sdp }) => {
//       if (!pcRef.current || pcRef.current.signalingState === "closed") return;
//       try {
//         await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//       } catch (err) {
//         console.error("Error setting remote description:", err);
//       }
//     });

//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (!candidate || !pcRef.current || pcRef.current.signalingState === "closed") return;
//       try { await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate)); }
//       catch (err) { console.error(err); }
//     });

//     // Automatically start call
//     startCall();

//     return () => {
//       if (pcRef.current && pcRef.current.signalingState !== "closed") pcRef.current.close();
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

//   const startCall = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//       if (pcRef.current && pcRef.current.signalingState !== "closed") {
//         stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
//       }

//       const offer = await pcRef.current.createOffer();
//       await pcRef.current.setLocalDescription(offer);
//       socket.emit("offer", { roomId, sdp: offer });

//     } catch (err) {
//       console.error(err);
//       setError("Failed to start call. Check camera/microphone permissions.");
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
//     </div>
//   );
// };

// export default Callpage;





// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket";
// import { useMediaStream } from "./useMediaStream";

// const Callpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [callStarted, setCallStarted] = useState(false);
//   const { getStream } = useMediaStream();

//   useEffect(() => {
//     const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
//     pcRef.current = pc;

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate) socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//     };

//     socket.on("answer", async ({ sdp }) => {
//       if (pcRef.current && pcRef.current.signalingState !== "closed") {
//         await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//       }
//     });

//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (pcRef.current && pcRef.current.signalingState !== "closed") {
//         await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//       }
//     });

//     return () => {
//       if (pcRef.current && pcRef.current.signalingState !== "closed") pcRef.current.close();
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

//   const startCall = async () => {
//     try {
//       const stream = await getStream();
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//       stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));

//       const offer = await pcRef.current.createOffer();
//       await pcRef.current.setLocalDescription(offer);
//       socket.emit("offer", { roomId, sdp: offer });
//       setCallStarted(true);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to start call. Check camera/mic permissions.");
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "30px" }}>
//       <div>
//         <h5>Your Video</h5>
//         <video ref={localVideoRef} autoPlay muted style={{ width: "400px", borderRadius: "8px" }} />
//       </div>
//       <div>
//         <h5>Student Video</h5>
//         <video ref={remoteVideoRef} autoPlay style={{ width: "400px", borderRadius: "8px" }} />
//       </div>
//       {!callStarted && <button className="btn btn-primary mt-3" onClick={startCall}>Start Call</button>}
//     </div>
//   );
// };

// export default Callpage;





// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket";
// import { useMediaStream } from "./useMediaStream";

// const Callpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [callStarted, setCallStarted] = useState(false);
//   const { getStream } = useMediaStream();

//   useEffect(() => {
//     const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
//     pcRef.current = pc;

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate) socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//     };

//     socket.on("answer", async ({ sdp }) => {
//       if (pcRef.current && pcRef.current.signalingState !== "closed") {
//         await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//       }
//     });

//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (pcRef.current && pcRef.current.signalingState !== "closed") {
//         await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//       }
//     });

//     return () => {
//       if (pcRef.current && pcRef.current.signalingState !== "closed") pcRef.current.close();
//       socket.off("answer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId, getStream]);

//   const startCall = async () => {
//     try {
//       const stream = await getStream();
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;

//       // Add tracks only once
//       if (pcRef.current.getSenders().length === 0) {
//         stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
//       }

//       const offer = await pcRef.current.createOffer();
//       await pcRef.current.setLocalDescription(offer);
//       socket.emit("offer", { roomId, sdp: offer });
//       setCallStarted(true);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to start call. Check camera/mic permissions.");
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "30px" }}>
//       <div>
//         <h5>Your Video</h5>
//         <video ref={localVideoRef} autoPlay muted style={{ width: "400px", borderRadius: "8px" }} />
//       </div>
//       <div>
//         <h5>Student Video</h5>
//         <video ref={remoteVideoRef} autoPlay style={{ width: "400px", borderRadius: "8px" }} />
//       </div>
//       {!callStarted && <button className="btn btn-primary mt-3" onClick={startCall}>Start Call</button>}
//     </div>
//   );
// };

// export default Callpage;
