



// // src/pages/Calendar.jsx
// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import Layout from "./Layout";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");

//   const tutorUsername = sessionStorage.getItem("tutorUsername");
//   const studentUsername = sessionStorage.getItem("studentUsername");

//   // Load student's bookings
//   useEffect(() => {
//     if (!studentUsername) return;

//     axios
//       .get(`http://localhost:4000/bookings?username=${studentUsername}`)
//       .then((res) => setEvents(res.data))
//       .catch((err) => console.error("Error fetching events:", err));
//   }, [studentUsername]);

//   // Handle selecting a date/time
//   const handleDateSelect = (selectInfo) => {
//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });

//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   // Confirm booking
//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending", // NEW: default status
//       };

//       await axios.post("http://localhost:4000/bookings", newBooking);

//       // Add new booking locally
//       setEvents((prev) => [...prev, newBooking]);
//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   return (
//     <>
//       <Layout />
//       <div style={{ backgroundColor: "white" }}>
//         <div className="p-4">
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             selectable={true}
//             select={handleDateSelect}
//             events={events.map((b) => ({
//               ...b,
//               title: b.status === "accepted" ? "Accepted Session" : "Pending Request",
//               backgroundColor: b.status === "accepted" ? "green" : "yellow", // color-coded
//             }))}
//           />
//         </div>
//       </div>

//       {showPopup && (
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             left: "0",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//           }}
//           onClick={() => setShowPopup(false)}
//         >
//           <div
//             style={{
//               background: "white",
//               padding: "20px",
//               borderRadius: "8px",
//               maxWidth: "400px",
//               width: "100%",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h4>Confirm Your Booking</h4>
//             <p>
//               <strong>Date:</strong> {selectedSlot?.date}
//             </p>

//             <div className="mb-3">
//               <label className="form-label">Start Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customStart}
//                 onChange={(e) => setCustomStart(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">End Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customEnd}
//                 onChange={(e) => setCustomEnd(e.target.value)}
//               />
//             </div>

//             <div className="d-flex justify-content-between mt-3">
//               <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
//                 Cancel
//               </button>
//               <button className="btn btn-primary" onClick={confirmBooking}>
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Calendar;




// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import Layout from "./Layout";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");

//   const tutorUsername = sessionStorage.getItem("tutorUsername");
//   const studentUsername = sessionStorage.getItem("studentUsername");

//   // Load student's bookings
//   useEffect(() => {
//     if (!studentUsername) return;

//     axios
//       .get(`http://localhost:4000/bookings?username=${studentUsername}`)
//       .then((res) => setEvents(res.data))
//       .catch((err) => console.error("Error fetching events:", err));
//   }, [studentUsername]);

//   // Handle selecting a date/time
//   const handleDateSelect = (selectInfo) => {
//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });

//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   // Confirm booking
//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending", // default status
//       };

//       const res = await axios.post("http://localhost:4000/bookings", newBooking);

//       // If backend returns the booking with id, use it for local state
//       const savedBooking = res.data?.id
//         ? { ...newBooking, id: res.data.id }
//         : newBooking;

//       setEvents((prev) => [...prev, savedBooking]);

//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   return (
//     <>
//       <Layout />
//       <div style={{ backgroundColor: "white" }}>
//         <div className="p-4">
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             selectable={true}
//             select={handleDateSelect}
//             events={events.map((b) => ({
//               ...b,
//               title:
//                 b.status === "accepted"
//                   ? "Accepted Session"
//                   : b.status === "rejected"
//                   ? "Rejected Request"
//                   : "Pending Request",
//               backgroundColor:
//                 b.status === "accepted"
//                   ? "green"
//                   : b.status === "rejected"
//                   ? "red"
//                   : "#d4aa00", // dark yellow for readability
//             }))}
//           />
//         </div>
//       </div>

//       {showPopup && (
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             left: "0",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//           }}
//           onClick={() => setShowPopup(false)}
//         >
//           <div
//             style={{
//               background: "white",
//               padding: "20px",
//               borderRadius: "8px",
//               maxWidth: "400px",
//               width: "100%",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h4>Confirm Your Booking</h4>
//             <p>
//               <strong>Date:</strong> {selectedSlot?.date}
//             </p>

//             <div className="mb-3">
//               <label className="form-label">Start Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customStart}
//                 onChange={(e) => setCustomStart(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">End Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customEnd}
//                 onChange={(e) => setCustomEnd(e.target.value)}
//               />
//             </div>

//             <div className="d-flex justify-content-between mt-3">
//               <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
//                 Cancel
//               </button>
//               <button className="btn btn-primary" onClick={confirmBooking}>
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Calendar;




// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import Layout from "./Layout";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);

//   const tutorUsername = sessionStorage.getItem("tutorUsername");
//   const studentUsername = sessionStorage.getItem("studentUsername");

//   // Load student's bookings
//   const fetchBookings = () => {
//     if (!studentUsername) return;

//     setLoading(true);
//     axios
//       .get(`http://localhost:4000/bookings?username=${studentUsername}`)
//       .then((res) => {
//         setEvents(res.data || []);
//       })
//       .catch((err) => {
//         console.error("Error fetching events:", err);
//       })
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBookings();

//     // Optional: auto-refresh every 10s to see changes from teacher
//     const interval = setInterval(fetchBookings, 10000);
//     return () => clearInterval(interval);
//   }, [studentUsername]);

//   // Handle selecting a date/time
//   const handleDateSelect = (selectInfo) => {
//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });

//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   // Confirm booking
//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }

//     if (customEnd <= customStart) {
//       alert("End time must be later than start time.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending", // default status
//       };

//       const res = await axios.post("http://localhost:4000/bookings", newBooking);

//       const savedBooking = res.data?.id
//         ? { ...newBooking, id: res.data.id }
//         : newBooking;

//       setEvents((prev) => [...prev, savedBooking]);

//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // Function to get display title & color based on status
//   const getEventDisplay = (booking) => {
//     switch (booking.status) {
//       case "accepted":
//         return { title: `✅ Accepted Session`, backgroundColor: "green" };
//       case "rejected":
//         return { title: `❌ Rejected Request`, backgroundColor: "red" };
//       default:
//         return { title: `⏳ Pending Request`, backgroundColor: "#d4aa00" }; // dark yellow
//     }
//   };

//   return (
//     <>
//       <Layout />
//       <div style={{ backgroundColor: "white" }}>
//         <div className="p-4">
//           {loading ? (
//             <div className="text-center p-4">Loading calendar...</div>
//           ) : (
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               selectable={true}
//               select={handleDateSelect}
//               events={events.map((b) => {
//                 const display = getEventDisplay(b);
//                 return {
//                   ...b,
//                   title: display.title,
//                   backgroundColor: display.backgroundColor,
//                 };
//               })}
//             />
//           )}
//         </div>
//       </div>

//       {showPopup && (
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             left: "0",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//           }}
//           onClick={() => setShowPopup(false)}
//         >
//           <div
//             style={{
//               background: "white",
//               padding: "20px",
//               borderRadius: "8px",
//               maxWidth: "400px",
//               width: "100%",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h4>Confirm Your Booking</h4>
//             <p>
//               <strong>Date:</strong> {selectedSlot?.date}
//             </p>

//             <div className="mb-3">
//               <label className="form-label">Start Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customStart}
//                 onChange={(e) => setCustomStart(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">End Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customEnd}
//                 onChange={(e) => setCustomEnd(e.target.value)}
//               />
//             </div>

//             <div className="d-flex justify-content-between mt-3">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setShowPopup(false)}
//               >
//                 Cancel
//               </button>
//               <button className="btn btn-primary" onClick={confirmBooking}>
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Calendar;















// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX











// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import Layout from "./Layout";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);

//   const tutorUsername = sessionStorage.getItem("tutorUsername");
//   const studentUsername = sessionStorage.getItem("studentUsername");

//   // Fetch bookings based on role
//   const fetchBookings = () => {
//     const endpoint = studentUsername
//       ? `http://localhost:4000/student/bookings?username=${studentUsername}`
//       : tutorUsername
//       ? `http://localhost:4000/bookings?username=${tutorUsername}`
//       : null;

//     if (!endpoint) return;

//     setLoading(true);
//     axios
//       .get(endpoint)
//       .then((res) => {
//         setEvents(res.data || []);
//       })
//       .catch((err) => {
//         console.error("Error fetching events:", err);
//       })
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBookings();

//     // Refresh every 3 seconds for live updates
//     const interval = setInterval(fetchBookings, 30000);
//     return () => clearInterval(interval);
//   }, [studentUsername, tutorUsername]);

//   // Handle date selection
//   const handleDateSelect = (selectInfo) => {
//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });

//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   // Confirm booking
//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }

//     if (customEnd <= customStart) {
//       alert("End time must be later than start time.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending", // default
//       };

//       const res = await axios.post("http://localhost:4000/bookings", newBooking);

//       const savedBooking = res.data?.id
//         ? { ...newBooking, id: res.data.id }
//         : newBooking;

//       // Instantly update UI
//       setEvents((prev) => [...prev, savedBooking]);

//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // Status display settings
//   const getEventDisplay = (booking) => {
//     switch (booking.status) {
//       case "accepted":
//         return { title: `✅ Accepted Session`, backgroundColor: "green" };
//       case "rejected":
//         return { title: `❌ Rejected Request`, backgroundColor: "red" };
//       default:
//         return { title: `⏳ Pending Request`, backgroundColor: "#d4aa00" };
//     }
//   };

//   return (
//     <>
//       <Layout />
//       <div style={{ backgroundColor: "white" }}>
//         <div className="p-4">
//           {loading ? (
//             <div className="text-center p-4">Loading calendar...</div>
//           ) : (
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               selectable={true}
//               select={handleDateSelect}
//               events={events.map((b) => {
//                 const display = getEventDisplay(b);
//                 return {
//                   ...b,
//                   title: display.title,
//                   backgroundColor: display.backgroundColor,
//                 };
//               })}
//             />
//           )}
//         </div>
//       </div>

//       {showPopup && (
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             left: "0",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//           }}
//           onClick={() => setShowPopup(false)}
//         >
//           <div
//             style={{
//               background: "white",
//               padding: "20px",
//               borderRadius: "8px",
//               maxWidth: "400px",
//               width: "100%",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h4>Confirm Your Booking</h4>
//             <p>
//               <strong>Date:</strong> {selectedSlot?.date}
//             </p>

//             <div className="mb-3">
//               <label className="form-label">Start Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customStart}
//                 onChange={(e) => setCustomStart(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">End Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customEnd}
//                 onChange={(e) => setCustomEnd(e.target.value)}
//               />
//             </div>

//             <div className="d-flex justify-content-between mt-3">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setShowPopup(false)}
//               >
//                 Cancel
//               </button>
//               <button className="btn btn-primary" onClick={confirmBooking}>
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Calendar;




// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import Layout from "./Layout";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);

//   const tutorUsername = sessionStorage.getItem("tutorUsername");
//   const studentUsername = sessionStorage.getItem("studentUsername");

//   // Fetch bookings based on role
//   const fetchBookings = () => {
//     const endpoint = studentUsername
//       ? `http://localhost:4000/student/bookings?username=${studentUsername}`
//       : tutorUsername
//       ? `http://localhost:4000/bookings?username=${tutorUsername}`
//       : null;

//     if (!endpoint) return;

//     setLoading(true);
//     axios
//       .get(endpoint)
//       .then((res) => {
//         setEvents(res.data || []);
//       })
//       .catch((err) => {
//         console.error("Error fetching events:", err);
//       })
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBookings();
//     // const interval = setInterval(fetchBookings, 10000); // Refresh every 3s
//     // return () => clearInterval(interval);
//   }, [studentUsername, tutorUsername]);

//   // Handle date selection
//   const handleDateSelect = (selectInfo) => {
//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });
//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   // Confirm booking
//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }
//     if (customEnd <= customStart) {
//       alert("End time must be later than start time.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       const res = await axios.post("http://localhost:4000/bookings", newBooking);
//       const savedBooking = res.data?.id
//         ? { ...newBooking, id: res.data.id }
//         : newBooking;

//       setEvents((prev) => [...prev, savedBooking]);
//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // Status display
//   const getEventDisplay = (booking) => {
//     switch (booking.status) {
//       case "accepted":
//         return { title: `✅ Accepted Session`, backgroundColor: "#28a745" };
//       case "rejected":
//         return { title: `❌ Rejected Request`, backgroundColor: "#dc3545" };
//       default:
//         return { title: `⏳ Pending Request`, backgroundColor: "#ffc107" };
//     }
//   };

//   return (
//     <>


//       <Layout />
//       <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "30px" }}>
//         <div
//           className="container shadow-lg p-4 rounded"
//           style={{
//             backgroundColor: "white",
//             border: "1px solid #e3e6ea",
//           }}
//         >
//           <h2
//             className="mb-4 text-white p-3 rounded"
//             style={{
//               background: "linear-gradient(90deg, #007bff, #6610f2)",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//             }}
//           >
//             📅 Session Calendar
//           </h2>

//           {loading ? (
//             <div className="text-center p-5">
//               <div className="spinner-border text-primary" role="status"></div>
//               <p className="mt-3">Loading calendar...</p>
//             </div>
//           ) : (
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               selectable={true}
//               select={handleDateSelect}
//               events={events.map((b) => {
//                 const display = getEventDisplay(b);
//                 return {
//                   ...b,
//                   title: display.title,
//                   backgroundColor: display.backgroundColor,
//                 };
//               })}
//               height="80vh"
//             />
//           )}
//         </div>
//       </div>

//       {/* Booking Popup */}
//       {showPopup && (
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{
//             position: "fixed",
//             top: 0, left: 0, width: "100%", height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 9999,
//           }}
//           onClick={() => setShowPopup(false)}
//         >
//           <div
//             className="p-4 rounded shadow-lg"
//             style={{
//               background: "white",
//               width: "400px",
//               animation: "fadeIn 0.3s ease-in-out",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h4 className="mb-3 text-primary">Confirm Your Booking</h4>
//             <p>
//               <strong>Date:</strong> {selectedSlot?.date}
//             </p>

//             <div className="mb-3">
//               <label className="form-label fw-bold">Start Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customStart}
//                 onChange={(e) => setCustomStart(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-bold">End Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customEnd}
//                 onChange={(e) => setCustomEnd(e.target.value)}
//               />
//             </div>

//             <div className="d-flex justify-content-between mt-4">
//               <button
//                 className="btn btn-outline-secondary px-4"
//                 onClick={() => setShowPopup(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="btn btn-primary px-4"
//                 onClick={confirmBooking}
//               >
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Calendar;



// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import Layout from "./Layout";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);

//   const tutorUsername = sessionStorage.getItem("tutorUsername");
//   const studentUsername = sessionStorage.getItem("studentUsername");

//   // Fetch bookings based on role
//   const fetchBookings = () => {
//     const endpoint = studentUsername
//       ? `http://localhost:4000/student/bookings?username=${studentUsername}`
//       : tutorUsername
//       ? `http://localhost:4000/bookings?username=${tutorUsername}`
//       : null;

//     if (!endpoint) return;

//     setLoading(true);
//     axios
//       .get(endpoint)
//       .then((res) => setEvents(res.data || []))
//       .catch((err) => console.error("Error fetching events:", err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [studentUsername, tutorUsername]);

//   // Handle date selection
//   const handleDateSelect = (selectInfo) => {
//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });
//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   // Confirm booking
//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }
//     if (customEnd <= customStart) {
//       alert("End time must be later than start time.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       const res = await axios.post("http://localhost:4000/bookings", newBooking);
//       const savedBooking = res.data?.id ? { ...newBooking, id: res.data.id } : newBooking;

//       setEvents((prev) => [...prev, savedBooking]);
//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // Event display based on status
//   const getEventDisplay = (booking) => {
//     switch (booking.status) {
//       case "accepted":
//         return { title: `✅ Accepted Session`, backgroundColor: "#28a745" };
//       case "rejected":
//         return { title: `❌ Rejected Request`, backgroundColor: "#dc3545" };
//       default:
//         return { title: `⏳ Pending Request`, backgroundColor: "#ffc107" };
//     }
//   };

//   return (
//     <>
//       <Layout />

//       <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "30px" }}>
//         <div className="container shadow-lg p-4 rounded bg-white">
//           <h2
//             className="mb-4 text-white p-3 rounded"
//             style={{
//               background: "linear-gradient(90deg, #007bff, #6610f2)",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//             }}
//           >
//             📅 Session Calendar
//           </h2>

//           {loading ? (
//             <div className="text-center p-5">
//               <div className="spinner-border text-primary" role="status"></div>
//               <p className="mt-3">Loading calendar...</p>
//             </div>
//           ) : (
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               selectable={true}
//               select={handleDateSelect}
//               height="80vh"
//               events={events.map((b) => {
//                 const display = getEventDisplay(b);
//                 return {
//                   ...b,
//                   title: display.title,
//                   backgroundColor: display.backgroundColor,
//                   extendedProps: {
//                     teacherMessage: b.teacherMessage || "No message from teacher",
//                   },
//                 };
//               })}
//               eventDidMount={(info) => {
//                 // Tooltip for accepted sessions
//                 if (
//                   info.event.extendedProps.teacherMessage &&
//                   info.event.title.includes("Accepted")
//                 ) {
//                   const tooltip = document.createElement("div");
//                   tooltip.innerHTML = info.event.extendedProps.teacherMessage;
//                   tooltip.style.position = "absolute";
//                   tooltip.style.background = "#333";
//                   tooltip.style.color = "#fff";
//                   tooltip.style.padding = "5px 10px";
//                   tooltip.style.borderRadius = "5px";
//                   tooltip.style.fontSize = "0.9em";
//                   tooltip.style.pointerEvents = "none";
//                   tooltip.style.zIndex = 9999;
//                   tooltip.style.whiteSpace = "pre-wrap";
//                   tooltip.style.display = "none";
//                   document.body.appendChild(tooltip);

//                   info.el.addEventListener("mouseenter", (e) => {
//                     tooltip.style.display = "block";
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });

//                   info.el.addEventListener("mousemove", (e) => {
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });

//                   info.el.addEventListener("mouseleave", () => {
//                     tooltip.style.display = "none";
//                   });
//                 }
//               }}
//             />
//           )}
//         </div>
//       </div>

//       {/* Booking Popup */}
//       {showPopup && (
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 9999,
//           }}
//           onClick={() => setShowPopup(false)}
//         >
//           <div
//             className="p-4 rounded shadow-lg"
//             style={{ background: "white", width: "400px", animation: "fadeIn 0.3s ease-in-out" }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h4 className="mb-3 text-primary">Confirm Your Booking</h4>
//             <p>
//               <strong>Date:</strong> {selectedSlot?.date}
//             </p>

//             <div className="mb-3">
//               <label className="form-label fw-bold">Start Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customStart}
//                 onChange={(e) => setCustomStart(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-bold">End Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customEnd}
//                 onChange={(e) => setCustomEnd(e.target.value)}
//               />
//             </div>

//             <div className="d-flex justify-content-between mt-4">
//               <button className="btn btn-outline-secondary px-4" onClick={() => setShowPopup(false)}>
//                 Cancel
//               </button>
//               <button className="btn btn-primary px-4" onClick={confirmBooking}>
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Calendar;




// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import Layout from "./Layout";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);

//   const tutorUsername = sessionStorage.getItem("tutorUsername");
//   const studentUsername = sessionStorage.getItem("studentUsername");

//   // Fetch bookings based on role
//   const fetchBookings = () => {
//     const endpoint = studentUsername
//       ? `http://localhost:4000/student/bookings?username=${studentUsername}`
//       : tutorUsername
//       ? `http://localhost:4000/bookings?username=${tutorUsername}`
//       : null;

//     if (!endpoint) return;

//     setLoading(true);
//     axios
//       .get(endpoint)
//       .then((res) => {
//         setEvents(res.data || []);
//       })
//       .catch((err) => console.error("Error fetching events:", err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [studentUsername, tutorUsername]);

//   // Handle date selection
//   const handleDateSelect = (selectInfo) => {
//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });
//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   // Confirm booking
//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }
//     if (customEnd <= customStart) {
//       alert("End time must be later than start time.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       const res = await axios.post("http://localhost:4000/bookings", newBooking);
//       const savedBooking = res.data?.id
//         ? { ...newBooking, id: res.data.id }
//         : newBooking;

//       setEvents((prev) => [...prev, savedBooking]);
//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // Status display
//   const getEventDisplay = (booking) => {
//     switch (booking.status) {
//       case "accepted":
//         return { title: `✅ Accepted Session`, backgroundColor: "#28a745" };
//       case "rejected":
//         return { title: `❌ Rejected Request`, backgroundColor: "#dc3545" };
//       default:
//         return { title: `⏳ Pending Request`, backgroundColor: "#ffc107" };
//     }
//   };

//   return (
//     <>
//       <Layout />
//       <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "30px" }}>
//         <div className="container shadow-lg p-4 rounded" style={{ backgroundColor: "white", border: "1px solid #e3e6ea" }}>
//           <h2 className="mb-4 text-white p-3 rounded" style={{ background: "linear-gradient(90deg, #007bff, #6610f2)", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>
//             📅 Session Calendar
//           </h2>

//           {loading ? (
//             <div className="text-center p-5">
//               <div className="spinner-border text-primary" role="status"></div>
//               <p className="mt-3">Loading calendar...</p>
//             </div>
//           ) : (
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               selectable={true}
//               select={handleDateSelect}
//               events={events.map((b) => {
//                 const display = getEventDisplay(b);
//                 return {
//                   ...b,
//                   title: display.title,
//                   backgroundColor: display.backgroundColor,
//                   extendedProps: {
//                     teacherMessage: b.message || "No message from teacher"
//                   }
//                 };
//               })}
//               eventDidMount={(info) => {
//                 if (info.event.extendedProps.teacherMessage && info.event.title.includes("Accepted")) {
//                   const tooltip = document.createElement("div");
//                   tooltip.innerHTML = info.event.extendedProps.teacherMessage;
//                   tooltip.style.position = "absolute";
                  // tooltip.style.background = "#333";
//                   tooltip.style.color = "#fff";
//                   tooltip.style.padding = "5px 10px";
//                   tooltip.style.borderRadius = "5px";
//                   tooltip.style.fontSize = "0.9em";
//                   tooltip.style.pointerEvents = "none";
//                   tooltip.style.zIndex = 9999;
//                   tooltip.style.whiteSpace = "pre-wrap";
//                   tooltip.style.display = "none";
//                   document.body.appendChild(tooltip);

//                   info.el.addEventListener("mouseenter", (e) => {
//                     tooltip.style.display = "block";
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });

//                   info.el.addEventListener("mousemove", (e) => {
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });

//                   info.el.addEventListener("mouseleave", () => {
//                     tooltip.style.display = "none";
//                   });
//                 }
//               }}
//               height="80vh"
//             />
//           )}
//         </div>
//       </div>

//       {/* Booking Popup */}
//       {showPopup && (
//         <div className="d-flex justify-content-center align-items-center" style={{ position: "fixed", top:0, left:0, width:"100%", height:"100%", backgroundColor:"rgba(0,0,0,0.5)", zIndex:9999 }} onClick={() => setShowPopup(false)}>
//           <div className="p-4 rounded shadow-lg" style={{ background:"white", width:"400px", animation:"fadeIn 0.3s ease-in-out" }} onClick={(e)=>e.stopPropagation()}>
//             <h4 className="mb-3 text-primary">Confirm Your Booking</h4>
//             <p><strong>Date:</strong> {selectedSlot?.date}</p>
//             <div className="mb-3">
//               <label className="form-label fw-bold">Start Time</label>
//               <input type="time" className="form-control" value={customStart} onChange={(e)=>setCustomStart(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label className="form-label fw-bold">End Time</label>
//               <input type="time" className="form-control" value={customEnd} onChange={(e)=>setCustomEnd(e.target.value)} />
//             </div>
//             <div className="d-flex justify-content-between mt-4">
//               <button className="btn btn-outline-secondary px-4" onClick={()=>setShowPopup(false)}>Cancel</button>
//               <button className="btn btn-primary px-4" onClick={confirmBooking}>Send Request</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
//         `}
//       </style>
//     </>
//   );
// };

// export default Calendar;



// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// // import Layout from "./Layout";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);

//   const tutorUsername = sessionStorage.getItem("tutorUsername");
//   const studentUsername = sessionStorage.getItem("studentUsername");

//   const fetchBookings = () => {
//     const endpoint = studentUsername
//       ? `http://localhost:4000/student/bookings?username=${studentUsername}`
//       : tutorUsername
//       ? `http://localhost:4000/bookings?username=${tutorUsername}`
//       : null;

//     if (!endpoint) return;

//     setLoading(true);
//     axios
//       .get(endpoint)
//       .then((res) => setEvents(res.data || []))
//       .catch((err) => console.error("Error fetching events:", err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [studentUsername, tutorUsername]);

//   // Handle date selection with past date check
//   const handleDateSelect = (selectInfo) => {
//     const selectedDate = new Date(selectInfo.startStr);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // reset time

//     if (selectedDate < today) {
//       alert("You cannot book a session in the past!");
//       return;
//     }

//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });
//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }
//     if (customEnd <= customStart) {
//       alert("End time must be later than start time.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       const res = await axios.post("http://localhost:4000/bookings", newBooking);
//       const savedBooking = res.data?.id
//         ? { ...newBooking, id: res.data.id }
//         : newBooking;

//       setEvents((prev) => [...prev, savedBooking]);
//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   const getEventDisplay = (booking) => {
//     switch (booking.status) {
//       case "accepted":
//         return { title: `✅ Accepted Session`, backgroundColor: "#28a745" };
//       case "rejected":
//         return { title: `❌ Rejected Request`, backgroundColor: "#dc3545" };
//       default:
//         return { title: `⏳ Pending Request`, backgroundColor: "#ffc107" };
//     }
//   };

//   return (
//     <>
//       {/* <Layout /> */}
//       <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "30px" }}>
//         <div className="container shadow-lg p-4 rounded" style={{ backgroundColor: "white", border: "1px solid #e3e6ea" }}>
//           <h2 className="mb-4 text-white p-3 rounded" style={{ background: "linear-gradient(90deg, #007bff, #6610f2)", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>
//             📅 Session Calendar
//           </h2>

//           {loading ? (
//             <div className="text-center p-5">
//               <div className="spinner-border text-primary" role="status"></div>
//               <p className="mt-3">Loading calendar...</p>
//             </div>
//           ) : (
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               selectable={true}
//               select={handleDateSelect}
//               validRange={{ start: new Date().toISOString().split("T")[0] }} // disables past dates
//               events={events.map((b) => {
//                 const display = getEventDisplay(b);
//                 return {
//                   ...b,
//                   title: display.title,
//                   backgroundColor: display.backgroundColor,
//                   extendedProps: {
//                     teacherMessage: b.message || "No message from teacher"
//                   }
//                 };
//               })}
//               eventDidMount={(info) => {
//                 if (info.event.extendedProps.teacherMessage && info.event.title.includes("Accepted")) {
//                   const tooltip = document.createElement("div");
//                   tooltip.innerHTML = info.event.extendedProps.teacherMessage;
//                   tooltip.style.position = "absolute";
//                   tooltip.style.background = "#333";
//                   tooltip.style.color = "#fff";
//                   tooltip.style.padding = "5px 10px";
//                   tooltip.style.borderRadius = "5px";
//                   tooltip.style.fontSize = "0.9em";
//                   tooltip.style.pointerEvents = "none";
//                   tooltip.style.zIndex = 9999;
//                   tooltip.style.whiteSpace = "pre-wrap";
//                   tooltip.style.display = "none";
//                   document.body.appendChild(tooltip);

//                   info.el.addEventListener("mouseenter", (e) => {
//                     tooltip.style.display = "block";
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });
//                   info.el.addEventListener("mousemove", (e) => {
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });
//                   info.el.addEventListener("mouseleave", () => {
//                     tooltip.style.display = "none";
//                   });
//                 }
//               }}
//               height="80vh"
//             />
//           )}
//         </div>
//       </div>

//       {/* Booking Popup */}
//       {showPopup && (
//         <div className="d-flex justify-content-center align-items-center" style={{ position: "fixed", top:0, left:0, width:"100%", height:"100%", backgroundColor:"rgba(0,0,0,0.5)", zIndex:9999 }} onClick={() => setShowPopup(false)}>
//           <div className="p-4 rounded shadow-lg" style={{ background:"white", width:"400px", animation:"fadeIn 0.3s ease-in-out" }} onClick={(e)=>e.stopPropagation()}>
//             <h4 className="mb-3 text-primary">Confirm Your Booking</h4>
//             <p><strong>Date:</strong> {selectedSlot?.date}</p>
//             <div className="mb-3">
//               <label className="form-label fw-bold">Start Time</label>
//               <input type="time" className="form-control" value={customStart} onChange={(e)=>setCustomStart(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label className="form-label fw-bold">End Time</label>
//               <input type="time" className="form-control" value={customEnd} onChange={(e)=>setCustomEnd(e.target.value)} />
//             </div>
//             <div className="d-flex justify-content-between mt-4">
//               <button className="btn btn-outline-secondary px-4" onClick={()=>setShowPopup(false)}>Cancel</button>
//               <button className="btn btn-primary px-4" onClick={confirmBooking}>Send Request</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
//         `}
//       </style>
//     </>
//   );
// };

// export default Calendar;




// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);

//   const studentUsername = sessionStorage.getItem("studentUsername");
//   const navigate = useNavigate();

//   // Fetch student’s bookings
//   const fetchBookings = () => {
//     const endpoint = `http://localhost:4000/student/bookings?username=${studentUsername}`;

//     setLoading(true);
//     axios
//       .get(endpoint)
//       .then((res) => setEvents(res.data || []))
//       .catch((err) => console.error("Error fetching events:", err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [studentUsername]);

//   // Handle booking slot selection
//   const handleDateSelect = (selectInfo) => {
//     const selectedDate = new Date(selectInfo.startStr);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (selectedDate < today) {
//       alert("You cannot book a session in the past!");
//       return;
//     }

//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });
//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   // Confirm new booking
//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }
//     if (customEnd <= customStart) {
//       alert("End time must be later than start time.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       const res = await axios.post("http://localhost:4000/bookings", newBooking);
//       const savedBooking = res.data?.id
//         ? { ...newBooking, id: res.data.id }
//         : newBooking;

//       setEvents((prev) => [...prev, savedBooking]);
//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // Display colors & titles for events
//   const getEventDisplay = (booking) => {
//     switch (booking.status) {
//       case "accepted":
//         return { title: `✅ Accepted Session`, backgroundColor: "#28a745" };
//       case "rejected":
//         return { title: `❌ Rejected Request`, backgroundColor: "#dc3545" };
//       default:
//         return { title: `⏳ Pending Request`, backgroundColor: "#ffc107" };
//     }
//   };

//   // Handle click on an event (join call if teacher has started it)
//   const handleEventClick = (info) => {
//     const booking = info.event.extendedProps;

//     if (booking.status === "accepted") {
//       if (booking.roomId) {
//         navigate(`/student-call/${booking.roomId}`);
//       } else {
//         alert("Your session is accepted ✅. Please wait for the teacher to start the call.");
//       }
//     } else if (booking.status === "pending") {
//       alert("Your booking request is still pending ⏳.");
//     } else if (booking.status === "rejected") {
//       alert("This booking was rejected ❌.");
//     }
//   };

//   return (
//     <>
//       <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "30px" }}>
//         <div
//           className="container shadow-lg p-4 rounded"
//           style={{ backgroundColor: "white", border: "1px solid #e3e6ea" }}
//         >
//           <h2
//             className="mb-4 text-white p-3 rounded"
//             style={{
//               background: "linear-gradient(90deg, #007bff, #6610f2)",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//             }}
//           >
//             📅 Student Calendar
//           </h2>

//           {loading ? (
//             <div className="text-center p-5">
//               <div className="spinner-border text-primary" role="status"></div>
//               <p className="mt-3">Loading calendar...</p>
//             </div>
//           ) : (
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               selectable={true}
//               select={handleDateSelect}
//               validRange={{ start: new Date().toISOString().split("T")[0] }}
//               events={events.map((b) => {
//                 const display = getEventDisplay(b);
//                 return {
//                   ...b,
//                   title: display.title,
//                   backgroundColor: display.backgroundColor,
//                   extendedProps: {
//                     ...b,
//                   },
//                 };
//               })}
//               eventClick={handleEventClick}
//               height="80vh"
//             />
//           )}
//         </div>
//       </div>

//       {/* Booking Popup */}
//       {showPopup && (
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 9999,
//           }}
//           onClick={() => setShowPopup(false)}
//         >
//           <div
//             className="p-4 rounded shadow-lg"
//             style={{
//               background: "white",
//               width: "400px",
//               animation: "fadeIn 0.3s ease-in-out",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h4 className="mb-3 text-primary">Confirm Your Booking</h4>
//             <p>
//               <strong>Date:</strong> {selectedSlot?.date}
//             </p>
//             <div className="mb-3">
//               <label className="form-label fw-bold">Start Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customStart}
//                 onChange={(e) => setCustomStart(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label fw-bold">End Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customEnd}
//                 onChange={(e) => setCustomEnd(e.target.value)}
//               />
//             </div>
//             <div className="d-flex justify-content-between mt-4">
//               <button
//                 className="btn btn-outline-secondary px-4"
//                 onClick={() => setShowPopup(false)}
//               >
//                 Cancel
//               </button>
//               <button className="btn btn-primary px-4" onClick={confirmBooking}>
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Calendar;




// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);

//   const studentUsername = sessionStorage.getItem("studentUsername");
//   const navigate = useNavigate();

//   // Fetch student’s bookings
//   const fetchBookings = () => {
//     if (!studentUsername) return;
//     const endpoint = `http://localhost:4000/student/bookings?username=${studentUsername}`;

//     setLoading(true);
//     axios
//       .get(endpoint)
//       .then((res) => setEvents(res.data || []))
//       .catch((err) => console.error("Error fetching events:", err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [studentUsername]);

//   // Handle booking slot selection
//   const handleDateSelect = (selectInfo) => {
//     const selectedDate = new Date(selectInfo.startStr);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (selectedDate < today) {
//       alert("You cannot book a session in the past!");
//       return;
//     }

//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });
//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   // Confirm new booking
//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }
//     if (customEnd <= customStart) {
//       alert("End time must be later than start time.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       const res = await axios.post("http://localhost:4000/bookings", newBooking);
//       const savedBooking = res.data?.id
//         ? { ...newBooking, id: res.data.id }
//         : newBooking;

//       setEvents((prev) => [...prev, savedBooking]);
//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // Display colors & titles for events
//   const getEventDisplay = (booking) => {
//     switch (booking.status) {
//       case "accepted":
//         return { title: `✅ Accepted Session`, backgroundColor: "#28a745" };
//       case "rejected":
//         return { title: `❌ Rejected Request`, backgroundColor: "#dc3545" };
//       default:
//         return { title: `⏳ Pending Request`, backgroundColor: "#ffc107" };
//     }
//   };

//   // Handle click on an event (e.g., join call if available)
//   const handleEventClick = (info) => {
//     const booking = info.event.extendedProps;
//     if (booking.status === "accepted" && booking.roomId) {
//       navigate(`/student-call/${booking.roomId}`);
//     } else if (booking.status === "accepted") {
//       alert("Waiting for teacher to start the call...");
//     }
//   };

//   return (
//     <>
//       <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "30px" }}>
//         <div
//           className="container shadow-lg p-4 rounded"
//           style={{ backgroundColor: "white", border: "1px solid #e3e6ea" }}
//         >
//           <h2
//             className="mb-4 text-white p-3 rounded"
//             style={{
//               background: "linear-gradient(90deg, #007bff, #6610f2)",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//             }}
//           >
//             📅 Student Calendar
//           </h2>

//           {loading ? (
//             <div className="text-center p-5">
//               <div className="spinner-border text-primary" role="status"></div>
//               <p className="mt-3">Loading calendar...</p>
//             </div>
//           ) : (
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               selectable={true}
//               select={handleDateSelect}
//               validRange={{ start: new Date().toISOString().split("T")[0] }}
//               events={events.map((b) => {
//                 const display = getEventDisplay(b);
//                 return {
//                   ...b,
//                   title: display.title,
//                   backgroundColor: display.backgroundColor,
//                   extendedProps: {
//                     ...b, // keep everything (roomId, status, teacherMessage, etc.)
//                   },
//                 };
//               })}
//               eventClick={handleEventClick}
//               eventDidMount={(info) => {
//                 // Tooltip for teacher's message (only on accepted sessions)
//                 if (info.event.extendedProps.status === "accepted" && info.event.extendedProps.message) {
//                   const tooltip = document.createElement("div");
//                   tooltip.innerHTML = info.event.extendedProps.message;
//                   tooltip.style.position = "absolute";
//                   tooltip.style.background = "#333";
//                   tooltip.style.color = "#fff";
//                   tooltip.style.padding = "5px 10px";
//                   tooltip.style.borderRadius = "5px";
//                   tooltip.style.fontSize = "0.9em";
//                   tooltip.style.pointerEvents = "none";
//                   tooltip.style.zIndex = 9999;
//                   tooltip.style.whiteSpace = "pre-wrap";
//                   tooltip.style.display = "none";
//                   document.body.appendChild(tooltip);

//                   info.el.addEventListener("mouseenter", (e) => {
//                     tooltip.style.display = "block";
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });
//                   info.el.addEventListener("mousemove", (e) => {
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });
//                   info.el.addEventListener("mouseleave", () => {
//                     tooltip.style.display = "none";
//                   });
//                 }
//               }}
//               height="80vh"
//             />
//           )}
//         </div>
//       </div>

//       {/* Booking Popup */}
//       {showPopup && (
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 9999,
//           }}
//           onClick={() => setShowPopup(false)}
//         >
//           <div
//             className="p-4 rounded shadow-lg"
//             style={{
//               background: "white",
//               width: "400px",
//               animation: "fadeIn 0.3s ease-in-out",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h4 className="mb-3 text-primary">Confirm Your Booking</h4>
//             <p>
//               <strong>Date:</strong> {selectedSlot?.date}
//             </p>
//             <div className="mb-3">
//               <label className="form-label fw-bold">Start Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customStart}
//                 onChange={(e) => setCustomStart(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label fw-bold">End Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customEnd}
//                 onChange={(e) => setCustomEnd(e.target.value)}
//               />
//             </div>
//             <div className="d-flex justify-content-between mt-4">
//               <button
//                 className="btn btn-outline-secondary px-4"
//                 onClick={() => setShowPopup(false)}
//               >
//                 Cancel
//               </button>
//               <button className="btn btn-primary px-4" onClick={confirmBooking}>
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Calendar;



// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {socket} from "./socket";


// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);

//   const studentUsername = sessionStorage.getItem("studentUsername");
//   const navigate = useNavigate();




// useEffect(() => {
//   const username = sessionStorage.getItem("studentUsername");
//   if (username) {
//     socket.emit("student-online", username);
//   }
// }, []);



//   // Fetch student’s bookings (with polling for live updates)
//   const fetchBookings = () => {
//     if (!studentUsername) return;
//     const endpoint = `http://localhost:4000/student/bookings?username=${studentUsername}`;

//     setLoading(true);
//     axios
//       .get(endpoint)
//       .then((res) => setEvents(res.data || []))
//       .catch((err) => console.error("Error fetching events:", err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBookings();
//     // Poll every 5 seconds for live updates (roomId, status, etc.)
//     const interval = setInterval(fetchBookings, 5000);
//     return () => clearInterval(interval);
//   }, [studentUsername]);

//   // Handle booking slot selection
//   const handleDateSelect = (selectInfo) => {
//     const selectedDate = new Date(selectInfo.startStr);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (selectedDate < today) {
//       alert("You cannot book a session in the past!");
//       return;
//     }

//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });
//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   // Confirm new booking
//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }
//     if (customEnd <= customStart) {
//       alert("End time must be later than start time.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       const res = await axios.post("http://localhost:4000/bookings", newBooking);
//       const savedBooking = res.data?.id
//         ? { ...newBooking, id: res.data.id }
//         : newBooking;

//       setEvents((prev) => [...prev, savedBooking]);
//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // Display colors & titles for events
//   const getEventDisplay = (booking) => {
//     switch (booking.status) {
//       case "accepted":
//         return { title: `✅ Accepted Session`, backgroundColor: "#28a745" };
//       case "rejected":
//         return { title: `❌ Rejected Request`, backgroundColor: "#dc3545" };
//       default:
//         return { title: `⏳ Pending Request`, backgroundColor: "#ffc107" };
//     }
//   };

//   // Handle click on an event (join call if available)
//   const handleEventClick = (info) => {
//     const booking = info.event.extendedProps;
//     if (booking.status === "accepted" && booking.roomId) {
//       navigate(`/student-call/${booking.roomId}`);
//     } else if (booking.status === "accepted") {
//       alert("Waiting for teacher to start the call...");
//     } else if (booking.status === "pending") {
//       alert("Your booking request is still pending ⏳.");
//     } else if (booking.status === "rejected") {
//       alert("This booking was rejected ❌.");
//     }
//   };

//   return (
//     <>
//       <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "30px" }}>
//         <div
//           className="container shadow-lg p-4 rounded"
//           style={{ backgroundColor: "white", border: "1px solid #e3e6ea" }}
//         >
//           <h2
//             className="mb-4 text-white p-3 rounded"
//             style={{
//               background: "linear-gradient(90deg, #007bff, #6610f2)",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//             }}
//           >
//             📅 Student Calendar
//           </h2>

//           {loading ? (
//             <div className="text-center p-5">
//               <div className="spinner-border text-primary" role="status"></div>
//               <p className="mt-3">Loading calendar...</p>
//             </div>
//           ) : (
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               selectable={true}
//               select={handleDateSelect}
//               validRange={{ start: new Date().toISOString().split("T")[0] }}
//               events={events.map((b) => {
//                 const display = getEventDisplay(b);
//                 return {
//                   ...b,
//                   title: display.title,
//                   backgroundColor: display.backgroundColor,
//                   extendedProps: {
//                     ...b,
//                   },
//                 };
//               })}
//               eventClick={handleEventClick}
//               eventDidMount={(info) => {
//                 // Tooltip for teacher's message (only on accepted sessions)
//                 if (
//                   info.event.extendedProps.status === "accepted" &&
//                   info.event.extendedProps.message
//                 ) {
//                   const tooltip = document.createElement("div");
//                   tooltip.innerHTML = info.event.extendedProps.message;
//                   tooltip.style.position = "absolute";
//                   tooltip.style.background = "#333";
//                   tooltip.style.color = "#fff";
//                   tooltip.style.padding = "5px 10px";
//                   tooltip.style.borderRadius = "5px";
//                   tooltip.style.fontSize = "0.9em";
//                   tooltip.style.pointerEvents = "none";
//                   tooltip.style.zIndex = 9999;
//                   tooltip.style.whiteSpace = "pre-wrap";
//                   tooltip.style.display = "none";
//                   document.body.appendChild(tooltip);

//                   info.el.addEventListener("mouseenter", (e) => {
//                     tooltip.style.display = "block";
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });
//                   info.el.addEventListener("mousemove", (e) => {
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });
//                   info.el.addEventListener("mouseleave", () => {
//                     tooltip.style.display = "none";
//                   });
//                 }
//               }}
//               height="80vh"
//             />
//           )}
//         </div>
//       </div>

//       {/* Booking Popup */}
//       {showPopup && (
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 9999,
//           }}
//           onClick={() => setShowPopup(false)}
//         >
//           <div
//             className="p-4 rounded shadow-lg"
//             style={{
//               background: "white",
//               width: "400px",
//               animation: "fadeIn 0.3s ease-in-out",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h4 className="mb-3 text-primary">Confirm Your Booking</h4>
//             <p>
//               <strong>Date:</strong> {selectedSlot?.date}
//             </p>
//             <div className="mb-3">
//               <label className="form-label fw-bold">Start Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customStart}
//                 onChange={(e) => setCustomStart(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label fw-bold">End Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customEnd}
//                 onChange={(e) => setCustomEnd(e.target.value)}
//               />
//             </div>
//             <div className="d-flex justify-content-between mt-4">
//               <button
//                 className="btn btn-outline-secondary px-4"
//                 onClick={() => setShowPopup(false)}
//               >
//                 Cancel
//               </button>
//               <button className="btn btn-primary px-4" onClick={confirmBooking}>
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Calendar;





// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { socket } from "./socket";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);

//   const studentUsername = sessionStorage.getItem("studentUsername");
//   const navigate = useNavigate();

//   // mark student online
//   useEffect(() => {
//     const username = sessionStorage.getItem("studentUsername");
//     if (username) {
//       socket.emit("student-online", username);
//     }
//   }, []);

//   // fetch bookings
//   const fetchBookings = async () => {
//     if (!studentUsername) return;
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `http://localhost:4000/student/bookings?username=${studentUsername}`
//       );
//       setEvents(res.data || []);
//     } catch (err) {
//       console.error("Error fetching events:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // polling for bookings
//   useEffect(() => {
//     if (!studentUsername) return;
//     fetchBookings();
//     const interval = setInterval(fetchBookings, 5000);
//     return () => clearInterval(interval);
//   }, [studentUsername]);

//   // when user selects a slot
//   const handleDateSelect = (selectInfo) => {
//     // prevent fullcalendar’s default navigation
//     selectInfo.jsEvent.preventDefault();

//     const selectedDate = new Date(selectInfo.startStr);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (selectedDate < today) {
//       alert("You cannot book a session in the past!");
//       return;
//     }

//     setSelectedSlot({
//       date: selectInfo.startStr.split("T")[0],
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//     });
//     setCustomStart(selectInfo.startStr.substring(11, 16));
//     setCustomEnd(selectInfo.endStr.substring(11, 16));
//     setShowPopup(true);
//   };

//   // confirm booking
//   const confirmBooking = async () => {
//     if (!customStart || !customEnd) {
//       alert("Please select both start and end times.");
//       return;
//     }
//     if (customEnd <= customStart) {
//       alert("End time must be later than start time.");
//       return;
//     }

//     const startDateTime = `${selectedSlot.date} ${customStart}:00`;
//     const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

//     try {
//       const newBooking = {
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       const res = await axios.post("http://localhost:4000/bookings", newBooking, {
//         headers: { "Content-Type": "application/json" },
//       });

//       const savedBooking = res.data?._id
//         ? { ...newBooking, id: res.data._id }
//         : newBooking;

//       setEvents((prev) => [...prev, savedBooking]);
//       alert("Booking request sent!");
//     } catch (err) {
//       console.error("Error booking session:", err);
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // colors and titles
//   const getEventDisplay = (booking) => {
//     switch (booking.status) {
//       case "accepted":
//         return { title: `✅ Accepted Session`, backgroundColor: "#28a745" };
//       case "rejected":
//         return { title: `❌ Rejected Request`, backgroundColor: "#dc3545" };
//       default:
//         return { title: `⏳ Pending Request`, backgroundColor: "#ffc107" };
//     }
//   };

//   // event click
//   const handleEventClick = (info) => {
//     const booking = info.event.extendedProps;
//     if (booking.status === "accepted" && booking.roomId) {
//       navigate(`/student-call/${booking.roomId}`);
//     } else if (booking.status === "accepted") {
//       alert("Waiting for teacher to start the call...");
//     } else if (booking.status === "pending") {
//       alert("Your booking request is still pending ⏳.");
//     } else if (booking.status === "rejected") {
//       alert("This booking was rejected ❌.");
//     }
//   };

//   return (
//     <>
//       <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "30px" }}>
//         <div
//           className="container shadow-lg p-4 rounded"
//           style={{ backgroundColor: "white", border: "1px solid #e3e6ea" }}
//         >
//           <h2
//             className="mb-4 text-white p-3 rounded"
//             style={{
//               background: "linear-gradient(90deg, #007bff, #6610f2)",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//             }}
//           >
//             📅 Student Calendar
//           </h2>

//           {loading ? (
//             <div className="text-center p-5">
//               <div className="spinner-border text-primary" role="status"></div>
//               <p className="mt-3">Loading calendar...</p>
//             </div>
//           ) : (
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               selectable={true}
//               select={handleDateSelect}
//               validRange={{ start: new Date().toISOString().split("T")[0] }}
//               events={events.map((b) => {
//                 const display = getEventDisplay(b);
//                 return {
//                   ...b,
//                   title: display.title,
//                   backgroundColor: display.backgroundColor,
//                   extendedProps: {
//                     ...b,
//                   },
//                 };
//               })}
//               eventClick={handleEventClick}
//               eventDidMount={(info) => {
//                 if (
//                   info.event.extendedProps.status === "accepted" &&
//                   info.event.extendedProps.message
//                 ) {
//                   const tooltip = document.createElement("div");
//                   tooltip.innerHTML = info.event.extendedProps.message;
//                   tooltip.style.position = "absolute";
//                   tooltip.style.background = "#333";
//                   tooltip.style.color = "#fff";
//                   tooltip.style.padding = "5px 10px";
//                   tooltip.style.borderRadius = "5px";
//                   tooltip.style.fontSize = "0.9em";
//                   tooltip.style.pointerEvents = "none";
//                   tooltip.style.zIndex = 9999;
//                   tooltip.style.whiteSpace = "pre-wrap";
//                   tooltip.style.display = "none";
//                   document.body.appendChild(tooltip);

//                   info.el.addEventListener("mouseenter", (e) => {
//                     tooltip.style.display = "block";
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });
//                   info.el.addEventListener("mousemove", (e) => {
//                     tooltip.style.top = e.pageY + 10 + "px";
//                     tooltip.style.left = e.pageX + 10 + "px";
//                   });
//                   info.el.addEventListener("mouseleave", () => {
//                     tooltip.style.display = "none";
//                   });
//                 }
//               }}
//               height="80vh"
//             />
//           )}
//         </div>
//       </div>

//       {/* Booking Popup */}
//       {showPopup && (
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 9999,
//           }}
//           onClick={() => setShowPopup(false)}
//         >
//           <div
//             className="p-4 rounded shadow-lg"
//             style={{
//               background: "white",
//               width: "400px",
//               animation: "fadeIn 0.3s ease-in-out",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h4 className="mb-3 text-primary">Confirm Your Booking</h4>
//             <p>
//               <strong>Date:</strong> {selectedSlot?.date}
//             </p>
//             <div className="mb-3">
//               <label className="form-label fw-bold">Start Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customStart}
//                 onChange={(e) => setCustomStart(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label fw-bold">End Time</label>
//               <input
//                 type="time"
//                 className="form-control"
//                 value={customEnd}
//                 onChange={(e) => setCustomEnd(e.target.value)}
//               />
//             </div>
//             <div className="d-flex justify-content-between mt-4">
//               <button
//                 className="btn btn-outline-secondary px-4"
//                 onClick={() => setShowPopup(false)}
//               >
//                 Cancel
//               </button>
//               <button className="btn btn-primary px-4" onClick={confirmBooking}>
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Calendar;































































































































import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [loading, setLoading] = useState(true);

  const studentUsername = sessionStorage.getItem("studentUsername");
  const navigate = useNavigate();

  // Fetch student’s bookings
  const fetchBookings = () => {
    const endpoint = `http://localhost:4000/student/bookings?username=${studentUsername}`;

    setLoading(true);
    axios
      .get(endpoint)
      .then((res) => setEvents(res.data || []))
      .catch((err) => console.error("Error fetching events:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, [studentUsername]);

  // Handle booking slot selection
  const handleDateSelect = (selectInfo) => {
    const selectedDate = new Date(selectInfo.startStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("You cannot book a session in the past!");
      return;
    }

    setSelectedSlot({
      date: selectInfo.startStr.split("T")[0],
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setCustomStart(selectInfo.startStr.substring(11, 16));
    setCustomEnd(selectInfo.endStr.substring(11, 16));
    setShowPopup(true);
  };

  // Confirm new booking
  const confirmBooking = async () => {
    if (!customStart || !customEnd) {
      alert("Please select both start and end times.");
      return;
    }
    if (customEnd <= customStart) {
      alert("End time must be later than start time.");
      return;
    }

    const startDateTime = `${selectedSlot.date} ${customStart}:00`;
    const endDateTime = `${selectedSlot.date} ${customEnd}:00`;

    const tutorUsername = sessionStorage.getItem("tutorUsername");

    try {
      const newBooking = {
        tutorUsername,
        studentUsername,
        start: startDateTime,
        end: endDateTime,
        status: "pending",
      };

      const res = await axios.post("http://localhost:4000/bookings", newBooking);
      const savedBooking = res.data?.id
        ? { ...newBooking, id: res.data.id }
        : newBooking;

      setEvents((prev) => [...prev, savedBooking]);
      alert("Booking request sent!");
    } catch (err) {
      console.error("Error booking session:", err);
    } finally {
      setShowPopup(false);
      setSelectedSlot(null);
    }
  };

  // Display colors & titles for events
  const getEventDisplay = (booking) => {
    switch (booking.status) {
      case "accepted":
        return { title: `✅ Accepted Session`, backgroundColor: "#28a745" };
      case "rejected":
        return { title: `❌ Rejected Request`, backgroundColor: "#dc3545" };
      default:
        return { title: `⏳ Pending Request`, backgroundColor: "#ffc107" };
    }
  };

  // Handle click on an event (e.g., join call if available)
  const handleEventClick = (info) => {
    const booking = info.event.extendedProps;
    if (booking.status === "accepted" && booking.roomId) {
      navigate(`/student-call/${booking.roomId}`);
    } else if (booking.status === "accepted") {
      alert("Waiting for teacher to start the call...");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "30px" }}>
        <div
          className="container shadow-lg p-4 rounded"
          style={{ backgroundColor: "white", border: "1px solid #e3e6ea" }}
        >
          <h2
            className="mb-4 text-white p-3 rounded"
            style={{
              background: "linear-gradient(90deg, #007bff, #6610f2)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            📅 Student Calendar
          </h2>

          {loading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-3">Loading calendar...</p>
            </div>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectable={true}
              select={handleDateSelect}
              validRange={{ start: new Date().toISOString().split("T")[0] }}
              events={events.map((b) => {
                const display = getEventDisplay(b);
                return {
                  ...b,
                  title: display.title,
                  backgroundColor: display.backgroundColor,
                  extendedProps: {
                    ...b,
                  },
                };
              })}
              eventClick={handleEventClick}
              height="80vh"
            />
          )}
        </div>
      </div>

      {/* Booking Popup */}
      {showPopup && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            className="p-4 rounded shadow-lg"
            style={{
              background: "white",
              width: "400px",
              animation: "fadeIn 0.3s ease-in-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="mb-3 text-primary">Confirm Your Booking</h4>
            <p>
              <strong>Date:</strong> {selectedSlot?.date}
            </p>
            <div className="mb-3">
              <label className="form-label fw-bold">Start Time</label>
              <input
                type="time"
                className="form-control"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">End Time</label>
              <input
                type="time"
                className="form-control"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary px-4"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary px-4" onClick={confirmBooking}>
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </>
  );
};

export default Calendar;
