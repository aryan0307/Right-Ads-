import React from 'react';
import { Link } from 'react-router-dom';
import './CareerPreview.css';

const CareerPreview = ({ darkMode }) => {
  return (
    <section className={`career-preview ${darkMode ? 'dark' : 'light'}`}>
      <div className="container section-padding career-inner">
        <div className="career-text-box floating-glass floating-glass--accent float-md">
          <h2 className="section-title">Join Our <span className="text-accent">Dynamic Team</span></h2>
          <p className="career-description">
            Be part of a collaborative environment where innovation meets excellence. 
            We are always looking for passionate individuals to help us redefine the digital future.
          </p>
          <Link to="/career" className="btn-primary">View Open Positions</Link>
        </div>
      </div>
    </section>
  );
};

export default CareerPreview;
