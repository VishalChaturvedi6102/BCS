



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

//     const tutorUsername = sessionStorage.getItem("tutorUsername");

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
// import { socket } from "./socket";
// import { Modal, Button, Alert, Spinner } from "react-bootstrap";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showIncomingCall, setShowIncomingCall] = useState(false);
//   const [callData, setCallData] = useState(null);

//   const studentUsername = sessionStorage.getItem("studentUsername");
//   const token = sessionStorage.getItem("token");
//   const navigate = useNavigate();

//   // Fetch student's bookings
//   const fetchBookings = () => {
//     const endpoint = `http://localhost:4000/student/bookings?username=${studentUsername}`;

//     setLoading(true);
//     axios
//       .get(endpoint, { headers: { Authorization: `Bearer ${token}` } })
//       .then((res) => setEvents(res.data || []))
//       .catch((err) => console.error("Error fetching events:", err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBookings();
    
//     // Set up socket listeners
//     socket.on("incoming-call", (data) => {
//       setCallData(data);
//       setShowIncomingCall(true);
//     });
    
//     socket.on("booking-update", (data) => {
//       // Refresh bookings when there's an update
//       fetchBookings();
      
//       if (data.status === "accepted") {
//         alert(`Your booking has been accepted! ${data.message ? `Message: ${data.message}` : ''}`);
//       } else if (data.status === "rejected") {
//         alert("Your booking request has been rejected.");
//       }
//     });
    
//     // Emit that student is online
//     socket.emit("student-online", studentUsername);

//     return () => {
//       socket.off("incoming-call");
//       socket.off("booking-update");
//     };
//   }, [studentUsername, token]);

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

//     const startDateTime = `${selectedSlot.date}T${customStart}:00`;
//     const endDateTime = `${selectedSlot.date}T${customEnd}:00`;

//     const tutorUsername = sessionStorage.getItem("tutorUsername");

//     try {
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       await axios.post(
//         "http://localhost:4000/bookings", 
//         newBooking,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       alert("Booking request sent!");
//       fetchBookings(); // Refresh the calendar
//     } catch (err) {
//       console.error("Error booking session:", err);
//       alert("Error creating booking. Please try again.");
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // Handle incoming call
//   const handleIncomingCall = (accept) => {
//     setShowIncomingCall(false);
//     if (accept && callData) {
//       navigate(`/call?roomId=${callData.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
//     }
//   };

//   // Display colors & titles for events
//   const getEventDisplay = (booking) => {
//     switch (booking.status) {
//       case "accepted":
//         return { title: `✅ ${booking.tutorUsername}`, backgroundColor: "#28a745" };
//       case "rejected":
//         return { title: `❌ ${booking.tutorUsername}`, backgroundColor: "#dc3545" };
//       default:
//         return { title: `⏳ ${booking.tutorUsername}`, backgroundColor: "#ffc107" };
//     }
//   };

//   // Handle click on an event
//   const handleEventClick = (info) => {
//     const booking = info.event.extendedProps;
//     if (booking.status === "accepted" && booking.roomId) {
//       navigate(`/call?roomId=${booking.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
//     } else if (booking.status === "accepted") {
//       alert("Waiting for teacher to start the call...");
//     } else if (booking.status === "pending") {
//       alert("Your booking request is still pending approval.");
//     } else {
//       alert("This booking was rejected. Please create a new one.");
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

//           <Alert variant="info" className="mb-3">
//             Click on a time slot to book a session with your tutor. Click on an existing booking to view details.
//           </Alert>

//           {loading ? (
//             <div className="text-center p-5">
//               <Spinner animation="border" role="status" className="text-primary" />
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
//                   id: b.id,
//                   title: display.title,
//                   start: b.start,
//                   end: b.end,
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

//       {/* Incoming Call Modal */}
//       <Modal show={showIncomingCall} onHide={() => handleIncomingCall(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Incoming Video Call</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             <strong>{callData?.tutorUsername}</strong> is starting a video call for your session.
//           </p>
//           <p>Would you like to join now?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => handleIncomingCall(false)}>
//             Decline
//           </Button>
//           <Button variant="primary" onClick={() => handleIncomingCall(true)}>
//             Accept Call
//           </Button>
//         </Modal.Footer>
//       </Modal>

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





// import React, { useEffect, useState, useCallback } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { socket } from "./socket";
// import { Modal, Button, Alert, Spinner, Card, Container } from "react-bootstrap";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showIncomingCall, setShowIncomingCall] = useState(false);
//   const [callData, setCallData] = useState(null);
//   const [onlineStatus, setOnlineStatus] = useState({});

//   const studentUsername = sessionStorage.getItem("studentUsername");
//   const token = sessionStorage.getItem("token");
//   const navigate = useNavigate();

//   // Fetch student's bookings
//   const fetchBookings = useCallback(() => {
//     const endpoint = `http://localhost:4000/student/bookings?username=${studentUsername}`;

//     setLoading(true);
//     axios
//       .get(endpoint, { headers: { Authorization: `Bearer ${token}` } })
//       .then((res) => {
//         const bookings = res.data || [];
//         setEvents(bookings);
        
//         // Update online status for tutors
//         const statusUpdate = {};
//         bookings.forEach(b => {
//           statusUpdate[b.tutorUsername] = false; // Default to offline
//         });
//         setOnlineStatus(statusUpdate);
//       })
//       .catch((err) => console.error("Error fetching events:", err))
//       .finally(() => setLoading(false));
//   }, [studentUsername, token]);

//   useEffect(() => {
//     fetchBookings();
    
//     // Set up socket listeners
//     socket.on("incoming-call", (data) => {
//       setCallData(data);
//       setShowIncomingCall(true);
//     });
    
//     socket.on("booking-update", (data) => {
//       // Refresh bookings when there's an update
//       fetchBookings();
      
//       if (data.status === "accepted") {
//         alert(`Your booking has been accepted! ${data.message ? `Message: ${data.message}` : ''}`);
//       } else if (data.status === "rejected") {
//         alert("Your booking request has been rejected.");
//       }
//     });
    
//     socket.on("teacher-online", (data) => {
//       setOnlineStatus(prev => ({
//         ...prev,
//         [data.username]: true
//       }));
//     });
    
//     socket.on("user-disconnected", (socketId) => {
//       // We can't directly map socketId to username here, so we'll just refresh
//       // the online status on next fetch
//     });

//     // Emit that student is online
//     socket.emit("student-online", studentUsername);

//     return () => {
//       socket.off("incoming-call");
//       socket.off("booking-update");
//       socket.off("teacher-online");
//       socket.off("user-disconnected");
//     };
//   }, [studentUsername, token, fetchBookings]);

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

//     const startDateTime = `${selectedSlot.date}T${customStart}:00`;
//     const endDateTime = `${selectedSlot.date}T${customEnd}:00`;

//     const tutorUsername = sessionStorage.getItem("tutorUsername");

//     try {
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       await axios.post(
//         "http://localhost:4000/bookings", 
//         newBooking,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       alert("Booking request sent!");
//       fetchBookings(); // Refresh the calendar
//     } catch (err) {
//       console.error("Error booking session:", err);
//       if (err.response?.status === 409) {
//         alert("This time slot is already booked. Please choose another time.");
//       } else {
//         alert("Error creating booking. Please try again.");
//       }
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // Handle incoming call
//   const handleIncomingCall = (accept) => {
//     setShowIncomingCall(false);
//     if (accept && callData) {
//       navigate(`/call?roomId=${callData.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
//     }
//   };

//   // Join an existing call
//   const joinCall = async (bookingId) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/get-call/${bookingId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.roomId) {
//         navigate(`/call?roomId=${response.data.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
//       } else {
//         alert("No active call for this booking. The teacher needs to start the call first.");
//       }
//     } catch (err) {
//       console.error("Error joining call:", err);
//       alert("Could not join call. Please try again.");
//     }
//   };

//   // Display colors & titles for events
//   const getEventDisplay = (booking) => {
//     const isTutorOnline = onlineStatus[booking.tutorUsername];
//     const onlineIndicator = isTutorOnline ? " 🟢" : " 🔴";
    
//     switch (booking.status) {
//       case "accepted":
//         return { 
//           title: `✅ ${booking.tutorUsername}${onlineIndicator}`, 
//           backgroundColor: "#28a745" 
//         };
//       case "rejected":
//         return { 
//           title: `❌ ${booking.tutorUsername}`, 
//           backgroundColor: "#dc3545" 
//         };
//       default:
//         return { 
//           title: `⏳ ${booking.tutorUsername}${onlineIndicator}`, 
//           backgroundColor: "#ffc107" 
//         };
//     }
//   };

//   // Handle click on an event
//   const handleEventClick = (info) => {
//     const booking = info.event.extendedProps;
    
//     if (booking.status === "accepted") {
//       if (booking.roomId) {
//         // Join existing call
//         // navigate(`/call?roomId=${booking.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
//         navigate(`/video-call?roomId=${callData.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
//       } else {
//         // No call started yet
//         alert("Waiting for teacher to start the call. You'll be notified when they do.");
//       }
//     } else if (booking.status === "pending") {
//       alert("Your booking request is still pending approval.");
//     } else {
//       alert("This booking was rejected. Please create a new one.");
//     }
//   };

//   // Event content rendering
//   const eventContent = (eventInfo) => {
//     const booking = eventInfo.event.extendedProps;
//     const display = getEventDisplay(booking);
    
//     return (
//       <div
//         style={{
//           backgroundColor: display.backgroundColor,
//           color: "white",
//           padding: "4px 6px",
//           borderRadius: "4px",
//           width: "100%",
//           fontWeight: "500",
//           fontSize: "0.9rem",
//           textAlign: "center",
//         }}
//       >
//         {display.title}
//       </div>
//     );
//   };

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
//             📅 Student's Session Calendar
//           </h3>
          
//           <Alert variant="info" className="mb-3">
//             <strong>Status Indicators:</strong> 🟢 Tutor online | 🔴 Tutor offline
//           </Alert>

//           {loading ? (
//             <div className="text-center p-5">
//               <Spinner animation="border" role="status" className="text-primary" />
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
//                   id: b.id,
//                   title: display.title,
//                   start: b.start,
//                   end: b.end,
//                   backgroundColor: display.backgroundColor,
//                   extendedProps: {
//                     ...b,
//                   },
//                 };
//               })}
//               eventContent={eventContent}
//               eventClick={handleEventClick}
//               height="80vh"
//             />
//           )}
//         </Card.Body>
//       </Card>

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

//       {/* Incoming Call Modal */}
//       <Modal show={showIncomingCall} onHide={() => handleIncomingCall(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Incoming Video Call</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             <strong>{callData?.tutorUsername}</strong> is starting a video call for your session.
//           </p>
//           <p>Would you like to join now?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => handleIncomingCall(false)}>
//             Decline
//           </Button>
//           <Button variant="primary" onClick={() => handleIncomingCall(true)}>
//             Accept Call
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//           }
//         `}
//       </style>
//     </Container>
//   );
// };

// export default Calendar;




// import React, { useEffect, useState, useCallback } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { socket } from "./socket";
// import { Modal, Button, Alert, Spinner, Card, Container } from "react-bootstrap";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showIncomingCall, setShowIncomingCall] = useState(false);
//   const [callData, setCallData] = useState(null);
//   const [onlineStatus, setOnlineStatus] = useState({});
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const studentUsername = sessionStorage.getItem("studentUsername");
//   const token = sessionStorage.getItem("token");
//   const navigate = useNavigate();

//   // Fetch student's bookings
//   const fetchBookings = useCallback(() => {
//     const endpoint = `http://localhost:4000/student/bookings?username=${studentUsername}`;

//     setLoading(true);
//     setError("");
//     axios
//       .get(endpoint, { 
//         headers: { Authorization: `Bearer ${token}` },
//         timeout: 10000
//       })
//       .then((res) => {
//         const bookings = res.data || [];
//         setEvents(bookings);
        
//         // Update online status for tutors
//         const statusUpdate = {};
//         bookings.forEach(b => {
//           statusUpdate[b.tutorUsername] = false;
//         });
//         setOnlineStatus(statusUpdate);
//       })
//       .catch((err) => {
//         console.error("Error fetching events:", err);
//         setError("Failed to load bookings. Please try again.");
//       })
//       .finally(() => setLoading(false));
//   }, [studentUsername, token]);

//   useEffect(() => {
//     fetchBookings();
    
//     // Socket event handlers
//     const handleIncomingCall = (data) => {
//       setCallData(data);
//       setShowIncomingCall(true);
//     };
    
//     const handleBookingUpdate = (data) => {
//       fetchBookings();
      
//       if (data.status === "accepted") {
//         setSuccess(`Your booking has been accepted! ${data.message ? `Message: ${data.message}` : ''}`);
//       } else if (data.status === "rejected") {
//         setError("Your booking request has been rejected.");
//       }
//     };
    
//     const handleTeacherOnline = (data) => {
//       setOnlineStatus(prev => ({
//         ...prev,
//         [data.username]: true
//       }));
//     };
    
//     const handleUserDisconnected = (socketId) => {
//       // Handle disconnection if needed
//     };

//     // Set up socket listeners
//     socket.on("incoming-call", handleIncomingCall);
//     socket.on("booking-update", handleBookingUpdate);
//     socket.on("teacher-online", handleTeacherOnline);
//     socket.on("user-disconnected", handleUserDisconnected);

//     // Emit that student is online
//     if (socket.connected) {
//       socket.emit("student-online", studentUsername);
//     } else {
//       socket.once("connect", () => {
//         socket.emit("student-online", studentUsername);
//       });
//     }

//     return () => {
//       socket.off("incoming-call", handleIncomingCall);
//       socket.off("booking-update", handleBookingUpdate);
//       socket.off("teacher-online", handleTeacherOnline);
//       socket.off("user-disconnected", handleUserDisconnected);
//     };
//   }, [studentUsername, token, fetchBookings]);

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

//     const startDateTime = `${selectedSlot.date}T${customStart}:00`;
//     const endDateTime = `${selectedSlot.date}T${customEnd}:00`;

//     const tutorUsername = sessionStorage.getItem("tutorUsername");

//     try {
//       setError("");
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       await axios.post(
//         "http://localhost:4000/bookings", 
//         newBooking,
//         { 
//           headers: { Authorization: `Bearer ${token}` },
//           timeout: 5000
//         }
//       );
      
//       setSuccess("Booking request sent!");
//       fetchBookings();
//     } catch (err) {
//       console.error("Error booking session:", err);
//       if (err.response?.status === 409) {
//         setError("This time slot is already booked. Please choose another time.");
//       } else {
//         setError("Error creating booking. Please try again.");
//       }
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // Handle incoming call - UPDATED FOR VIDEO CALL
//   const handleIncomingCall = (accept) => {
//     setShowIncomingCall(false);
//     if (accept && callData) {
//       navigate(`/video-call?roomId=${callData.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
//     }
//   };

//   // Join an existing call - UPDATED FOR VIDEO CALL
//   const joinCall = async (bookingId, tutorUsername) => {
//     try {
//       setError("");
//       const response = await axios.get(`http://localhost:4000/get-call/${bookingId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         timeout: 5000
//       });
      
//       if (response.data.roomId) {
//         navigate(`/video-call?roomId=${response.data.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
//       } else {
//         setError("No active call for this booking. The teacher needs to start the call first.");
//       }
//     } catch (err) {
//       console.error("Error joining call:", err);
//       setError("Could not join call. Please try again.");
//     }
//   };

//   // Display colors & titles for events
//   const getEventDisplay = (booking) => {
//     const isTutorOnline = onlineStatus[booking.tutorUsername];
//     const onlineIndicator = isTutorOnline ? " 🟢" : " 🔴";
    
//     switch (booking.status) {
//       case "accepted":
//         return { 
//           title: `✅ ${booking.tutorUsername}${onlineIndicator}`, 
//           backgroundColor: "#28a745" 
//         };
//       case "rejected":
//         return { 
//           title: `❌ ${booking.tutorUsername}`, 
//           backgroundColor: "#dc3545" 
//         };
//       default:
//         return { 
//           title: `⏳ ${booking.tutorUsername}${onlineIndicator}`, 
//           backgroundColor: "#ffc107" 
//         };
//     }
//   };

//   // Handle click on an event - UPDATED FOR VIDEO CALL
//   const handleEventClick = (info) => {
//     const booking = info.event.extendedProps;
    
//     if (booking.status === "accepted") {
//       if (booking.roomId) {
//         // Join existing call using video-call route
//         navigate(`/video-call?roomId=${booking.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
//       } else {
//         // No call started yet
//         setError("Waiting for teacher to start the call. You'll be notified when they do.");
//       }
//     } else if (booking.status === "pending") {
//       setError("Your booking request is still pending approval.");
//     } else {
//       setError("This booking was rejected. Please create a new one.");
//     }
//   };

//   // Event content rendering
//   const eventContent = (eventInfo) => {
//     const booking = eventInfo.event.extendedProps;
//     const display = getEventDisplay(booking);
    
//     return (
//       <div
//         style={{
//           backgroundColor: display.backgroundColor,
//           color: "white",
//           padding: "4px 6px",
//           borderRadius: "4px",
//           width: "100%",
//           fontWeight: "500",
//           fontSize: "0.9rem",
//           textAlign: "center",
//         }}
//       >
//         {display.title}
//       </div>
//     );
//   };

//   // Clear messages after 5 seconds
//   useEffect(() => {
//     if (error || success) {
//       const timer = setTimeout(() => {
//         setError("");
//         setSuccess("");
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, success]);

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
//             📅 Student's Session Calendar
//           </h3>
          
//           {error && <Alert variant="danger">{error}</Alert>}
//           {success && <Alert variant="success">{success}</Alert>}
          
//           <Alert variant="info" className="mb-3">
//             <strong>Status Indicators:</strong> 🟢 Tutor online | 🔴 Tutor offline
//           </Alert>

//           {loading ? (
//             <div className="text-center p-5">
//               <Spinner animation="border" role="status" className="text-primary" />
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
//                   id: b.id,
//                   title: display.title,
//                   start: b.start,
//                   end: b.end,
//                   backgroundColor: display.backgroundColor,
//                   extendedProps: {
//                     ...b,
//                   },
//                 };
//               })}
//               eventContent={eventContent}
//               eventClick={handleEventClick}
//               height="80vh"
//             />
//           )}
//         </Card.Body>
//       </Card>

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

//       {/* Incoming Call Modal - UPDATED FOR VIDEO CALL */}
//       <Modal show={showIncomingCall} onHide={() => handleIncomingCall(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Incoming Video Call</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             <strong>{callData?.tutorUsername}</strong> is starting a video call for your session.
//           </p>
//           <p>Would you like to join now?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => handleIncomingCall(false)}>
//             Decline
//           </Button>
//           <Button variant="primary" onClick={() => handleIncomingCall(true)}>
//             Accept Call
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//           }
//         `}
//       </style>
//     </Container>
//   );
// };

// export default Calendar;






// import React, { useEffect, useState, useCallback } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { socket } from "./socket";
// import { Modal, Button, Alert, Spinner, Card, Container } from "react-bootstrap";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [customStart, setCustomStart] = useState("");
//   const [customEnd, setCustomEnd] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showIncomingCall, setShowIncomingCall] = useState(false);
//   const [callData, setCallData] = useState(null);
//   const [onlineStatus, setOnlineStatus] = useState({});
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const studentUsername = sessionStorage.getItem("studentUsername");
//   const token = sessionStorage.getItem("token");
//   const navigate = useNavigate();

//   // Fetch student's bookings
//   const fetchBookings = useCallback(() => {
//     const endpoint = `http://localhost:4000/student/bookings?username=${studentUsername}`;
//     setLoading(true);
//     setError("");

//     axios
//       .get(endpoint, {
//         headers: { Authorization: `Bearer ${token}` },
//         timeout: 10000,
//       })
//       .then((res) => {
//         const bookings = res.data || [];
//         setEvents(bookings);

//         // initialize tutor online status
//         const statusUpdate = {};
//         bookings.forEach((b) => {
//           statusUpdate[b.tutorUsername] = false;
//         });
//         setOnlineStatus(statusUpdate);
//       })
//       .catch((err) => {
//         console.error("Error fetching events:", err);
//         setError("Failed to load bookings. Please try again.");
//       })
//       .finally(() => setLoading(false));
//   }, [studentUsername, token]);

//   // socket + data setup
//   useEffect(() => {
//     fetchBookings();

//     const incomingCallHandler = (data) => {
//       setCallData(data);
//       setShowIncomingCall(true);
//     };

//     const bookingUpdateHandler = (data) => {
//       fetchBookings();
//       if (data.status === "accepted") {
//         setSuccess(
//           `Your booking has been accepted! ${
//             data.message ? `Message: ${data.message}` : ""
//           }`
//         );
//       } else if (data.status === "rejected") {
//         setError("Your booking request has been rejected.");
//       }
//     };

//     const teacherOnlineHandler = (data) => {
//       setOnlineStatus((prev) => ({
//         ...prev,
//         [data.username]: true,
//       }));
//     };

//     const userDisconnectedHandler = (socketId) => {
//       // optional: mark tutor offline here if needed
//     };

//     socket.on("incoming-call", incomingCallHandler);
//     socket.on("booking-update", bookingUpdateHandler);
//     socket.on("teacher-online", teacherOnlineHandler);
//     socket.on("user-disconnected", userDisconnectedHandler);

//     // announce student online
//     if (socket.connected) {
//       socket.emit("student-online", studentUsername);
//     } else {
//       socket.once("connect", () => {
//         socket.emit("student-online", studentUsername);
//       });
//     }

//     return () => {
//       socket.off("incoming-call", incomingCallHandler);
//       socket.off("booking-update", bookingUpdateHandler);
//       socket.off("teacher-online", teacherOnlineHandler);
//       socket.off("user-disconnected", userDisconnectedHandler);
//     };
//   }, [studentUsername, fetchBookings]);

//   // handle new slot select
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

//     const startDateTime = `${selectedSlot.date}T${customStart}:00`;
//     const endDateTime = `${selectedSlot.date}T${customEnd}:00`;
//     const tutorUsername = sessionStorage.getItem("tutorUsername");

//     try {
//       setError("");
//       const newBooking = {
//         tutorUsername,
//         studentUsername,
//         start: startDateTime,
//         end: endDateTime,
//         status: "pending",
//       };

//       await axios.post("http://localhost:4000/bookings", newBooking, {
//         headers: { Authorization: `Bearer ${token}` },
//         timeout: 5000,
//       });

//       setSuccess("Booking request sent!");
//       fetchBookings();
//     } catch (err) {
//       console.error("Error booking session:", err);
//       if (err.response?.status === 409) {
//         setError("This time slot is already booked. Please choose another.");
//       } else {
//         setError("Error creating booking. Please try again.");
//       }
//     } finally {
//       setShowPopup(false);
//       setSelectedSlot(null);
//     }
//   };

//   // student accepts/declines incoming call
//   const handleIncomingCallResponse = (accept) => {
//     setShowIncomingCall(false);
//     if (accept && callData) {
//       navigate(
//         `/video-call?roomId=${callData.roomId}&type=student&name=${encodeURIComponent(
//           studentUsername
//         )}`
//       );
//     }
//   };

//   // join existing call
//   const joinCall = async (bookingId) => {
//     try {
//       setError("");
//       const response = await axios.get(
//         `http://localhost:4000/get-call/${bookingId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           timeout: 5000,
//         }
//       );

//       if (response.data.roomId) {
//         navigate(
//           `/video-call?roomId=${response.data.roomId}&type=student&name=${encodeURIComponent(
//             studentUsername
//           )}`
//         );
//       } else {
//         setError("No active call for this booking. Wait for the teacher.");
//       }
//     } catch (err) {
//       console.error("Error joining call:", err);
//       setError("Could not join call. Please try again.");
//     }
//   };

//   // determine event display
//   const getEventDisplay = (booking) => {
//     const isTutorOnline = onlineStatus[booking.tutorUsername];
//     const onlineIndicator = isTutorOnline ? " 🟢" : " 🔴";

//     switch (booking.status) {
//       case "accepted":
//         return {
//           title: `✅ ${booking.tutorUsername}${onlineIndicator}`,
//           backgroundColor: "#28a745",
//         };
//       case "rejected":
//         return {
//           title: `❌ ${booking.tutorUsername}`,
//           backgroundColor: "#dc3545",
//         };
//       default:
//         return {
//           title: `⏳ ${booking.tutorUsername}${onlineIndicator}`,
//           backgroundColor: "#ffc107",
//         };
//     }
//   };

//   // event click
//   const handleEventClick = (info) => {
//     const booking = info.event.extendedProps;
//     if (booking.status === "accepted") {
//       if (booking.roomId) {
//         navigate(
//           `/video-call?roomId=${booking.roomId}&type=student&name=${encodeURIComponent(
//             studentUsername
//           )}`
//         );
//       } else {
//         setError("Waiting for teacher to start the call.");
//       }
//     } else if (booking.status === "pending") {
//       setError("Your booking request is still pending approval.");
//     } else {
//       setError("This booking was rejected. Please create a new one.");
//     }
//   };

//   // event content render
//   const eventContent = (eventInfo) => {
//     const booking = eventInfo.event.extendedProps;
//     const display = getEventDisplay(booking);

//     return (
//       <div
//         style={{
//           backgroundColor: display.backgroundColor,
//           color: "white",
//           padding: "4px 6px",
//           borderRadius: "4px",
//           width: "100%",
//           fontWeight: "500",
//           fontSize: "0.9rem",
//           textAlign: "center",
//         }}
//       >
//         {display.title}
//       </div>
//     );
//   };

//   // auto clear messages
//   useEffect(() => {
//     if (error || success) {
//       const timer = setTimeout(() => {
//         setError("");
//         setSuccess("");
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, success]);

//   return (
//     <Container
//       fluid
//       style={{ backgroundColor: "#f7f9fc", minHeight: "100vh", padding: "30px" }}
//     >
//       <Card
//         className="shadow-sm"
//         style={{ borderRadius: "10px", border: "none" }}
//       >
//         <Card.Body>
//           <h3
//             className="mb-4 text-white p-3 rounded"
//             style={{
//               background: "linear-gradient(90deg, #007bff, #6610f2)",
//               boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//               textAlign: "center",
//             }}
//           >
//             📅 Student's Session Calendar
//           </h3>

//           {error && <Alert variant="danger">{error}</Alert>}
//           {success && <Alert variant="success">{success}</Alert>}

//           <Alert variant="info" className="mb-3">
//             <strong>Status Indicators:</strong> 🟢 Tutor online | 🔴 Tutor offline
//           </Alert>

//           {loading ? (
//             <div className="text-center p-5">
//               <Spinner animation="border" role="status" className="text-primary" />
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
//                   id: b.id,
//                   title: display.title,
//                   start: b.start,
//                   end: b.end,
//                   backgroundColor: display.backgroundColor,
//                   extendedProps: { ...b },
//                 };
//               })}
//               eventContent={eventContent}
//               eventClick={handleEventClick}
//               height="80vh"
//             />
//           )}
//         </Card.Body>
//       </Card>

//       {/* booking modal */}
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

//       {/* incoming call modal */}
//       <Modal
//         show={showIncomingCall}
//         onHide={() => handleIncomingCallResponse(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Incoming Video Call</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             <strong>{callData?.tutorUsername}</strong> is starting a video call
//             for your session.
//           </p>
//           <p>Would you like to join now?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => handleIncomingCallResponse(false)}
//           >
//             Decline
//           </Button>
//           <Button
//             variant="primary"
//             onClick={() => handleIncomingCallResponse(true)}
//           >
//             Accept Call
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//           }
//         `}
//       </style>
//     </Container>
//   );
// };

// export default Calendar;






import React, { useEffect, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { socket } from "./socket";
import { Modal, Button, Alert, Spinner, Card, Container } from "react-bootstrap";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [loading, setLoading] = useState(true);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [callData, setCallData] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const studentUsername = sessionStorage.getItem("studentUsername");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch student's bookings
  const fetchBookings = useCallback(() => {
    setLoading(true);
    setError("");
    axios
      .get(`http://localhost:4000/student/bookings?username=${studentUsername}`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      })
      .then((res) => {
        const bookings = res.data || [];
        setEvents(bookings);
        const statusUpdate = {};
        bookings.forEach((b) => { statusUpdate[b.tutorUsername] = false; });
        setOnlineStatus(statusUpdate);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [studentUsername, token]);

  // Socket listeners
  useEffect(() => {
    fetchBookings();

    const incomingCallHandler = (data) => {
      setCallData(data);
      setShowIncomingCall(true);
    };

    const bookingUpdateHandler = (data) => {
      fetchBookings();
      if (data.status === "accepted") setSuccess(`Your booking has been accepted! ${data.message || ""}`);
      else if (data.status === "rejected") setError("Your booking request has been rejected.");
    };

    const teacherOnlineHandler = (data) => setOnlineStatus((prev) => ({ ...prev, [data.username]: true }));

    socket.on("incoming-call", incomingCallHandler);
    socket.on("booking-update", bookingUpdateHandler);
    socket.on("teacher-online", teacherOnlineHandler);

    if (socket.connected) socket.emit("student-online", studentUsername);
    else socket.once("connect", () => socket.emit("student-online", studentUsername));

    return () => {
      socket.off("incoming-call", incomingCallHandler);
      socket.off("booking-update", bookingUpdateHandler);
      socket.off("teacher-online", teacherOnlineHandler);
    };
  }, [studentUsername, fetchBookings]);

  // Date selection
  const handleDateSelect = (selectInfo) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(selectInfo.startStr);
    if (selectedDate < today) return alert("You cannot book a session in the past!");

    setSelectedSlot({
      date: selectInfo.startStr.split("T")[0],
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setCustomStart(selectInfo.startStr.substring(11, 16));
    setCustomEnd(selectInfo.endStr.substring(11, 16));
    setShowPopup(true);
  };

  // Confirm booking
  const confirmBooking = async () => {
    if (!customStart || !customEnd) return alert("Please select both start and end times.");
    if (customEnd <= customStart) return alert("End time must be later than start time.");

    const startDateTime = `${selectedSlot.date}T${customStart}:00`;
    const endDateTime = `${selectedSlot.date}T${customEnd}:00`;
    const tutorUsername = sessionStorage.getItem("tutorUsername");

    try {
      setError("");
      await axios.post("http://localhost:4000/bookings", {
        tutorUsername, studentUsername, start: startDateTime, end: endDateTime, status: "pending",
      }, { headers: { Authorization: `Bearer ${token}` }, timeout: 5000 });
      setSuccess("Booking request sent!");
      fetchBookings();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) setError("This time slot is already booked. Please choose another.");
      else setError("Error creating booking. Please try again.");
    } finally {
      setShowPopup(false);
      setSelectedSlot(null);
    }
  };

  // Incoming call response
  const handleIncomingCallResponse = (accept) => {
    setShowIncomingCall(false);
    if (accept && callData) {
      navigate(`/video-call?roomId=${callData.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
    }
  };

  // Join existing call
  const joinCall = async (bookingId) => {
    try {
      setError("");
      const res = await axios.get(`http://localhost:4000/get-call/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }, timeout: 5000,
      });
      if (res.data.roomId) navigate(`/video-call?roomId=${res.data.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
      else setError("No active call for this booking. Wait for the teacher.");
    } catch (err) {
      console.error(err);
      setError("Could not join call. Please try again.");
    }
  };

  // Event display logic
  const getEventDisplay = (booking) => {
    const onlineIndicator = onlineStatus[booking.tutorUsername] ? " 🟢" : " 🔴";
    switch (booking.status) {
      case "accepted": return { title: `✅ ${booking.tutorUsername}${onlineIndicator}`, backgroundColor: "#28a745" };
      case "rejected": return { title: `❌ ${booking.tutorUsername}`, backgroundColor: "#dc3545" };
      default: return { title: `⏳ ${booking.tutorUsername}${onlineIndicator}`, backgroundColor: "#ffc107" };
    }
  };

  // Event click
  const handleEventClick = (info) => {
    const booking = info.event.extendedProps;
    if (booking.status === "accepted") {
      if (booking.roomId) navigate(`/video-call?roomId=${booking.roomId}&type=student&name=${encodeURIComponent(studentUsername)}`);
      else setError("Waiting for teacher to start the call.");
    } else if (booking.status === "pending") setError("Your booking request is still pending approval.");
    else setError("This booking was rejected. Please create a new one.");
  };

  // Event content
  const eventContent = (eventInfo) => {
    const display = getEventDisplay(eventInfo.event.extendedProps);
    return (
      <div style={{ backgroundColor: display.backgroundColor, color: "white", padding: "4px 6px", borderRadius: "4px", width: "100%", fontWeight: 500, fontSize: "0.9rem", textAlign: "center" }}>
        {display.title}
      </div>
    );
  };

  // Auto-clear messages
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => { setError(""); setSuccess(""); }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <Container fluid style={{ backgroundColor: "#f7f9fc", minHeight: "100vh", padding: "30px" }}>
      <Card className="shadow-sm" style={{ borderRadius: "10px", border: "none" }}>
        <Card.Body>
          <h3 className="mb-4 text-white p-3 rounded" style={{ background: "linear-gradient(90deg, #007bff, #6610f2)", textAlign: "center" }}>
            📅 Student's Session Calendar
          </h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Alert variant="info" className="mb-3"><strong>Status Indicators:</strong> 🟢 Tutor online | 🔴 Tutor offline</Alert>

          {loading ? (
            <div className="text-center p-5">
              <Spinner animation="border" role="status" className="text-primary" />
              <p className="mt-3">Loading calendar...</p>
            </div>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectable
              select={handleDateSelect}
              validRange={{ start: new Date().toISOString().split("T")[0] }}
              events={events.map(b => ({ id: b.id, start: b.start, end: b.end, extendedProps: b }))}
              eventContent={eventContent}
              eventClick={handleEventClick}
              height="80vh"
            />
          )}
        </Card.Body>
      </Card>

      {/* Booking modal */}
      {showPopup && (
        <div className="d-flex justify-content-center align-items-center" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }} onClick={() => setShowPopup(false)}>
          <div className="p-4 rounded shadow-lg" style={{ background: "white", width: "400px", animation: "fadeIn 0.3s ease-in-out" }} onClick={e => e.stopPropagation()}>
            <h4 className="mb-3 text-primary">Confirm Your Booking</h4>
            <p><strong>Date:</strong> {selectedSlot?.date}</p>
            <div className="mb-3">
              <label className="form-label fw-bold">

              Start Time
              </label>
              <input
                type="time"
                className="form-control"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">
                End Time
              </label>
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
              <button
                className="btn btn-primary px-4"
                onClick={confirmBooking}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Incoming call modal */}
      <Modal
        show={showIncomingCall}
        onHide={() => handleIncomingCallResponse(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Incoming Video Call</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>{callData?.tutorUsername}</strong> is starting a video call
            for your session.
          </p>
          <p>Would you like to join now?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleIncomingCallResponse(false)}
          >
            Decline
          </Button>
          <Button
            variant="primary"
            onClick={() => handleIncomingCallResponse(true)}
          >
            Accept Call
          </Button>
        </Modal.Footer>
      </Modal>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </Container>
  );
};

export default Calendar;
