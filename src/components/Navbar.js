import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <div className="logo-emblem">P</div>
          <div className="logo-text">
            <span className="logo-main">Posh & Pret</span>
            <span className="logo-sub">EST. 1995</span>
          </div>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {['home', 'products', 'about', 'contact'].map((item) => (
            <li key={item}>
              <button onClick={() => handleNavClick(item)} className="nav-link">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="cart-btn" onClick={onCartClick} aria-label="Open cart">
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
