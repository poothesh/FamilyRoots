import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/TimeLine.css';

const TimelineCreation = () => {
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

    // Timeline preview animation
    gsap.to('.timeline-preview', {
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
    <>
      

      <main>
        <section className="hero-section">
          <h1 className="hero-title">Timeline Creation</h1>
          <p className="hero-subtitle">Document and visualize your family's journey through time with beautiful, interactive timelines.</p>
        </section>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3 className="feature-title">Milestone Tracking</h3>
            <p className="feature-description">Record and organize important family events, achievements, and memorable moments.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3 className="feature-title">Visual Storytelling</h3>
            <p className="feature-description">Create beautiful, interactive timelines with photos, documents, and personal narratives.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3 className="feature-title">Historical Context</h3>
            <p className="feature-description">Add historical events and cultural context to understand your family's journey.</p>
          </div>
        </div>

        <section className="timeline-preview">
          <h2 className="timeline-title">Sample Family Timeline</h2>
          <div className="timeline">
            <div className="timeline-event">
              <div className="event-content">
                <div className="event-date">1947</div>
                <h3 className="event-title">Independence and Migration</h3>
                <p className="event-description">Great-grandfather's family moved from Lahore to Delhi during the partition, establishing new roots in independent India.</p>
              </div>
            </div>
    
            <div className="timeline-event">
              <div className="event-content">
                <div className="event-date">1952</div>
                <h3 className="event-title">Family Business Beginning</h3>
                <p className="event-description">Grandfather opened our first textile shop in Chandni Chowk, Old Delhi, starting our family's business legacy.</p>
              </div>
            </div>
    
            <div className="timeline-event">
              <div className="event-content">
                <div className="event-date">1965</div>
                <h3 className="event-title">Educational Milestone</h3>
                <p className="event-description">Mother became the first woman in the family to attend university, studying at Delhi University's Miranda House.</p>
              </div>
            </div>
    
            <div className="timeline-event">
              <div className="event-content">
                <div className="event-date">1975</div>
                <h3 className="event-title">Family Home Construction</h3>
                <p className="event-description">Built our ancestral home in Civil Lines, Delhi - the house that would host four generations of family gatherings.</p>
              </div>
            </div>
    
            <div className="timeline-event">
              <div className="event-content">
                <div className="event-date">1982</div>
                <h3 className="event-title">Business Expansion</h3>
                <p className="event-description">Family business expanded to Mumbai, opening our first store in the historic Mangaldas Market.</p>
              </div>
            </div>
    
            <div className="timeline-event">
              <div className="event-content">
                <div className="event-date">1990</div>
                <h3 className="event-title">International Education</h3>
                <p className="event-description">First family member went abroad for higher studies at Oxford University, beginning our international connections.</p>
              </div>
            </div>
    
            <div className="timeline-event">
              <div className="event-content">
                <div className="event-date">1995</div>
                <h3 className="event-title">Cultural Achievement</h3>
                <p className="event-description">Aunt established a classical dance academy in Bangalore, preserving our cultural heritage through Bharatanatyam.</p>
              </div>
            </div>
    
            <div className="timeline-event">
              <div className="event-content">
                <div className="event-date">2003</div>
                <h3 className="event-title">Tech Innovation</h3>
                <p className="event-description">Family business entered e-commerce, launching our first online store during India's IT boom.</p>
              </div>
            </div>
    
            <div className="timeline-event">
              <div className="event-content">
                <div className="event-date">2010</div>
                <h3 className="event-title">Community Foundation</h3>
                <p className="event-description">Established family charitable trust for education, providing scholarships to underprivileged students.</p>
              </div>
            </div>
    
            <div className="timeline-event">
              <div className="event-content">
                <div className="event-date">2020</div>
                <h3 className="event-title">Sustainable Initiative</h3>
                <p className="event-description">Transformed family textile business to focus on sustainable and organic materials, leading environmental change in the industry.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <a href="#" className="cta-button">Create Your Timeline</a>
        </section>
      </main>
    </>
  );
};

export default TimelineCreation;