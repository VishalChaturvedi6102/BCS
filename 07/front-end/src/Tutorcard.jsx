

// import React, { useState } from 'react';
// import { Card, Button, Badge } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const Tutorcard = ({ tutor }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const navigate = useNavigate();

//   const handleBookSession = () => {
//     navigate(`/booksession/${tutor.username}`);
//   };

//   const toggleFavorite = (e) => {
//     e.stopPropagation();
//     setIsFavorite(!isFavorite);
//   };

//   return (
//     <Card style={{ 
//       border: 'none', 
//       borderRadius: '12px', 
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
//       transition: 'all 0.3s ease',
//       cursor: 'pointer',
//       height: '100%'
//     }}
//     onMouseEnter={(e) => {
//       e.currentTarget.style.transform = 'translateY(-5px)';
//       e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
//     }}
//     onMouseLeave={(e) => {
//       e.currentTarget.style.transform = 'translateY(0)';
//       e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
//     }}
//     >
//       {/* Tutor Image with Badges */}
//       <div style={{ position: 'relative' }}>
//         <Card.Img 
//           variant="top" 
//           src={tutor.profileImage || 'https://via.placeholder.com/300x200?text=Tutor+Image'} 
//           style={{ 
//             height: '200px', 
//             objectFit: 'cover', 
//             borderTopLeftRadius: '12px', 
//             borderTopRightRadius: '12px' 
//           }}
//         />
        
//         {/* Online Status Badge */}
//         {tutor.isOnline && (
//           <Badge 
//             bg="success" 
//             style={{ 
//               position: 'absolute', 
//               top: '10px', 
//               left: '10px',
//               padding: '5px 10px',
//               borderRadius: '20px',
//               fontSize: '0.8rem'
//             }}
//           >
//             Online
//           </Badge>
//         )}
        
//         {/* Response Time Badge */}
//         <Badge 
//           bg="light" 
//           text="dark"
//           style={{ 
//             position: 'absolute', 
//             top: '10px', 
//             right: '10px',
//             padding: '5px 10px',
//             borderRadius: '20px',
//             fontWeight: '600',
//             fontSize: '0.8rem'
//           }}
//         >
//           ⚡ Responds in {tutor.responseTime || '2 hours'}
//         </Badge>
        
//         {/* Favorite Button */}
//         <Button
//           variant="outline-light"
//           style={{ 
//             position: 'absolute', 
//             bottom: '10px', 
//             right: '10px',
//             borderRadius: '50%',
//             width: '40px',
//             height: '40px',
//             padding: '0',
//             backgroundColor: 'rgba(0,0,0,0.5)'
//           }}
//           onClick={toggleFavorite}
//         >
//           {isFavorite ? '❤️' : '🤍'}
//         </Button>

//         {/* First Lesson Free Badge */}
//         <Badge 
//           bg="warning" 
//           text="dark"
//           style={{ 
//             position: 'absolute', 
//             bottom: '10px', 
//             left: '10px',
//             padding: '5px 10px',
//             borderRadius: '20px',
//             fontWeight: '600',
//             fontSize: '0.8rem'
//           }}
//         >
//           🎓 1st free class
//         </Badge>
//       </div>

//       <Card.Body style={{ padding: '1.5rem' }}>
//         {/* Tutor Name and Rating */}
//         <div className="d-flex justify-content-between align-items-start mb-2">
//           <div>
//             <Card.Title style={{ 
//               fontWeight: '600', 
//               color: '#1F2937',
//               marginBottom: '0.25rem',
//               fontSize: '1.1rem'
//             }}>
//               {tutor.name}
//             </Card.Title>
//             <Card.Text style={{ 
//               color: '#6B7280', 
//               fontSize: '0.9rem',
//               marginBottom: '0.5rem'
//             }}>
//               {tutor.subject} • {tutor.experience} years experience
//             </Card.Text>
//           </div>
//           <div className="text-end">
//             <div style={{ 
//               fontWeight: '700', 
//               color: '#006CFF',
//               fontSize: '1.2rem'
//             }}>
//               {tutor.hourlyRate || '₹2,500/hr'}
//             </div>
//           </div>
//         </div>

//         {/* Rating and Reviews */}
//         <div className="d-flex align-items-center mb-3">
//           <div style={{ 
//             color: '#FFC107', 
//             fontWeight: 'bold',
//             marginRight: '5px',
//             fontSize: '1rem'
//           }}>
//             ⭐ {tutor.rating || '4.9'}
//           </div>
//           <span style={{ 
//             color: '#6B7280', 
//             fontSize: '0.9rem'
//           }}>
//             ({tutor.reviews || '25'} reviews)
//           </span>
//         </div>

//         {/* Description */}
//         <Card.Text style={{ 
//           color: '#6B7280',
//           fontSize: '0.9rem',
//           marginBottom: '1.5rem',
//           lineHeight: '1.5',
//           minHeight: '60px'
//         }}>
//           {tutor.description || `${tutor.subject} - ${tutor.oneline || 'Expert tutor with proven track record'}`}
//         </Card.Text>

//         {/* Action Buttons */}
//         <div className="d-grid gap-2">
//           <Button 
//             variant="primary" 
//             style={{ 
//               backgroundColor: '#006CFF',
//               border: 'none',
//               borderRadius: '8px',
//               padding: '0.75rem',
//               fontWeight: '600'
//             }}
//             onClick={handleBookSession}
//           >
//             Contact Tutor
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Tutorcard;




import React, { useState } from "react";
import { Card, Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Tutorcard = ({ tutor }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleBookSession = () => {
    navigate(`/booksession/${tutor.username}`);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      style={{
        border: "none",
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.08)";
      }}
    >
      {/* Tutor Image + Badges */}
      <div style={{ position: "relative" }}>
        <Card.Img
          variant="top"
          src={tutor.profileImage || "https://via.placeholder.com/300x200?text=Tutor"}
          style={{
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        />

        {/* Online Status */}
        {tutor.isOnline && (
          <Badge
            bg="success"
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "0.8rem",
            }}
          >
            ● Online
          </Badge>
        )}

        {/* Response Time */}
        <Badge
          bg="light"
          text="dark"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "600",
          }}
        >
          ⚡ {tutor.responseTime || "2h response"}
        </Badge>

        {/* Favorite Button with Tooltip */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</Tooltip>}
        >
          <Button
            variant="light"
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              borderRadius: "50%",
              width: "42px",
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            }}
            onClick={toggleFavorite}
          >
            {isFavorite ? "❤️" : "🤍"}
          </Button>
        </OverlayTrigger>

        {/* First Lesson Free */}
        <Badge
          bg="warning"
          text="dark"
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            padding: "6px 12px",
            borderRadius: "20px",
            fontWeight: "600",
            fontSize: "0.8rem",
          }}
        >
          🎓 1st Class Free
        </Badge>
      </div>

      <Card.Body style={{ padding: "1.25rem" }}>
        {/* Tutor Name + Price */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <Card.Title
              style={{
                fontWeight: "600",
                color: "#1F2937",
                marginBottom: "0.25rem",
                fontSize: "1.15rem",
              }}
            >
              {tutor.name}
            </Card.Title>
            <Card.Text
              style={{
                color: "#6B7280",
                fontSize: "0.9rem",
                marginBottom: "0.4rem",
              }}
            >
              {tutor.subject} • {tutor.experience} yrs exp.
            </Card.Text>
          </div>
          <div className="text-end">
            <div
              style={{
                fontWeight: "700",
                color: "#006CFF",
                fontSize: "1.2rem",
              }}
            >
              {tutor.hourlyRate || "₹2,500/hr"}
            </div>
          </div>
        </div>

        {/* Rating + Reviews */}
        <div className="d-flex align-items-center mb-3">
          <div style={{ color: "#FFC107", fontWeight: "bold", marginRight: "6px" }}>
            ⭐ {tutor.rating || "4.9"}
          </div>
          <span style={{ color: "#6B7280", fontSize: "0.9rem" }}>
            ({tutor.reviews || "25"} reviews)
          </span>
        </div>

        {/* Languages Taught */}
        {tutor.languages && (
          <div className="mb-3">
            {tutor.languages.slice(0, 3).map((lang, i) => (
              <Badge
                key={i}
                bg="info"
                text="dark"
                style={{
                  marginRight: "5px",
                  fontSize: "0.75rem",
                  padding: "5px 8px",
                  borderRadius: "8px",
                }}
              >
                {lang}
              </Badge>
            ))}
            {tutor.languages.length > 3 && (
              <Badge bg="secondary" style={{ fontSize: "0.75rem" }}>
                +{tutor.languages.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Description */}
        <Card.Text
          style={{
            color: "#6B7280",
            fontSize: "0.9rem",
            marginBottom: "1.25rem",
            lineHeight: "1.5",
            minHeight: "50px",
          }}
        >
          {tutor.description || tutor.oneline || "Expert tutor with proven track record"}
        </Card.Text>

        {/* Contact Button */}
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            style={{
              backgroundColor: "#006CFF",
              border: "none",
              borderRadius: "10px",
              padding: "0.75rem",
              fontWeight: "600",
            }}
            onClick={handleBookSession}
          >
            Contact Tutor
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Tutorcard;




// import React, { useState, useEffect } from "react";
// import { Card, Button, Badge, Modal, Form, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { FiHeart, FiStar, FiClock, FiMessageSquare, FiCheck, FiUser, FiGlobe, FiAward } from "react-icons/fi";
// import axios from "axios";

// const Tutorcard = ({ tutor, connectionStatus: initialStatus = "none" }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState(initialStatus);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();

//   const handleBookSession = () => {
//     if (status === "accepted") {
//       navigate(`/booksession/${tutor.username}`);
//     } else {
//       setShowModal(true);
//     }
//   };

//   const toggleFavorite = (e) => {
//     e.stopPropagation();
//     setIsFavorite(!isFavorite);
//   };

//   const handleSendRequest = async () => {
//     setIsLoading(true);
//     const token = sessionStorage.getItem("token");
//     // const studentUsername = sessionStorage.getItem("studentUsername");
//     // sessionStorage.setItem("studentUsername", user.username);
//     const studentUsername = sessionStorage.getItem("studentUsername");


//     try {
//       await axios.post(
//         `http://localhost:4000/api/connection-request`,
//         {
//           // tutorId: tutor._id,
//           tutorUsername: tutor.username,
//          studentUsername: studentUsername,
//           message: message,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setStatus("pending");
//       setShowModal(false);
//       setMessage("");
//     } catch (error) {
//       console.error("Error sending request:", error);
//       alert("Failed to send request. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getButtonConfig = () => {
//     switch (status) {
//       case "accepted":
//         return {
//           variant: "success",
//           text: "View Tutor",
//           icon: <FiUser className="me-2" />,
//           style: {
//             background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//             border: "none",
//           },
//         };
//       case "pending":
//         return {
//           variant: "warning",
//           text: "Request Pending",
//           icon: <FiClock className="me-2" />,
//           style: {
//             background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
//             border: "none",
//           },
//         };
//       case "rejected":
//         return {
//           variant: "secondary",
//           text: "Contact Tutor",
//           icon: <FiMessageSquare className="me-2" />,
//           style: {
//             background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
//             border: "none",
//           },
//         };
//       default:
//         return {
//           variant: "primary",
//           text: "Contact Tutor",
//           icon: <FiMessageSquare className="me-2" />,
//           style: {
//             background: isHovered 
//               ? "linear-gradient(135deg, #006CFF 0%, #0051cc 100%)"
//               : "linear-gradient(135deg, #006CFF 0%, #0080ff 100%)",
//             border: "none",
//           },
//         };
//     }
//   };

//   const buttonConfig = getButtonConfig();

//   return (
//     <>
//       <Card
//         style={{
//           border: "none",
//           borderRadius: "20px",
//           boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
//           transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//           cursor: "pointer",
//           height: "100%",
//           overflow: "hidden",
//           background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
//         }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         className="h-100"
//       >
//         {/* Tutor Image with Gradient Overlay */}
//         <div style={{ position: "relative", overflow: "hidden" }}>
//           <Card.Img
//             variant="top"
//             src={tutor.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"}
//             style={{
//               height: "220px",
//               objectFit: "cover",
//               transition: "transform 0.4s ease",
//               transform: isHovered ? "scale(1.05)" : "scale(1)",
//             }}
//           />
          
//           {/* Gradient Overlay */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7) 100%)",
//             }}
//           />

//           {/* Top Badges */}
//           <div style={{ position: "absolute", top: "16px", left: "16px", right: "16px" }}>
//             <div className="d-flex justify-content-between align-items-start">
//               {/* Online Status */}
//               {tutor.isOnline && (
//                 <Badge
//                   style={{
//                     background: "rgba(16, 185, 129, 0.95)",
//                     padding: "8px 16px",
//                     borderRadius: "20px",
//                     fontSize: "0.75rem",
//                     fontWeight: "600",
//                     backdropFilter: "blur(10px)",
//                   }}
//                 >
//                   ● Online Now
//                 </Badge>
//               )}

//               {/* Favorite Button */}
//               <Button
//                 variant="light"
//                 style={{
//                   borderRadius: "50%",
//                   width: "42px",
//                   height: "42px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   background: "rgba(255, 255, 255, 0.95)",
//                   backdropFilter: "blur(10px)",
//                   border: "none",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                 }}
//                 onClick={toggleFavorite}
//               >
//                 {isFavorite ? (
//                   <FiHeart style={{ color: "#ef4444", fill: "#ef4444" }} />
//                 ) : (
//                   <FiHeart style={{ color: "#6b7280" }} />
//                 )}
//               </Button>
//             </div>
//           </div>

//           {/* Bottom Badges */}
//           <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
//             <div className="d-flex justify-content-between align-items-end">
//               {/* First Lesson Free */}
//               <Badge
//                 style={{
//                   background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
//                   padding: "8px 16px",
//                   borderRadius: "20px",
//                   fontSize: "0.75rem",
//                   fontWeight: "600",
//                 }}
//               >
//                 <FiAward className="me-1" /> 1st Class Free
//               </Badge>

//               {/* Response Time */}
//               <Badge
//                 style={{
//                   background: "rgba(255, 255, 255, 0.95)",
//                   color: "#1f2937",
//                   padding: "8px 16px",
//                   borderRadius: "20px",
//                   fontSize: "0.75rem",
//                   fontWeight: "600",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <FiClock className="me-1" /> {tutor.responseTime || "2h response"}
//               </Badge>
//             </div>
//           </div>
//         </div>

//         <Card.Body style={{ padding: "1.5rem" }}>
//           {/* Tutor Header */}
//           <div className="d-flex justify-content-between align-items-start mb-3">
//             <div style={{ flex: 1 }}>
//               <Card.Title
//                 style={{
//                   fontWeight: "700",
//                   color: "#1F2937",
//                   marginBottom: "0.5rem",
//                   fontSize: "1.25rem",
//                 }}
//               >
//                 {tutor.name}
//               </Card.Title>
//               <Card.Text
//                 style={{
//                   color: "#6B7280",
//                   fontSize: "0.9rem",
//                   marginBottom: "0",
//                 }}
//               >
//                 {tutor.subject} • {tutor.experience} years experience
//               </Card.Text>
//             </div>
//             <div className="text-end" style={{ minWidth: "80px" }}>
//               <div
//                 style={{
//                   fontWeight: "800",
//                   color: "#006CFF",
//                   fontSize: "1.3rem",
//                   lineHeight: "1.2",
//                 }}
//               >
//                 {tutor.hourlyRate || "₹2,500/hr"}
//               </div>
//             </div>
//           </div>

//           {/* Rating Section */}
//           <div className="d-flex align-items-center mb-3">
//             <div
//               style={{
//                 color: "#FFD700",
//                 fontWeight: "bold",
//                 marginRight: "8px",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <FiStar style={{ fill: "#FFD700", marginRight: "4px" }} />
//               {tutor.rating || "4.9"}
//             </div>
//             <span style={{ color: "#6B7280", fontSize: "0.85rem" }}>
//               ({tutor.reviews || "25"} reviews)
//             </span>
//           </div>

//           {/* Languages */}
//           {tutor.languages && (
//             <div className="mb-3">
//               <div className="d-flex align-items-center mb-2">
//                 <FiGlobe style={{ color: "#006CFF", marginRight: "8px" }} />
//                 <small style={{ color: "#6B7280", fontWeight: "600" }}>Teaches in:</small>
//               </div>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                 {tutor.languages.slice(0, 3).map((lang, i) => (
//                   <Badge
//                     key={i}
//                     style={{
//                       background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
//                       color: "#3730a3",
//                       padding: "6px 12px",
//                       borderRadius: "12px",
//                       fontSize: "0.75rem",
//                       fontWeight: "600",
//                     }}
//                   >
//                     {lang}
//                   </Badge>
//                 ))}
//                 {tutor.languages.length > 3 && (
//                   <Badge
//                     style={{
//                       background: "rgba(107, 114, 128, 0.1)",
//                       color: "#6b7280",
//                       padding: "6px 12px",
//                       borderRadius: "12px",
//                       fontSize: "0.75rem",
//                     }}
//                   >
//                     +{tutor.languages.length - 3}
//                   </Badge>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Description */}
//           <Card.Text
//             style={{
//               color: "#6B7280",
//               fontSize: "0.9rem",
//               marginBottom: "1.5rem",
//               lineHeight: "1.6",
//               minHeight: "60px",
//             }}
//           >
//             {tutor.description || "Expert tutor with proven track record of student success..."}
//           </Card.Text>

//           {/* Contact Button */}
//           <div className="d-grid">
//             <Button
//               style={{
//                 ...buttonConfig.style,
//                 borderRadius: "12px",
//                 padding: "0.875rem",
//                 fontWeight: "600",
//                 fontSize: "0.95rem",
//                 transition: "all 0.3s ease",
//                 boxShadow: isHovered ? "0 8px 20px rgba(0, 108, 255, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
//               }}
//               onClick={handleBookSession}
//               disabled={status === "pending"}
//             >
//               <span className="d-flex align-items-center justify-content-center">
//                 {buttonConfig.icon}
//                 {buttonConfig.text}
//               </span>
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Contact Request Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton style={{ border: "none", padding: "1.5rem 1.5rem 0.5rem" }}>
//           <Modal.Title style={{ fontWeight: "700", color: "#1F2937" }}>
//             Connect with {tutor.name}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ padding: "1.5rem" }}>
//           <div className="text-center mb-3">
//             <div
//               style={{
//                 width: "60px",
//                 height: "60px",
//                 borderRadius: "50%",
//                 background: "linear-gradient(135deg, #006CFF 0%, #0080ff 100%)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 margin: "0 auto 1rem",
//               }}
//             >
//               <FiMessageSquare style={{ color: "white", fontSize: "1.5rem" }} />
//             </div>
//             <p style={{ color: "#6B7280", marginBottom: "0" }}>
//               Send a connection request to this tutor. They'll need to accept before you can book sessions.
//             </p>
//           </div>

//           <Form.Group className="mb-4">
//             <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
//               Your Message (Optional)
//             </Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={4}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Introduce yourself and explain what you'd like to learn..."
//               style={{
//                 borderRadius: "12px",
//                 border: "2px solid #e5e7eb",
//                 padding: "12px",
//                 fontSize: "0.9rem",
//               }}
//             />
//           </Form.Group>

//           <div className="d-grid gap-2">
//             <Button
//               onClick={handleSendRequest}
//               disabled={isLoading}
//               style={{
//                 background: "linear-gradient(135deg, #006CFF 0%, #0051cc 100%)",
//                 border: "none",
//                 borderRadius: "12px",
//                 padding: "12px",
//                 fontWeight: "600",
//               }}
//             >
//               {isLoading ? (
//                 <span className="d-flex align-items-center justify-content-center">
//                   <Spinner animation="border" size="sm" className="me-2" />
//                   Sending Request...
//                 </span>
//               ) : (
//                 <span className="d-flex align-items-center justify-content-center">
//                   <FiCheck className="me-2" />
//                   Send Connection Request
//                 </span>
//               )}
//             </Button>
//             <Button
//               variant="light"
//               onClick={() => setShowModal(false)}
//               style={{
//                 borderRadius: "12px",
//                 padding: "12px",
//                 fontWeight: "600",
//               }}
//             >
//               Cancel
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default Tutorcard;




// import React, { useState } from "react";
// import { Card, Button, Badge, Modal, Form, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { FiHeart, FiStar, FiClock, FiMessageSquare, FiCheck, FiUser, FiGlobe, FiAward } from "react-icons/fi";
// import axios from "axios";

// const Tutorcard = ({ tutor, connectionStatus: initialStatus = "none" }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState(initialStatus);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();

//   const handleBookSession = () => {
//     if (status === "accepted") {
//       navigate(`/booksession/${tutor.username}`);
//     } else {
//       setShowModal(true);
//     }
//   };

//   const toggleFavorite = (e) => {
//     e.stopPropagation();
//     setIsFavorite(!isFavorite);
//   };

//   const handleSendRequest = async () => {
//     setIsLoading(true);
//     const token = sessionStorage.getItem("token");
//     const studentUsername = sessionStorage.getItem("studentUsername");

//     try {
//       await axios.post(
//         "http://localhost:4000/api/connection-request",
//         {
//           tutorUsername: tutor.username,
//           studentUsername,
//           message,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setStatus("pending");
//       setShowModal(false);
//       setMessage("");
//     } catch (error) {
//       console.error("Error sending request:", error);
//       alert("Failed to send request. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getButtonConfig = () => {
//     switch (status) {
//       case "accepted":
//         return { variant: "success", text: "View Tutor", icon: <FiUser className="me-2" /> };
//       case "pending":
//         return { variant: "warning", text: "Request Pending", icon: <FiClock className="me-2" /> };
//       case "rejected":
//         return { variant: "secondary", text: "Contact Tutor", icon: <FiMessageSquare className="me-2" /> };
//       default:
//         return { variant: "primary", text: "Contact Tutor", icon: <FiMessageSquare className="me-2" /> };
//     }
//   };

//   const buttonConfig = getButtonConfig();

//   return (
//     <>
//       <Card
//         style={{
//           border: "none",
//           borderRadius: "20px",
//           boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
//           cursor: "pointer",
//           overflow: "hidden",
//           height: "100%",
//           background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
//         }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div style={{ position: "relative", overflow: "hidden" }}>
//           <Card.Img
//             variant="top"
//             src={tutor.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"}
//             style={{ height: "220px", objectFit: "cover", transition: "transform 0.4s ease", transform: isHovered ? "scale(1.05)" : "scale(1)" }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7) 100%)",
//             }}
//           />
//           <div style={{ position: "absolute", top: "16px", left: "16px", right: "16px" }}>
//             <div className="d-flex justify-content-between align-items-start">
//               {tutor.isOnline && (
//                 <Badge style={{ background: "rgba(16, 185, 129, 0.95)", padding: "8px 16px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600" }}>
//                   ● Online Now
//                 </Badge>
//               )}
//               <Button
//                 variant="light"
//                 style={{ borderRadius: "50%", width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center" }}
//                 onClick={toggleFavorite}
//               >
//                 {isFavorite ? <FiHeart style={{ color: "#ef4444", fill: "#ef4444" }} /> : <FiHeart style={{ color: "#6b7280" }} />}
//               </Button>
//             </div>
//           </div>
//         </div>

//         <Card.Body style={{ padding: "1.5rem" }}>
//           <div className="d-flex justify-content-between align-items-start mb-3">
//             <div style={{ flex: 1 }}>
//               <Card.Title style={{ fontWeight: "700", color: "#1F2937", fontSize: "1.25rem" }}>{tutor.name}</Card.Title>
//               <Card.Text style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "0" }}>
//                 {tutor.subject} • {tutor.experience} years experience
//               </Card.Text>
//             </div>
//             <div className="text-end" style={{ minWidth: "80px" }}>
//               <div style={{ fontWeight: "800", color: "#006CFF", fontSize: "1.3rem" }}>{tutor.hourlyRate || "₹2,500/hr"}</div>
//             </div>
//           </div>

//           <div className="d-grid">
//             <Button
//               onClick={handleBookSession}
//               disabled={status === "pending"}
//               style={{
//                 background: isHovered ? "linear-gradient(135deg, #006CFF 0%, #0051cc 100%)" : "linear-gradient(135deg, #006CFF 0%, #0080ff 100%)",
//                 border: "none",
//                 borderRadius: "12px",
//                 padding: "0.875rem",
//                 fontWeight: "600",
//                 fontSize: "0.95rem",
//               }}
//             >
//               <span className="d-flex align-items-center justify-content-center">
//                 {buttonConfig.icon} {buttonConfig.text}
//               </span>
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton style={{ border: "none", padding: "1.5rem 1.5rem 0.5rem" }}>
//           <Modal.Title style={{ fontWeight: "700", color: "#1F2937" }}>Connect with {tutor.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ padding: "1.5rem" }}>
//           <Form.Group className="mb-4">
//             <Form.Label style={{ fontWeight: "600", color: "#374151" }}>Your Message (Optional)</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={4}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Introduce yourself..."
//               style={{ borderRadius: "12px", border: "2px solid #e5e7eb", padding: "12px", fontSize: "0.9rem" }}
//             />
//           </Form.Group>

//           <div className="d-grid gap-2">
//             <Button
//               onClick={handleSendRequest}
//               disabled={isLoading}
//               style={{ background: "linear-gradient(135deg, #006CFF 0%, #0051cc 100%)", border: "none", borderRadius: "12px", padding: "12px", fontWeight: "600" }}
//             >
//               {isLoading ? (
//                 <span className="d-flex align-items-center justify-content-center">
//                   <Spinner animation="border" size="sm" className="me-2" /> Sending Request...
//                 </span>
//               ) : (
//                 <span className="d-flex align-items-center justify-content-center">
//                   <FiCheck className="me-2" /> Send Connection Request
//                 </span>
//               )}
//             </Button>
//             <Button variant="light" onClick={() => setShowModal(false)} style={{ borderRadius: "12px", padding: "12px", fontWeight: "600" }}>
//               Cancel
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default Tutorcard;



// import React, { useState } from "react";
// import { Card, Button, Badge, Modal, Form, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { FiHeart, FiClock, FiMessageSquare, FiCheck, FiUser } from "react-icons/fi";
// import axios from "axios";

// const Tutorcard = ({ tutor, connectionStatus: initialStatus = "none" }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState(initialStatus);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();

//   const handleBookSession = () => {
//     if (status === "accepted") {
//       navigate(`/booksession/${tutor.username}`);
//     } else {
//       setShowModal(true);
//     }
//   };

//   const toggleFavorite = (e) => {
//     e.stopPropagation();
//     setIsFavorite(!isFavorite);
//   };

//   const handleSendRequest = async () => {
//     setIsLoading(true);
//     const token = sessionStorage.getItem("token");
//     const studentUsername = sessionStorage.getItem("studentUsername");

//     if (!studentUsername) {
//       alert("Student not logged in!");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/connection-request",
//         {
//           studentUsername,
//           tutorUsername: tutor.username,
//           message,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         setStatus("pending");
//         setShowModal(false);
//         setMessage("");
//       }
//     } catch (error) {
//       console.error("Error sending request:", error);
//       alert("Failed to send request. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getButtonConfig = () => {
//     switch (status) {
//       case "accepted":
//         return { variant: "success", text: "View Tutor", icon: <FiUser className="me-2" /> };
//       case "pending":
//         return { variant: "warning", text: "Request Pending", icon: <FiClock className="me-2" /> };
//       case "rejected":
//         return { variant: "secondary", text: "Contact Tutor", icon: <FiMessageSquare className="me-2" /> };
//       default:
//         return { variant: "primary", text: "Contact Tutor", icon: <FiMessageSquare className="me-2" /> };
//     }
//   };

//   const buttonConfig = getButtonConfig();

//   return (
//     <>
//       <Card
//         style={{
//           border: "none",
//           borderRadius: "20px",
//           boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
//           cursor: "pointer",
//           overflow: "hidden",
//           height: "100%",
//           background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
//         }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div style={{ position: "relative", overflow: "hidden" }}>
//           <Card.Img
//             variant="top"
//             src={tutor.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"}
//             style={{ height: "220px", objectFit: "cover", transition: "transform 0.4s ease", transform: isHovered ? "scale(1.05)" : "scale(1)" }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7) 100%)",
//             }}
//           />
//           <div style={{ position: "absolute", top: "16px", left: "16px", right: "16px" }}>
//             <div className="d-flex justify-content-between align-items-start">
//               {tutor.isOnline && (
//                 <Badge style={{ background: "rgba(16, 185, 129, 0.95)", padding: "8px 16px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600" }}>
//                   ● Online Now
//                 </Badge>
//               )}
//               <Button
//                 variant="light"
//                 style={{ borderRadius: "50%", width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center" }}
//                 onClick={toggleFavorite}
//               >
//                 {isFavorite ? <FiHeart style={{ color: "#ef4444", fill: "#ef4444" }} /> : <FiHeart style={{ color: "#6b7280" }} />}
//               </Button>
//             </div>
//           </div>
//         </div>

//         <Card.Body style={{ padding: "1.5rem" }}>
//           <div className="d-flex justify-content-between align-items-start mb-3">
//             <div style={{ flex: 1 }}>
//               <Card.Title style={{ fontWeight: "700", color: "#1F2937", fontSize: "1.25rem" }}>{tutor.name}</Card.Title>
//               <Card.Text style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "0" }}>
//                 {tutor.subject} • {tutor.experience} years experience
//               </Card.Text>
//             </div>
//             <div className="text-end" style={{ minWidth: "80px" }}>
//               <div style={{ fontWeight: "800", color: "#006CFF", fontSize: "1.3rem" }}>{tutor.hourlyRate || "₹2,500/hr"}</div>
//             </div>
//           </div>

//           <div className="d-grid">
//             <Button
//               onClick={handleBookSession}
//               disabled={status === "pending"}
//               style={{
//                 background: isHovered ? "linear-gradient(135deg, #006CFF 0%, #0051cc 100%)" : "linear-gradient(135deg, #006CFF 0%, #0080ff 100%)",
//                 border: "none",
//                 borderRadius: "12px",
//                 padding: "0.875rem",
//                 fontWeight: "600",
//                 fontSize: "0.95rem",
//               }}
//             >
//               <span className="d-flex align-items-center justify-content-center">
//                 {buttonConfig.icon} {buttonConfig.text}
//               </span>
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton style={{ border: "none", padding: "1.5rem 1.5rem 0.5rem" }}>
//           <Modal.Title style={{ fontWeight: "700", color: "#1F2937" }}>Connect with {tutor.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ padding: "1.5rem" }}>
//           <Form.Group className="mb-4">
//             <Form.Label style={{ fontWeight: "600", color: "#374151" }}>Your Message (Optional)</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={4}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Introduce yourself..."
//               style={{ borderRadius: "12px", border: "2px solid #e5e7eb", padding: "12px", fontSize: "0.9rem" }}
//             />
//           </Form.Group>

//           <div className="d-grid gap-2">
//             <Button
//               onClick={handleSendRequest}
//               disabled={isLoading}
//               style={{ background: "linear-gradient(135deg, #006CFF 0%, #0051cc 100%)", border: "none", borderRadius: "12px", padding: "12px", fontWeight: "600" }}
//             >
//               {isLoading ? (
//                 <span className="d-flex align-items-center justify-content-center">
//                   <Spinner animation="border" size="sm" className="me-2" /> Sending Request...
//                 </span>
//               ) : (
//                 <span className="d-flex align-items-center justify-content-center">
//                   <FiCheck className="me-2" /> Send Connection Request
//                 </span>
//               )}
//             </Button>
//             <Button variant="light" onClick={() => setShowModal(false)} style={{ borderRadius: "12px", padding: "12px", fontWeight: "600" }}>
//               Cancel
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default Tutorcard;
