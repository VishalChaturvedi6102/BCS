// // // // src/utils/getCameraStream.js
// // // let sharedStream = null;

// // // export async function getCameraStream() {
// // //   if (!sharedStream) {
// // //     sharedStream = await navigator.mediaDevices.getUserMedia({
// // //       video: true,
// // //       audio: true,
// // //     });
// // //   }
// // //   // return a clone so multiple users can use same camera/mic
// // //   return sharedStream.clone();
// // // }




// // // src/utils/getCameraStream.js
// // let sharedStreamPromise = null;

// // export function getCameraStream() {
// //   if (!sharedStreamPromise) {
// //     sharedStreamPromise = navigator.mediaDevices
// //       .getUserMedia({ video: true, audio: true })
// //       .then((stream) => {
// //         return stream;
// //       })
// //       .catch((err) => {
// //         console.error("Failed to get camera:", err);
// //         sharedStreamPromise = null; // reset so retry is possible
// //         throw err;
// //       });
// //   }

// //   // When resolved, return a clone so each user gets their own stream
// //   return sharedStreamPromise.then((stream) => stream.clone());
// // }




// // src/utils/getCameraStream.js
// let sharedStream = null;
// let streamPromise = null;

// export async function getCameraStream() {
//   if (sharedStream) {
//     return sharedStream.clone();
//   }

//   if (!streamPromise) {
//     streamPromise = navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         sharedStream = stream;
//         return stream;
//       })
//       .catch((err) => {
//         console.error("Failed to get camera:", err);
//         streamPromise = null; // reset if failed
//         throw err;
//       });
//   }

//   const stream = await streamPromise;
//   return stream.clone();
// }



// src/getCameraStream.js

// let sharedStream = null;

// export async function getCameraStream() {
//   if (!sharedStream) {
//     try {
//       sharedStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       console.log("📷 Got real camera stream");
//     } catch (err) {
//       console.error("❌ Failed to get camera:", err);
//       throw err;
//     }
//   }
//   // Return a cloned stream so multiple components can use it
//   return sharedStream.clone();
// }

// // Optional cleanup if you ever want to fully release the camera
// export function cleanupCameraStream() {
//   if (sharedStream) {
//     sharedStream.getTracks().forEach((t) => t.stop());
//     sharedStream = null;
//   }
// }



// src/utils/getCameraStream.js
let cachedStream = null;

export async function getCameraStream() {
  if (!cachedStream) {
    cachedStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  }
  return cachedStream.clone(); // give a fresh copy for each user
}
