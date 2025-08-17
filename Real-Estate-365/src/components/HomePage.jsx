import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
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
          <img src="/prop10pic102.jpg" alt="Modern Home" />
        </div>
      </section>
      
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🏡</div>
            <h3>Wide Selection</h3>
            <p>Choose from hundreds of properties across the country.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>We negotiate the best deals for our clients.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍💼</div>
            <h3>Expert Agents</h3>
            <p>Our team has over 20 years of combined experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;