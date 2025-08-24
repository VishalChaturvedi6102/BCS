

// VideoCallPage.jsx (Combined Teacher/Student Component)
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "./socket";

const VideoCallPage = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const dataChannelRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const reconnectAttemptRef = useRef(0);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const userType = searchParams.get("type") || "teacher";
  const userName = searchParams.get("name") || userType;
  
  const [callStatus, setCallStatus] = useState("Connecting...");
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [bandwidth, setBandwidth] = useState("high"); // 'high', 'medium', 'low'
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // TURN server configuration (replace with your actual TURN server credentials)
  const pcConfig = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { 
        urls: "turn:your-turn-server.com:3478",
        username: "your-username",
        credential: "your-credential"
      }
    ],
    iceTransportPolicy: "all" // Use relay if needed
  };

  // Bandwidth constraints for different quality levels
  const bandwidthConstraints = {
    high: {
      video: { width: 1280, height: 720, frameRate: 30, bitrate: 2500 },
      audio: { bitrate: 128 }
    },
    medium: {
      video: { width: 640, height: 480, frameRate: 20, bitrate: 1000 },
      audio: { bitrate: 96 }
    },
    low: {
      video: { width: 320, height: 240, frameRate: 15, bitrate: 500 },
      audio: { bitrate: 64 }
    }
  };

  useEffect(() => {
    const initializeCall = async () => {
      console.log(`📡 Starting ${userType} Call in room:`, roomId);
      
      // Join the room
      socket.emit("join-room", roomId);
      
      try {
        // Get local media stream with current bandwidth settings
        const constraints = {
          video: bandwidthConstraints[bandwidth].video,
          audio: bandwidthConstraints[bandwidth].audio
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Create peer connection
        peerConnectionRef.current = new RTCPeerConnection(pcConfig);

        // Add local tracks to peer connection
        stream.getTracks().forEach(track => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        // Create data channel for chat
        dataChannelRef.current = peerConnectionRef.current.createDataChannel("chat", {
          negotiated: true,
          id: 0
        });
        
        dataChannelRef.current.onopen = () => {
          console.log("✅ Data channel opened");
          addChatMessage("System", "Chat connection established");
        };
        
        dataChannelRef.current.onclose = () => {
          console.log("❌ Data channel closed");
          addChatMessage("System", "Chat connection lost");
        };
        
        dataChannelRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            addChatMessage(data.sender, data.message, data.timestamp);
          } catch (error) {
            console.error("Error parsing chat message:", error);
          }
        };

        // Handle remote stream
        peerConnectionRef.current.ontrack = (event) => {
          if (remoteVideoRef.current && event.streams[0]) {
            console.log("✅ Remote stream received");
            remoteVideoRef.current.srcObject = event.streams[0];
            setCallStatus("Connected");
            setIsConnected(true);
            reconnectAttemptRef.current = 0;
          }
        };

        // Handle ICE connection state changes
        peerConnectionRef.current.oniceconnectionstatechange = () => {
          const state = peerConnectionRef.current.iceConnectionState;
          console.log("ICE connection state:", state);
          
          if (state === "disconnected" || state === "failed") {
            setCallStatus("Reconnecting...");
            setIsConnected(false);
            handleReconnection();
          } else if (state === "connected") {
            setCallStatus("Connected");
            setIsConnected(true);
          }
        };

        // Handle ICE candidates
        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", { 
              roomId, 
              candidate: event.candidate 
            });
          }
        };

        // If teacher, create and send offer
        if (userType === "teacher") {
          const offer = await peerConnectionRef.current.createOffer();
          await peerConnectionRef.current.setLocalDescription(offer);
          socket.emit("offer", { roomId, sdp: offer });
        }

      } catch (error) {
        console.error("❌ Error initializing call:", error);
        setCallStatus("Error: " + error.message);
      }
    };

    // Socket event listeners
    socket.on("offer", async ({ sdp, sender }) => {
      if (peerConnectionRef.current && userType === "student") {
        await peerConnectionRef.current.setRemoteDescription(sdp);
        console.log("✅ Offer received and set");
        
        // Create and send answer
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socket.emit("answer", { roomId, sdp: answer });
      }
    });

    socket.on("answer", async ({ sdp, sender }) => {
      if (peerConnectionRef.current && userType === "teacher") {
        await peerConnectionRef.current.setRemoteDescription(sdp);
        console.log("✅ Answer received and set");
      }
    });

    socket.on("ice-candidate", async ({ candidate, sender }) => {
      if (peerConnectionRef.current && candidate) {
        try {
          await peerConnectionRef.current.addIceCandidate(candidate);
          console.log("✅ ICE candidate added");
        } catch (error) {
          console.error("Error adding ICE candidate:", error);
        }
      }
    });

    socket.on("user-disconnected", (socketId) => {
      console.log("User disconnected:", socketId);
      setCallStatus(`${userType === "teacher" ? "Student" : "Teacher"} disconnected`);
      setIsConnected(false);
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log("Reconnected to signaling server, attempt:", attemptNumber);
      setCallStatus("Reconnected, reestablishing call...");
      // Rejoin the room after reconnection
      socket.emit("join-room", roomId);
    });

    socket.on("reconnect_error", (error) => {
      console.log("Reconnection error:", error);
      setCallStatus("Reconnection failed, trying again...");
    });

    if (roomId) {
      initializeCall();
    } else {
      setCallStatus("Error: No room ID provided");
    }

    // Scroll chat to bottom when new messages arrive
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }

    return () => {
      console.log("♻️ Cleaning up Call...");
      endCall(false);
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-disconnected");
      socket.off("reconnect");
      socket.off("reconnect_error");
    };
  }, [roomId, navigate, userType, userName, bandwidth]);

  const handleReconnection = () => {
    if (reconnectAttemptRef.current < 5) {
      reconnectAttemptRef.current += 1;
      setTimeout(() => {
        if (peerConnectionRef.current) {
          // Try to restart ICE
          peerConnectionRef.current.restartIce();
          setCallStatus(`Reconnecting... Attempt ${reconnectAttemptRef.current}`);
        }
      }, 2000 * reconnectAttemptRef.current); // Exponential backoff
    } else {
      setCallStatus("Connection failed. Please try again later.");
    }
  };

  const addChatMessage = (sender, message, timestamp = new Date()) => {
    setChatMessages(prev => [...prev, { sender, message, timestamp }]);
  };

  const sendMessage = () => {
    if (message.trim() && dataChannelRef.current && dataChannelRef.current.readyState === "open") {
      const messageData = {
        sender: userName,
        message: message.trim(),
        timestamp: new Date().toISOString()
      };
      
      dataChannelRef.current.send(JSON.stringify(messageData));
      addChatMessage(userName, message.trim());
      setMessage("");
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current = null;
      }
      setIsRecording(false);
    } else {
      // Start recording
      if (remoteVideoRef.current.srcObject) {
        const stream = remoteVideoRef.current.srcObject;
        const options = { mimeType: 'video/webm; codecs=vp9' };
        const chunks = [];
        
        try {
          mediaRecorderRef.current = new MediaRecorder(stream, options);
          
          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunks.push(event.data);
            }
          };
          
          mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            setRecordedChunks([blob]);
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `recording-${roomId}-${new Date().toISOString()}.webm`;
            a.click();
          };
          
          mediaRecorderRef.current.start();
          setIsRecording(true);
        } catch (error) {
          console.error("Error starting recording:", error);
        }
      }
    }
  };

  const changeBandwidth = (newBandwidth) => {
    setBandwidth(newBandwidth);
    // In a real implementation, you would renegotiate the connection with new constraints
    console.log("Bandwidth changed to:", newBandwidth);
    // For a complete implementation, you would need to renegotiate the connection
  };

  const toggleAudio = () => {
    if (localVideoRef.current.srcObject) {
      const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsAudioMuted(!isAudioMuted);
    }
  };

  const toggleVideo = () => {
    if (localVideoRef.current.srcObject) {
      const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = (redirect = true) => {
    console.log("📴 Ending Call...");
    
    // Stop recording if active
    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    
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
    
    if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }
    
    if (redirect) {
      socket.emit("leave-room", roomId);
      navigate(userType === "teacher" ? "/teachercalendar" : "/dashboard");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="container-fluid vh-100 bg-dark text-light d-flex flex-column">
      {/* Status Bar */}
      <div className="d-flex justify-content-between align-items-center p-2 bg-dark border-bottom border-secondary">
        <div>
          <span className={`badge ${isConnected ? 'bg-success' : 'bg-warning'}`}>
            {isConnected ? 'Connected' : 'Connecting...'}
          </span>
          <span className="ms-2">Room: {roomId}</span>
          <span className="ms-2">| {userName} ({userType})</span>
        </div>
        <div>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={() => endCall(true)}
          >
            <i className="fas fa-phone-slash me-1"></i> End Call
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex" style={{ minHeight: 0 }}>
        {/* Video Area */}
        <div className="flex-grow-1 position-relative d-flex flex-column">
          {/* Remote Video */}
          <div className="flex-grow-1 position-relative bg-black">
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline 
              className="h-100 w-100"
            />
            {!isConnected && (
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">{callStatus}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Local Video (Picture-in-Picture) */}
          <div className="position-absolute bottom-0 end-0 m-3" style={{ width: '20%', maxWidth: '200px' }}>
            <video 
              ref={localVideoRef} 
              autoPlay 
              muted 
              playsInline 
              className="w-100 rounded border border-secondary"
            />
            <div className="position-absolute top-0 start-0 p-1">
              <span className="badge bg-dark">You</span>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="d-flex flex-column" style={{ width: '300px', backgroundColor: '#2a2a2a' }}>
          <div className="p-2 border-bottom border-secondary">
            <h6 className="m-0">Chat</h6>
          </div>
          
          <div 
            ref={chatMessagesRef}
            className="flex-grow-1 p-2 overflow-auto"
            style={{ maxHeight: '50vh' }}
          >
            {chatMessages.map((msg, index) => (
              <div key={index} className="mb-2">
                <small className="fw-bold text-primary">{msg.sender}:</small>
                <div className="text-light">{msg.message}</div>
                <small className="text-muted">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </small>
              </div>
            ))}
          </div>
          
          <div className="p-2 border-top border-secondary">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!isConnected}
              />
              <button 
                className="btn btn-primary btn-sm"
                onClick={sendMessage}
                disabled={!isConnected || !message.trim()}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-2 bg-dark border-top border-secondary">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button 
            className={`btn btn-sm ${isAudioMuted ? 'btn-danger' : 'btn-outline-light'}`}
            onClick={toggleAudio}
            title={isAudioMuted ? "Unmute" : "Mute"}
          >
            <i className={`fas ${isAudioMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
          </button>
          
          <button 
            className={`btn btn-sm ${isVideoOff ? 'btn-danger' : 'btn-outline-light'}`}
            onClick={toggleVideo}
            title={isVideoOff ? "Turn on video" : "Turn off video"}
          >
            <i className={`fas ${isVideoOff ? 'fa-video-slash' : 'fa-video'}`}></i>
          </button>
          
          <div className="dropdown">
            <button 
              className="btn btn-sm btn-outline-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Quality: {bandwidth}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button 
                  className="dropdown-item"
                  onClick={() => changeBandwidth('high')}
                >
                  High
                </button>
              </li>
              <li>
                <button 
                  className="dropdown-item"
                  onClick={() => changeBandwidth('medium')}
                >
                  Medium
                </button>
              </li>
              <li>
                <button 
                  className="dropdown-item"
                  onClick={() => changeBandwidth('low')}
                >
                  Low
                </button>
              </li>
            </ul>
          </div>
          
          <button 
            className={`btn btn-sm ${isRecording ? 'btn-danger' : 'btn-outline-light'}`}
            onClick={toggleRecording}
            title={isRecording ? "Stop recording" : "Start recording"}
          >
            <i className="fas fa-record-vinyl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallPage;