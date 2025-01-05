import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  
import Navbar from './Navbar';
const HomePage = () => {
  return (
    <>
    <Navbar />
    <div className="home-page">
    <div className="overlay">
      <h1 className="title">Welcome to <i>DH</i> Properties</h1>
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
