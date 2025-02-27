import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/ResearchTools.css';

const ResearchTools = () => {
  useEffect(() => {
    // Hero section animation
    gsap.to('.hero-section', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Tool cards animation
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2 + (index * 0.2),
        ease: 'power3.out'
      });
    });

    // Search preview animation
    gsap.to('.search-preview', {
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
          <h1 className="hero-title">Research Tools</h1>
          <p className="hero-subtitle">Access powerful genealogy research tools and historical records to uncover your family's story.</p>
        </section>

        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon">📚</div>
            <h3 className="tool-title">Record Search</h3>
            <p className="tool-description">Search through birth certificates, marriage records, census data, and other historical documents.</p>
          </div>

          <div className="tool-card">
            <div className="tool-icon">🗺️</div>
            <h3 className="tool-title">Geographic Tools</h3>
            <p className="tool-description">Explore historical maps and migration patterns to trace your family's movements.</p>
          </div>

          <div className="tool-card">
            <div className="tool-icon">📊</div>
            <h3 className="tool-title">DNA Analysis</h3>
            <p className="tool-description">Connect DNA results with historical records for deeper ancestral insights.</p>
          </div>
        </div>

        <section className="search-preview">
          <h2 className="search-title">Historical Records Search</h2>
          <div className="search-interface">
            <div className="search-row">
              <input type="text" className="search-field" placeholder="First Name" />
              <input type="text" className="search-field" placeholder="Last Name" />
              <input type="text" className="search-field" placeholder="Location" />
            </div>
            
            <div className="search-row">
              <input type="text" className="search-field" placeholder="Year Range (e.g., 1900-1950)" />
              <input type="text" className="search-field" placeholder="Record Type" />
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Record Types</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" /> Birth Records
                </label>
                <label className="filter-option">
                  <input type="checkbox" /> Marriage Records
                </label>
                <label className="filter-option">
                  <input type="checkbox" /> Census Data
                </label>
                <label className="filter-option">
                  <input type="checkbox" /> Immigration Records
                </label>
              </div>
            </div>
          </div>

          <div className="resource-list">
            <div className="resource-item">
              <div className="resource-info">
                <h4>National Archives Collection</h4>
                <p>Historical documents from 1800-1950</p>
              </div>
              <span className="resource-type">Government Records</span>
            </div>

            <div className="resource-item">
              <div className="resource-info">
                <h4>Census Database</h4>
                <p>Complete census records from 1850-1940</p>
              </div>
              <span className="resource-type">Census Data</span>
            </div>

            <div className="resource-item">
              <div className="resource-info">
                <h4>Immigration Records</h4>
                <p>Port entries and passenger lists</p>
              </div>
              <span className="resource-type">Immigration</span>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <a href="#" className="cta-button">Start Your Research</a>
        </section>
      </main>
    </>
  );
};

export default ResearchTools;