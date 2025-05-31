import '../assets/styles/LoginSignup.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import axios from 'axios';


const Login = () => {
  const [familyKey, setFamilyKey] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.form-side',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.image-side',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.image-content',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login',{familyKey,password})
    .then(result => {
      console.log(result)
      if(result.data == "Success"){
        navigate('/familyhome')
      }
      
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="container" id="login-container" ref={containerRef}>
      <div className="form-side">
        <div className="logo">FamilyRoots</div>
        <h1 className="heading">Welcome Back</h1>
        <p className="subheading">Continue your journey of family discovery.</p>
        
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password" 
              required 
            />
          </div>
          <button type="submit" className="btn">Sign In</button>
        </form>
       

        
        <p className="switch-form">
          New to FamilyRoots?
          <Link to="/signup">Create an account</Link>
        </p>
        <p className="switch-form">
          or
          <a href="#">Login with Support</a>
        </p>
      </div>
      <div className="image-side" style={{
        backgroundImage: "url('/images/familypic.jpg')"
      }}>
        <div className="image-overlay"></div>
        <div className="image-content">
          <h2>Discover Your Story</h2>
          <p>Connect with your roots and preserve your family's legacy.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;