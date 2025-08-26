

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
