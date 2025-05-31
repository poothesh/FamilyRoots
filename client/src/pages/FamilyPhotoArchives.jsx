import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/FamilyPhoto.css';

const FamilyPhotos = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  useEffect(() => {
    // Animate header on load
    gsap.fromTo('.photos-header', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    
    // Staggered animation for photo items
    gsap.fromTo('.photo-item', 
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.05, 
        ease: 'back.out(1.2)',
        delay: 0.3
      }
    );
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    
    // Animation when changing filters
    gsap.fromTo('.photo-item', 
      { opacity: 0.5, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: 'power2.out' }
    );
  };

  return (
    <div className="photo-archive">
      <br /><br /><br />

      <div className="photo-gallery">
        {Array(20).fill().map((_, index) => (
          <div 
            className={`photo-item ${index % 5 === 0 ? 'featured' : ''} ${index % 7 === 0 ? 'vertical' : ''}`} 
            key={index}
          >
            <div className="photo-inner">
              <img 
                src={`/api/placeholder/${400 + (index % 3) * 50}/${300 + (index % 4) * 40}`} 
                alt={`Family photo ${index + 1}`} 
              />
              <div className="photo-overlay">
                {/* <div className="photo-actions">
                  <button className="action-btn expand-btn">
                    <span className="action-icon">⤢</span>
                  </button>
                  <button className="action-btn heart-btn">
                    <span className="action-icon">♡</span>
                  </button>
                  <button className="action-btn share-btn">
                    <span className="action-icon">↗</span>
                  </button>
                </div> */}
                <div className="photo-info">
                  <span className="photo-date">May {(index % 28) + 1}, 2024</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="floating-actions">
        <button className="floating-btn">
          <span className="btn-icon">+</span>
        </button>
      </div>
    </div>
  );
};

export default FamilyPhotos;