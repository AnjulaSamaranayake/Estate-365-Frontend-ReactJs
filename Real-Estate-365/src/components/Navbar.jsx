import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Heart, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ favouritesCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            <span className="logo-icon">HH</span>
            <span className="logo-text">HomeHarbor</span>
          </Link>
          
          <div className={`nav-items ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <span>Home</span>
            </Link>
            <Link to="/search" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <Search size={18} />
              <span>Browse</span>
            </Link>
            <Link to="/favorites" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <Heart size={18} />
              <span>Favorites {favouritesCount > 0 && `(${favouritesCount})`}</span>
            </Link>
          </div>
          
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {showWarning && (
        <div className="demo-warning-banner">
          <div className="warning-content">
            <p>⚠️ This is a demo website. All properties are fictional.</p>
            <button 
              className="close-warning"
              onClick={() => setShowWarning(false)}
              aria-label="Close warning"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;