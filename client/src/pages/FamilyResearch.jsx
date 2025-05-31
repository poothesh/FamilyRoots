import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/ResearchTools.css';

const toolData = [
  { icon: '📚', title: 'Record Search', description: 'Search through birth certificates, marriage records, census data, and other historical documents.' },
  { icon: '🗺️', title: 'Geographic Tools', description: 'Explore historical maps and migration patterns to trace your family  movements.' },
  { icon: '📊', title: 'DNA Analysis', description: 'Connect DNA results with historical records for deeper ancestral insights.' }
];

const resourceData = [
  { title: 'National Archives Collection', description: 'Historical documents from 1800-1950', type: 'Government Records' },
  { title: 'Census Database', description: 'Complete census records from 1850-1940', type: 'Census Data' },
  { title: 'Immigration Records', description: 'Port entries and passenger lists', type: 'Immigration' }
];

const ResearchTools = () => {
  useEffect(() => {
    gsap.to('.hero-section, .search-preview, .cta-section', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.3
    });

    gsap.to('.tool-card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2
    });
  }, []);

  return (
    <main>
      <section className="hero-section">
        <h1 className="hero-title">Research Tools</h1>
        <p className="hero-subtitle">Access powerful genealogy research tools and historical records to uncover your family's story.</p>
      </section>

      <div className="tools-grid">
        {toolData.map((tool, index) => (
          <div className="tool-card" key={index}>
            <div className="tool-icon">{tool.icon}</div>
            <h3 className="tool-title">{tool.title}</h3>
            <p className="tool-description">{tool.description}</p>
          </div>
        ))}
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
        </div>

        <div className="resource-list">
          {resourceData.map((resource, index) => (
            <div className="resource-item" key={index}>
              <div className="resource-info">
                <h4>{resource.title}</h4>
                <p>{resource.description}</p>
              </div>
              <span className="resource-type">{resource.type}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <a href="#" className="cta-button">Start Your Research</a>
      </section>
    </main>
  );
};

export default ResearchTools;
