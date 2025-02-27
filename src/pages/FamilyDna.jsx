import '../assets/styles/FamilyDna.css';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/FamilyDna.css';

const FamilyDna = () => {
  useEffect(() => {
    // Hero section animation
    gsap.to('.hero-section', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Insight cards animation
    const cards = document.querySelectorAll('.insight-card');
    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2 + (index * 0.2),
        ease: 'power3.out'
      });
    });

    // DNA matches section animation
    gsap.to('.dna-matches', {
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
    <div className="dna-body">

      <main>
        <section className="hero-section">
          <h1 className="hero-title">DNA Insights</h1>
          <p className="hero-subtitle">Discover your heritage through advanced DNA analysis and matching. Uncover your ancestral origins and connect with relatives across the globe.</p>
        </section>

        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">🌍</div>
            <h3 className="insight-title">Ethnicity Estimate</h3>
            <p className="insight-description">Discover your genetic ancestry composition with detailed regional breakdowns and historical insights.</p>
          </div>

          <div className="insight-card">
            <div className="insight-icon">👥</div>
            <h3 className="insight-title">DNA Matching</h3>
            <p className="insight-description">Connect with genetic relatives and explore shared ancestry through our vast database.</p>
          </div>

          <div className="insight-card">
            <div className="insight-icon">🧬</div>
            <h3 className="insight-title">Trait Analysis</h3>
            <p className="insight-description">Learn how your genes influence various traits, from physical characteristics to genetic health factors.</p>
          </div>
        </div>

        <section className="dna-matches">
          <h2 className="matches-title">Recent DNA Matches</h2>
          <div className="match-list">
            <div className="match-item">
              <div className="match-avatar"></div>
              <div className="match-info">
                <h4>Sarah Anderson</h4>
                <p>Shared DNA: 850 cM</p>
              </div>
              <span className="relationship">First Cousin</span>
            </div>

            <div className="match-item">
              <div className="match-avatar"></div>
              <div className="match-info">
                <h4>James Wilson</h4>
                <p>Shared DNA: 1,750 cM</p>
              </div>
              <span className="relationship">Half Sibling</span>
            </div>

            <div className="match-item">
              <div className="match-avatar"></div>
              <div className="match-info">
                <h4>Emma Martinez</h4>
                <p>Shared DNA: 125 cM</p>
              </div>
              <span className="relationship">Third Cousin</span>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <a href="#" className="cta-button">Start Your DNA Journey</a>
        </section>
      </main>
    </div>
  );
};

export default FamilyDna;