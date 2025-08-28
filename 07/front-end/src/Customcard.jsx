

// import React from "react";
// import { Button } from "react-bootstrap";

// const Customcard = ({ course }) => {
//   return (
//     <div style={{
//       minWidth: "280px",
//       maxWidth: "280px",
//       backgroundColor: "white",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//       overflow: "hidden",
//       display: "flex",
//       flexDirection: "column"
//     }}>
//       {/* Video / Thumbnail */}
//       {course.video ? (
//         <video
//           src={`http://localhost:4000${course.video}`}
//           controls
//           style={{ width: "100%", height: "160px", objectFit: "cover" }}
//         />
//       ) : (
//         <div style={{
//           width: "100%",
//           height: "160px",
//           backgroundColor: "#E5E7EB",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: "#6B7280",
//           fontWeight: "600"
//         }}>
//           No Video
//         </div>
//       )}

//       {/* Course Info */}
//       <div style={{ padding: "1rem", flex: 1 }}>
//         <h6 style={{ color: "#1F2937", marginBottom: "0.5rem" }}>{course.cname}</h6>
//         <p style={{ color: "#6B7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
//           {course.bdesc || "No description provided"}
//         </p>
//         <Button
//           style={{
//             backgroundColor: "#006CFF",
//             border: "none",
//             borderRadius: "8px",
//             fontWeight: "600",
//             width: "100%"
//           }}
//         >
//           Live Class
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Customcard;




// import React, { useState } from "react";
// import { Button, Modal, Form } from "react-bootstrap";
// import axios from "axios";

// const Customcard = ({ course, studentUsername }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [requestText, setRequestText] = useState("");
//   const [buttonState, setButtonState] = useState("live"); // live / waiting / accepted

//   const handleRequestClick = () => {
//     if (buttonState === "live") {
//       setShowModal(true);
//     }
//   };

//   const handleSendRequest = async () => {
//     try {
//       // API call to send live class request to teacher
//       await axios.post(`http://localhost:4000/api/liveclass/request`, {
//         studentUsername,
//         tutorUsername: course.teacherUsername,
//         courseId: course.id,
//         message: requestText
//       });

//       setButtonState("waiting"); // waiting for teacher response
//       setShowModal(false);
//       setRequestText("");
//     } catch (err) {
//       console.error("Error sending live class request:", err);
//       alert("Failed to send request");
//     }
//   };

//   const handleCancelRequest = () => {
//     setShowModal(false);
//     setRequestText("");
//   };

//   // Update button color based on state
//   const getButtonStyle = () => {
//     switch (buttonState) {
//       case "live":
//         return { backgroundColor: "#006CFF", border: "none" };
//       case "waiting":
//         return { backgroundColor: "#FFC107", border: "none" };
//       case "accepted":
//         return { backgroundColor: "#28A745", border: "none" };
//       default:
//         return {};
//     }
//   };

//   const handleAttendClick = () => {
//     if (buttonState === "accepted") {
//       // Navigate to the live class page (Viewcustom)
//       window.location.href = `/viewcustom/${course.id}`;
//     }
//   };

//   return (
//     <div style={{
//       minWidth: "280px",
//       maxWidth: "280px",
//       backgroundColor: "white",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//       overflow: "hidden",
//       display: "flex",
//       flexDirection: "column"
//     }}>
//       {/* Video / Thumbnail */}
//       {course.video ? (
//         <video
//           src={`http://localhost:4000${course.video}`}
//           controls
//           style={{ width: "100%", height: "160px", objectFit: "cover" }}
//         />
//       ) : (
//         <div style={{
//           width: "100%",
//           height: "160px",
//           backgroundColor: "#E5E7EB",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: "#6B7280",
//           fontWeight: "600"
//         }}>
//           No Video
//         </div>
//       )}

//       {/* Course Info */}
//       <div style={{ padding: "1rem", flex: 1 }}>
//         <h6 style={{ color: "#1F2937", marginBottom: "0.5rem" }}>{course.cname}</h6>
//         <p style={{ color: "#6B7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
//           {course.bdesc || "No description provided"}
//         </p>

//         <Button
//           style={{
//             ...getButtonStyle(),
//             borderRadius: "8px",
//             fontWeight: "600",
//             width: "100%"
//           }}
//           onClick={() => {
//             if (buttonState === "live") handleRequestClick();
//             if (buttonState === "accepted") handleAttendClick();
//           }}
//         >
//           {buttonState === "live" ? "Live Class" : buttonState === "waiting" ? "Waiting for response" : "Attend Live"}
//         </Button>
//       </div>

//       {/* Modal */}
//       <Modal show={showModal} onHide={handleCancelRequest} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Request for Live Class</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Message to Teacher</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Say something..."
//               value={requestText}
//               onChange={(e) => setRequestText(e.target.value)}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancelRequest}>Cancel</Button>
//           <Button variant="primary" onClick={handleSendRequest}>Send Request</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Customcard;






// import React, { useState, useEffect } from "react";
// import { Button, Modal, Form, Spinner } from "react-bootstrap";
// import axios from "axios";

// const Customcard = ({ course }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [requestText, setRequestText] = useState("");
//   const [buttonState, setButtonState] = useState("live"); // live / waiting / accepted
//   const [loadingRequest, setLoadingRequest] = useState(false);
//   const [loadingStatus, setLoadingStatus] = useState(true);

//   const studentUsername = sessionStorage.getItem("studentUsername");
//   const tutorUsername = sessionStorage.getItem("tutorUsername") || course.teacherUsername;
//   const courseId = sessionStorage.getItem("courseId") || course.id;

//   // Fetch latest live class status
//   const fetchLiveClassStatus = async () => {
//     if (!studentUsername || !courseId) {
//       setButtonState("live");
//       setLoadingStatus(false);
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `http://localhost:4000/api/liveclass/status/${studentUsername}/${courseId}`
//       );
//       setButtonState(res.data.status || "live");
//     } catch (err) {
//       console.error("Error fetching live class status:", err);
//       setButtonState("live");
//     } finally {
//       setLoadingStatus(false);
//     }
//   };

//   useEffect(() => {
//     fetchLiveClassStatus();
//   }, [studentUsername, courseId]);

//   const handleRequestClick = () => {
//     if (buttonState === "live") setShowModal(true);
//   };

//   const handleSendRequest = async () => {
//     if (loadingRequest) return;

//     if (!studentUsername || !tutorUsername || !courseId) {
//       alert("Missing required information. Please refresh the page.");
//       return;
//     }

//     try {
//       setLoadingRequest(true);
//       await axios.post("http://localhost:4000/api/liveclass/request", {
//         studentUsername,
//         tutorUsername,
//         courseId,
//         message: requestText || null,
//       });

//       setButtonState("waiting");
//       setShowModal(false);
//       setRequestText("");
//       alert("Live class request sent!");
//     } catch (err) {
//       console.error("Error sending live class request:", err);
//       if (err.response?.data?.error) alert(err.response.data.error);
//       else alert("Failed to send request. Try again.");
//     } finally {
//       setLoadingRequest(false);
//     }
//   };

//   const handleCancelRequest = () => {
//     setShowModal(false);
//     setRequestText("");
//   };

//   const handleAttendClick = () => {
//     if (buttonState === "accepted") {
//       window.location.href = `/viewcustom/${courseId}`;
//     }
//   };

//   const getButtonStyle = () => {
//     switch (buttonState) {
//       case "live":
//         return { backgroundColor: "#006CFF", border: "none" };
//       case "waiting":
//         return { backgroundColor: "#FFC107", border: "none" };
//       case "accepted":
//         return { backgroundColor: "#28A745", border: "none" };
//       default:
//         return {};
//     }
//   };

//   return (
//     <div
//       style={{
//         minWidth: "280px",
//         maxWidth: "280px",
//         backgroundColor: "white",
//         borderRadius: "12px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Video / Thumbnail */}
//       {course.video ? (
//         <video
//           src={`http://localhost:4000${course.video}`}
//           controls
//           style={{ width: "100%", height: "160px", objectFit: "cover" }}
//         />
//       ) : (
//         <div
//           style={{
//             width: "100%",
//             height: "160px",
//             backgroundColor: "#E5E7EB",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: "#6B7280",
//             fontWeight: "600",
//           }}
//         >
//           No Video
//         </div>
//       )}

//       {/* Course Info */}
//       <div style={{ padding: "1rem", flex: 1 }}>
//         <h6 style={{ color: "#1F2937", marginBottom: "0.5rem" }}>{course.cname}</h6>
//         <p style={{ color: "#6B7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
//           {course.bdesc || "No description provided"}
//         </p>

//         <Button
//           style={{ ...getButtonStyle(), borderRadius: "8px", fontWeight: "600", width: "100%" }}
//           onClick={() => {
//             if (buttonState === "live") handleRequestClick();
//             if (buttonState === "accepted") handleAttendClick();
//           }}
//           disabled={loadingRequest || loadingStatus}
//         >
//           {loadingRequest || loadingStatus ? (
//             <Spinner animation="border" size="sm" />
//           ) : buttonState === "live" ? (
//             "Live Class"
//           ) : buttonState === "waiting" ? (
//             "Waiting for response"
//           ) : (
//             "Attend Live"
//           )}
//         </Button>
//       </div>

//       {/* Modal */}
//       <Modal show={showModal} onHide={handleCancelRequest} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Request for Live Class</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Message to Teacher</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Say something..."
//               value={requestText}
//               onChange={(e) => setRequestText(e.target.value)}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancelRequest}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSendRequest}>
//             {loadingRequest ? <Spinner animation="border" size="sm" /> : "Send Request"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Customcard;





// import React, { useState, useEffect } from "react";
// import { Button, Modal, Form, Spinner } from "react-bootstrap";
// import axios from "axios";

// const Customcard = ({ course }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [requestText, setRequestText] = useState("");
//   const [buttonState, setButtonState] = useState("live"); // live / waiting / accepted
//   const [loadingRequest, setLoadingRequest] = useState(false);
//   const [loadingStatus, setLoadingStatus] = useState(true);

//   const studentUsername = sessionStorage.getItem("studentUsername");
//   const tutorUsername = sessionStorage.getItem("tutorUsername") || course.teacherUsername;
//   const courseId = sessionStorage.getItem("courseId") || course.id;

//   // Fetch latest live class status
//   const fetchLiveClassStatus = async () => {
//     if (!studentUsername || !courseId) {
//       setButtonState("live");
//       setLoadingStatus(false);
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `http://localhost:4000/api/liveclass/status/${studentUsername}/${courseId}`
//       );

//       const status = res.data.status;

//       // Map rejected to live so student can send request again
//       if (status === "rejected") {
//         setButtonState("live");
//       } else {
//         setButtonState(status || "live");
//       }
//     } catch (err) {
//       console.error("Error fetching live class status:", err);
//       setButtonState("live");
//     } finally {
//       setLoadingStatus(false);
//     }
//   };

//   useEffect(() => {
//     fetchLiveClassStatus();
//   }, [studentUsername, courseId]);

//   const handleRequestClick = () => {
//     if (buttonState === "live") setShowModal(true);
//   };

//   const handleSendRequest = async () => {
//     if (loadingRequest) return;

//     if (!studentUsername || !tutorUsername || !courseId) {
//       alert("Missing required information. Please refresh the page.");
//       return;
//     }

//     try {
//       setLoadingRequest(true);
//       await axios.post("http://localhost:4000/api/liveclass/request", {
//         studentUsername,
//         tutorUsername,
//         courseId,
//         message: requestText || null,
//       });

//       setButtonState("waiting");
//       setShowModal(false);
//       setRequestText("");
//       alert("Live class request sent!");
//     } catch (err) {
//       console.error("Error sending live class request:", err);
//       if (err.response?.data?.error) alert(err.response.data.error);
//       else alert("Failed to send request. Try again.");
//     } finally {
//       setLoadingRequest(false);
//     }
//   };

//   const handleCancelRequest = () => {
//     setShowModal(false);
//     setRequestText("");
//   };

//   const handleAttendClick = () => {
//     if (buttonState === "accepted") {
//       window.location.href = `/viewcustom/${courseId}`;
//     }
//   };

//   const getButtonStyle = () => {
//     switch (buttonState) {
//       case "live":
//         return { backgroundColor: "#006CFF", border: "none" };
//       case "waiting":
//         return { backgroundColor: "#FFC107", border: "none" };
//       case "accepted":
//         return { backgroundColor: "#28A745", border: "none" };
//       default:
//         return {};
//     }
//   };

//   return (
//     <div
//       style={{
//         minWidth: "280px",
//         maxWidth: "280px",
//         backgroundColor: "white",
//         borderRadius: "12px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Video / Thumbnail */}
//       {course.video ? (
//         <video
//           src={`http://localhost:4000${course.video}`}
//           controls
//           style={{ width: "100%", height: "160px", objectFit: "cover" }}
//         />
//       ) : (
//         <div
//           style={{
//             width: "100%",
//             height: "160px",
//             backgroundColor: "#E5E7EB",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: "#6B7280",
//             fontWeight: "600",
//           }}
//         >
//           No Video
//         </div>
//       )}

//       {/* Course Info */}
//       <div style={{ padding: "1rem", flex: 1 }}>
//         <h6 style={{ color: "#1F2937", marginBottom: "0.5rem" }}>{course.cname}</h6>
//         <p style={{ color: "#6B7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
//           {course.bdesc || "No description provided"}
//         </p>

//         <Button
//           style={{ ...getButtonStyle(), borderRadius: "8px", fontWeight: "600", width: "100%" }}
//           onClick={() => {
//             if (buttonState === "live") handleRequestClick();
//             if (buttonState === "accepted") handleAttendClick();
//           }}
//           disabled={loadingRequest || loadingStatus}
//         >
//           {loadingRequest || loadingStatus ? (
//             <Spinner animation="border" size="sm" />
//           ) : buttonState === "live" ? (
//             "Live Class"
//           ) : buttonState === "waiting" ? (
//             "Waiting for response"
//           ) : (
//             "Attend Live"
//           )}
//         </Button>
//       </div>

//       {/* Modal */}
//       <Modal show={showModal} onHide={handleCancelRequest} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Request for Live Class</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Message to Teacher</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Say something..."
//               value={requestText}
//               onChange={(e) => setRequestText(e.target.value)}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancelRequest}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSendRequest}>
//             {loadingRequest ? <Spinner animation="border" size="sm" /> : "Send Request"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Customcard;





import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import axios from "axios";

const Customcard = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [buttonState, setButtonState] = useState("live"); // live / waiting / accepted
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const studentUsername = sessionStorage.getItem("studentUsername");
  const tutorUsername = sessionStorage.getItem("tutorUsername") || course.teacherUsername;
  const courseId = sessionStorage.getItem("courseId") || course.id;

  // Fetch latest live class status
  const fetchLiveClassStatus = async () => {
    if (!studentUsername || !courseId) {
      setButtonState("live");
      setLoadingStatus(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:4000/api/liveclass/status/${studentUsername}/${courseId}`
      );
      const status = res.data.status;

      // Explicit mapping
      if (status === "rejected") setButtonState("live");
      else if (status === "accepted") setButtonState("accepted");
      else if (status === "pending") setButtonState("waiting");
      else setButtonState("live");
    } catch (err) {
      console.error("Error fetching live class status:", err);
      setButtonState("live");
    } finally {
      setLoadingStatus(false);
    }
  };

  // Fetch status on mount and after every action
  useEffect(() => {
    fetchLiveClassStatus();

    // Optional: poll every 5 seconds to reflect teacher action
    const interval = setInterval(fetchLiveClassStatus, 5000);
    return () => clearInterval(interval);
  }, [studentUsername, courseId]);

  const handleRequestClick = () => {
    if (buttonState === "live") setShowModal(true);
  };

  const handleSendRequest = async () => {
    if (loadingRequest) return;

    if (!studentUsername || !tutorUsername || !courseId) {
      alert("Missing required information. Please refresh the page.");
      return;
    }

    try {
      setLoadingRequest(true);
      await axios.post("http://localhost:4000/api/liveclass/request", {
        studentUsername,
        tutorUsername,
        courseId,
        message: requestText || null,
      });

      setButtonState("waiting");
      setShowModal(false);
      setRequestText("");
      alert("Live class request sent!");
    } catch (err) {
      console.error("Error sending live class request:", err);
      if (err.response?.data?.error) alert(err.response.data.error);
      else alert("Failed to send request. Try again.");
    } finally {
      setLoadingRequest(false);
    }
  };

  const handleCancelRequest = () => {
    setShowModal(false);
    setRequestText("");
  };

  const handleAttendClick = () => {
    if (buttonState === "accepted") {
      window.location.href = `/viewcustom/${courseId}`;
    }
  };

  const getButtonStyle = () => {
    switch (buttonState) {
      case "live":
        return { backgroundColor: "#006CFF", border: "none" };
      case "waiting":
        return { backgroundColor: "#FFC107", border: "none" };
      case "accepted":
        return { backgroundColor: "#28A745", border: "none" };
      default:
        return {};
    }
  };

  const getButtonText = () => {
    switch (buttonState) {
      case "live":
        return "Live Class";
      case "waiting":
        return "Waiting for response";
      case "accepted":
        return "Attend Live";
      default:
        return "Live Class";
    }
  };

  return (
    <div
      style={{
        minWidth: "280px",
        maxWidth: "280px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Video / Thumbnail */}
      {course.video ? (
        <video
          src={`http://localhost:4000${course.video}`}
          controls
          style={{ width: "100%", height: "160px", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "160px",
            backgroundColor: "#E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6B7280",
            fontWeight: "600",
          }}
        >
          No Video
        </div>
      )}

      {/* Course Info */}
      <div style={{ padding: "1rem", flex: 1 }}>
        <h6 style={{ color: "#1F2937", marginBottom: "0.5rem" }}>{course.cname}</h6>
        <p style={{ color: "#6B7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
          {course.bdesc || "No description provided"}
        </p>

        <Button
          style={{ ...getButtonStyle(), borderRadius: "8px", fontWeight: "600", width: "100%" }}
          onClick={() => {
            if (buttonState === "live") handleRequestClick();
            if (buttonState === "accepted") handleAttendClick();
          }}
          disabled={loadingRequest || loadingStatus}
        >
          {loadingRequest || loadingStatus ? <Spinner animation="border" size="sm" /> : getButtonText()}
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCancelRequest} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request for Live Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Message to Teacher</Form.Label>
            <Form.Control
              type="text"
              placeholder="Say something..."
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelRequest}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendRequest}>
            {loadingRequest ? <Spinner animation="border" size="sm" /> : "Send Request"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Customcard;
