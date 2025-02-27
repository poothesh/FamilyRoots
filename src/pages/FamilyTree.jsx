import '../assets/styles/FamilyTree.css';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from "react-router-dom";


const FamilyTree = () => {

  const navigate = useNavigate();

  const [scale, setScale] = React.useState(1);
  const [modalContent, setModalContent] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    // Animation for cards on load
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
  }, []);

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

  const MemberCard = ({ name, role, years, hasConnector }) => (
    <div className="member-card" onClick={() => openModal({ name, role, years })}>
      <div className="member-photo">
        <img src="/api/placeholder/80/80" alt={name} />
      </div>
      <div className="member-info">
        <h3 className="member-name">{name}</h3>
        <div className="member-role">{role}</div>
        <div className="member-details">{years}</div>
      </div>
      {hasConnector && <div className="connector"></div>}
    </div>
  );

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
        <div className="tree-wrapper">
          <div className="family-tree" id="familyTree">
            {/* Generation 1 */}
            <div className="generation">
              <MemberCard
                name="John Smith"
                role="Grandfather"
                years="1940 - Present"
                hasConnector={true}
              />
            </div>

            {/* Generation 2 */}
            <div className="generation">
              <MemberCard
                name="Robert Smith"
                role="Father"
                years="1965 - Present"
                hasConnector={true}
              />
              <MemberCard
                name="Mary Smith"
                role="Aunt"
                years="1968 - Present"
                hasConnector={true}
              />
            </div>

            {/* Generation 3 */}
            <div className="generation">
              <MemberCard
                name="Michael Smith"
                role="Son"
                years="1990 - Present"
                hasConnector={false}
              />
              <MemberCard
                name="Sarah Smith"
                role="Daughter"
                years="1992 - Present"
                hasConnector={false}
              />
              <MemberCard
                name="Emma Smith"
                role="Cousin"
                years="1991 - Present"
                hasConnector={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}></div>
      <div className={`modal ${isModalOpen ? 'active' : ''}`}>
        <button className="close-modal" onClick={closeModal}>×</button>
        <div className="modal-content">
          {modalContent && (
            <div className="member-info">
              <h3 className="member-name">{modalContent.name}</h3>
              <div className="member-role">{modalContent.role}</div>
              <div className="member-details">{modalContent.years}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FamilyTree;