


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






// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

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
//       const response = await axios.post("http://localhost:4000/infoofteacher", payload);
//       alert(response.data.message || "Profile saved successfully");
//     } catch (error) {
//       console.error("Error saving profile:", error);
//       alert("Failed to save profile");
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center min-vh-100"
//       style={{ backgroundColor: "white" }}   // 👈 changed here
//     >
//       <style>
//         {`
//           body {
//             background-color: white !important;  /* 👈 makes sure global background is white */
//           }
//         `}
//       </style>

//       <div
//         className="card shadow-lg p-4"
//         style={{ width: "100%", maxWidth: "900px", borderRadius: "16px", backgroundColor: "white" }}
//       >
//         <h2 className="text-center mb-4 fw-bold text-primary">Teacher Profile Information</h2>
//         <p className="text-center text-muted mb-4">
//           Please provide accurate details to build a strong professional profile for your students.
//         </p>

//         <form onSubmit={handleSubmit} className="row g-4">
//           {/* Name */}
//           <div className="col-md-6">
//             <label htmlFor="namer" className="form-label fw-semibold">Full Name</label>
//             <input
//               id="namer"
//               name="namer"
//               type="text"
//               className="form-control form-control-lg"
//               value={data.namer}
//               onChange={handleChange}
//               placeholder="John Doe"
//               required
//             />
//           </div>

//           {/* One Line Summary */}
//           <div className="col-md-6">
//             <label htmlFor="oneline" className="form-label fw-semibold">One Line Summary</label>
//             <input
//               id="oneline"
//               name="oneline"
//               type="text"
//               className="form-control form-control-lg"
//               value={data.oneline}
//               onChange={handleChange}
//               placeholder="Passionate Math & Science Tutor"
//               required
//             />
//           </div>

//           {/* About */}
//           <div className="col-12">
//             <label htmlFor="about" className="form-label fw-semibold">About You</label>
//             <textarea
//               id="about"
//               name="about"
//               className="form-control"
//               rows={4}
//               value={data.about}
//               onChange={handleChange}
//               placeholder="Write about your teaching style and approach..."
//               required
//             />
//           </div>

//           {/* Languages & Timezone */}
//           <div className="col-md-6">
//             <label htmlFor="lang" className="form-label fw-semibold">Languages</label>
//             <input
//               id="lang"
//               name="lang"
//               type="text"
//               className="form-control"
//               value={data.lang}
//               onChange={handleChange}
//               placeholder="English, Spanish"
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="timezone" className="form-label fw-semibold">Timezone</label>
//             <input
//               id="timezone"
//               name="timezone"
//               type="text"
//               className="form-control"
//               value={data.timezone}
//               onChange={handleChange}
//               placeholder="America/New_York"
//               required
//             />
//           </div>

//           {/* Subjects */}
//           <div className="col-12">
//             <label htmlFor="subjects" className="form-label fw-semibold">Subjects</label>
//             <textarea
//               id="subjects"
//               name="subjects"
//               className="form-control"
//               rows={3}
//               value={data.subjects}
//               onChange={handleChange}
//               placeholder="Math, Science, English"
//               required
//             />
//           </div>

//           {/* Levels */}
//           <div className="col-md-6">
//             <label htmlFor="level" className="form-label fw-semibold">Levels</label>
//             <input
//               id="level"
//               name="level"
//               type="text"
//               className="form-control"
//               value={data.level}
//               onChange={handleChange}
//               placeholder="Elementary, High School"
//               required
//             />
//           </div>

//           {/* Education */}
//           <div className="col-md-6">
//             <label htmlFor="education" className="form-label fw-semibold">Education</label>
//             <textarea
//               id="education"
//               name="education"
//               className="form-control"
//               rows={2}
//               value={data.education}
//               onChange={handleChange}
//               placeholder="Bachelor's in Computer Science"
//               required
//             />
//           </div>

//           {/* Experience */}
//           <div className="col-12">
//             <label htmlFor="exp" className="form-label fw-semibold">Experience</label>
//             <textarea
//               id="exp"
//               name="exp"
//               className="form-control"
//               rows={3}
//               value={data.exp}
//               onChange={handleChange}
//               placeholder="5 years of teaching Math and Science..."
//               required
//             />
//           </div>

//           {/* Save Button */}
//           <div className="col-12 text-center">
//             <button type="submit" className="btn btn-primary btn-lg px-5 fw-semibold">
//               Save Profile
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Informationteach;





import React, { useState, useEffect } from "react";
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
    free_sessions: 0,
    all_sessions_free: false,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Load existing teacher data if available
    const loadTeacherData = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) return;

        const response = await axios.get(`http://localhost:4000/api/teachers/username/${username}`);
        const teacherData = response.data;
        
        setData({
          namer: teacherData.namer || "",
          oneline: teacherData.oneline || "",
          about: teacherData.about || "",
          lang: teacherData.lang || "",
          timezone: teacherData.timezone || "",
          subjects: teacherData.subjects || "",
          level: teacherData.level || "",
          education: teacherData.education || "",
          exp: teacherData.exp || "",
          free_sessions: teacherData.free_sessions || 0,
          all_sessions_free: teacherData.all_sessions_free || false,
        });

        if (teacherData.profile_image) {
          setPreviewImage(`http://localhost:4000/uploads/${teacherData.profile_image}`);
        }
      } catch (error) {
        console.error("Error loading teacher data:", error);
      }
    };

    loadTeacherData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const username = localStorage.getItem("username");
      if (!username) {
        alert("Teacher not logged in");
        return;
      }

      const formData = new FormData();
      formData.append("username", username);
      
      // Append all text fields
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      
      // Append image if selected
      if (profileImage) {
        formData.append("profile_image", profileImage);
      }

      const response = await axios.post("http://localhost:4000/infoofteacher", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      alert(response.data.message || "Profile saved successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 py-4" style={{ backgroundColor: "white" }}>
      <style>
        {`
          body {
            background-color: white !important;
          }
          .profile-image-preview {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
            border: 3px solid #006CFF;
            cursor: pointer;
          }
          .upload-label {
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .upload-label:hover {
            color: #006CFF;
          }
        `}
      </style>

      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "1000px", borderRadius: "16px", backgroundColor: "white" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Teacher Profile Information</h2>
        <p className="text-center text-muted mb-4">
          Build your professional profile to attract more students
        </p>

        {/* Profile Image Upload */}
        <div className="text-center mb-4">
          <label htmlFor="profile-image" className="upload-label">
            <img 
              src={previewImage || "https://via.placeholder.com/150?text=Upload+Photo"} 
              alt="Profile Preview" 
              className="profile-image-preview"
            />
            <div className="mt-2 text-primary">
              <i className="bi bi-camera-fill me-2"></i>
              {previewImage ? "Change Photo" : "Upload Photo"}
            </div>
          </label>
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <form onSubmit={handleSubmit} className="row g-4">
          {/* Basic Information */}
          <div className="col-md-6">
            <label htmlFor="namer" className="form-label fw-semibold">Full Name *</label>
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

          <div className="col-md-6">
            <label htmlFor="oneline" className="form-label fw-semibold">Professional Tagline *</label>
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
            <label htmlFor="about" className="form-label fw-semibold">About You *</label>
            <textarea
              id="about"
              name="about"
              className="form-control"
              rows={4}
              value={data.about}
              onChange={handleChange}
              placeholder="Describe your teaching philosophy, experience, and approach..."
              required
            />
          </div>

          {/* Languages & Timezone */}
          <div className="col-md-6">
            <label htmlFor="lang" className="form-label fw-semibold">Languages You Teach *</label>
            <input
              id="lang"
              name="lang"
              type="text"
              className="form-control"
              value={data.lang}
              onChange={handleChange}
              placeholder="English, Spanish, French"
              required
            />
          </div>
          
          <div className="col-md-6">
            <label htmlFor="timezone" className="form-label fw-semibold">Your Timezone *</label>
            <select
              id="timezone"
              name="timezone"
              className="form-select"
              value={data.timezone}
              onChange={handleChange}
              required
            >
              <option value="">Select Timezone</option>
              <option value="IST">India Standard Time (IST)</option>
              <option value="EST">Eastern Standard Time (EST)</option>
              <option value="PST">Pacific Standard Time (PST)</option>
              <option value="GMT">Greenwich Mean Time (GMT)</option>
              <option value="CET">Central European Time (CET)</option>
            </select>
          </div>

          {/* Subjects */}
          <div className="col-12">
            <label htmlFor="subjects" className="form-label fw-semibold">Subjects You Teach *</label>
            <textarea
              id="subjects"
              name="subjects"
              className="form-control"
              rows={3}
              value={data.subjects}
              onChange={handleChange}
              placeholder="Mathematics, Physics, Chemistry, English Literature"
              required
            />
          </div>

          {/* Levels */}
          <div className="col-md-6">
            <label htmlFor="level" className="form-label fw-semibold">Teaching Levels *</label>
            <select
              id="level"
              name="level"
              className="form-select"
              value={data.level}
              onChange={handleChange}
              required
            >
              <option value="">Select Level</option>
              <option value="Elementary">Elementary School</option>
              <option value="Middle">Middle School</option>
              <option value="High">High School</option>
              <option value="College">College/University</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>

          {/* Education */}
          <div className="col-md-6">
            <label htmlFor="education" className="form-label fw-semibold">Education *</label>
            <textarea
              id="education"
              name="education"
              className="form-control"
              rows={2}
              value={data.education}
              onChange={handleChange}
              placeholder="Bachelor's in Computer Science, Master's in Education"
              required
            />
          </div>

          {/* Experience */}
          <div className="col-12">
            <label htmlFor="exp" className="form-label fw-semibold">Teaching Experience *</label>
            <textarea
              id="exp"
              name="exp"
              className="form-control"
              rows={3}
              value={data.exp}
              onChange={handleChange}
              placeholder="5 years of teaching Mathematics and Science to high school students..."
              required
            />
          </div>

          {/* Free Sessions Settings */}
          <div className="col-12">
            <div className="card border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title text-primary">Free Session Settings</h5>
                
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="all_sessions_free"
                    name="all_sessions_free"
                    checked={data.all_sessions_free}
                    onChange={handleChange}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="all_sessions_free">
                    All sessions are free (Students can book unlimited free sessions)
                  </label>
                </div>

                {!data.all_sessions_free && (
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="free_sessions" className="form-label fw-semibold">
                        Number of free sessions per student
                      </label>
                      <input
                        id="free_sessions"
                        name="free_sessions"
                        type="number"
                        className="form-control"
                        min="0"
                        max="10"
                        value={data.free_sessions}
                        onChange={handleChange}
                        placeholder="0"
                      />
                      <div className="form-text">
                        Set to 0 if you don't offer free sessions
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="alert alert-info mt-4">
                        <small>
                          <i className="bi bi-info-circle me-2"></i>
                          Students will see this information when browsing your profile
                        </small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary btn-lg px-5 fw-semibold">
              <i className="bi bi-save me-2"></i>
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Informationteach;