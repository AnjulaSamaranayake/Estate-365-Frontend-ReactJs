import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  
import Navbar from './Navbar';

const HomePage = () => {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <>
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
      <div className="home-page">
        <div className="overlay">
          <h1 className="title">Welcome to <i>HomeHarbor</i></h1>
          <p className="subtitle">
            <b>Your ultimate destination to find your <br></br><i>Dream Home.</i></b>
          </p>
          <Link to="/search" className="explore-button">Find Now</Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;