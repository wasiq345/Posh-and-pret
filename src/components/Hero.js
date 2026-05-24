import React, { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const timeout = setTimeout(() => el.classList.add('visible'), 100);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-bg-pattern"></div>
      <div className="hero-content">
        <div className="hero-badge">New Collection 2026</div>
        <h1 className="hero-title">
          Designed To Make<br />
          <em>You Feel Like</em><br />
          A Queen
        </h1>
        <p className="hero-sub">
          Handcrafted elegance for your most cherished moments
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToProducts}>
            Explore Collection
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn-ghost" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            Our Story
          </button>
        </div>
        <div className="hero-scroll-hint">
          <span></span>
          <p>Scroll to explore</p>
        </div>
      </div>
      <div className="hero-ornament hero-ornament-tl"></div>
      <div className="hero-ornament hero-ornament-br"></div>
    </section>
  );
}
