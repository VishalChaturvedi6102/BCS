

// src/pages/TeacherProfile.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
// import api from "../api";
// import "./teacher.css";



const Teacherprofile = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const preview = searchParams.get("preview") === "true";
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
    .get(`api/teacher/username/${encodeURIComponent(username)}`)
      .then((res) => setTeacher(res.data))
      .catch((err) => {
        console.error(err);
        setErr("Could not fetch teacher.");
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <div className="tm-loading">Loading profile...</div>;
  if (err) return <div className="tm-error">{err}</div>;
  if (!teacher) return <div className="tm-empty">Teacher not found</div>;

  const handleConfirmBooking = () => {
    // Save selected teacher & subject in localStorage
    localStorage.setItem("selectedTeacher", teacher.username);
    localStorage.setItem("selectedSubject", teacher.subject);

    // Navigate to calendar page to choose date/time
    navigate(`/calendar/${teacher.username}`);
  };

  return (
    <div className="tm-profile-wrap">
      <div className="tm-profile-main">
        {/* Left: summary / basic info (you asked: profile initially open while work completes) */}
        <aside className="tm-profile-left">
          <img className="tm-avatar-lg" src={teacher.avatar || "/default-avatar.png"} alt={teacher.name} />
          <h2>{teacher.name}</h2>
          <p><strong>Subject:</strong> {teacher.subject}</p>
          <p><strong>Experience:</strong> {teacher.experience || "N/A"}</p>
          <p><strong>Languages:</strong> {(teacher.languages || []).join(", ")}</p>
          <div className="tm-brief">{teacher.brief || "No brief available."}</div>
        </aside>

        {/* Right: full profile details */}
        <section className="tm-profile-right">
          <h3>About {teacher.name}</h3>
          <p>{teacher.bio || "Detailed bio not provided."}</p>

          <h4>Qualifications</h4>
          <ul>
            {(teacher.qualifications || []).map((q, idx) => <li key={idx}>{q}</li>)}
          </ul>

          <h4>Student Reviews</h4>
          <div>
            {(teacher.reviews || []).length === 0 ? <p>No reviews yet.</p> : teacher.reviews.map((r, i) =>
              <div key={i} className="tm-review">
                <strong>{r.student}</strong> — <span>{r.rating}/5</span>
                <p>{r.comment}</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Floating or side booking card (left or right) */}
      <div className="tm-booking-card">
        <h4>Ready to Book?</h4>
        <p>Subject: <strong>{teacher.subject}</strong></p>
        <p>Rate: <strong>{teacher.rate ?? "—"}</strong></p>
        <button className="tm-btn tm-btn-primary" onClick={handleConfirmBooking}>
          Confirm Your Booking
        </button>
        {preview && <p className="tm-note">This is a quick preview — full profile is shown here when you click Book Session.</p>}
      </div>
    </div>
  );
};

export default Teacherprofile;


// // src/pages/TeacherProfile.jsx
// // src/pages/TeacherProfile.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";
// import Layout from "./Layout";

// export default function TeacherProfile() {
//   const { username } = useParams();
//   const [tutor, setTutor] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:4000/api/teachers/username/${username}`)
//       .then(res => setTutor(res.data))
//       .catch(err => console.error("Error fetching tutor:", err));
//   }, [username]);

//   const handleConfirm = () => {
//     localStorage.setItem("selectedTutor", tutor.Username);
//     localStorage.setItem("selectedSubject", tutor.subjects);
//     navigate("/calendar");
//   };

//   if (!tutor) return <p className="text-center mt-5">Loading...</p>;

//   return (
//     <>
//       <Layout />
//       <Container className="my-5">
//         <Row>
//           <Col md={8}>
//             <Card className="shadow-sm p-4">
//               <h2>{tutor.name}</h2>
//               <p><b>Intro:</b> {tutor.oneline}</p>
//               <p><b>Language:</b> {tutor.lang}</p>
//               <p><b>Subject:</b> {tutor.subjects}</p>
//               <p><b>Level:</b> {tutor.level}</p>
//               <p><b>Experience:</b> {tutor.exp} years</p>
//               <p><b>About:</b> {tutor.about}</p>
//             </Card>
//           </Col>
//           <Col md={4}>
//             <Card className="p-3 text-center shadow-sm">
//               <h4>Ready to book?</h4>
//               <Button variant="success" onClick={handleConfirm}>
//                 Confirm Your Booking
//               </Button>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }
