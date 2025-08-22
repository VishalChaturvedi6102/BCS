

// // src/socket.js
// import { io } from "socket.io-client";

// // Create a single shared socket instance
// export const socket = io("http://localhost:4000");





// src/socket.js
import { io } from "socket.io-client";

// Create a single shared socket instance with explicit transports
export const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"], // ensures it works in all environments
});
