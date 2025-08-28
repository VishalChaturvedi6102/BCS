

// import React, { useState } from 'react';
// import axios from 'axios';

// export default function Customcourses({ teacherId, apiBase = 'http://localhost:4000' }) {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [liveLink, setLiveLink] = useState('');
//   const [videoFile, setVideoFile] = useState(null);
//   const [pdfs, setPdfs] = useState([]); // { file, previewName }

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   function handleVideoChange(e) {
//     setVideoFile(e.target.files[0] || null);
//   }

//   function handlePdfAdd(e) {
//     const files = Array.from(e.target.files || []);
//     const newItems = files.map(f => ({ file: f, previewName: f.name }));
//     setPdfs(prev => [...prev, ...newItems]);
//     // reset input value so same file can be re-added if needed
//     e.target.value = null;
//   }

//   function movePdf(idx, dir) {
//     setPdfs(prev => {
//       const arr = [...prev];
//       const newIdx = idx + dir;
//       if (newIdx < 0 || newIdx >= arr.length) return arr;
//       const tmp = arr[newIdx];
//       arr[newIdx] = arr[idx];
//       arr[idx] = tmp;
//       return arr;
//     });
//   }

//   function removePdf(idx) {
//     setPdfs(prev => prev.filter((_, i) => i !== idx));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!teacherId) {
//       setMessage('teacherId missing. Pass teacherId prop to the component.');
//       return;
//     }
//     if (!name.trim()) {
//       setMessage('Please enter course name');
//       return;
//     }
//     setLoading(true);
//     setMessage('');
//     try {
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('description', description);
//       formData.append('live_link', liveLink || '');

//       if (videoFile) formData.append('video', videoFile);

//       // append pdfs in current order
//       pdfs.forEach((p) => formData.append('pdfs', p.file));

//       const url = `${apiBase}/api/teachers/${teacherId}/courses`;
//       const res = await axios.post(url, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       setMessage('Course created! ID: ' + (res.data.courseId || 'unknown'));
//       // reset form
//       setName(''); setDescription(''); setLiveLink(''); setVideoFile(null); setPdfs([]);
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.error || err.message || 'Upload failed');
//     } finally {
//       setLoading(false);
//     }
//   }

import React, { useState } from 'react';
import axios from 'axios';

export default function Customcourses({ apiBase = 'http://localhost:4000' }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const tutorUsername = sessionStorage.getItem('tutorUsername'); // <-- fetch from sessionStorage

  const handleVideoChange = e => setVideoFile(e.target.files[0] || null);

  const handlePdfAdd = e => {
    const files = Array.from(e.target.files || []);
    const newItems = files.map(f => ({ file: f, previewName: f.name }));
    setPdfs(prev => [...prev, ...newItems]);
    e.target.value = null;
  };

  const movePdf = (idx, dir) => {
    setPdfs(prev => {
      const arr = [...prev];
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= arr.length) return arr;
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  };

  const removePdf = idx => setPdfs(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!tutorUsername) return setMessage('tutorUsername missing in sessionStorage.');

    if (!name.trim()) return setMessage('Please enter course name');

    setLoading(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('live', liveLink || '');
      if (videoFile) formData.append('video', videoFile);
      pdfs.forEach(p => formData.append('pdfs', p.file));

      const url = `${apiBase}/api/customcourses/${tutorUsername}/create`;
      const res = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage('Custom course created! ID: ' + (res.data.courseId || 'unknown'));
      setName(''); setDescription(''); setLiveLink(''); setVideoFile(null); setPdfs([]);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{
      maxWidth: 2000,
      margin: '0 auto',
      padding: '40px 20px',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #ffaeaeff , #ff8e53)',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
        transform: 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        animation: 'fadeIn 0.8s ease-out'
      }} onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25)';
      }} onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#ff6b6b',
          marginBottom: '30px',
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'pulse 2s infinite'
        }}>Create New Course</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#555',
              fontSize: '1.1rem'
            }}>Course Name *</label>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              style={{ 
                width: '100%', 
                padding: '15px',
                borderRadius: '12px',
                border: '2px solid #e6e6e6',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                outline: 'none'
              }} 
              onFocus={(e) => {
                e.target.style.borderColor = '#ff6b6b';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e6e6e6';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#555',
              fontSize: '1.1rem'
            }}>Brief Description</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              rows={4} 
              style={{ 
                width: '100%', 
                padding: '15px',
                borderRadius: '12px',
                border: '2px solid #e6e6e6',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                outline: 'none',
                resize: 'vertical',
                minHeight: '120px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ff6b6b';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e6e6e6';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#555',
              fontSize: '1.1rem'
            }}>Live Link (Zoom / Meet)</label>
            <input 
              value={liveLink} 
              onChange={e => setLiveLink(e.target.value)} 
              placeholder="https://..." 
              style={{ 
                width: '100%', 
                padding: '15px',
                borderRadius: '12px',
                border: '2px solid #e6e6e6',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ff6b6b';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e6e6e6';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#555',
              fontSize: '1.1rem'
            }}>Upload Video (single)</label>
            <div style={{
              position: 'relative',
              display: 'inline-block',
              overflow: 'hidden',
              borderRadius: '12px',
              background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.4)';
            }} onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                padding: '12px 25px',
                color: 'white',
                fontWeight: '600',
                textAlign: 'center'
              }}>Choose Video File</div>
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleVideoChange} 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }} 
              />
            </div>
            {videoFile && (
              <div style={{
                marginTop: '12px',
                padding: '12px',
                borderRadius: '8px',
                background: '#f8f9fa',
                borderLeft: '4px solid #28a745',
                animation: 'slideIn 0.5s ease-out'
              }}>
                <span style={{ fontWeight: '500', color: '#28a745' }}>Selected: </span>
                {videoFile.name}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#555',
              fontSize: '1.1rem'
            }}>Upload PDFs (multiple, orderable)</label>
            <div style={{
              position: 'relative',
              display: 'inline-block',
              overflow: 'hidden',
              borderRadius: '12px',
              background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              marginBottom: '15px'
            }} onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.4)';
            }} onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                padding: '12px 25px',
                color: 'white',
                fontWeight: '600',
                textAlign: 'center'
              }}>Add PDF Files</div>
              <input 
                type="file" 
                accept="application/pdf" 
                multiple 
                onChange={handlePdfAdd} 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }} 
              />
            </div>
            
            {pdfs.length > 0 && (
              <div style={{
                marginTop: '20px',
                padding: '20px',
                borderRadius: '12px',
                background: '#f8f9fa',
                border: '1px solid #e9ecef',
                animation: 'fadeIn 0.5s ease-out'
              }}>
                <strong style={{
                  display: 'block',
                  marginBottom: '15px',
                  color: '#ff6b6b',
                  fontSize: '1.1rem'
                }}>PDFs (sequence):</strong>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {pdfs.map((p, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 15px',
                      marginBottom: '10px',
                      background: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      transition: 'transform 0.2s ease',
                      animation: 'slideIn 0.3s ease-out'
                    }} onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }} onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}>
                      <span style={{ flex: 1, fontWeight: '500' }}>
                        {idx + 1}. {p.previewName}
                      </span>
                      <div>
                        <button 
                          type="button" 
                          onClick={() => movePdf(idx, -1)} 
                          disabled={idx === 0}
                          style={{
                            padding: '6px 12px',
                            margin: '0 4px',
                            borderRadius: '6px',
                            border: 'none',
                            background: idx === 0 ? '#ccc' : 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            if (idx !== 0) {
                              e.target.style.transform = 'scale(1.05)';
                              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (idx !== 0) {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.boxShadow = 'none';
                            }
                          }}
                        >↑</button>
                        <button 
                          type="button" 
                          onClick={() => movePdf(idx, +1)} 
                          disabled={idx === pdfs.length - 1}
                          style={{
                            padding: '6px 12px',
                            margin: '0 4px',
                            borderRadius: '6px',
                            border: 'none',
                            background: idx === pdfs.length - 1 ? '#ccc' : 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: idx === pdfs.length - 1 ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            if (idx !== pdfs.length - 1) {
                              e.target.style.transform = 'scale(1.05)';
                              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (idx !== pdfs.length - 1) {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.boxShadow = 'none';
                            }
                          }}
                        >↓</button>
                        <button 
                          type="button" 
                          onClick={() => removePdf(idx)}
                          style={{
                            padding: '6px 12px',
                            margin: '0 4px',
                            borderRadius: '6px',
                            border: 'none',
                            background: 'linear-gradient(45deg, #dc3545, #c82333)',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              type="submit" 
              disabled={loading}
              style={{
                padding: '16px 40px',
                borderRadius: '50px',
                border: 'none',
                background: loading ? '#ccc' : 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 5px 15px rgba(255, 107, 107, 0.4)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(255, 107, 107, 0.5)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.4)';
                }
              }}
            >
              {loading ? (
                <>
                  <span style={{ display: 'inline-block', marginRight: '10px' }}>
                    <div style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      border: '3px solid rgba(255,255,255,0.3)',
                      borderRadius: '50%',
                      borderTopColor: 'white',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                  </span>
                  Creating...
                </>
              ) : 'Create Course'}
            </button>
          </div>
        </form>

        {message && (
          <div style={{
            marginTop: '25px',
            padding: '15px',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: '500',
            animation: 'fadeIn 0.5s ease-out',
            background: message.includes('failed') || message.includes('missing') || message.includes('Please enter') 
              ? 'linear-gradient(45deg, #ff6b6b, #ff8e53)' 
              : 'linear-gradient(45deg, #28a745, #20c997)',
            color: 'white',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
          }}>
            {message}
          </div>
        )}
      </div>
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}