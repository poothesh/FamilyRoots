import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/FamilyPhoto.css';

const FamilyPhotos = () => {
  useEffect(() => {
    // Hero section animation
    gsap.to('.hero-section', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Feature cards animation
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2 + (index * 0.2),
        ease: 'power3.out'
      });
    });

    // Gallery preview animation
    gsap.to('.gallery-preview', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.8,
      ease: 'power3.out'
    });

    // CTA section animation
    gsap.to('.cta-section', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="photos-body">
      

      <main>
        <section className="hero-section">
          <h1 className="hero-title">Photo Archives</h1>
          <p className="hero-subtitle">Preserve your family's visual history through smart organization, restoration, and sharing capabilities.</p>
        </section>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📸</div>
            <h3 className="feature-title">Smart Organization</h3>
            <p className="feature-description">Automatically organize photos by date, location, and people using AI-powered recognition.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3 className="feature-title">Photo Restoration</h3>
            <p className="feature-description">Restore and enhance old or damaged photos with advanced AI technology.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3 className="feature-title">Family Sharing</h3>
            <p className="feature-description">Share albums with family members and collaborate on photo collections.</p>
          </div>
        </div>

        <section className="gallery-preview">
          <h2 className="gallery-title">Recent Uploads</h2>
          <div className="photo-grid">
            <div className="photo-item">
              <img src="img/familypic.jpg" alt="Family photo placeholder" className="photo-placeholder" />
            </div>
            <div className="photo-item">
              <img src="img/familypicc.jpg" alt="Family photo placeholder" className="photo-placeholder" />
            </div>
            <div className="photo-item">
              <img src="img/familypic.jpg" alt="Family photo placeholder" className="photo-placeholder" />
            </div>
            <div className="photo-item">
              <img src="img/familypicc.jpg" alt="Family photo placeholder" className="photo-placeholder" />
            </div>
            <div className="photo-item">
              <img src="img/familypic.jpg" alt="Family photo placeholder" className="photo-placeholder" />
            </div>
            <div className="photo-item">
              <img src="img/familypicc.jpg" alt="Family photo placeholder" className="photo-placeholder" />
            </div>
            <div className="photo-item">
              <img src="img/familypic.jpg" alt="Family photo placeholder" className="photo-placeholder" />
            </div>
            <div className="photo-item">
              <img src="img/familypicc.jpg" alt="Family photo placeholder" className="photo-placeholder" />
            </div>
            <div className="photo-item">
              <img src="img/familypic.jpg" alt="Family photo placeholder" className="photo-placeholder" />
            </div>
            <div className="photo-item">
              <img src="img/familypicc.jpg" alt="Family photo placeholder" className="photo-placeholder" />
            </div>
          </div>
        </section>

        <section className="cta-section">
          <a href="#" className="cta-button">Start Preserving Memories</a>
        </section>
      </main>
    </div>
  );
};

export default FamilyPhotos;