import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import dashboardImg from '../assets/hero-dashboard.png';

const Hero = ({ darkMode }) => {
  return (
    <section className={`hero-section ${darkMode ? 'dark' : 'light'}`}>
      <div className="container hero-container">
        <div className="hero-content animate-slide-up">
          <h1 className="hero-headline">
            Elevate Your Brand with <span className="text-accent">Right Ads Digital</span>
          </h1>
          <p className="hero-subheadline">
            Revolutionizing your digital presence through data-driven marketing, 
            premium website development, and strategic brand promotion. 
            Your growth is our priority.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn-primary">Start Your Journey</Link>
            <Link to="/services" className="btn-secondary">Explore Services</Link>
          </div>
        </div>
        <div className="hero-visual animate-fade-in">
          <div className="image-wrapper floating-glass float-lg">
            <img src={dashboardImg} alt="Marketing Dashboard" className="hero-image" />
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
