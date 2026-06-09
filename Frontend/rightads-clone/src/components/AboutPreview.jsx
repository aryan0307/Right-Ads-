import React from 'react';
import './AboutPreview.css';
import { Target, Eye, Award } from 'lucide-react';

const AboutPreview = ({ darkMode }) => {
  return (
    <section className={`about-preview ${darkMode ? 'dark' : 'light'}`}>
      <div className="container about-container section-padding">
        <div className="about-text-content animate-slide-up">
          <h2 className="section-title">Beyond Marketing: <span className="text-accent">We Build Legacies</span></h2>
          <p className="about-description">
            Right Ads Digital is a premier growth partner specializing in comprehensive digital strategies. 
            From innovative website development to performance-driven marketing, we provide 
            end-to-end solutions that elevate businesses to new heights.
          </p>
          
          <div className="about-grid">
            <div className="about-info-card floating-glass float-md">
              <div className="icon-box">
                <Target className="icon-blue" size={32} />
              </div>
              <h3 className="card-title">Our Mission</h3>
              <p className="card-text">
                To empower businesses with cutting-edge digital tools and strategic insights that 
                drive sustainable growth and measurable results.
              </p>
            </div>

            <div className="about-info-card floating-glass float-md">
              <div className="icon-box">
                <Eye className="icon-blue" size={32} />
              </div>
              <h3 className="card-title">Our Vision</h3>
              <p className="card-text">
                To be the global benchmark for excellence in digital transformation, 
                redefining how brands connect with their audiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
