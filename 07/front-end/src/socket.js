

// src/socket.js
// import { io } from "socket.io-client";

// // Create a single shared socket instance with enhanced configuration
// export const socket = io("http://localhost:4000", {
//   // Connection options
//   transports: ["websocket", "polling"],
//   autoConnect: true,
//   reconnection: true,
//   reconnectionAttempts: Infinity,
//   reconnectionDelay: 1000,
//   reconnectionDelayMax: 5000,
//   timeout: 20000,
  
//   // Auth credentials (if needed)
//   auth: {
//     token: sessionStorage.getItem("token")
//   }
// });

// // Add connection event handlers for better debugging
// socket.on("connect", () => {
//   console.log("✅ Connected to server with ID:", socket.id);
  
//   // Emit that we're online with our user info
//   const userType = sessionStorage.getItem("userType"); // "teacher" or "student"
//   const username = sessionStorage.getItem("username");
  
//   if (userType && username) {
//     if (userType === "teacher") {
//       socket.emit("teacher-online", username);
//     } else {
//       socket.emit("student-online", username);
//     }
//   }
// });

// socket.on("disconnect", (reason) => {
//   console.log("❌ Disconnected from server:", reason);
// });

// socket.on("connect_error", (error) => {
//   console.error("🔥 Connection error:", error.message);
// });

// // Add these new event handlers for better reliability
// socket.on("reconnect", (attemptNumber) => {
//   console.log("🔄 Reconnected after attempt:", attemptNumber);
// });

// socket.on("reconnect_attempt", (attemptNumber) => {
//   console.log("🔄 Reconnection attempt:", attemptNumber);
// });

// socket.on("reconnect_error", (error) => {
//   console.error("🔥 Reconnection error:", error);
// });

// socket.on("reconnect_failed", () => {
//   console.error("❌ Reconnection failed");
// });

// // Export utility functions
// export const connectSocket = () => {
//   if (!socket.connected) {
//     socket.connect();
//   }
// };

// export const disconnectSocket = () => {
//   if (socket.connected) {
//     socket.disconnect();
//   }
// };

// export const isConnected = () => socket.connected;

// export default socket;






// socket.js
import { io } from "socket.io-client";

// Create a single shared socket instance
export const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

// Add connection event handlers
socket.on("connect", () => {
  console.log("✅ Connected to server with ID:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Disconnected from server:", reason);
});

socket.on("connect_error", (error) => {
  console.error("🔥 Connection error:", error.message);
});

export default socket;