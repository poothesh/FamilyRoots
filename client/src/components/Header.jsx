import './Header.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Header() {

  const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollY / docHeight) * 100;
            setScrollPercentage(scrollPercent);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  const navigate = useNavigate();
  return (
    <header>
      <nav>
      <div className="back-button" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
            </svg>
        </div>
        
        <a href="/familyhome" className="logo">FamilyRoots</a>
        
        <div className="account-container">
          <div className="google-account">
            <img src="/path-to-user-avatar.jpg" alt="User" />
            <span>Username</span>
          </div>
        </div>
        <div className="progress-bar" style={{ width: `${scrollPercentage}%` }}></div>
      </nav>
    </header>
  );
}

export default Header;