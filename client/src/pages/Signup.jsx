import '../assets/styles/LoginSignup.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import axios from 'axios';

const Signup = () => {
  const [familyName, setFamilyName] = useState('');
  const [familyKey, setFamilyKey] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/signup',{familyName,familyKey,password})
    .then(result => {
      localStorage.setItem('familyKey', familyKey);
      console.log('✅familyKey:', familyKey);
      console.log(result)
      navigate('/familypage')
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.form-side',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.image-side',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.image-content',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);


  return (
    <div className="container" id="signup-container" ref={containerRef}>
      <div className="image-side" style={{
        backgroundImage: "url('/images/familypiccmain.jpg')"
      }}>
        <div className="image-overlay"></div>
        <div className="image-content">
          <h2>Join the Journey</h2>
          <p>Start exploring your family history today.</p>
        </div>
      </div>
      <div className="form-side">
        <div className="logo">FamilyRoots</div>
        <h1 className="heading">Create Account</h1>
        <p className="subheading">Begin your family discovery journey.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Family Name</label>
            <input 
              type="text" 
              value={familyName} 
              onChange={(e) => setFamilyName(e.target.value)} 
              placeholder="Enter your Family Name" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Family Key</label>
            <input 
              type="text" 
              value={familyKey} 
              onChange={(e) => setFamilyKey(e.target.value)} 
              placeholder="Enter your Family Key" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Create a password" 
              required 
            />
          </div>
          <button type="submit" className="btn">Create Account</button>
        </form>
        
        <p className="switch-form">
          Already have an account?
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;