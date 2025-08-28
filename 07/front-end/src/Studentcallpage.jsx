



// import React, { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const StudentCallpage = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnectionRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const startCall = async () => {
//       console.log("📡 Starting Student Call...");
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
//       console.log("♻️ Cleaning up Student Call...");
//       endCall(false);
//     };
//   }, []);

//   const endCall = (redirect = true) => {
//     console.log("📴 Ending Student Call...");
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
//     if (redirect) navigate("/dashboard");
//   };

//   return (
//     <div className="container py-4">
//       <div className="text-center mb-4">
//         <h2 className="fw-bold text-success">🎓 Student Call Page</h2>
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
//             <div className="card-header text-center fw-bold">Teacher Video</div>
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

// export default StudentCallpage;



