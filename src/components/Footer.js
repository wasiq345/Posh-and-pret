import React from 'react';
import './Footer.css';

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-emblem">P</div>
            <span>Posh & Pret</span>
          </div>
          <p>Designed to make you feel like a Queen</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/poshandpret?igsh=dWNua254ZHRqZ2d0" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@poshnpret?_r=1&_t=ZS-96bb6hcmHsu" target="_blank" rel="noreferrer" aria-label="TikTok">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="https://wa.me/923334268985" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Navigate</h4>
          <ul>
            {['home', 'products', 'about', 'contact'].map((item) => (
              <li key={item}>
                <button onClick={() => scrollTo(item)}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+923334268985">+92 333 4268985</a></li>
            <li><a href="mailto:poshNpret@gmail.com">poshNpret@gmail.com</a></li>
            <li><span>Lahore, Pakistan</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Posh and Pret. All rights reserved.</p>
        <p className="footer-tagline">Made with ♥ in Lahore</p>
      </div>
    </footer>
  );
}
