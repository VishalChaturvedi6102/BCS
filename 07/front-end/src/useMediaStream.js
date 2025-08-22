

// // useMediaStream.js
// import { useRef } from "react";

// export const useMediaStream = () => {
//   const streamRef = useRef(null);

//   const getStream = async () => {
//     if (streamRef.current) return streamRef.current;
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       streamRef.current = stream;
//       return stream;
//     } catch (err) {
//       console.error("Error accessing media devices:", err);
//       throw err;
//     }
//   };

//   return { getStream, streamRef };
// };








// useMediaStream.js
import { useRef } from "react";

export const useMediaStream = () => {
  const streamRef = useRef(null);

  const getStream = async () => {
    if (streamRef.current) return streamRef.current;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      return stream;
    } catch (err) {
      console.error("Error accessing media devices:", err);
      throw err;
    }
  };

  return { getStream, streamRef };
};
