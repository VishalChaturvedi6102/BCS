

// import React, { useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket"; // shared socket instance

// const Studentcallpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);

//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     pc.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//       }
//     };

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach((track) => pc.addTrack(track, stream));
//       })
//       .catch((err) => console.error("Error accessing media devices:", err));

//     socket.emit("join-room", roomId);

//     socket.on("offer", async (data) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit("answer", { roomId, sdp: answer });
//     });

//     socket.on("answer", async (data) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//     });

//     socket.on("ice-candidate", async (data) => {
//       try {
//         await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
//       } catch (err) {
//         console.error("Error adding received ICE candidate", err);
//       }
//     });

//     return () => {
//       pc.close();
//     };
//   }, [roomId]);

//   return (
//     <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
//       <div>
//         <h3>Local Video</h3>
//         <video ref={localVideoRef} autoPlay muted style={{ width: "400px", borderRadius: "8px", marginRight: "20px" }} />
//       </div>
//       <div>
//         <h3>Remote Video</h3>
//         <video ref={remoteVideoRef} autoPlay style={{ width: "400px", borderRadius: "8px" }} />
//       </div>
//     </div>
//   );
// };

// export default Studentcallpage;






// import React, { useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket"; // shared socket instance

// const Studentcallpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);

//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     // Show remote video
//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     // Send ICE candidates to server
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//       }
//     };

//     // Get user media
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
//         stream.getTracks().forEach((track) => {
//           if (pc.signalingState !== "closed") {
//             pc.addTrack(track, stream);
//           }
//         });
//       })
//       .catch((err) => console.error("Error accessing media devices:", err));

//     // Join the room
//     socket.emit("join-room", roomId);

//     // Handle offer from teacher
//     socket.on("offer", async (data) => {
//       if (pc.signalingState === "closed") return;
//       try {
//         await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);
//         socket.emit("answer", { roomId, sdp: answer });
//       } catch (err) {
//         console.error("Error handling offer:", err);
//       }
//     });

//     // Handle answer (in case student starts call later)
//     socket.on("answer", async (data) => {
//       if (pc.signalingState === "closed") return;
//       try {
//         await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//       } catch (err) {
//         console.error("Error handling answer:", err);
//       }
//     });

//     // Handle ICE candidates from teacher
//     socket.on("ice-candidate", async (data) => {
//       if (pc.signalingState === "closed") return;
//       try {
//         await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
//       } catch (err) {
//         console.error("Error adding received ICE candidate", err);
//       }
//     });

//     // Cleanup
//     return () => {
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//       if (pc && pc.connectionState !== "closed") {
//         pc.close();
//       }
//     };
//   }, [roomId]);

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

// export default Studentcallpage;



// import React, { useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket";




// const Studentcallpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);

//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//       }
//     };

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));
//       });

//     // Join room
//     socket.emit("join-room", roomId);

//     // Handle offer from teacher
//     socket.on("offer", async ({ sdp }) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit("answer", { roomId, sdp: answer });
//     });

//     // Handle ICE candidates
//     socket.on("ice-candidate", async ({ candidate }) => {
//       await pc.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     return () => {
//       pc.close();
//       socket.off("offer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       <video ref={localVideoRef} autoPlay muted style={{ width: "400px" }} />
//       <video ref={remoteVideoRef} autoPlay style={{ width: "400px" }} />
//     </div>
//   );
// };

// export default Studentcallpage;






// import React, { useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket";

// const Studentcallpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);

//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     pcRef.current = pc;

//     // Display remote video stream
//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     // Send ICE candidates to teacher
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//       }
//     };

//     // Get student camera & mic
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));
//       })
//       .catch((err) => console.error("Error accessing media devices:", err));

//     // Join the room
//     socket.emit("join-room", roomId);

//     // Listen for teacher's offer
//     socket.on("offer", async ({ sdp }) => {
//       if (!pc) return;
//       await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit("answer", { roomId, sdp: answer });
//     });

//     // Listen for ICE candidates from teacher
//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (!candidate) return;
//       try {
//         await pc.addIceCandidate(new RTCIceCandidate(candidate));
//       } catch (err) {
//         console.error("Error adding ICE candidate:", err);
//       }
//     });

//     // Cleanup on unmount
//     return () => {
//       pc.close();
//       socket.off("offer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

//   return (
//     <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "50px" }}>
//       <div>
//         <h4 style={{ textAlign: "center" }}>Your Video</h4>
//         <video ref={localVideoRef} autoPlay muted style={{ width: "400px", borderRadius: "10px", backgroundColor: "black" }} />
//       </div>
//       <div>
//         <h4 style={{ textAlign: "center" }}>Teacher Video</h4>
//         <video ref={remoteVideoRef} autoPlay style={{ width: "400px", borderRadius: "10px", backgroundColor: "black" }} />
//       </div>
//     </div>
//   );
// };

// export default Studentcallpage;




import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const StudentCallpage = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startCall = async () => {
      console.log("📡 Starting Student Call...");
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
      console.log("♻️ Cleaning up Student Call...");
      endCall(false);
    };
  }, []);

  const endCall = (redirect = true) => {
    console.log("📴 Ending Student Call...");
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
    if (redirect) navigate("/dashboard");
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-success">🎓 Student Call Page</h2>
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
            <div className="card-header text-center fw-bold">Teacher Video</div>
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

export default StudentCallpage;



// src/pages/StudentCallpage.js
// import React, { useEffect, useRef } from "react";
// import { socket } from "./socket";
// import { getCameraStream } from "./getCameraStream";

// const StudentCallpage = () => {
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

//       // Remote stream
//       peerConnectionRef.current.ontrack = (event) => {
//         if (peerVideoRef.current) {
//           peerVideoRef.current.srcObject = event.streams[0];
//         }
//       };

//       peerConnectionRef.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit("ice-candidate", event.candidate);
//         }
//       };

//       // Initiate call → create offer
//       const offer = await peerConnectionRef.current.createOffer();
//       await peerConnectionRef.current.setLocalDescription(offer);
//       socket.emit("offer", offer);

//       // Handle signals
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

// export default StudentCallpage;



// import React, { useEffect, useRef } from "react";
// import { socket } from "./socket";
// import { getCameraStream } from "./getCameraStream";

// const StudentCallpage = () => {
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

//         // ICE handling
//         peerConnectionRef.current.onicecandidate = (event) => {
//           if (event.candidate) {
//             socket.emit("ice-candidate", event.candidate);
//           }
//         };

//         // Create offer
//         const offer = await peerConnectionRef.current.createOffer();
//         await peerConnectionRef.current.setLocalDescription(offer);
//         socket.emit("offer", offer);

//         // Handle answer
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
//         console.error("❌ StudentCallpage startCall failed:", err);
//       }
//     };

//     startCall();

//     return () => {
//       // Clean listeners
//       socket.off("answer");
//       socket.off("ice-candidate");

//       // Stop cloned stream
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

// export default StudentCallpage;


// // src/pages/StudentCallpage.jsx
// import React, { useEffect, useRef } from "react";
// import { socket } from "./socket";
// import { getCameraStream } from "./getCameraStream";

// const StudentCallpage = () => {
//   const localVideoRef = useRef(null);

//   useEffect(() => {
//     let localStream;

//     const startStream = async () => {
//       try {
//         localStream = await getCameraStream();
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = localStream;
//         }

//         socket.emit("student-online", "student"); // example identity
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
//       <h2>Student Call Page</h2>
//       <video ref={localVideoRef} autoPlay playsInline muted />
//     </div>
//   );
// };

// export default StudentCallpage;






// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket";

// const StudentCallpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [waiting, setWaiting] = useState(true);

//   useEffect(() => {
//     const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
//     pcRef.current = pc;

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate) socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//     };

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));
//       })
//       .catch(err => console.error("Error accessing media devices:", err));

//     socket.emit("join-room", roomId);

//     socket.on("offer", async ({ sdp }) => {
//       setWaiting(false); // Teacher started call
//       await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//       const answer = await pcRef.current.createAnswer();
//       await pcRef.current.setLocalDescription(answer);
//       socket.emit("answer", { roomId, sdp: answer });
//     });

//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (!candidate) return;
//       try { await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate)); }
//       catch (err) { console.error(err); }
//     });

//     return () => {
//       pc.close();
//       socket.off("offer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

//   return (
//     <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "50px" }}>
//       {waiting && <h4>Waiting for teacher to start the call...</h4>}
//       <div>
//         <h4 style={{ textAlign: "center" }}>Your Video</h4>
//         <video ref={localVideoRef} autoPlay muted style={{ width: "400px", borderRadius: "10px", backgroundColor: "black" }} />
//       </div>
//       <div>
//         <h4 style={{ textAlign: "center" }}>Teacher Video</h4>
//         <video ref={remoteVideoRef} autoPlay style={{ width: "400px", borderRadius: "10px", backgroundColor: "black" }} />
//       </div>
//     </div>
//   );
// };

// export default StudentCallpage;





// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket";

// const StudentCallpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [waiting, setWaiting] = useState(true);

//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
//     });
//     pcRef.current = pc;

//     // Remote track
//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     // ICE candidates
//     pc.onicecandidate = (event) => {
//       if (event.candidate && pcRef.current.signalingState !== "closed") {
//         socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//       }
//     };

//     // Get user media
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//         if (pcRef.current.signalingState !== "closed") {
//           stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
//         }
//       })
//       .catch(err => console.error("Error accessing media devices:", err));

//     // Join room
//     socket.emit("join-room", roomId);

//     // Handle offer from teacher
//     socket.on("offer", async ({ sdp }) => {
//       setWaiting(false);
//       if (!pcRef.current || pcRef.current.signalingState === "closed") return;

//       await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//       const answer = await pcRef.current.createAnswer();
//       await pcRef.current.setLocalDescription(answer);
//       socket.emit("answer", { roomId, sdp: answer });
//     });

//     // Handle incoming ICE candidates
//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (!candidate || !pcRef.current || pcRef.current.signalingState === "closed") return;
//       try { await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate)); }
//       catch (err) { console.error(err); }
//     });

//     // Cleanup
//     return () => {
//       if (pcRef.current && pcRef.current.signalingState !== "closed") pcRef.current.close();
//       socket.off("offer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

//   return (
//     <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "50px" }}>
//       {waiting && <h4>Waiting for teacher to start the call...</h4>}
//       <div>
//         <h4 style={{ textAlign: "center" }}>Your Video</h4>
//         <video ref={localVideoRef} autoPlay muted style={{ width: "400px", borderRadius: "10px", backgroundColor: "black" }} />
//       </div>
//       <div>
//         <h4 style={{ textAlign: "center" }}>Teacher Video</h4>
//         <video ref={remoteVideoRef} autoPlay style={{ width: "400px", borderRadius: "10px", backgroundColor: "black" }} />
//       </div>
//     </div>
//   );
// };

// export default StudentCallpage;








// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket";
// import { useMediaStream } from "./useMediaStream";

// const StudentCallpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [waiting, setWaiting] = useState(true);
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

//     socket.emit("join-room", roomId);

//     socket.on("offer", async ({ sdp }) => {
//       setWaiting(false);
//       const stream = await getStream();
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//       stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));

//       await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//       const answer = await pcRef.current.createAnswer();
//       await pcRef.current.setLocalDescription(answer);
//       socket.emit("answer", { roomId, sdp: answer });
//     });

//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (!candidate) return;
//       if (pcRef.current && pcRef.current.signalingState !== "closed") {
//         await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//       }
//     });

//     return () => {
//       if (pcRef.current && pcRef.current.signalingState !== "closed") pcRef.current.close();
//       socket.off("offer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId]);

//   return (
//     <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "50px" }}>
//       {waiting && <h4>Waiting for teacher to start the call...</h4>}
//       <div>
//         <h4 style={{ textAlign: "center" }}>Your Video</h4>
//         <video ref={localVideoRef} autoPlay muted style={{ width: "400px", borderRadius: "10px", backgroundColor: "black" }} />
//       </div>
//       <div>
//         <h4 style={{ textAlign: "center" }}>Teacher Video</h4>
//         <video ref={remoteVideoRef} autoPlay style={{ width: "400px", borderRadius: "10px", backgroundColor: "black" }} />
//       </div>
//     </div>
//   );
// };

// export default StudentCallpage;



// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "./socket";
// import { useMediaStream } from "./useMediaStream";

// const StudentCallpage = () => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const pcRef = useRef(null);
//   const [waiting, setWaiting] = useState(true);
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

//     socket.emit("join-room", roomId);

//     socket.on("offer", async ({ sdp }) => {
//       setWaiting(false);

//       const stream = await getStream();
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;

//       if (pcRef.current.getSenders().length === 0) {
//         stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
//       }

//       await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
//       const answer = await pcRef.current.createAnswer();
//       await pcRef.current.setLocalDescription(answer);
//       socket.emit("answer", { roomId, sdp: answer });
//     });

//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (!candidate) return;
//       if (pcRef.current && pcRef.current.signalingState !== "closed") {
//         await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//       }
//     });

//     return () => {
//       if (pcRef.current && pcRef.current.signalingState !== "closed") pcRef.current.close();
//       socket.off("offer");
//       socket.off("ice-candidate");
//     };
//   }, [roomId, getStream]);

//   return (
//     <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "50px" }}>
//       {waiting && <h4>Waiting for teacher to start the call...</h4>}
//       <div>
//         <h4 style={{ textAlign: "center" }}>Your Video</h4>
//         <video ref={localVideoRef} autoPlay muted style={{ width: "400px", borderRadius: "10px", backgroundColor: "black" }} />
//       </div>
//       <div>
//         <h4 style={{ textAlign: "center" }}>Teacher Video</h4>
//         <video ref={remoteVideoRef} autoPlay style={{ width: "400px", borderRadius: "10px", backgroundColor: "black" }} />
//       </div>
//     </div>
//   );
// };

// export default StudentCallpage;
