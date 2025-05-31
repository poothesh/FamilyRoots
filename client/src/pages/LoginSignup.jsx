import '../assets/styles/LoginSignup.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import axios from 'axios';


const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [familyName, setFamilyName] = useState('');
  const [familyKey, setFamilyKey] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.form-side',
      { opacity: 0, x: isLogin ? -50 : 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.image-side',
      { opacity: 0, x: isLogin ? 50 : -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.image-content',
      { opacity: 0, x: isLogin ? 50 : -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );

    timeline.current = tl;
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:5000/api/users/login', { familyKey, password });
        if (response.data.message === 'Login successful!') {
          localStorage.setItem('token', response.data.token); // Store JWT Token
          navigate('/familyhome');
        }
      } else {
        const response = await axios.post('http://localhost:5000/api/users/register', { familyName, familyKey, password });
        if (response.data.message === 'User registered successfully!') setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };
  

  const switchForm = (e) => {
    e.preventDefault();
    
    const tl = gsap.timeline();
    
    tl.to('.form-side', {
      opacity: 0,
      x: isLogin ? -50 : 50,
      duration: 0.5,
      ease: 'power3.inOut'
    })
    .to('.image-side', {
      opacity: 0,
      x: isLogin ? 50 : -50,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => setIsLogin(!isLogin)
    })
    .fromTo('.form-side',
      { opacity: 0, x: isLogin ? 50 : -50 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.inOut' }
    )
    .fromTo('.image-side',
      { opacity: 0, x: isLogin ? -50 : 50 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.inOut' }
    );
  };

  return (
    <div className="container" id={isLogin ? "login-container" : "signup-container"} ref={containerRef}>
      {isLogin ? (
        <>
          <div className="form-side">
            <div className="logo">FamilyRoots</div>
            <h1 className="heading">Welcome Back</h1>
            <p className="subheading">Continue your journey of family discovery.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Family Key</label>
                <input type="text" value={familyKey} onChange={(e) => setFamilyKey(e.target.value)} placeholder="Enter your Family Key" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
              </div>
              <button type="submit" className="btn">Sign In</button>
            </form>
            
            <p className="switch-form">
              New to FamilyRoots?
              <a href="#" onClick={switchForm}>Create an account</a>
            </p>
            <p className="switch-form">
              or
              <a href="#" onClick={null}>Login with Support</a>
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
        </>
      ) : (
        <>
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
                <input type="text" value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder="Enter your Family Name" required />
              </div>
              <div className="form-group">
                <label>Family Key</label>
                <input type="text" value={familyKey} onChange={(e) => setFamilyKey(e.target.value)} placeholder="Enter your Family Key" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
              </div>
              <button type="submit" className="btn">Create Account</button>
            </form>
            
            <p className="switch-form">
              Already have an account?
              <a href="#" onClick={switchForm}>Sign in</a>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default App;