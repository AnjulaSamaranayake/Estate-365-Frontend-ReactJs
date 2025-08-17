import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Heart, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ favouritesCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-icon">HH</span>
          <span className="logo-text">HomeHarbor</span>
        </Link>
        
        <div className={`nav-items ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>Home</span>
          </Link>
          <Link to="/search" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            <Search size={18} />
            <span>Browse</span>
          </Link>
        </div>
        
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;