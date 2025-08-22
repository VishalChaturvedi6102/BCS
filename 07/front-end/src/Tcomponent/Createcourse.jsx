

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// // import { Navbar } from 'react-bootstrap';
// import Titlewala from './Titlewala';

// const CreateCourse = () => {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "",
//     duration: "",
//     level: "",
//     price: "",
//     thumbnail: null,
//   });

//   const navigate = useNavigate();

//   const handleChange = e => {
//     const { name, value, files } = e.target;
//     if (name === "thumbnail") {
//       setForm({ ...form, thumbnail: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, val]) => formData.append(key, val));

//     await axios.post('http://localhost:4000/createcourse', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });

//     navigate('/teacher/dashboard'); // go back after creation
//   // } catch (err) {
//   //   console.error("Error creating course:", err);
//   //   alert("Failed to create course. Please try again.");
//   // }
// };



//  const pageStyle = {
//     background: 'linear-gradient(135deg, #f9fbff, #eef3ff)',
//     minHeight: '100vh',
//     paddingTop: '40px',
//     paddingBottom: '40px',
//   };

//   const cardStyle = {
//     borderRadius: '15px',
//     overflow: 'hidden',
//     boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
//     animation: 'fadeIn 0.6s ease-in-out',
//   };

//   const headerStyle = {
//     background: 'linear-gradient(90deg, #007bff, #0056b3)',
//     color: 'white',
//     textAlign: 'center',
//     padding: '15px',
//     fontWeight: '600',
//     fontSize: '1.3rem',
//   };

//   const fadeInKeyframes = `
//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(10px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
//   `;


//   return (
//     <>
// <Titlewala/>
//        {/* Inject fadeIn animation directly into the component */}
//       <style>{fadeInKeyframes}</style>

//       <div style={pageStyle}>
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-8 col-md-10">
//               <div className="card" style={cardStyle}>
//                 <div style={headerStyle}>Create a New Course</div>
//                 <div className="card-body p-4">
//                   <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                       <label className="form-label fw-semibold">Course Title</label>
//                       <input
//                         name="title"
//                         placeholder="Enter course title"
//                         onChange={handleChange}
//                         className="form-control rounded-pill"
//                         required
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label fw-semibold">Description</label>
//                       <textarea
//                         name="description"
//                         placeholder="Write a brief description"
//                         rows="3"
//                         onChange={handleChange}
//                         className="form-control rounded-3"
//                         required
//                       />
//                     </div>

//                     <div className="row">
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label fw-semibold">Category</label>
//                         <input
//                           name="category"
//                           placeholder="e.g., Programming"
//                           onChange={handleChange}
//                           className="form-control rounded-pill"
//                           required
//                         />
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label fw-semibold">Duration</label>
//                         <input
//                           name="duration"
//                           placeholder="e.g., 6 weeks"
//                           onChange={handleChange}
//                           className="form-control rounded-pill"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="row">
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label fw-semibold">Level</label>
//                         <input
//                           name="level"
//                           placeholder="e.g., Beginner"
//                           onChange={handleChange}
//                           className="form-control rounded-pill"
//                           required
//                         />
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label fw-semibold">Price</label>
//                         <input
//                           name="price"
//                           type="number"
//                           placeholder="Enter price"
//                           onChange={handleChange}
//                           className="form-control rounded-pill"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="mb-4">
//                       <label className="form-label fw-semibold">Thumbnail Image</label>
//                       <input
//                         name="thumbnail"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleChange}
//                         className="form-control"
                        
//                       />
//                     </div>

//                     <div className="d-flex justify-content-between">
//                       <button
//                         type="button"
//                         className="btn btn-outline-secondary rounded-pill px-4"
//                         onClick={() => navigate('/dashboard')}
//                       >
//                         ← Back
//                       </button>
//                       <button
//                         type="submit"
//                         className="btn btn-primary rounded-pill px-4"
//                       >
//                         Create Course
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateCourse;





import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Titlewala from './Titlewala';

const CreateCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "",
    price: "",
    thumbnail: null,
    // teacherUsername:""
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setForm({ ...form, thumbnail: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));

      // Add teacher_username from session storage
      const tutorUsername = sessionStorage.getItem('tutorUsername');
      if (tutorUsername) {
        formData.append('tutorUsername', tutorUsername);
      }

      await axios.post('http://localhost:4000/createcourse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        // withCredentials: true // important if using express-session
      });
alert("Course ban gaya 😸😸😸");
      navigate('/teacher/dashboard');
    } catch (err) {
      console.error("Error creating course:", err);
      alert("Failed to create course. Please try again.");
    }
  };

  const pageStyle = {
    background: 'linear-gradient(135deg, #f9fbff, #eef3ff)',
    minHeight: '100vh',
    paddingTop: '40px',
    paddingBottom: '40px',
  };

  const cardStyle = {
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 0.6s ease-in-out',
  };

  const headerStyle = {
    background: 'linear-gradient(90deg, #007bff, #0056b3)',
    color: 'white',
    textAlign: 'center',
    padding: '15px',
    fontWeight: '600',
    fontSize: '1.3rem',
  };

  const fadeInKeyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      {/* <Titlewala /> */}
      <style>{fadeInKeyframes}</style>
      <div style={pageStyle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="card" style={cardStyle}>
                <div style={headerStyle}>Create a New Course</div>
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Course Title</label>
                      <input
                        name="title"
                        placeholder="Enter course title"
                        onChange={handleChange}
                        className="form-control rounded-pill"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Description</label>
                      <textarea
                        name="description"
                        placeholder="Write a brief description"
                        rows="3"
                        onChange={handleChange}
                        className="form-control rounded-3"
                        required
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Category</label>
                        <input
                          name="category"
                          placeholder="e.g., Programming"
                          onChange={handleChange}
                          className="form-control rounded-pill"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Duration</label>
                        <input
                          name="duration"
                          placeholder="e.g., 6 weeks"
                          onChange={handleChange}
                          className="form-control rounded-pill"
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Level</label>
                        <input
                          name="level"
                          placeholder="e.g., Beginner"
                          onChange={handleChange}
                          className="form-control rounded-pill"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Price</label>
                        <input
                          name="price"
                          type="number"
                          placeholder="Enter price"
                          onChange={handleChange}
                          className="form-control rounded-pill"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">Thumbnail Image</label>
                      <input
                        name="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline-secondary rounded-pill px-4"
                        onClick={() => navigate('/dashboard')}
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-4"
                      >
                        Create Course
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;

