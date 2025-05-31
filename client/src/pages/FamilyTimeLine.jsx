import React, { useEffect, useRef , useState } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/TimeLine.css';
import { Link } from 'react-router-dom';

const TimelineCreation = () => {
  const heroRef = useRef(null);
  const featureCardsRef = useRef([]);
  const timelineRef = useRef(null);
  const ctaRef = useRef(null);
  const [setTimelineEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const familyKey = localStorage.getItem('familyKey');

  useEffect(() => {
    if (familyKey) {
      fetch(`http://localhost:3001/api/family-timeline/${familyKey}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setTimelineEvents(data);
          } else {
            console.warn("Unexpected timeline data format", data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching timeline events:", err);
          setLoading(false);
        });
    }
  }, [familyKey]);
  
  useEffect(() => {
    gsap.to(heroRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    featureCardsRef.current.forEach((card, index) => {
      gsap.to(card, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 + index * 0.2, ease: 'power3.out' });
    });
    gsap.to(timelineRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' });
    gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 1, ease: 'power3.out' });
  }, []);

  const timelineEvents = [
    { year: "1947", title: "Independence and Migration", description: "Great-grandfather's family moved from Lahore to Delhi during the partition, establishing new roots in independent India." },
    { year: "1952", title: "Family Business Beginning", description: "Grandfather opened our first textile shop in Chandni Chowk, Old Delhi, starting our family's business legacy." },
    { year: "1965", title: "Educational Milestone", description: "Mother became the first woman in the family to attend university, studying at Delhi University's Miranda House." },
    { year: "1975", title: "Family Home Construction", description: "Built our ancestral home in Civil Lines, Delhi - the house that would host four generations of family gatherings." },
    { year: "1982", title: "Business Expansion", description: "Family business expanded to Mumbai, opening our first store in the historic Mangaldas Market." },
    { year: "1990", title: "International Education", description: "First family member went abroad for higher studies at Oxford University, beginning our international connections." },
    { year: "1995", title: "Cultural Achievement", description: "Aunt established a classical dance academy in Bangalore, preserving our cultural heritage through Bharatanatyam." },
    { year: "2003", title: "Tech Innovation", description: "Family business entered e-commerce, launching our first online store during India's IT boom." },
    { year: "2010", title: "Community Foundation", description: "Established family charitable trust for education, providing scholarships to underprivileged students." },
    { year: "2020", title: "Sustainable Initiative", description: "Transformed family textile business to focus on sustainable and organic materials, leading environmental change in the industry." }
  ];

  return (
    <main>
      <section className="hero-section" ref={heroRef}>
        <h1 className="hero-title">Timeline Creation</h1>
        <p className="hero-subtitle">Document and visualize your family's journey through time with beautiful, interactive timelines.</p>
      </section>

      <div className="features-grid">
        {["📅 Milestone Tracking", "🎨 Visual Storytelling", "🔍 Historical Context"].map((feature, index) => {
          const [icon, title] = feature.split(" ");
          return (
            <div className="feature-card" key={index} ref={el => featureCardsRef.current[index] = el}>
              <div className="feature-icon">{icon}</div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-description">
                {index === 0 && "Record and organize important family events, achievements, and memorable moments."}
                {index === 1 && "Create beautiful, interactive timelines with photos, documents, and personal narratives."}
                {index === 2 && "Add historical events and cultural context to understand your family's journey."}
              </p>
            </div>
          );
        })}
      </div>

      <section className="timeline-preview" ref={timelineRef}>
        <h2 className="timeline-title">Family Timeline</h2>
        <div className="timeline">
          {timelineEvents.map((event, index) => (
            <div className="timeline-event" key={index}>
              <div className="event-content">
                <div className="event-date">{event.year}</div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section" ref={ctaRef}>
      <Link to="/familypage" className="cta-button">
    Create Your Timeline
  </Link>
      </section>
    </main>
  );
};

export default TimelineCreation;
