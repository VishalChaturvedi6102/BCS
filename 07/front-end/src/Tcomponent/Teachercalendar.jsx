

// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";

// const Teachercalendar = () => {
//   const tutorUsername = sessionStorage.getItem("tutorUsername");
//   const [events, setEvents] = useState([]);
//   const [hoverInfo, setHoverInfo] = useState(null); // info for popup on hover
//   const [actionPopup, setActionPopup] = useState(null); // accept/reject popup
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!tutorUsername) return;
//     axios
//       .get(`http://localhost:4000/bookings?username=${tutorUsername}`)
//       .then((res) => {
//         // Transform bookings to calendar events with colors based on status
//         const evts = res.data.map((b) => ({
//           id: b._id,
//           title: b.status === "pending" ? "New Request" : "Booked Session",
//           start: b.start,
//           end: b.end,
//           backgroundColor:
//             b.status === "pending" ? "yellow" : b.status === "accepted" ? "green" : "gray",
//           extendedProps: {
//             studentUsername: b.studentUsername,
//             status: b.status,
//             teacherMessage: b.teacherMessage,
//             subject: b.subject,
//           },
//         }));
//         setEvents(evts);
//       });
//   }, [tutorUsername]);

//   // Hover handlers
//   const handleEventMouseEnter = (info) => {
//     const { extendedProps, start, end } = info.event;
//     if (extendedProps.status === "pending") {
//       setHoverInfo({
//         studentUsername: extendedProps.studentUsername,
//         start,
//         end,
//         eventId: info.event.id,
//       });
//     } else if (extendedProps.status === "accepted") {
//       setHoverInfo({
//         message: extendedProps.teacherMessage,
//         start,
//         end,
//       });
//     }
//   };

//   const handleEventMouseLeave = () => {
//     setHoverInfo(null);
//   };

//   // Accept / Reject Handlers
//   const handleAccept = () => {
//     setActionPopup({ ...hoverInfo, type: "accept" });
//   };

//   const handleReject = async () => {
//     if (!hoverInfo) return;
//     try {
//       await axios.put(`http://localhost:4000/bookings/${hoverInfo.eventId}`, {
//         status: "rejected",
//       });
//       // Remove rejected event locally
//       setEvents((prev) => prev.filter((e) => e.id !== hoverInfo.eventId));
//       setHoverInfo(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const sendAcceptance = async () => {
//     try {
//       await axios.put(`http://localhost:4000/bookings/${actionPopup.eventId}`, {
//         status: "accepted",
//         teacherMessage: message,
//       });
//       // Update event locally
//       setEvents((prev) =>
//         prev.map((e) =>
//           e.id === actionPopup.eventId
//             ? { ...e, backgroundColor: "green", extendedProps: { ...e.extendedProps, teacherMessage: message, status: "accepted" } }
//             : e
//         )
//       );
//       setActionPopup(null);
//       setHoverInfo(null);
//       setMessage("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         eventMouseEnter={handleEventMouseEnter}
//         eventMouseLeave={handleEventMouseLeave}
//       />

//       {/* Hover popup */}
//       {hoverInfo && (
//         <div
//           style={{
//             position: "fixed",
//             top: "100px",
//             left: "100px",
//             background: "white",
//             border: "1px solid black",
//             padding: "10px",
//             zIndex: 9999,
//           }}
//         >
//           {hoverInfo.studentUsername && (
//             <>
//               <p>Student: {hoverInfo.studentUsername}</p>
//               <p>
//                 Start: {hoverInfo.start.toLocaleString()}
//                 <br />
//                 End: {hoverInfo.end.toLocaleString()}
//               </p>
//               <button onClick={handleAccept}>Accept</button>{" "}
//               <button onClick={handleReject}>Reject</button>
//             </>
//           )}
//           {hoverInfo.message && (
//             <>
//               <p>Message/Link: {hoverInfo.message}</p>
//               <p>
//                 Start: {hoverInfo.start.toLocaleString()}
//                 <br />
//                 End: {hoverInfo.end.toLocaleString()}
//               </p>
//             </>
//           )}
//         </div>
//       )}

//       {/* Accept popup */}
//       {actionPopup && actionPopup.type === "accept" && (
//         <div
//           style={{
//             position: "fixed",
//             top: "150px",
//             left: "150px",
//             background: "white",
//             border: "1px solid black",
//             padding: "20px",
//             zIndex: 9999,
//           }}
//         >
//           <p>Send booking confirmation message or Zoom/Meet link:</p>
//           <textarea
//             rows={4}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             style={{ width: "100%" }}
//           />
//           <button onClick={sendAcceptance}>Send & Confirm</button>{" "}
//           <button
//             onClick={() => {
//               setActionPopup(null);
//               setMessage("");
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Teachercalendar;


// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";

// const Teachercalendar = () => {
//   const tutorUsername = sessionStorage.getItem("tutorUsername");
//   const [events, setEvents] = useState([]);
//   const [hoverInfo, setHoverInfo] = useState(null);
//   const [actionPopup, setActionPopup] = useState(null);
//   const [message, setMessage] = useState("");

//   // Fetch bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       const tutorUsername = sessionStorage.getItem("tutorUsername");
//       if (!tutorUsername) return;
    
//       try {
//         const res = await axios.get("http://localhost:4000/bookings", {
//           params: { tutorUsername }, // proper query param
//         });

//         const evts = res.data.map((b) => ({
//           id: b._id,
//           title: b.status === "pending" ? "New Request" : "Booked Session",
//           start: b.start ? new Date(b.start) : null,
//           end: b.end ? new Date(b.end) : null,
//           backgroundColor:
//             b.status === "pending"
//               ? "yellow"
//               : b.status === "accepted"
//               ? "green"
//               : "gray",
//           extendedProps: {
//             studentUsername: b.studentUsername,
//             status: b.status,
//             teacherMessage: b.teacherMessage,
//             subject: b.subject,
//           },
//         }));

//         setEvents(evts);
//       } catch (err) {
//         console.error("AxiosError", err);
//       }
//     };

//     fetchBookings();
//   }, [tutorUsername]);

//   // Hover handlers
//   const handleEventMouseEnter = (info) => {
//     const { extendedProps, start, end } = info.event;
//     if (extendedProps.status === "pending") {
//       setHoverInfo({
//         studentUsername: extendedProps.studentUsername,
//         start,
//         end,
//         eventId: info.event.id,
//       });
//     } else if (extendedProps.status === "accepted") {
//       setHoverInfo({
//         message: extendedProps.teacherMessage,
//         start,
//         end,
//       });
//     }
//   };

//   const handleEventMouseLeave = () => {
//     setHoverInfo(null);
//   };

//   // Accept / Reject handlers
//   const handleAccept = () => {
//     setActionPopup({ ...hoverInfo, type: "accept" });
//   };

//   const handleReject = async () => {
//     if (!hoverInfo) return;
//     try {
//       await axios.put(`http://localhost:4000/bookings/${hoverInfo.studentUsername}`, {
//         status: "rejected",
//       });

//       setEvents((prev) => prev.filter((e) => e.extendedProps.studentUsername !== hoverInfo.studentUsername));
//       setHoverInfo(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const sendAcceptance = async () => {
//     try {
//       await axios.put(`http://localhost:4000/bookings/${actionPopup.studentUsername}`, {
//         status: "accepted",
//         teacherMessage: message,
//       });

//       setEvents((prev) =>
//         prev.map((e) =>
//           e.extendedProps.studentUsername === actionPopup.studentUsername
//             ? {
//                 ...e,
//                 backgroundColor: "green",
//                 extendedProps: { ...e.extendedProps, teacherMessage: message, status: "accepted" },
//               }
//             : e
//         )
//       );

//       setActionPopup(null);
//       setHoverInfo(null);
//       setMessage("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         eventMouseEnter={handleEventMouseEnter}
//         eventMouseLeave={handleEventMouseLeave}
//         height="auto"
//         dayHeaderContent={(arg) => <span style={{ color: "black" }}>{arg.text}</span>}
//         eventContent={(arg) => <div style={{ background: arg.event.backgroundColor }}>{arg.event.title}</div>}
//         eventBackgroundColor="white"
//       />

//       {/* Hover popup */}
//       {hoverInfo && (
//         <div
//           style={{
//             position: "fixed",
//             top: "100px",
//             left: "100px",
//             background: "white",
//             border: "1px solid black",
//             padding: "10px",
//             zIndex: 9999,
//           }}
//         >
//           {hoverInfo.studentUsername && (
//             <>
//               <p>Student: {hoverInfo.studentUsername}</p>
//               <p>
//                 Start: {hoverInfo.start ? hoverInfo.start.toLocaleString() : "N/A"}
//                 <br />
//                 End: {hoverInfo.end ? hoverInfo.end.toLocaleString() : "N/A"}
//               </p>
//               <button onClick={handleAccept}>Accept</button>{" "}
//               <button onClick={handleReject}>Reject</button>
//             </>
//           )}
//           {hoverInfo.message && (
//             <>
//               <p>Message/Link: {hoverInfo.message}</p>
//               <p>
//                 Start: {hoverInfo.start ? hoverInfo.start.toLocaleString() : "N/A"}
//                 <br />
//                 End: {hoverInfo.end ? hoverInfo.end.toLocaleString() : "N/A"}
//               </p>
//             </>
//           )}
//         </div>
//       )}

//       {/* Accept popup */}
//       {actionPopup && actionPopup.type === "accept" && (
//         <div
//           style={{
//             position: "fixed",
//             top: "150px",
//             left: "150px",
//             background: "white",
//             border: "1px solid black",
//             padding: "20px",
//             zIndex: 9999,
//           }}
//         >
//           <p>Send booking confirmation message or Zoom/Meet link:</p>
//           <textarea
//             rows={4}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             style={{ width: "100%" }}
//           />
//           <button onClick={sendAcceptance}>Send & Confirm</button>{" "}
//           <button
//             onClick={() => {
//               setActionPopup(null);
//               setMessage("");
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Teachercalendar;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

// const Teachercalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [tutorUsername, setTutorUsername] = useState("");

//   useEffect(() => {
//     // Load tutor username from localStorage
//     const storedUsername = localStorage.getItem("tutorUsername");
//     if (storedUsername) {
//       setTutorUsername(storedUsername);
//     }
//   }, []);

//   useEffect(() => {
//     if (!tutorUsername) return;

//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/bookings?tutorUsername=${encodeURIComponent(tutorUsername)}`
//         );

//         const bookingsData = Array.isArray(response.data) ? response.data : [];

//         // Map bookings into calendar events safely
//         const formattedEvents = bookingsData
//           .filter(b => b.start && b.end) // Skip invalid bookings
//           .map(b => ({
//             title: `${b.studentUsername} - ${b.status}`,
//             start: new Date(b.start),
//             end: new Date(b.end),
//             allDay: false,
//           }));

//         setEvents(formattedEvents);
//       } catch (error) {
//         console.error("Error fetching bookings:", error.response?.data || error.message);
//       }
//     };

//     fetchBookings();
//   }, [tutorUsername]);

//   return (
//     <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
//       <h2 style={{ marginBottom: "20px" }}>
//         {tutorUsername ? `Bookings for ${tutorUsername}` : "Loading tutor calendar..."}
//       </h2>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 600 }}
//       />
//     </div>
//   );
// };

// export default Teachercalendar;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import { Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";

// const Teachercalendar = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   // ✅ Fetch bookings
//   const fetchBookings = async () => {
//     if (!tutorUsername) {
//       console.error("No tutor username in sessionStorage");
//       setBookings([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.get(`http://localhost:4000/teacher/${tutorUsername}/requests`);
//       const data = res.data || [];

//       const events = data.map((booking) => ({
//         id: booking.id,
//         title: `${booking.studentUsername} - ${booking.subjectName}`,
//         start: booking.start,
//         end: booking.end,
//         extendedProps: {
//           status: booking.status,
//           message: booking.message,
//         },
//       }));

//       setBookings(events);
//     } catch (error) {
//       console.error("Error fetching bookings:", error.response?.data || error.message);
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle accept/reject
//   const handleDecision = async (bookingId, decision) => {
//     try {
//       await axios.post(`http://localhost:4000/teacher/requests/${bookingId}/decision`, {
//         decision,
//       });
//       alert(`Booking ${decision}ed successfully!`);
//       fetchBookings();
//     } catch (error) {
//       console.error(`Error updating booking ${decision}:`, error.response?.data || error.message);
//       alert("Error updating booking decision");
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ backgroundColor: "white", minHeight: "100vh" }} className="d-flex justify-content-center align-items-center">
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   return (
//     <Container fluid style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }}>
//       <Row>
//         <Col md={8}>
//           <Card>
//             <Card.Body>
//               <FullCalendar
//                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                 initialView="dayGridMonth"
//                 events={bookings}
//                 headerToolbar={{
//                   left: "prev,next today",
//                   center: "title",
//                   right: "dayGridMonth,timeGridWeek,timeGridDay",
//                 }}
//                 height="80vh"
//               />
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={4}>
//           <h4 className="mb-3">Pending Requests</h4>
//           {bookings.length === 0 ? (
//             <p>No pending booking requests.</p>
//           ) : (
//             bookings.map((event) => (
//               <Card key={event.id} className="mb-2">
//                 <Card.Body>
//                   <Card.Title>{event.title}</Card.Title>
//                   <Card.Text>
//                     <strong>Start:</strong> {new Date(event.start).toLocaleString()} <br />
//                     <strong>End:</strong> {new Date(event.end).toLocaleString()} <br />
//                     <strong>Status:</strong> {event.extendedProps.status}
//                   </Card.Text>
//                   {event.extendedProps.status === "pending" && (
//                     <div>
//                       <Button
//                         variant="success"
//                         size="sm"
//                         className="me-2"
//                         onClick={() => handleDecision(event.id, "accept")}
//                       >
//                         Accept
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleDecision(event.id, "reject")}
//                       >
//                         Reject
//                       </Button>
//                     </div>
//                   )}
//                 </Card.Body>
//               </Card>
//             ))
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Teachercalendar;


// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Container, Card, Button, Spinner, Modal, Form } from "react-bootstrap";
// import Titlewala from "./Titlewala";

// const Teachercalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredEvent, setHoveredEvent] = useState(null);
//   const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedEventId, setSelectedEventId] = useState(null);
//   const hideTimer = useRef(null);

//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   // Fetch pending + accepted bookings
//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`http://localhost:4000/bookings?username=${tutorUsername}`);
//       const data = res.data || [];
//       const mapped = data.map((b) => ({
//         id: b.id,
//         title: `${b.studentUsername}`,
//         start: b.start,
//         end: b.end,
//         status: b.status || "pending",
//         studentUsername: b.studentUsername,
//         teacherMessage: b.message || null,
//       }));
//       setEvents(mapped);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Accept booking
//   const handleAccept = async () => {
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${selectedEventId}/decision`,
//         { decision: "accepted", message }
//       );

//       setEvents((prev) =>
//         prev.map((e) =>
//           e.id === selectedEventId
//             ? { ...e, status: "accepted", teacherMessage: message }
//             : e
//         )
//       );

//       setShowAcceptModal(false);
//       setMessage("");
//       setHoveredEvent(null);
//     } catch (err) {
//       console.error("Accept error:", err);
//     }
//   };

//   // Reject booking
//   const handleReject = async (id) => {
//     if (!window.confirm("Are you sure you want to reject this request?")) return;
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${id}/decision`,
//         { decision: "rejected" }
//       );

//       setEvents((prev) => prev.filter((e) => e.id !== id));
//       setHoveredEvent(null);
//     } catch (err) {
//       console.error("Reject error:", err);
//     }
//   };

//   // Event style
//   const eventContent = (eventInfo) => {
//     const bgColor =
//       eventInfo.event.extendedProps.status === "pending"
//         ? "#e9c01c" // yellow
//         : eventInfo.event.extendedProps.status === "accepted"
//         ? "#28a745" // green
//         : "#dc3545"; // red for rejected

//     return (
//       <div
//         style={{
//           backgroundColor: bgColor,
//           color: "white",
//           padding: "2px 4px",
//           borderRadius: "3px",
//           width: "100%",
//         }}
//       >
//         {eventInfo.event.title}
//       </div>
//     );
//   };

//   // Hover handling
//   const onEventEnter = (info) => {
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//     setHoveredEvent(info.event);
//     setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
//   };

//   const onEventLeave = () => {
//     hideTimer.current = setTimeout(() => {
//       setHoveredEvent(null);
//     }, 9000);
//   };

//   const onPopupEnter = () => {
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//   };

//   const onPopupLeave = () => {
//     hideTimer.current = setTimeout(() => {
//       setHoveredEvent(null);
//     }, 600);
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   if (loading) {
//     return (
//       <div
//         style={{ backgroundColor: "white", minHeight: "100vh" }}
//         className="d-flex justify-content-center align-items-center"
//       >
//         <Spinner animation="border" />
//       </div>
//     );
//   }





//   return (


//     <>
// <Titlewala/>

//     <Container
//       fluid
//       style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }}
//     >
//       <Card>
//         <Card.Body>
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             events={events}
//             eventContent={eventContent}
//             eventMouseEnter={onEventEnter}
//             eventMouseLeave={onEventLeave}
//             height="80vh"
//           />
//         </Card.Body>
//       </Card>

//       {/* Hover popup */}
//       {hoveredEvent && (
//         <div
//           style={{
//             position: "absolute",
//             top: popupPos.y + 10,
//             left: popupPos.x + 10,
//             backgroundColor: "white",
//             padding: "10px",
//             border: "1px solid #0af7ffff",
//             borderRadius: "5px",
//             zIndex: 1000,
//             minWidth: "300px",
//             minHeight:"150px",
//             maxHeight:"400px",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//           }}
//           onMouseEnter={onPopupEnter}
//           onMouseLeave={onPopupLeave}
//         >
//           <strong>{hoveredEvent.extendedProps.studentUsername}</strong>
//           <br />
//           {new Date(hoveredEvent.start).toLocaleString()} -{" "}
//           {new Date(hoveredEvent.end).toLocaleString()}
//           <br />
//           {hoveredEvent.extendedProps.status === "pending" && (
//             <>
//               <Button
//                 variant="success"
//                 size="sm"
//                 className="me-2 mt-2"
//                 onClick={() => {
//                   setSelectedEventId(hoveredEvent.id);
//                   setShowAcceptModal(true);
//                 }}
//               >
//                 Accept
//               </Button>
//               <Button
//                 variant="danger"
//                 size="sm"
//                 className="mt-2"
//                 onClick={() => handleReject(hoveredEvent.id)}
//               >
//                 Reject
//               </Button>
//             </>
//           )}
//           {hoveredEvent.extendedProps.status === "accepted" &&
//             hoveredEvent.extendedProps.teacherMessage && (
//               <p className="mt-2">Link: {hoveredEvent.extendedProps.teacherMessage}</p>
//             )}
//         </div>
//       )}

//       {/* Accept modal */}
//       <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Booking</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Write a message or meeting link for the student:</p>
//           <Form.Control
//             type="text"
//             placeholder="Enter Zoom/Google Meet link or message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAcceptModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleAccept}>
//             Confirm
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>

//     </>
//   );
// };

// export default Teachercalendar;





// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Container, Card, Button, Spinner, Modal, Form } from "react-bootstrap";
// import Titlewala from "./Titlewala";

// const Teachercalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredEvent, setHoveredEvent] = useState(null);
//   const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedEventId, setSelectedEventId] = useState(null);
//   const [popupLocked, setPopupLocked] = useState(false); // lock popup on click
//   const hideTimer = useRef(null);

//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   // Fetch pending + accepted bookings
//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`http://localhost:4000/bookings?username=${tutorUsername}`);
//       const data = res.data || [];
//       const mapped = data.map((b) => ({
//         id: b.id,
//         title: `${b.studentUsername}`,
//         start: b.start,
//         end: b.end,
//         status: b.status || "pending",
//         studentUsername: b.studentUsername,
//         teacherMessage: b.message || null,
//       }));
//       setEvents(mapped);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Accept booking
//   const handleAccept = async () => {
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${selectedEventId}/decision`,
//         { decision: "accepted", message }
//       );

//       setEvents((prev) =>
//         prev.map((e) =>
//           e.id === selectedEventId
//             ? { ...e, status: "accepted", teacherMessage: message }
//             : e
//         )
//       );

//       setShowAcceptModal(false);
//       setMessage("");
//       setHoveredEvent(null);
//       setPopupLocked(false);
//     } catch (err) {
//       console.error("Accept error:", err);
//     }
//   };

//   // Reject booking
//   const handleReject = async (id) => {
//     if (!window.confirm("Are you sure you want to reject this request?")) return;
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${id}/decision`,
//         { decision: "rejected" }
//       );

//       setEvents((prev) => prev.filter((e) => e.id !== id));
//       setHoveredEvent(null);
//       setPopupLocked(false);
//     } catch (err) {
//       console.error("Reject error:", err);
//     }
//   };

//   // Event style
//   const eventContent = (eventInfo) => {
//     const bgColor =
//       eventInfo.event.extendedProps.status === "pending"
//         ? "#e9c01c" // yellow
//         : eventInfo.event.extendedProps.status === "accepted"
//         ? "#28a745" // green
//         : "#dc3545"; // red

//     return (
//       <div
//         style={{
//           backgroundColor: bgColor,
//           color: "white",
//           padding: "2px 4px",
//           borderRadius: "3px",
//           width: "100%",
//           cursor: "pointer",
//         }}
//       >
//         {eventInfo.event.title}
//       </div>
//     );
//   };

//   // Hover/click popup handling
//   const onEventEnter = (info) => {
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//     setHoveredEvent(info.event);
//     setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
//   };

//   const onEventLeave = () => {
//     if (!popupLocked) {
//       hideTimer.current = setTimeout(() => {
//         setHoveredEvent(null);
//       }, 300); // stays 5 seconds after leaving event
//     }
//   };

//   const onPopupEnter = () => {
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//   };

//   const onPopupLeave = () => {
//     if (!popupLocked) {
//       hideTimer.current = setTimeout(() => {
//         setHoveredEvent(null);
//       }, 600);
//     }
//   };

//   const onEventClick = (info) => {
//     setHoveredEvent(info.event);
//     setPopupLocked(true); // lock popup on click
//     setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   if (loading) {
//     return (
//       <div
//         style={{ backgroundColor: "white", minHeight: "100vh" }}
//         className="d-flex justify-content-center align-items-center"
//       >
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Titlewala />

//       <Container
//         fluid
//         style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }}
//       >
//         <Card>
//           <Card.Body>
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               events={events}
//               eventContent={eventContent}
//               eventMouseEnter={onEventEnter}
//               eventMouseLeave={onEventLeave}
//               eventClick={onEventClick}
//               height="80vh"
//             />
//           </Card.Body>
//         </Card>

//         {/* Hover / Click popup */}
//         {hoveredEvent && (
//           <div
//             style={{
//               position: "absolute",
//               top: popupPos.y + 10,
//               left: popupPos.x + 10,
//               backgroundColor: "white",
//               padding: "15px",
//               border: "2px solid #0af7ffff",
//               borderRadius: "8px",
//               zIndex: 1000,
//               minWidth: "350px",
//               minHeight: "150px",
//               maxHeight: "400px",
//               boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
//             }}
//             onMouseEnter={onPopupEnter}
//             onMouseLeave={onPopupLeave}
//           >
//             <strong>{hoveredEvent.extendedProps.studentUsername}</strong>
//             <br />
//             {new Date(hoveredEvent.start).toLocaleString()} -{" "}
//             {new Date(hoveredEvent.end).toLocaleString()}
//             <br />
//             {hoveredEvent.extendedProps.status === "pending" && (
//               <>
//                 <Button
//                   variant="success"
//                   size="sm"
//                   className="me-2 mt-2"
//                   onClick={() => {
//                     setSelectedEventId(hoveredEvent.id);
//                     setShowAcceptModal(true);
//                   }}
//                 >
//                   Accept
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   className="mt-2"
//                   onClick={() => handleReject(hoveredEvent.id)}
//                 >
//                   Reject
//                 </Button>
//               </>
//             )}
//             {hoveredEvent.extendedProps.status === "accepted" &&
//               hoveredEvent.extendedProps.teacherMessage && (
//                 <p className="mt-2">Link: {hoveredEvent.extendedProps.teacherMessage}</p>
//               )}
//           </div>
//         )}

//         {/* Accept modal */}
//         <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirm Booking</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <p>Write a message or meeting link for the student:</p>
//             <Form.Control
//               type="text"
//               placeholder="Enter Zoom/Google Meet link or message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowAcceptModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="success" onClick={handleAccept}>
//               Confirm
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </Container>
//     </>
//   );
// };

// export default Teachercalendar;



// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Container, Card, Button, Spinner, Modal, Form } from "react-bootstrap";
// import Titlewala from "./Titlewala";

// const Teachercalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredEvent, setHoveredEvent] = useState(null);
//   const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedEventId, setSelectedEventId] = useState(null);
//   const [popupLocked, setPopupLocked] = useState(false);
//   const hideTimer = useRef(null);

//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`http://localhost:4000/bookings?username=${tutorUsername}`);
//       const data = res.data || [];
//       const mapped = data.map((b) => ({
//         id: b.id,
//         title: `${b.studentUsername}`,
//         start: b.start,
//         end: b.end,
//         status: b.status || "pending",
//         studentUsername: b.studentUsername,
//         teacherMessage: b.message || null,
//       }));
//       setEvents(mapped);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAccept = async () => {
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${selectedEventId}/decision`,
//         { decision: "accepted", message }
//       );
//       setEvents((prev) =>
//         prev.map((e) =>
//           e.id === selectedEventId
//             ? { ...e, status: "accepted", teacherMessage: message }
//             : e
//         )
//       );
//       setShowAcceptModal(false);
//       setMessage("");
//       setHoveredEvent(null);
//       setPopupLocked(false);
//     } catch (err) {
//       console.error("Accept error:", err);
//     }
//   };

//   const handleReject = async (id) => {
//     if (!window.confirm("Are you sure you want to reject this request?")) return;
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${id}/decision`,
//         { decision: "rejected" }
//       );
//       setEvents((prev) => prev.filter((e) => e.id !== id));
//       setHoveredEvent(null);
//       setPopupLocked(false);
//     } catch (err) {
//       console.error("Reject error:", err);
//     }
//   };

//   const eventContent = (eventInfo) => {
//     const bgColor =
//       eventInfo.event.extendedProps.status === "pending"
//         ? "#e9c01c"
//         : eventInfo.event.extendedProps.status === "accepted"
//         ? "#28a745"
//         : "#dc3545";

//     return (
//       <div
//         style={{
//           backgroundColor: bgColor,
//           color: "white",
//           padding: "4px 6px",
//           borderRadius: "4px",
//           width: "100%",
//           fontWeight: "500",
//           fontSize: "0.9rem",
//           textAlign: "center",
//         }}
//       >
//         {eventInfo.event.title}
//       </div>
//     );
//   };

//   const onEventEnter = (info) => {
//     if (hoveredEvent?.id !== info.event.id) setPopupLocked(false);
//     if (!popupLocked) {
//       if (hideTimer.current) clearTimeout(hideTimer.current);
//       setHoveredEvent(info.event);
//       setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
//     }
//   };

//   const onEventLeave = () => {
//     if (!popupLocked) {
//       hideTimer.current = setTimeout(() => {
//         setHoveredEvent(null);
//       }, 3000);
//     }
//   };

//   const onPopupEnter = () => {
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//   };

//   const onPopupLeave = () => {
//     if (!popupLocked) {
//       hideTimer.current = setTimeout(() => {
//         setHoveredEvent(null);
//       }, 100);
//     }
//   };

//   const onEventClick = (info) => {
//     setHoveredEvent(info.event);
//     setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
//     setSelectedEventId(info.event.id);
//     setPopupLocked(true);
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   if (loading) {
//     return (
//       <div
//         style={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}
//         className="d-flex justify-content-center align-items-center"
//       >
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Titlewala />

//       <Container
//         fluid
//         style={{ backgroundColor: "#f7f9fc", minHeight: "100vh", padding: "30px" }}
//       >
//         <Card className="shadow-sm" style={{ borderRadius: "10px", border: "none" }}>
//           <Card.Body>
//             <h3
//               className="mb-4 text-white p-3 rounded"
//               style={{
//                 background: "linear-gradient(90deg, #007bff, #6610f2)",
//                 boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//                 textAlign: "center",
//               }}
//             >
//               📅 Teacher's Session Calendar
//             </h3>
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               events={events}
//               eventContent={eventContent}
//               eventMouseEnter={onEventEnter}
//               eventMouseLeave={onEventLeave}
//               eventClick={onEventClick}
//               height="80vh"
//             />
//           </Card.Body>
//         </Card>

//         {/* Hover popup with arrow */}
//         {hoveredEvent && (
//           <div
//             style={{
//               position: "absolute",
//               top: popupPos.y + 15,
//               left: popupPos.x + 15,
//               backgroundColor: "white",
//               padding: "20px",
//               border: "2px solid #0af7ffff",
//               borderRadius: "8px",
//               zIndex: 1000,
//               minWidth: "360px",
//               minHeight: "180px",
//               maxHeight: "400px",
//               boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
//               opacity: hoveredEvent ? 1 : 0,
//               transform: hoveredEvent ? "translateY(0)" : "translateY(-20px)",
//               transition: "all 0.3s ease-in-out",
//             }}
//             onMouseEnter={onPopupEnter}
//             onMouseLeave={onPopupLeave}
//           >
//             {/* Tooltip arrow */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: "-10px",
//                 left: "20px",
//                 width: "0",
//                 height: "0",
//                 borderLeft: "10px solid transparent",
//                 borderRight: "10px solid transparent",
//                 borderBottom: "10px solid #0af7ffff",
//               }}
//             ></div>

//             <strong>{hoveredEvent.extendedProps.studentUsername}</strong>
//             <br />
//             {new Date(hoveredEvent.start).toLocaleString()} -{" "}
//             {new Date(hoveredEvent.end).toLocaleString()}
//             <br />
//             {hoveredEvent.extendedProps.status === "pending" && (
//               <>
//                 <Button
//                   variant="success"
//                   size="sm"
//                   className="me-2 mt-2"
//                   onClick={() => setShowAcceptModal(true)}
//                 >
//                   Accept
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   className="mt-2"
//                   onClick={() => handleReject(hoveredEvent.id)}
//                 >
//                   Reject
//                 </Button>
//               </>
//             )}
//             {hoveredEvent.extendedProps.status === "accepted" &&
//               hoveredEvent.extendedProps.teacherMessage && (
//                 <p className="mt-2">Link: {hoveredEvent.extendedProps.teacherMessage}</p>
//               )}
//           </div>
//         )}

//         {/* Accept modal */}
//         <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirm Booking</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <p>Write a message or meeting link for the student:</p>
//             <Form.Control
//               type="text"
//               placeholder="Enter Zoom/Google Meet link or message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowAcceptModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="success" onClick={handleAccept}>
//               Confirm
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </Container>
//     </>
//   );
// };

// export default Teachercalendar;










// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Container, Card, Button, Spinner, Modal, Form } from "react-bootstrap";
// // import Titlewala from "./Titlewala";

// const Teachercalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredEvent, setHoveredEvent] = useState(null);
//   const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedEventId, setSelectedEventId] = useState(null);
//   const [popupLocked, setPopupLocked] = useState(false);
//   const hideTimer = useRef(null);

//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   // fetchBookings wrapped in useCallback for stable identity
//   const fetchBookings = useCallback(async () => {
//     try {
//       const res = await axios.get(`http://localhost:4000/bookings?username=${tutorUsername}`);
//       const data = res.data || [];
//       const mapped = data.map((b) => ({
//         id: b.id,
//         title: `${b.studentUsername}`,
//         start: b.start,
//         end: b.end,
//         status: b.status || "pending",
//         studentUsername: b.studentUsername,
//         teacherMessage: b.message || null,
//       }));
//       setEvents(mapped);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [tutorUsername]);

//   useEffect(() => {
//     fetchBookings();
//   }, [fetchBookings]);

//   const handleAccept = async () => {
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${selectedEventId}/decision`,
//         { decision: "accepted", message }
//       );
//       setEvents((prev) =>
//         prev.map((e) =>
//           e.id === selectedEventId
//             ? { ...e, status: "accepted", teacherMessage: message }
//             : e
//         )
//       );
//       setShowAcceptModal(false);
//       setMessage("");
//       setHoveredEvent(null);
//       setPopupLocked(false);
//     } catch (err) {
//       console.error("Accept error:", err);
//     }
//   };

//   const handleReject = async (id) => {
//     if (!window.confirm("Are you sure you want to reject this request?")) return;
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${id}/decision`,
//         { decision: "rejected" }
//       );
//       setEvents((prev) => prev.filter((e) => e.id !== id));
//       setHoveredEvent(null);
//       setPopupLocked(false);
//     } catch (err) {
//       console.error("Reject error:", err);
//     }
//   };

//   const eventContent = (eventInfo) => {
//     const bgColor =
//       eventInfo.event.extendedProps.status === "pending"
//         ? "#e9c01c"
//         : eventInfo.event.extendedProps.status === "accepted"
//         ? "#28a745"
//         : "#dc3545";

//     return (
//       <div
//         style={{
//           backgroundColor: bgColor,
//           color: "white",
//           padding: "4px 6px",
//           borderRadius: "4px",
//           width: "100%",
//           fontWeight: "500",
//           fontSize: "0.9rem",
//           textAlign: "center",
//         }}
//       >
//         {eventInfo.event.title}
//       </div>
//     );
//   };

//   const onEventEnter = (info) => {
//     if (hoveredEvent?.id !== info.event.id) setPopupLocked(false);
//     if (!popupLocked) {
//       if (hideTimer.current) clearTimeout(hideTimer.current);
//       setHoveredEvent(info.event);
//       setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
//     }
//   };

//   const onEventLeave = () => {
//     if (!popupLocked) {
//       hideTimer.current = setTimeout(() => {
//         setHoveredEvent(null);
//       }, 3000);
//     }
//   };

//   const onPopupEnter = () => {
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//   };

//   const onPopupLeave = () => {
//     if (!popupLocked) {
//       hideTimer.current = setTimeout(() => {
//         setHoveredEvent(null);
//       }, 100);
//     }
//   };

//   const onEventClick = (info) => {
//     setHoveredEvent(info.event);
//     setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
//     setSelectedEventId(info.event.id);
//     setPopupLocked(true);
//   };

//   if (loading) {
//     return (
//       <div
//         style={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}
//         className="d-flex justify-content-center align-items-center"
//       >
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* <Titlewala /> */}
//       <Container
//         fluid
//         style={{ backgroundColor: "#f7f9fc", minHeight: "100vh", padding: "30px" }}
//       >
//         <Card className="shadow-sm" style={{ borderRadius: "10px", border: "none" }}>
//           <Card.Body>
//             <h3
//               className="mb-4 text-white p-3 rounded"
//               style={{
//                 background: "linear-gradient(90deg, #007bff, #6610f2)",
//                 boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//                 textAlign: "center",
//               }}
//             >
//               📅 Teacher's Session Calendar
//             </h3>
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               events={events}
//               eventContent={eventContent}
//               eventMouseEnter={onEventEnter}
//               eventMouseLeave={onEventLeave}
//               eventClick={onEventClick}
//               height="80vh"
//             />
//           </Card.Body>
//         </Card>

//         {/* Hover popup */}
//         {hoveredEvent && (
//           <div
//             style={{
//               position: "absolute",
//               top: popupPos.y + 15,
//               left: popupPos.x + 15,
//               backgroundColor: "white",
//               padding: "20px",
//               border: "2px solid #0af7ffff",
//               borderRadius: "8px",
//               zIndex: 1000,
//               minWidth: "360px",
//               minHeight: "180px",
//               maxHeight: "400px",
//               boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
//               opacity: hoveredEvent ? 1 : 0,
//               transform: hoveredEvent ? "translateY(0)" : "translateY(-20px)",
//               transition: "all 0.3s ease-in-out",
//             }}
//             onMouseEnter={onPopupEnter}
//             onMouseLeave={onPopupLeave}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: "-10px",
//                 left: "20px",
//                 width: "0",
//                 height: "0",
//                 borderLeft: "10px solid transparent",
//                 borderRight: "10px solid transparent",
//                 borderBottom: "10px solid #0af7ffff",
//               }}
//             ></div>

//             <strong>{hoveredEvent.extendedProps.studentUsername}</strong>
//             <br />
//             {new Date(hoveredEvent.start).toLocaleString()} -{" "}
//             {new Date(hoveredEvent.end).toLocaleString()}
//             <br />
//             {hoveredEvent.extendedProps.status === "pending" && (
//               <>
//                 <Button
//                   variant="success"
//                   size="sm"
//                   className="me-2 mt-2"
//                   onClick={() => setShowAcceptModal(true)}
//                 >
//                   Accept
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   className="mt-2"
//                   onClick={() => handleReject(hoveredEvent.id)}
//                 >
//                   Reject
//                 </Button>
//               </>
//             )}
//             {hoveredEvent.extendedProps.status === "accepted" &&
//               hoveredEvent.extendedProps.teacherMessage && (
//                 <p className="mt-2">Link: {hoveredEvent.extendedProps.teacherMessage}</p>
//               )}
//           </div>
//         )}

//         {/* Accept modal */}
//         <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirm Booking</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <p>Write a message or meeting link for the student:</p>
//             <Form.Control
//               type="text"
//               placeholder="Enter Zoom/Google Meet link or message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowAcceptModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="success" onClick={handleAccept}>
//               Confirm
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </Container>
//     </>
//   );
// };

// export default Teachercalendar;




// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Container, Card, Button, Spinner, Modal, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { socket } from "../socket"; // centralized Socket.IO connection

// const Teachercalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredEvent, setHoveredEvent] = useState(null);
//   const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedEventId, setSelectedEventId] = useState(null);
//   const [popupLocked, setPopupLocked] = useState(false);
//   const hideTimer = useRef(null);

//   const navigate = useNavigate();
//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   // fetchBookings wrapped in useCallback for stable identity
//   const fetchBookings = useCallback(async () => {
//     try {
//       const res = await axios.get(`http://localhost:4000/bookings?username=${tutorUsername}`);
//       const data = res.data || [];
//       const mapped = data.map((b) => ({
//         id: b.id,
//         title: `${b.studentUsername}`,
//         start: b.start,
//         end: b.end,
//         status: b.status || "pending",
//         studentUsername: b.studentUsername,
//         teacherMessage: b.message || null,
//         studentSocketId: b.studentSocketId || null, // must come from backend
//       }));
//       setEvents(mapped);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [tutorUsername]);

//   useEffect(() => {
//     fetchBookings();
//   }, [fetchBookings]);

//   // handle Accept
//   const handleAccept = async () => {
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${selectedEventId}/decision`,
//         { decision: "accepted", message }
//       );
//       setEvents((prev) =>
//         prev.map((e) =>
//           e.id === selectedEventId
//             ? { ...e, status: "accepted", teacherMessage: message }
//             : e
//         )
//       );
//       setShowAcceptModal(false);
//       setMessage("");
//       setHoveredEvent(null);
//       setPopupLocked(false);
//     } catch (err) {
//       console.error("Accept error:", err);
//     }
//   };

//   // handle Reject
//   const handleReject = async (id) => {
//     if (!window.confirm("Are you sure you want to reject this request?")) return;
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${id}/decision`,
//         { decision: "rejected" }
//       );
//       setEvents((prev) => prev.filter((e) => e.id !== id));
//       setHoveredEvent(null);
//       setPopupLocked(false);
//     } catch (err) {
//       console.error("Reject error:", err);
//     }
//   };

//   // handle Start Call
//   const handleStartCall = (studentSocketId) => {
//     const roomId = "room-" + Date.now(); // unique room ID
//     // notify backend to create room and alert student
//     socket.emit("create-room", { roomId, studentId: studentSocketId });
//     // redirect teacher to call page
//     navigate(`/call/${roomId}`);
//   };

//   const eventContent = (eventInfo) => {
//     const bgColor =
//       eventInfo.event.extendedProps.status === "pending"
//         ? "#e9c01c"
//         : eventInfo.event.extendedProps.status === "accepted"
//         ? "#28a745"
//         : "#dc3545";

//     return (
//       <div
//         style={{
//           backgroundColor: bgColor,
//           color: "white",
//           padding: "4px 6px",
//           borderRadius: "4px",
//           width: "100%",
//           fontWeight: "500",
//           fontSize: "0.9rem",
//           textAlign: "center",
//         }}
//       >
//         {eventInfo.event.title}
//       </div>
//     );
//   };

//   const onEventEnter = (info) => {
//     if (hoveredEvent?.id !== info.event.id) setPopupLocked(false);
//     if (!popupLocked) {
//       if (hideTimer.current) clearTimeout(hideTimer.current);
//       setHoveredEvent(info.event);
//       setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
//     }
//   };

//   const onEventLeave = () => {
//     if (!popupLocked) {
//       hideTimer.current = setTimeout(() => {
//         setHoveredEvent(null);
//       }, 3000);
//     }
//   };

//   const onPopupEnter = () => {
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//   };

//   const onPopupLeave = () => {
//     if (!popupLocked) {
//       hideTimer.current = setTimeout(() => {
//         setHoveredEvent(null);
//       }, 100);
//     }
//   };

//   const onEventClick = (info) => {
//     setHoveredEvent(info.event);
//     setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
//     setSelectedEventId(info.event.id);
//     setPopupLocked(true);
//   };

//   if (loading) {
//     return (
//       <div
//         style={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}
//         className="d-flex justify-content-center align-items-center"
//       >
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   return (
//     <Container
//       fluid
//       style={{ backgroundColor: "#f7f9fc", minHeight: "100vh", padding: "30px" }}
//     >
//       <Card className="shadow-sm" style={{ borderRadius: "10px", border: "none" }}>
//         <Card.Body>
//           <h3
//             className="mb-4 text-white p-3 rounded"
//             style={{
//               background: "linear-gradient(90deg, #007bff, #6610f2)",
//               boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//               textAlign: "center",
//             }}
//           >
//             📅 Teacher's Session Calendar
//           </h3>
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             events={events}
//             eventContent={eventContent}
//             eventMouseEnter={onEventEnter}
//             eventMouseLeave={onEventLeave}
//             eventClick={onEventClick}
//             height="80vh"
//           />
//         </Card.Body>
//       </Card>

//       {/* Hover popup */}
//       {hoveredEvent && (
//         <div
//           style={{
//             position: "absolute",
//             top: popupPos.y + 15,
//             left: popupPos.x + 15,
//             backgroundColor: "white",
//             padding: "20px",
//             border: "2px solid #0af7ffff",
//             borderRadius: "8px",
//             zIndex: 1000,
//             minWidth: "360px",
//             minHeight: "180px",
//             maxHeight: "400px",
//             boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
//             opacity: hoveredEvent ? 1 : 0,
//             transform: hoveredEvent ? "translateY(0)" : "translateY(-20px)",
//             transition: "all 0.3s ease-in-out",
//           }}
//           onMouseEnter={onPopupEnter}
//           onMouseLeave={onPopupLeave}
//         >
//           <div
//             style={{
//               position: "absolute",
//               top: "-10px",
//               left: "20px",
//               width: "0",
//               height: "0",
//               borderLeft: "10px solid transparent",
//               borderRight: "10px solid transparent",
//               borderBottom: "10px solid #0af7ffff",
//             }}
//           ></div>

//           <strong>{hoveredEvent.extendedProps.studentUsername}</strong>
//           <br />
//           {new Date(hoveredEvent.start).toLocaleString()} -{" "}
//           {new Date(hoveredEvent.end).toLocaleString()}
//           <br />

//           {/* Pending buttons */}
//           {hoveredEvent.extendedProps.status === "pending" && (
//             <>
//               <Button
//                 variant="success"
//                 size="sm"
//                 className="me-2 mt-2"
//                 onClick={() => setShowAcceptModal(true)}
//               >
//                 Accept
//               </Button>
//               <Button
//                 variant="danger"
//                 size="sm"
//                 className="mt-2"
//                 onClick={() => handleReject(hoveredEvent.id)}
//               >
//                 Reject
//               </Button>
//             </>
//           )}

//           {/* Accepted session */}
//           {hoveredEvent.extendedProps.status === "accepted" && (
//             <>
//               {hoveredEvent.extendedProps.teacherMessage && (
//                 <p className="mt-2">Link: {hoveredEvent.extendedProps.teacherMessage}</p>
//               )}
//               <Button
//                 variant="primary"
//                 size="sm"
//                 className="mt-2"
//                 onClick={() =>
//                   handleStartCall(hoveredEvent.extendedProps.studentSocketId)
//                 }
//               >
//                 Start Call
//               </Button>
//             </>
//           )}
//         </div>
//       )}

//       {/* Accept modal */}
//       <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Booking</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Write a message or meeting link for the student:</p>
//           <Form.Control
//             type="text"
//             placeholder="Enter Zoom/Google Meet link or message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAcceptModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleAccept}>
//             Confirm
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Teachercalendar;




// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Container, Card, Button, Spinner, Modal, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { socket } from "../socket"; // centralized Socket.IO connection

// const token = sessionStorage.getItem("token");

// const Teachercalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredEvent, setHoveredEvent] = useState(null);
//   const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedEventId, setSelectedEventId] = useState(null);
//   const [popupLocked, setPopupLocked] = useState(false);
//   const hideTimer = useRef(null);

//   const navigate = useNavigate();
//   const tutorUsername = sessionStorage.getItem("tutorUsername");

//   // Fetch bookings with roomId and studentSocketId
//   const fetchBookings = useCallback(async () => {
//     try {
//       const res = await axios.get(`http://localhost:4000/bookings?username=${tutorUsername}`);
//       const data = res.data || [];
//       const mapped = data.map((b) => ({
//         id: b.id,
//         title: `${b.studentUsername}`,
//         start: b.start,
//         end: b.end,
//         status: b.status || "pending",
//         studentUsername: b.studentUsername,
//         teacherMessage: b.message || null,
//         roomId: b.roomId || null,
//         studentSocketId: b.studentSocketId || null, // must come from backend
//       }));
//       setEvents(mapped);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [tutorUsername]);

//   useEffect(() => {
//     fetchBookings();
//     // Poll for updates every 5 seconds so teacher sees new roomId, etc.
//     const interval = setInterval(fetchBookings, 5000);
//     return () => clearInterval(interval);
//   }, [fetchBookings]);

//   // Accept booking
//   const handleAccept = async () => {
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${selectedEventId}/decision`,
//         { decision: "accepted", message }
//       );
//       setEvents((prev) =>
//         prev.map((e) =>
//           e.id === selectedEventId
//             ? { ...e, status: "accepted", teacherMessage: message }
//             : e
//         )
//       );
//       setShowAcceptModal(false);
//       setMessage("");
//       setHoveredEvent(null);
//       setPopupLocked(false);
//     } catch (err) {
//       console.error("Accept error:", err);
//     }
//   };

//   // Reject booking
//   const handleReject = async (id) => {
//     if (!window.confirm("Are you sure you want to reject this request?")) return;
//     try {
//       await axios.post(
//         `http://localhost:4000/teacher/requests/${id}/decision`,
//         { decision: "rejected" }
//       );
//       setEvents((prev) => prev.filter((e) => e.id !== id));
//       setHoveredEvent(null);
//       setPopupLocked(false);
//     } catch (err) {
//       console.error("Reject error:", err);
//     }
//   };




//   // Start video call: update DB with roomId and notify student via socket
//   // const handleStartCall = async (studentSocketId, bookingId) => {
//   //   const roomId = "room-" + Date.now(); // unique room ID
//   //   try {
//   //     // Update booking with roomId in DB
//   //     await axios.post("http://localhost:4000/start-call",
//   //        {
//   //       tutorUsername,
//   //       studentUsername: hoveredEvent.extendedProps.studentUsername,
//   //       bookingId,
//   //       roomId,
//   //     },
    

//   //     {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     }


//   //   );
//   //     // Notify student via socket
//   //     socket.emit("create-room", { roomId, studentId: studentSocketId });
//   //     // Redirect teacher to call page
//   //     navigate(`/call/${roomId}`);
//   //   } catch (err) {
//   //     alert("Could not start call. Try again.");
//   //     console.error("Start call error:", err);
//   //   }
//   // };

// // const handleStartCall = async (studentSocketId, bookingId) => {
// //   try {
// //     const res = await axios.post(
// //       "http://localhost:4000/start-call",
// //       {
// //         tutorUsername,
// //         studentUsername: hoveredEvent.extendedProps.studentUsername,
// //         bookingId,
// //       },
// //       {
// //         headers: { Authorization: `Bearer ${token}` },
// //       }
// //     );

// //     const roomId = res.data.roomId;

// //     // Go to teacher call page
// //     navigate(`/call/${roomId}`);
// //   } catch (err) {
// //     console.error("Start call error:", err);
// //     alert("Could not start call.");
// //   }
// // };


// // Updated handleStartCall
// const handleStartCall = async (studentSocketId, bookingId) => {
//   try {
//     // Generate unique roomId
//     const roomId = "room-" + Date.now();

//     // Update booking in DB with roomId
//     await axios.post(
//       "http://localhost:4000/start-call",
//       {
//         tutorUsername,
//         studentUsername: hoveredEvent.extendedProps.studentUsername,
//         bookingId,
//         roomId,
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     // Notify the student via Socket.IO
//     if (studentSocketId) {
//       socket.emit("create-room", { roomId, studentId: studentSocketId });
//     } else {
//       alert("Student not online or socket not available.");
//       return;
//     }

//     // Navigate teacher to call page
//     navigate(`/call/${roomId}`);
//   } catch (err) {
//     console.error("Start call error:", err);
//     alert("Could not start call. Try again.");
//   }
// };





//   // Calendar event rendering
//   const eventContent = (eventInfo) => {
//     const bgColor =
//       eventInfo.event.extendedProps.status === "pending"
//         ? "#e9c01c"
//         : eventInfo.event.extendedProps.status === "accepted"
//         ? "#28a745"
//         : "#dc3545";

//     return (
//       <div
//         style={{
//           backgroundColor: bgColor,
//           color: "white",
//           padding: "4px 6px",
//           borderRadius: "4px",
//           width: "100%",
//           fontWeight: "500",
//           fontSize: "0.9rem",
//           textAlign: "center",
//         }}
//       >
//         {eventInfo.event.title}
//       </div>
//     );
//   };

//   // Hover/click popup handling
//   const onEventEnter = (info) => {
//     if (hoveredEvent?.id !== info.event.id) setPopupLocked(false);
//     if (!popupLocked) {
//       if (hideTimer.current) clearTimeout(hideTimer.current);
//       setHoveredEvent(info.event);
//       setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
//     }
//   };

//   const onEventLeave = () => {
//     if (!popupLocked) {
//       hideTimer.current = setTimeout(() => {
//         setHoveredEvent(null);
//       }, 3000);
//     }
//   };

//   const onPopupEnter = () => {
//     if (hideTimer.current) clearTimeout(hideTimer.current);
//   };

//   const onPopupLeave = () => {
//     if (!popupLocked) {
//       hideTimer.current = setTimeout(() => {
//         setHoveredEvent(null);
//       }, 100);
//     }
//   };

//   const onEventClick = (info) => {
//     setHoveredEvent(info.event);
//     setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
//     setSelectedEventId(info.event.id);
//     setPopupLocked(true);
//   };

//   if (loading) {
//     return (
//       <div
//         style={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}
//         className="d-flex justify-content-center align-items-center"
//       >
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   return (
//     <Container
//       fluid
//       style={{ backgroundColor: "#f7f9fc", minHeight: "100vh", padding: "30px" }}
//     >
//       <Card className="shadow-sm" style={{ borderRadius: "10px", border: "none" }}>
//         <Card.Body>
//           <h3
//             className="mb-4 text-white p-3 rounded"
//             style={{
//               background: "linear-gradient(90deg, #007bff, #6610f2)",
//               boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//               textAlign: "center",
//             }}
//           >
//             📅 Teacher's Session Calendar
//           </h3>
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             events={events}
//             eventContent={eventContent}
//             eventMouseEnter={onEventEnter}
//             eventMouseLeave={onEventLeave}
//             eventClick={onEventClick}
//             height="80vh"
//           />
//         </Card.Body>
//       </Card>

//       {/* Hover popup */}
//       {hoveredEvent && (
//         <div
//           style={{
//             position: "absolute",
//             top: popupPos.y + 15,
//             left: popupPos.x + 15,
//             backgroundColor: "white",
//             padding: "20px",
//             border: "2px solid #0af7ffff",
//             borderRadius: "8px",
//             zIndex: 1000,
//             minWidth: "360px",
//             minHeight: "180px",
//             maxHeight: "400px",
//             boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
//             opacity: hoveredEvent ? 1 : 0,
//             transform: hoveredEvent ? "translateY(0)" : "translateY(-20px)",
//             transition: "all 0.3s ease-in-out",
//           }}
//           onMouseEnter={onPopupEnter}
//           onMouseLeave={onPopupLeave}
//         >
//           <div
//             style={{
//               position: "absolute",
//               top: "-10px",
//               left: "20px",
//               width: "0",
//               height: "0",
//               borderLeft: "10px solid transparent",
//               borderRight: "10px solid transparent",
//               borderBottom: "10px solid #0af7ffff",
//             }}
//           ></div>

//           <strong>{hoveredEvent.extendedProps.studentUsername}</strong>
//           <br />
//           {new Date(hoveredEvent.start).toLocaleString()} -{" "}
//           {new Date(hoveredEvent.end).toLocaleString()}
//           <br />

//           {/* Pending buttons */}
//           {hoveredEvent.extendedProps.status === "pending" && (
//             <>
//               <Button
//                 variant="success"
//                 size="sm"
//                 className="me-2 mt-2"
//                 onClick={() => setShowAcceptModal(true)}
//               >
//                 Accept
//               </Button>
//               <Button
//                 variant="danger"
//                 size="sm"
//                 className="mt-2"
//                 onClick={() => handleReject(hoveredEvent.id)}
//               >
//                 Reject
//               </Button>
//             </>
//           )}

//           {/* Accepted session */}
//           {hoveredEvent.extendedProps.status === "accepted" && (
//             <>
//               {hoveredEvent.extendedProps.teacherMessage && (
//                 <p className="mt-2">Link: {hoveredEvent.extendedProps.teacherMessage}</p>
//               )}
//               <Button
//                 variant="primary"
//                 size="sm"
//                 className="mt-2"
//                 onClick={() =>
//                   handleStartCall(
//                     hoveredEvent.extendedProps.studentSocketId,
//                     hoveredEvent.id
//                   )
//                 }
//                 disabled={!hoveredEvent.extendedProps.studentSocketId}
//               >
//                 Start Call
//               </Button>
//               {!hoveredEvent.extendedProps.studentSocketId && (
//                 <p className="text-danger mt-2">
//                   Student not online or socket not available.
//                 </p>
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {/* Accept modal */}
//       <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Booking</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Write a message or meeting link for the student:</p>
//           <Form.Control
//             type="text"
//             placeholder="Enter Zoom/Google Meet link or message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAcceptModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleAccept}>
//             Confirm
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Teachercalendar;























import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container, Card, Button, Spinner, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

const token = sessionStorage.getItem("token");

const Teachercalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [popupLocked, setPopupLocked] = useState(false);
  const hideTimer = useRef(null);

  const navigate = useNavigate();
  const tutorUsername = sessionStorage.getItem("tutorUsername");
  const onlineStudents = useRef({}); // Track online students

  // Fetch bookings from backend
  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:4000/bookings?username=${tutorUsername}`);
      const data = res.data || [];
      const mapped = data.map((b) => ({
        id: b.id,
        title: `${b.studentUsername}`,
        start: b.start,
        end: b.end,
        status: b.status || "pending",
        studentUsername: b.studentUsername,
        teacherMessage: b.message || null,
        roomId: b.roomId || null,
        studentSocketId: b.studentSocketId || null,
      }));
      setEvents(mapped);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  }, [tutorUsername]);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  // Socket.IO: handle student online/offline updates
  useEffect(() => {
    socket.on("student-online", ({ username, socketId }) => {
      onlineStudents.current[username] = socketId;
      setEvents((prev) =>
        prev.map((e) =>
          e.studentUsername === username
            ? { ...e, studentSocketId: socketId }
            : e
        )
      );
    });

    socket.on("user-disconnected", (socketId) => {
      const disconnectedStudent = Object.keys(onlineStudents.current).find(
        (u) => onlineStudents.current[u] === socketId
      );
      if (disconnectedStudent) {
        delete onlineStudents.current[disconnectedStudent];
        setEvents((prev) =>
          prev.map((e) =>
            e.studentUsername === disconnectedStudent
              ? { ...e, studentSocketId: null }
              : e
          )
        );
      }
    });

    return () => {
      socket.off("student-online");
      socket.off("user-disconnected");
    };
  }, []);

  // Accept booking
  const handleAccept = async () => {
    try {
      await axios.post(
        `http://localhost:4000/teacher/requests/${selectedEventId}/decision`,
        { decision: "accepted", message }
      );
      setEvents((prev) =>
        prev.map((e) =>
          e.id === selectedEventId
            ? { ...e, status: "accepted", teacherMessage: message }
            : e
        )
      );
      setShowAcceptModal(false);
      setMessage("");
      setHoveredEvent(null);
      setPopupLocked(false);
    } catch (err) {
      console.error("Accept error:", err);
    }
  };

  // Reject booking
  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this request?")) return;
    try {
      await axios.post(
        `http://localhost:4000/teacher/requests/${id}/decision`,
        { decision: "rejected" }
      );
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setHoveredEvent(null);
      setPopupLocked(false);
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  // Start call
  const handleStartCall = async (studentSocketId, bookingId) => {
    try {
      const roomId = "room-" + Date.now();
      await axios.post(
        "http://localhost:4000/start-call",
        {
          tutorUsername,
          studentUsername: hoveredEvent.extendedProps.studentUsername,
          bookingId,
          roomId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!studentSocketId) {
        alert("Student not online or socket not available.");
        return;
      }

      socket.emit("create-room", { roomId, studentId: studentSocketId });
      navigate(`/call/${roomId}`);
    } catch (err) {
      console.error("Start call error:", err);
      alert("Could not start call. Try again.");
    }
  };

  // Calendar event rendering
  const eventContent = (eventInfo) => {
    const bgColor =
      eventInfo.event.extendedProps.status === "pending"
        ? "#e9c01c"
        : eventInfo.event.extendedProps.status === "accepted"
        ? "#28a745"
        : "#dc3545";

    return (
      <div
        style={{
          backgroundColor: bgColor,
          color: "white",
          padding: "4px 6px",
          borderRadius: "4px",
          width: "100%",
          fontWeight: "500",
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        {eventInfo.event.title}
      </div>
    );
  };

  // Hover/click popup
  const onEventEnter = (info) => {
    if (hoveredEvent?.id !== info.event.id) setPopupLocked(false);
    if (!popupLocked) {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setHoveredEvent(info.event);
      setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
    }
  };

  const onEventLeave = () => {
    if (!popupLocked) {
      hideTimer.current = setTimeout(() => {
        setHoveredEvent(null);
      }, 3000);
    }
  };

  const onPopupEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const onPopupLeave = () => {
    if (!popupLocked) {
      hideTimer.current = setTimeout(() => {
        setHoveredEvent(null);
      }, 100);
    }
  };

  const onEventClick = (info) => {
    setHoveredEvent(info.event);
    setPopupPos({ x: info.jsEvent.pageX, y: info.jsEvent.pageY });
    setSelectedEventId(info.event.id);
    setPopupLocked(true);
  };

  if (loading) {
    return (
      <div
        style={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container
      fluid
      style={{ backgroundColor: "#f7f9fc", minHeight: "100vh", padding: "30px" }}
    >
      <Card className="shadow-sm" style={{ borderRadius: "10px", border: "none" }}>
        <Card.Body>
          <h3
            className="mb-4 text-white p-3 rounded"
            style={{
              background: "linear-gradient(90deg, #007bff, #6610f2)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            📅 Teacher's Session Calendar
          </h3>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={eventContent}
            eventMouseEnter={onEventEnter}
            eventMouseLeave={onEventLeave}
            eventClick={onEventClick}
            height="80vh"
          />
        </Card.Body>
      </Card>

      {/* Hover popup */}
      {hoveredEvent && (
        <div
          style={{
            position: "absolute",
            top: popupPos.y + 15,
            left: popupPos.x + 15,
            backgroundColor: "white",
            padding: "20px",
            border: "2px solid #0af7ffff",
            borderRadius: "8px",
            zIndex: 1000,
            minWidth: "360px",
            minHeight: "180px",
            maxHeight: "400px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
            opacity: hoveredEvent ? 1 : 0,
            transform: hoveredEvent ? "translateY(0)" : "translateY(-20px)",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={onPopupEnter}
          onMouseLeave={onPopupLeave}
        >
          <div
            style={{
              position: "absolute",
              top: "-10px",
              left: "20px",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid #0af7ffff",
            }}
          ></div>

          <strong>{hoveredEvent.extendedProps.studentUsername}</strong>
          <br />
          {new Date(hoveredEvent.start).toLocaleString()} -{" "}
          {new Date(hoveredEvent.end).toLocaleString()}
          <br />

          {hoveredEvent.extendedProps.status === "pending" && (
            <>
              <Button
                variant="success"
                size="sm"
                className="me-2 mt-2"
                onClick={() => setShowAcceptModal(true)}
              >
                Accept
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="mt-2"
                onClick={() => handleReject(hoveredEvent.id)}
              >
                Reject
              </Button>
            </>
          )}

          {hoveredEvent.extendedProps.status === "accepted" && (
            <>
              {hoveredEvent.extendedProps.teacherMessage && (
                <p className="mt-2">Link: {hoveredEvent.extendedProps.teacherMessage}</p>
              )}
              <Button
                variant="primary"
                size="sm"
                className="mt-2"
                onClick={() =>
                  handleStartCall(
                    hoveredEvent.extendedProps.studentSocketId,
                    hoveredEvent.id
                  )
                }
                disabled={!hoveredEvent.extendedProps.studentSocketId}
              >
                Start Call
              </Button>
              {!hoveredEvent.extendedProps.studentSocketId && (
                <p className="text-danger mt-2">
                  Student not online or socket not available.
                </p>
              )}
            </>
          )}
        </div>
      )}

      {/* Accept modal */}
      <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Write a message or meeting link for the student:</p>
          <Form.Control
            type="text"
            placeholder="Enter Zoom/Google Meet link or message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAcceptModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAccept}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Teachercalendar;
