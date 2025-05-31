import '../assets/styles/FamilyTree.css';
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from "react-router-dom";

const FamilyTree = () => {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const familyKey = localStorage.getItem('familyKey');

  useEffect(() => {
    if (familyKey) {
      fetch(`http://localhost:3001/api/family-details/${familyKey}`)
        .then(res => res.json())  
        .then(data => {
          if (data && data.members) {
            setMembers(data.members);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching family members:", err);
          setLoading(false);
        });
    }
  }, [familyKey]);

  useEffect(() => {
    if (!loading) {
      const cards = document.querySelectorAll('.member-card');
      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out'
        });
      });
    }
  }, [loading, members]);

  const updateZoom = (newScale) => {
    const familyTree = document.getElementById('familyTree');
    gsap.to(familyTree, {
      scale: newScale,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const zoomIn = () => {
    const newScale = Math.min(scale + 0.1, 2);
    setScale(newScale);
    updateZoom(newScale);
  };

  const zoomOut = () => {
    const newScale = Math.max(scale - 0.1, 0.5);
    setScale(newScale);
    updateZoom(newScale);
  };

  const resetView = () => {
    setScale(1);
    updateZoom(1);
  };

  const openModal = (memberInfo) => {
    setModalContent(memberInfo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const getGenerationMembers = () => {
    
    const generations = {};
    
    members.forEach(member => {
      const gen = member.generation || 0;
      if (!generations[gen]) {
        generations[gen] = [];
      }
      generations[gen].push(member);
    });
    
    return Object.keys(generations)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(gen => generations[gen]);
  };

  const MemberCard = ({ member, hasConnector = false }) => (
    <div className="member-card" onClick={() => openModal(member)}>
      <div className="member-photo">
        <img 
          src={member.photoUrl || "/api/placeholder/80/80"} 
          alt={member.name} 
        />
      </div>
      <div className="member-info">
        <h3 className="member-name">{member.name}</h3>
        <div className="member-role">{member.relationship || member.role}</div>
        
        {(member.birthYear || member.deathYear) && (
          <div className="member-details">
            {member.birthYear || '?'} - {member.deathYear || 'Present'}
          </div>
        )}
      </div>
      {hasConnector && <div className="connector"></div>}
    </div>
  );

  if (loading) {
    return <div className="loading">Loading family tree...</div>;
  }

  const generations = getGenerationMembers();

  return (
    <>
      <header>
        <nav>
          <a href="#" className="logo">FamilyRoots</a>
          <div className="controls">
            <button className="control-btn" onClick={zoomIn}>Zoom In</button>
            <button className="control-btn" onClick={zoomOut}>Zoom Out</button>
            <button className="control-btn" onClick={resetView}>Reset View</button>
            <button className="control-btn" onClick={() => navigate('/familyhome')}>Back</button>
          </div>
        </nav>
      </header>

      <div className="family-tree-container">
        {members.length === 0 ? (
          <div className="no-members">
            <p>No family members found. Start by adding members to your family tree.</p>
            <button onClick={() => navigate('/familypage')}>Add Family Member</button>
          </div>
        ) : (
          <div className="tree-wrapper">
            <div className="family-tree" id="familyTree">
              {generations.map((generationMembers, genIndex) => (
                <div className="generation" key={`gen-${genIndex}`}>
                  {generationMembers.map((member, memIndex) => (
                    <MemberCard
                      key={`member-${genIndex}-${memIndex}`}
                      member={member}
                      hasConnector={genIndex < generations.length - 1}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}></div>
      <div className={`modal ${isModalOpen ? 'active' : ''}`}>
        <button className="close-modal" onClick={closeModal}>×</button>
        <div className="modal-content">
          {modalContent && (
            <div className="member-detail">
              <div className="member-photo-large">
                <img 
                  src={modalContent.photoUrl || "/api/placeholder/150/150"} 
                  alt={modalContent.name} 
                />
              </div>
              <div className="member-info">
                <h3 className="member-name">{modalContent.name}</h3>
                <div className="member-role">{modalContent.relationship || modalContent.role}</div>
             
                {(modalContent.birthYear || modalContent.deathYear) && (
                  <div className="member-details">
                    {modalContent.birthYear || '?'} - {modalContent.deathYear || 'Present'}
                  </div>
                )}
                
                {modalContent.bio && (
                  <div className="member-bio">{modalContent.bio}</div>
                )}
                
                {modalContent.location && (
                  <div className="member-location">Location: {modalContent.location}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FamilyTree;