

import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
    <Card style={{ 
      border: 'none', 
      borderRadius: '12px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      height: '100%'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    }}
    >
      {/* Tutor Image with Badges */}
      <div style={{ position: 'relative' }}>
        <Card.Img 
          variant="top" 
          src={tutor.profileImage || 'https://via.placeholder.com/300x200?text=Tutor+Image'} 
          style={{ 
            height: '200px', 
            objectFit: 'cover', 
            borderTopLeftRadius: '12px', 
            borderTopRightRadius: '12px' 
          }}
        />
        
        {/* Online Status Badge */}
        {tutor.isOnline && (
          <Badge 
            bg="success" 
            style={{ 
              position: 'absolute', 
              top: '10px', 
              left: '10px',
              padding: '5px 10px',
              borderRadius: '20px',
              fontSize: '0.8rem'
            }}
          >
            Online
          </Badge>
        )}
        
        {/* Response Time Badge */}
        <Badge 
          bg="light" 
          text="dark"
          style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px',
            padding: '5px 10px',
            borderRadius: '20px',
            fontWeight: '600',
            fontSize: '0.8rem'
          }}
        >
          ⚡ Responds in {tutor.responseTime || '2 hours'}
        </Badge>
        
        {/* Favorite Button */}
        <Button
          variant="outline-light"
          style={{ 
            position: 'absolute', 
            bottom: '10px', 
            right: '10px',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '0',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
          onClick={toggleFavorite}
        >
          {isFavorite ? '❤️' : '🤍'}
        </Button>

        {/* First Lesson Free Badge */}
        <Badge 
          bg="warning" 
          text="dark"
          style={{ 
            position: 'absolute', 
            bottom: '10px', 
            left: '10px',
            padding: '5px 10px',
            borderRadius: '20px',
            fontWeight: '600',
            fontSize: '0.8rem'
          }}
        >
          🎓 1st free class
        </Badge>
      </div>

      <Card.Body style={{ padding: '1.5rem' }}>
        {/* Tutor Name and Rating */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <Card.Title style={{ 
              fontWeight: '600', 
              color: '#1F2937',
              marginBottom: '0.25rem',
              fontSize: '1.1rem'
            }}>
              {tutor.name}
            </Card.Title>
            <Card.Text style={{ 
              color: '#6B7280', 
              fontSize: '0.9rem',
              marginBottom: '0.5rem'
            }}>
              {tutor.subject} • {tutor.experience} years experience
            </Card.Text>
          </div>
          <div className="text-end">
            <div style={{ 
              fontWeight: '700', 
              color: '#006CFF',
              fontSize: '1.2rem'
            }}>
              {tutor.hourlyRate || '₹2,500/hr'}
            </div>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="d-flex align-items-center mb-3">
          <div style={{ 
            color: '#FFC107', 
            fontWeight: 'bold',
            marginRight: '5px',
            fontSize: '1rem'
          }}>
            ⭐ {tutor.rating || '4.9'}
          </div>
          <span style={{ 
            color: '#6B7280', 
            fontSize: '0.9rem'
          }}>
            ({tutor.reviews || '25'} reviews)
          </span>
        </div>

        {/* Description */}
        <Card.Text style={{ 
          color: '#6B7280',
          fontSize: '0.9rem',
          marginBottom: '1.5rem',
          lineHeight: '1.5',
          minHeight: '60px'
        }}>
          {tutor.description || `${tutor.subject} - ${tutor.oneline || 'Expert tutor with proven track record'}`}
        </Card.Text>

        {/* Action Buttons */}
        <div className="d-grid gap-2">
          <Button 
            variant="primary" 
            style={{ 
              backgroundColor: '#006CFF',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem',
              fontWeight: '600'
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