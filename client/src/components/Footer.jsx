import React from 'react';

const Footer = () => {
  return (
    <>
      <style>
        {`
          .footer {
            position: relative;
            background-color: #1a1a1a;
            padding: 5rem 0 2.5rem;
            overflow: hidden;
          }

          .footer-gradient {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5rem;
            background: linear-gradient(to bottom, #2F2F2F, #1a1a1a);
          }

          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }

          .footer-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
            margin-bottom: 4rem;
          }

          .brand-section h3 {
            color: #ff6b6b;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }

          .brand-section p {
            color: #9ca3af;
            margin-bottom: 1.5rem;
          }

          .social-icons {
            display: flex;
            gap: 1rem;
          }

          .social-icon {
            width: 2.5rem;
            height: 2.5rem;
            background: #2F2F2F;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .social-icon:hover {
            background: #ff6b6b;
          }

          .social-icon svg {
            width: 1.25rem;
            height: 1.25rem;
            color: white;
          }

          .quick-links {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }

          .quick-links h4 {
            color: white;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .quick-links ul {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .quick-links a {
            color: #9ca3af;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .quick-links a:hover {
            color: #ff6b6b;
          }

          .newsletter h4 {
            color: white;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .newsletter p {
            color: #9ca3af;
            margin-bottom: 1rem;
          }

          .newsletter-input {
            position: relative;
          }

          .newsletter-input input {
            width: 100%;
            padding: 0.75rem 1rem;
            background: #2F2F2F;
            border: none;
            border-radius: 0.5rem;
            color: white;
          }

          .newsletter-input input:focus {
            outline: 2px solid #ff6b6b;
          }

          .newsletter-input button {
            position: absolute;
            right: 0.5rem;
            top: 50%;
            transform: translateY(-50%);
            background: #ff6b6b;
            color: white;
            padding: 0.25rem 1rem;
            border-radius: 0.375rem;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .newsletter-input button:hover {
            background: #ff8787;
          }

          .footer-bottom {
            border-top: 1px solid #374151;
            padding-top: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .footer-bottom p {
            color: #9ca3af;
            font-size: 0.875rem;
          }

          .footer-links {
            display: flex;
            gap: 1.5rem;
          }

          .footer-links a {
            color: #9ca3af;
            font-size: 0.875rem;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .footer-links a:hover {
            color: #ff6b6b;
          }

          .decorative-circle {
            position: absolute;
            top: 5rem;
            left: 50%;
            transform: translateX(-50%);
            width: 20rem;
            height: 20rem;
            background: #ff6b6b;
            border-radius: 50%;
            opacity: 0.05;
            filter: blur(60px);
          }

          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr;
            }

            .quick-links {
              margin: 2rem 0;
            }

            .footer-bottom {
              flex-direction: column;
              text-align: center;
              gap: 1rem;
            }

            .footer-links {
              justify-content: center;
            }
          }
        `}
      </style>

      <footer className="footer">
        <div className="footer-gradient"></div>
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="brand-section">
              <h3>FamilyRoots</h3>
              <p>Building bridges across generations, one story at a time.</p>
              <div className="social-icons">
                <div className="social-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                  </svg>
                </div>
                <div className="social-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div className="social-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="quick-links">
              <div>
                <h4>Features</h4>
                <ul>
                  {['Family Tree', 'DNA Insights', 'Photo Archives', 'Timeline'].map((item) => (
                    <li key={item}>
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Resources</h4>
                <ul>
                  {['Help Center', 'Research Tools', 'Community', 'Blog'].map((item) => (
                    <li key={item}>
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="newsletter">
              <h4>Stay Connected</h4>
              <p>Subscribe to our newsletter for family history tips and updates.</p>
              <div className="newsletter-input">
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>© 2025 FamilyRoots. All rights reserved.</p>
            <div className="footer-links">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="decorative-circle"></div>
      </footer>
    </>
  );
};

export default Footer;