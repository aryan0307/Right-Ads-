import React from 'react';
import './Footer.css';
import { Mail, Phone, MapPin, Globe, Share2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import logoDark from '../assets/logo_dark.png';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`site-footer ${darkMode ? 'dark' : 'light'}`}>
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-info">
            <Link to="/" className="footer-logo-link">
              <img
                src={darkMode ? logoDark : logo}
                alt="Right Ads Digital"
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-tagline">
              Your trusted partner for digital marketing, web excellence, and business compliance.
            </p>
            <div className="social-links">
              <a href="#"><Globe size={20} /></a>
              <a href="#"><Share2 size={20} /></a>
              <a href="#"><MessageCircle size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/career">Careers</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/services">Digital Marketing</Link></li>
              <li><Link to="/services">Web Development</Link></li>
              <li><Link to="/certificates">GST & PAN Services</Link></li>
              <li><Link to="/services">SEO Optimization</Link></li>
              <li><Link to="/certificates">Registration Services</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Info</h4>
            <ul className="contact-list">
              <li>
                <a href="https://maps.google.com/?q=123+Business+Avenue,+Digital+City" target="_blank" rel="noopener noreferrer">
                  <MapPin size={18} className="text-accent" /> 123 Business Avenue, Digital City
                </a>
              </li>
              <li>
                <a href="tel:+919876543210">
                  <Phone size={18} className="text-accent" /> +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:info@rightadsdigital.com">
                  <Mail size={18} className="text-accent" /> info@rightadsdigital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Right Ads Digital. All rights reserved.</p>
          <div className="footer-legal">
            <button onClick={() => alert('Privacy Policy content will be updated soon.')} className="legal-btn">Privacy Policy</button>
            <button onClick={() => alert('Terms of Service content will be updated soon.')} className="legal-btn">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
