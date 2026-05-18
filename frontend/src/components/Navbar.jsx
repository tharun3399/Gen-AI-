import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Plus } from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚡</span>
          AI Agent Platform
        </Link>

        <button 
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Categories
          </Link>
          <Link to="/admin" className="nav-link nav-link-btn" onClick={() => setMenuOpen(false)}>
            <Plus size={18} />
            Add Project
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
