


// import React, { useState } from "react";
// import axios from "axios";
// // import Titlewala from "./Titlewala";

// const Informationteach = () => {
//   const [data, setData] = useState({
//     namer: "",
//     oneline: "",
//     about: "",
//     lang: "",
//     timezone: "",
//     subjects: "",
//     level: "",
//     education: "",
//     exp: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const username = localStorage.getItem("username");

//       if (!username) {
//         alert("Teacher not logged in");
//         return;
//       }

//       const payload = { username, ...data };

//       const response = await axios.post(
//         "http://localhost:4000/infoofteacher",
//         payload
//       );
//       alert(response.data.message || "Profile saved successfully");
//     } catch (error) {
//       console.error("Error saving profile:", error);
//       alert("Failed to save profile");
//     }
//   };

//   return (

//     <>
// {/* <Titlewala/> */}

//     <div
//       className="container my-5 p-4 shadow-sm rounded"
//       style={{ backgroundColor: "white", maxWidth: "800px" }}
//     >
//       <h2 className="mb-4 text-center text-primary fw-bold">
//         Teacher Profile Information
//       </h2>

//       <form onSubmit={handleSubmit}>
//         {/* Name */}
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label fw-semibold">
//             Name
//           </label>
//           <input
//             id="namer"
//             name="namer"
//             type="text"
//             className="form-control"
//             value={data.namer}
//             onChange={handleChange}
//             placeholder="Full name"
//             required
//           />
//         </div>

//         {/* One Line Summary */}
//         <div className="mb-3">
//           <label htmlFor="oneline" className="form-label fw-semibold">
//             One Line Summary
//           </label>
//           <input
//             id="oneline"
//             name="oneline"
//             type="text"
//             className="form-control"
//             value={data.oneline}
//             onChange={handleChange}
//             placeholder="Experienced Tutor with a passion for Math, English, and Science"
//             required
//           />
//         </div>

//         {/* About */}
//         <div className="mb-3">
//           <label htmlFor="about" className="form-label fw-semibold">
//             About
//           </label>
//           <textarea
//             id="about"
//             name="about"
//             className="form-control"
//             rows={5}
//             value={data.about}
//             onChange={handleChange}
//             placeholder="Detailed description about you and your teaching style"
//             required
//           />
//         </div>

//         {/* Languages */}
//         <div className="mb-3">
//           <label htmlFor="lang" className="form-label fw-semibold">
//             Languages
//           </label>
//           <input
//             id="lang"
//             name="lang"
//             type="text"
//             className="form-control"
//             value={data.lang}
//             onChange={handleChange}
//             placeholder="Languages you speak, e.g., English, Persian"
//             required
//           />
//         </div>

//         {/* Timezone */}
//         <div className="mb-3">
//           <label htmlFor="timezone" className="form-label fw-semibold">
//             Timezone
//           </label>
//           <input
//             id="timezone"
//             name="timezone"
//             type="text"
//             className="form-control"
//             value={data.timezone}
//             onChange={handleChange}
//             placeholder="Timezone, e.g., America/Toronto"
//             required
//           />
//         </div>

//         {/* Subjects */}
//         <div className="mb-3">
//           <label htmlFor="subjects" className="form-label fw-semibold">
//             Subjects
//           </label>
//           <textarea
//             id="subjects"
//             name="subjects"
//             className="form-control"
//             rows={3}
//             value={data.subjects}
//             onChange={handleChange}
//             placeholder="Subjects you teach"
//             required
//           />
//         </div>

//         {/* Levels */}
//         <div className="mb-3">
//           <label htmlFor="level" className="form-label fw-semibold">
//             Levels
//           </label>
//           <input
//             id="level"
//             name="level"
//             type="text"
//             className="form-control"
//             value={data.level}
//             onChange={handleChange}
//             placeholder="Elementary, Middle School, High School"
//             required
//           />
//         </div>

//         {/* Education */}
//         <div className="mb-3">
//           <label htmlFor="education" className="form-label fw-semibold">
//             Education
//           </label>
//           <textarea
//             id="education"
//             name="education"
//             className="form-control"
//             rows={3}
//             value={data.education}
//             onChange={handleChange}
//             placeholder="Your educational background"
//             required
//           />
//         </div>

//         {/* Experience */}
//         <div className="mb-3">
//           <label htmlFor="exp" className="form-label fw-semibold">
//             Experience
//           </label>
//           <textarea
//             id="exp"
//             name="exp"
//             className="form-control"
//             rows={3}
//             value={data.exp}
//             onChange={handleChange}
//             placeholder="Your work and tutoring experience"
//             required
//           />
//         </div>

//         <div className="d-flex justify-content-center">
//           <button type="submit" className="btn btn-primary px-5 py-2 fw-semibold">
//             Save Profile
//           </button>
//         </div>
//       </form>
//     </div>


//     </>
//   );
// };

// export default Informationteach;






import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Informationteach = () => {
  const [data, setData] = useState({
    namer: "",
    oneline: "",
    about: "",
    lang: "",
    timezone: "",
    subjects: "",
    level: "",
    education: "",
    exp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const username = localStorage.getItem("username");
      if (!username) {
        alert("Teacher not logged in");
        return;
      }

      const payload = { username, ...data };
      const response = await axios.post("http://localhost:4000/infoofteacher", payload);
      alert(response.data.message || "Profile saved successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "white" }}   // 👈 changed here
    >
      <style>
        {`
          body {
            background-color: white !important;  /* 👈 makes sure global background is white */
          }
        `}
      </style>

      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "900px", borderRadius: "16px", backgroundColor: "white" }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">Teacher Profile Information</h2>
        <p className="text-center text-muted mb-4">
          Please provide accurate details to build a strong professional profile for your students.
        </p>

        <form onSubmit={handleSubmit} className="row g-4">
          {/* Name */}
          <div className="col-md-6">
            <label htmlFor="namer" className="form-label fw-semibold">Full Name</label>
            <input
              id="namer"
              name="namer"
              type="text"
              className="form-control form-control-lg"
              value={data.namer}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          {/* One Line Summary */}
          <div className="col-md-6">
            <label htmlFor="oneline" className="form-label fw-semibold">One Line Summary</label>
            <input
              id="oneline"
              name="oneline"
              type="text"
              className="form-control form-control-lg"
              value={data.oneline}
              onChange={handleChange}
              placeholder="Passionate Math & Science Tutor"
              required
            />
          </div>

          {/* About */}
          <div className="col-12">
            <label htmlFor="about" className="form-label fw-semibold">About You</label>
            <textarea
              id="about"
              name="about"
              className="form-control"
              rows={4}
              value={data.about}
              onChange={handleChange}
              placeholder="Write about your teaching style and approach..."
              required
            />
          </div>

          {/* Languages & Timezone */}
          <div className="col-md-6">
            <label htmlFor="lang" className="form-label fw-semibold">Languages</label>
            <input
              id="lang"
              name="lang"
              type="text"
              className="form-control"
              value={data.lang}
              onChange={handleChange}
              placeholder="English, Spanish"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="timezone" className="form-label fw-semibold">Timezone</label>
            <input
              id="timezone"
              name="timezone"
              type="text"
              className="form-control"
              value={data.timezone}
              onChange={handleChange}
              placeholder="America/New_York"
              required
            />
          </div>

          {/* Subjects */}
          <div className="col-12">
            <label htmlFor="subjects" className="form-label fw-semibold">Subjects</label>
            <textarea
              id="subjects"
              name="subjects"
              className="form-control"
              rows={3}
              value={data.subjects}
              onChange={handleChange}
              placeholder="Math, Science, English"
              required
            />
          </div>

          {/* Levels */}
          <div className="col-md-6">
            <label htmlFor="level" className="form-label fw-semibold">Levels</label>
            <input
              id="level"
              name="level"
              type="text"
              className="form-control"
              value={data.level}
              onChange={handleChange}
              placeholder="Elementary, High School"
              required
            />
          </div>

          {/* Education */}
          <div className="col-md-6">
            <label htmlFor="education" className="form-label fw-semibold">Education</label>
            <textarea
              id="education"
              name="education"
              className="form-control"
              rows={2}
              value={data.education}
              onChange={handleChange}
              placeholder="Bachelor's in Computer Science"
              required
            />
          </div>

          {/* Experience */}
          <div className="col-12">
            <label htmlFor="exp" className="form-label fw-semibold">Experience</label>
            <textarea
              id="exp"
              name="exp"
              className="form-control"
              rows={3}
              value={data.exp}
              onChange={handleChange}
              placeholder="5 years of teaching Math and Science..."
              required
            />
          </div>

          {/* Save Button */}
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary btn-lg px-5 fw-semibold">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Informationteach;
