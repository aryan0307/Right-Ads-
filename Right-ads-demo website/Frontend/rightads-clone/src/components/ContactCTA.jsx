import React from 'react';
import { Link } from 'react-router-dom';
import './ContactCTA.css';

const ContactCTA = ({ darkMode }) => {
  return (
    <section className={`contact-cta ${darkMode ? 'dark' : 'light'}`}>
      <div className="container section-padding">
        <div className="cta-box animate-fade-in">
          <h2 className="cta-headline">Ready to Scale Your Business?</h2>
          <p className="cta-subheadline">
            Get in touch with our experts today and discover how we can transform your digital presence.
          </p>
          <Link to="/contact" className="cta-btn">Contact Our Team</Link>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
