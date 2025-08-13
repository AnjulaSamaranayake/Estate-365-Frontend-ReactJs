import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Heart } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-icon">HH</span>
          <span className="logo-text">HomeHarbor</span>
        </Link>
        
        <div className="nav-items">
          <Link to="/" className="nav-link">
            <span>Home</span>
          </Link>
          <Link to="/search" className="nav-link">
            <Search size={18} />
            <span>Browse</span>
          </Link>
          <Link to="/favorites" className="nav-link">
            <Heart size={18} />
            <span>Favorites</span>
          </Link>
        </div>
        
        <button className="mobile-menu-btn">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;