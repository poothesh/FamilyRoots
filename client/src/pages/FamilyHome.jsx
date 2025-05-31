import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/styles/FamilyHome.css';

gsap.registerPlugin(ScrollTrigger);

const FamilyRoots = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    gsap.to('.herox h1', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.to('.herox p', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    });

    gsap.to('.features h2', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features',
        start: 'top 80%',
      },
    });

    gsap.utils.toArray('.card').forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        },
      });
    });
  }, []);

  // Separate navigation handler for cards
  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
          <>
        <section className="herox">
          <div className="herox-content">
            <div className="herox-text-container">
              <h1>Crafting Your Legacy,</h1>
              <h1>One Story at a Time</h1>
              <div className="herox-line"></div>
              <p>Build bridges across generations by weaving together the threads of your family's unique journey.</p>
            </div>
            <div className="herox-circles">
              <img src="/images/Image.png" alt="family-img" />
            </div>
          </div>
        </section>

        <div className="cards-container">
          <Card 
            image="/images/familytree.jpg" 
            title="Interactive Family Tree" 
            description="Build and explore your family connections with our interactive family tree builder."
            onClick={() => handleCardClick('/familytree')}
          />
          <Card 
            image="/images/bookstory.webp" 
            title="Family Stories" 
            description="Preserve and share your family's most precious memories and stories."
            onClick={() => handleCardClick('/familystories')}
          />
          <Card 
            image="/images/dna.jpg" 
            title="DNA Insights" 
            description="Discover your heritage through advanced DNA analysis and matching."
            onClick={() => handleCardClick('/dna-insights')}
          />
        </div>

        <section className="features">
          <div className="features-header">
            <h2>Where Stories Come Alive</h2>
            <div className="feature-accent"></div>
          </div>

          <div className="cards-container">
            <Card 
              image="/images/potoarchieve.webp" 
              title="Photo Archives" 
              description="Digitize and preserve your family photos with smart organization and sharing."
              onClick={() => handleCardClick('/photo-archives')}
            />
            <Card 
              image="/images/time.jpg" 
              title="Timeline Creation" 
              description="Create beautiful timelines of your family's most important moments and milestones."
              onClick={() => handleCardClick('/timeline-creation')}
            />
            <Card 
              image="/images/research.jpg" 
              title="Research Tools" 
              description="Access powerful genealogy research tools and historical records."
              onClick={() => handleCardClick('/research-tools')}
            />
          </div>
        </section>
      </>
  );
};

const Card = ({ image, title, description, onClick }) => (
  <div className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
    <img src={image} alt={title} />
    <div className="card-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default FamilyRoots;