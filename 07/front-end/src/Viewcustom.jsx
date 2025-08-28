

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Viewcustom = ({ courseId }) => {
//   const [course, setCourse] = useState(null);
//   const [pdfs, setPdfs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/api/customcourses/course/${courseId}`);
//         setCourse(res.data.course);
//         setPdfs(res.data.pdfs);
//       } catch (err) {
//         console.error('Error fetching course:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [courseId]);

//   if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
//   if (!course) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Course not found</div>;

//   return (
//     <div style={{
//       maxWidth: '1000px',
//       margin: '50px auto',
//       padding: '30px',
//       background: 'white',
//       borderRadius: '20px',
//       boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
//       fontFamily: "'Poppins', sans-serif"
//     }}>
//       {/* Video */}
//       {course.video && (
//         <video
//           src={`http://localhost:4000${course.video}`}
//           controls
//           style={{ width: '100%', borderRadius: '15px', marginBottom: '25px', objectFit: 'cover' }}
//         />
//       )}

//       {/* Course Name */}
//       <h2 style={{
//         fontSize: '2rem',
//         fontWeight: '700',
//         marginBottom: '15px',
//         color: '#ff6b6b',
//         background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
//         WebkitBackgroundClip: 'text',
//         WebkitTextFillColor: 'transparent'
//       }}>{course.cname}</h2>

//       {/* Description */}
//       <p style={{
//         fontSize: '1rem',
//         color: '#555',
//         marginBottom: '20px',
//         lineHeight: '1.6'
//       }}>{course.bdesc || 'No description provided.'}</p>

//       {/* Live Link */}
//       {course.live && (
//         <div style={{
//           marginBottom: '25px',
//           padding: '15px 20px',
//           background: '#e0f7fa',
//           borderRadius: '12px'
//         }}>
//           <strong>Live Class Link: </strong>
//           <a href={course.live} target="_blank" rel="noopener noreferrer" style={{ color: '#00796b', fontWeight: '600' }}>
//             Join Here
//           </a>
//         </div>
//       )}

//       {/* PDFs */}
//       {pdfs.length > 0 && (
//         <div style={{
//           marginTop: '30px'
//         }}>
//           <h3 style={{ marginBottom: '15px', color: '#ff6b6b' }}>Course PDFs:</h3>
//           <ul style={{ listStyle: 'none', padding: 0 }}>
//             {pdfs.map((pdf, idx) => (
//               <li key={pdf.id} style={{
//                 marginBottom: '10px',
//                 padding: '12px 15px',
//                 borderRadius: '8px',
//                 background: '#f8f9fa',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//                 transition: '0.3s all'
//               }}>
//                 <span>{idx + 1}. {pdf.original_filename}</span>
//                 <a
//                   href={`http://localhost:4000${pdf.file_path}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     padding: '6px 12px',
//                     background: 'linear-gradient(45deg, #28a745, #20c997)',
//                     color: 'white',
//                     borderRadius: '6px',
//                     textDecoration: 'none',
//                     fontWeight: '600'
//                   }}
//                 >
//                   Download
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Viewcustom;






import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Viewcustom = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const [course, setCourse] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!courseId) return; // Prevent unnecessary request

    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/customcourses/course/${courseId}`);
        if (res.data.course) {
          setCourse(res.data.course);
          setPdfs(res.data.pdfs || []);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px' }}>{error}</div>;

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '50px auto',
      padding: '30px',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Video */}
      {course.video && (
        <video
          src={`http://localhost:4000${course.video}`}
          controls
          style={{ width: '100%', borderRadius: '15px', marginBottom: '25px', objectFit: 'cover' }}
        />
      )}

      {/* Course Name */}
      <h2 style={{
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '15px',
        color: '#ff6b6b',
        background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>{course.cname}</h2>

      {/* Description */}
      <p style={{
        fontSize: '1rem',
        color: '#555',
        marginBottom: '20px',
        lineHeight: '1.6'
      }}>{course.bdesc || 'No description provided.'}</p>

      {/* Live Link */}
      {course.live && (
        <div style={{
          marginBottom: '25px',
          padding: '15px 20px',
          background: '#e0f7fa',
          borderRadius: '12px'
        }}>
          <strong>Live Class Link: </strong>
          <a href={course.live} target="_blank" rel="noopener noreferrer" style={{ color: '#00796b', fontWeight: '600' }}>
            Join Here
          </a>
        </div>
      )}

      {/* PDFs */}
      {pdfs.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '15px', color: '#ff6b6b' }}>Course PDFs:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pdfs.map((pdf, idx) => (
              <li key={pdf.id || idx} style={{
                marginBottom: '10px',
                padding: '12px 15px',
                borderRadius: '8px',
                background: '#f8f9fa',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: '0.3s all'
              }}>
                <span>{idx + 1}. {pdf.original_filename}</span>
                <a
                  href={`http://localhost:4000${pdf.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '6px 12px',
                    background: 'linear-gradient(45deg, #28a745, #20c997)',
                    color: 'white',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Viewcustom;
