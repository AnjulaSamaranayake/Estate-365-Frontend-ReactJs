import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Navbar from './Navbar';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  return (
    <div className="home-container">
      <Navbar />
      
      {showWarning && (
        <div className="demo-warning-modal">
          <div className="warning-content">
            <h3>Demo Notice</h3>
            <p>This is a demonstration website only. All properties shown are not for actual sale.</p>
            <button 
              className="warning-confirm-btn"
              onClick={() => setShowWarning(false)}
            >
              I Understand
            </button>
          </div>
        </div>
      )}
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Your <span>Perfect Home</span></h1>
          <p>Find modern properties tailored to your lifestyle with our curated selection of premium homes.</p>
          <div className="hero-buttons">
            <Link to="/search" className="primary-btn">Browse Properties</Link>
            <Link to="/contact" className="secondary-btn">Contact Agent</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src=".\public\prop10pic102.jpg" alt="Modern Home" />
        
        </div>
      </section>
      
      <section className="features-section">
        {/* Add feature cards here */}
      </section>
    </div>
  );
};

export default HomePage;