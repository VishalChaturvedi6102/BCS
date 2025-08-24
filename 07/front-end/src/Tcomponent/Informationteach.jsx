


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
    syllabus: ""
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [syllabusName, setSyllabusName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load existing teacher data when component mounts
    const loadTeacherData = async () => {
      try {
        // Get username from sessionStorage (note the correct key name)
        const username = sessionStorage.getItem("tutorUsername");
        if (!username) {
          alert("Teacher not logged in");
          setIsLoading(false);
          return;
        }

        // Fetch existing teacher data
        const response = await axios.get(`http://localhost:4000/api/teachers/username/${username}`);
        const teacherData = response.data;
        
        if (teacherData) {
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
            syllabus: teacherData.syllabus || ""
          });

          if (teacherData.profile_image) {
            setPreviewImage(`http://localhost:4000/uploads/${teacherData.profile_image}`);
          }
          
          if (teacherData.syllabus) {
            setSyllabusName(teacherData.syllabus);
          }
        }
      } catch (error) {
        console.error("Error loading teacher data:", error);
        // It's okay if no data exists yet (first time creating profile)
      } finally {
        setIsLoading(false);
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

  const handleSyllabusChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is PDF
      if (file.type === 'application/pdf') {
        setSyllabusFile(file);
        setSyllabusName(file.name);
      } else {
        alert("Please select a PDF file");
        e.target.value = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get username from sessionStorage (correct key name)
      const username = sessionStorage.getItem("tutorUsername");
      if (!username) {
        alert("Teacher not logged in");
        return;
      }

      const formData = new FormData();
      formData.append("username", username);
      
      // Append all text fields
      Object.keys(data).forEach(key => {
        if (key !== 'syllabus') { // Don't append the old syllabus filename
          formData.append(key, data[key]);
        }
      });
      
      // Append image if selected
      if (profileImage) {
        formData.append("profile_image", profileImage);
      }
      
      // Append syllabus if selected
      if (syllabusFile) {
        formData.append("syllabus", syllabusFile);
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ 
        background: "linear-gradient(135deg, #fff7ceff 0%, #ff6e6eff 100%)" 
      }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 py-5" style={{ 
      background: "linear-gradient(135deg, #fff7ceff 0%, #ff6e6eff 100%)" 
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header Section */}
            <div className="text-center mb-4">
              <h1 className="display-5 fw-bold mb-3 text-white" style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                background: 'linear-gradient(45deg, #FF5E7D 0%, #FF3449 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {data.namer ? `Edit ${data.namer}'s Profile` : "Build Your Superprof Profile"}
              </h1>
              <p className="lead text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                {data.namer ? "Update your profile to attract more students" : "Create an amazing profile to attract students from around the world"}
              </p>
              <div className="d-flex justify-content-center mt-3">
                <div style={{ 
                  height: "4px", 
                  width: "80px", 
                  backgroundColor: "#fff", 
                  borderRadius: "10px" 
                }}></div>
              </div>
            </div>

            <div className="card shadow-lg border-0 overflow-hidden">
              <div className="card-body p-0">
                {/* Progress Bar */}
                <div className="px-4 pt-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Profile Completion</span>
                    <span className="fw-bold" style={{ color: "#FF5E7D" }}>70%</span>
                  </div>
                  <div className="progress mb-4" style={{ height: "8px", borderRadius: "10px" }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ 
                        width: "70%", 
                        background: "linear-gradient(45deg, #FF5E7D 0%, #FF3449 100%)",
                        borderRadius: "10px"
                      }}
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Left Column - Profile Image and Basic Info */}
                    <div className="col-lg-5" style={{ 
                      background: "linear-gradient(to bottom, #FFFBED 0%, #FFF5F5 100%)", 
                      padding: "2rem",
                      borderRight: "2px dashed #FFD1D1"
                    }}>
                      {/* Profile Image Upload */}
                      <div className="text-center mb-4">
                        <label htmlFor="profile-image" className="d-block cursor-pointer">
                          <div className="position-relative d-inline-block">
                            <div className="rounded-circle shadow"
                              style={{ 
                                width: "180px", 
                                height: "180px", 
                                background: "linear-gradient(45deg, #fae88fff 0%, #ff7f7fff 100%)",
                                padding: "6px",
                                margin: "0 auto"
                              }}
                            >
                              <img 
                                src={previewImage || "/placeholder-profile.png"} 
                                alt="Profile Preview" 
                                className="rounded-circle"
                                style={{ 
                                  width: "100%", 
                                  height: "100%", 
                                  objectFit: "cover",
                                  border: "4px solid #fff",
                                }}
                                onError={(e) => {
                                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'%3EUpload Photo%3C/text%3E%3C/svg%3E";
                                }}
                              />
                            </div>
                            <div className="position-absolute bottom-0 end-0 rounded-circle p-2 border border-3 border-white"
                              style={{ 
                                background: "linear-gradient(45deg, #FF5E7D 0%, #FF3449 100%)" 
                              }}
                            >
                              <i className="bi bi-camera-fill text-white"></i>
                            </div>
                          </div>
                          <div className="mt-3">
                            <span className="btn btn-sm rounded-pill px-3 fw-bold"
                              style={{ 
                                background: "linear-gradient(45deg, #FF5E7D 0%, #FF3449 100%)",
                                color: "white",
                                border: "none"
                              }}
                            >
                              {previewImage ? "Change Photo" : "Upload Photo"}
                            </span>
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

                      <div className="mb-3">
                        <label htmlFor="namer" className="form-label fw-semibold">
                          <i className="bi bi-person me-2" style={{ color: "#FF5E7D" }}></i>
                          Full Name *
                        </label>
                        <input
                          id="namer"
                          name="namer"
                          type="text"
                          className="form-control rounded-pill"
                          value={data.namer}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          style={{ padding: "0.75rem 1.5rem" }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="oneline" className="form-label fw-semibold">
                          <i className="bi bi-star me-2" style={{ color: "#FF8E4F" }}></i>
                          Professional Tagline *
                        </label>
                        <input
                          id="oneline"
                          name="oneline"
                          type="text"
                          className="form-control rounded-pill"
                          value={data.oneline}
                          onChange={handleChange}
                          placeholder="Passionate Math & Science Tutor"
                          required
                          style={{ padding: "0.75rem 1.5rem" }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="timezone" className="form-label fw-semibold">
                          <i className="bi bi-clock me-2" style={{ color: "#FF5E7D" }}></i>
                          Your Timezone *
                        </label>
                        <select
                          id="timezone"
                          name="timezone"
                          className="form-select rounded-pill"
                          value={data.timezone}
                          onChange={handleChange}
                          required
                          style={{ padding: "0.75rem 1.5rem" }}
                        >
                          <option value="">Select Timezone</option>
                          <option value="IST">India Standard Time (IST)</option>
                          <option value="EST">Eastern Standard Time (EST)</option>
                          <option value="PST">Pacific Standard Time (PST)</option>
                          <option value="GMT">Greenwich Mean Time (GMT)</option>
                          <option value="CET">Central European Time (CET)</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="lang" className="form-label fw-semibold">
                          <i className="bi bi-translate me-2" style={{ color: "#FF8E4F" }}></i>
                          Languages You Teach *
                        </label>
                        <input
                          id="lang"
                          name="lang"
                          type="text"
                          className="form-control rounded-pill"
                          value={data.lang}
                          onChange={handleChange}
                          placeholder="English, Spanish, French"
                          required
                          style={{ padding: "0.75rem 1.5rem" }}
                        />
                      </div>
                    </div>

                    {/* Right Column - Detailed Information */}
                    <div className="col-lg-7" style={{ 
                      padding: "2rem",
                      background: "linear-gradient(to bottom, #FFFFFF 0%, #FFFBFB 100%)" 
                    }}>
                      <div className="mb-4">
                        <label htmlFor="about" className="form-label fw-semibold">
                          <i className="bi bi-chat-dots me-2" style={{ color: "#FF5E7D" }}></i>
                          About You *
                        </label>
                        <textarea
                          id="about"
                          name="about"
                          className="form-control"
                          rows={4}
                          value={data.about}
                          onChange={handleChange}
                          placeholder="Describe your teaching philosophy, experience, and approach..."
                          required
                          style={{ borderRadius: "16px", padding: "1rem" }}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="subjects" className="form-label fw-semibold">
                          <i className="bi bi-book me-2" style={{ color: "#FF8E4F" }}></i>
                          Subjects You Teach *
                        </label>
                        <textarea
                          id="subjects"
                          name="subjects"
                          className="form-control"
                          rows={2}
                          value={data.subjects}
                          onChange={handleChange}
                          placeholder="Mathematics, Physics, Chemistry, English Literature"
                          required
                          style={{ borderRadius: "16px", padding: "1rem" }}
                        />
                      </div>

                      <div className="row mb-4">
                        <div className="col-md-6">
                          <label htmlFor="level" className="form-label fw-semibold">
                            <i className="bi bi-bar-chart me-2" style={{ color: "#FF5E7D" }}></i>
                            Teaching Levels *
                          </label>
                          <select
                            id="level"
                            name="level"
                            className="form-select"
                            value={data.level}
                            onChange={handleChange}
                            required
                            style={{ borderRadius: "10px", padding: "0.75rem" }}
                          >
                            <option value="">Select Level</option>
                            <option value="Elementary">Elementary School</option>
                            <option value="Middle">Middle School</option>
                            <option value="High">High School</option>
                            <option value="College">College/University</option>
                            <option value="All Levels">All Levels</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="free_sessions" className="form-label fw-semibold">
                            <i className="bi bi-gift me-2" style={{ color: "#FF8E4F" }}></i>
                            Free Sessions
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
                            disabled={data.all_sessions_free}
                            style={{ borderRadius: "10px", padding: "0.75rem" }}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="education" className="form-label fw-semibold">
                          <i className="bi bi-mortarboard me-2" style={{ color: "#FF5E7D" }}></i>
                          Education *
                        </label>
                        <textarea
                          id="education"
                          name="education"
                          className="form-control"
                          rows={2}
                          value={data.education}
                          onChange={handleChange}
                          placeholder="Bachelor's in Computer Science, Master's in Education"
                          required
                          style={{ borderRadius: "16px", padding: "1rem" }}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="exp" className="form-label fw-semibold">
                          <i className="bi bi-briefcase me-2" style={{ color: "#FF8E4F" }}></i>
                          Teaching Experience *
                        </label>
                        <textarea
                          id="exp"
                          name="exp"
                          className="form-control"
                          rows={3}
                          value={data.exp}
                          onChange={handleChange}
                          placeholder="5 years of teaching Mathematics and Science to high school students..."
                          required
                          style={{ borderRadius: "16px", padding: "1rem" }}
                        />
                      </div>

                      {/* Syllabus Upload Field */}
                      <div className="mb-4">
                        <label htmlFor="syllabus" className="form-label fw-semibold">
                          <i className="bi bi-file-earmark-pdf me-2" style={{ color: "#FF5E7D" }}></i>
                          Course Syllabus (PDF)
                        </label>
                        <div className="input-group">
                          <input
                            id="syllabus"
                            name="syllabus"
                            type="file"
                            className="form-control"
                            accept=".pdf"
                            onChange={handleSyllabusChange}
                            style={{ borderRadius: "10px 0 0 10px", padding: "0.75rem" }}
                          />
                          {syllabusName && (
                            <span className="input-group-text bg-light" style={{ borderRadius: "0 10px 10px 0" }}>
                              {syllabusName}
                            </span>
                          )}
                        </div>
                        <div className="form-text text-muted ms-1">
                          Upload your course syllabus or structure (PDF only)
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="all_sessions_free"
                            name="all_sessions_free"
                            checked={data.all_sessions_free}
                            onChange={handleChange}
                            style={{ 
                              backgroundColor: data.all_sessions_free ? "#FF5E7D" : "", 
                              borderColor: "#FF5E7D",
                              width: "3em",
                              height: "1.5em"
                            }}
                          />
                          <label className="form-check-label fw-semibold ms-2" htmlFor="all_sessions_free">
                            All sessions are free
                          </label>
                        </div>
                        <div className="form-text text-muted ms-4">
                          Enable this if you want to offer all your sessions for free
                        </div>
                      </div>

                      <div className="text-center pt-3">
                        <button 
                          type="submit" 
                          className="btn btn-lg rounded-pill fw-bold px-5 py-3"
                          style={{ 
                            background: "linear-gradient(45deg, #FF5E7D 0%, #FF3449 100%)", 
                            border: "none",
                            boxShadow: "0 4px 15px rgba(255, 94, 125, 0.4)",
                            color: "white"
                          }}
                        >
                          <i className="bi bi-rocket me-2"></i>
                          {data.namer ? "Update Profile" : "Save & Publish Profile"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="text-center mt-4 mb-5">
              <p className="text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                <small>
                  <i className="bi bi-shield-check me-1"></i>
                  Your information is secure and will only be used to connect you with students
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          .card {
            border-radius: 20px;
          }
          .form-control:focus, .form-select:focus {
            border-color: #FF5E7D;
            box-shadow: 0 0 0 0.25rem rgba(255, 94, 125, 0.15);
          }
          .cursor-pointer {
            cursor: pointer;
          }
          .form-label {
            color: #555;
            margin-bottom: 0.5rem;
          }
          .form-check-input:checked {
            background-color: #FF5E7D;
            border-color: #FF5E7D;
          }
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #FF5E7D 0%, #FF3449 100%);
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Informationteach;