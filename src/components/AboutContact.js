import React, { useEffect, useRef, useState } from 'react';
import './AboutContact.css';

function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function About() {
  const [ref, visible] = useVisible();
  return (
    <section id="about" className={`about-section ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="about-inner">
        <div className="about-ornament"></div>
        <div className="about-content">
          <p className="section-eyebrow-dark">Our Story</p>
          <h2 className="about-title">
            Crafted For The<br /><em>Women Who Inspire</em>
          </h2>
          <div className="about-divider"><span></span></div>
          <p className="about-text">
            Our brand is all about elegance, beauty, and timeless style. We create wedding and fancy
            dresses for girls who love to stand out with grace and confidence.
          </p>
          <p className="about-text">
            From delicate details to luxurious designs, every outfit is made to make your special
            moments feel even more magical. Each piece is a labour of love — stitched with
            tradition and finished with a modern touch.
            Established since 1995
          </p>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-num">100+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">50+</span>
              <span className="stat-label">Unique Designs</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">5★</span>
              <span className="stat-label">Rated Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [ref, visible] = useVisible();
  return (
    <section id="contact" className={`contact-section ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="contact-container">
        <div className="section-header">
          <p className="section-eyebrow">Reach Us</p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider"><span></span></div>
        </div>

        <div className="contact-grid">
          <a className="contact-card" href="https://maps.google.com?q=Lahore,Pakistan" target="_blank" rel="noreferrer">
            <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
            <h3>Location</h3>
            <p>Lahore, Pakistan</p>
          </a>

          <a className="contact-card" href="tel:+923334268985">
            <div className="contact-icon"><i className="fas fa-phone"></i></div>
            <h3>Phone</h3>
            <p>+92 333 4268985</p>
          </a>

          <a className="contact-card" href="mailto:poshNpret@gmail.com">
            <div className="contact-icon"><i className="fas fa-envelope"></i></div>
            <h3>Email</h3>
            <p>poshNpret@gmail.com</p>
          </a>

          <a className="contact-card" href="https://wa.me/923334268985" target="_blank" rel="noreferrer">
            <div className="contact-icon whatsapp-icon"><i className="fab fa-whatsapp"></i></div>
            <h3>WhatsApp</h3>
            <p>Chat with us</p>
          </a>
        </div>

        <div className="social-row">
          <a href="https://www.instagram.com/poshandpret?igsh=dWNua254ZHRqZ2d0" target="_blank" rel="noreferrer" className="social-link">
            <i className="fab fa-instagram"></i>
            <span>Instagram</span>
          </a>
          <a href="https://www.tiktok.com/@poshnpret?_r=1&_t=ZS-96bb6hcmHsu" target="_blank" rel="noreferrer" className="social-link">
            <i className="fab fa-tiktok"></i>
            <span>TikTok</span>
          </a>
        </div>
      </div>
    </section>
  );
}
