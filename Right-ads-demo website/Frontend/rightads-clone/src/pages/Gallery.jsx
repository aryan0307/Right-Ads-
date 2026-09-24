import React, { useState } from 'react';
import './Gallery.css';

// Import all 9 assets from your local assets folder
import img1 from '../assets/gal1.jpg';
import img2 from '../assets/gal2.jpg';
import img3 from '../assets/gal3.jpg';
import img4 from '../assets/gal4.jpg';
import img5 from '../assets/gal5.jpg';
import img6 from '../assets/gal-6.jpg';
import img7 from '../assets/gal7.jpg';
import img8 from '../assets/gal8.jpg';
import img9 from '../assets/gal 9.jpg';

const Gallery = ({ darkMode }) => {
  const [filter, setFilter] = useState('All');
  const [selectedImg, setSelectedImg] = useState(null);

  const categories = ['All', 'Events', 'Office', 'Team', 'Celebrations'];
  
  // Organized mapping utilizing all 9 images balanced across categories
  const images = [
    { id: 1, src: img1, cat: 'Events', title: 'Marketing Workshop 2024' },
    { id: 2, src: img2, cat: 'Team', title: 'Strategy Meeting' },
    { id: 3, src: img3, cat: 'Events', title: 'Client Conference' },
    { id: 4, src: img4, cat: 'Celebrations', title: 'Annual Day Celebration' },
    { id: 5, src: img5, cat: 'Team', title: 'Collaboration Session' },
    { id: 6, src: img6, cat: 'Office', title: 'Main Office Space' },
    { id: 7, src: img7, cat: 'Events', title: 'Corporate Networking Summit' },
    { id: 8, src: img8, cat: 'Office', title: 'Executive Operations Suite' },
    { id: 9, src: img9, cat: 'Celebrations', title: 'Core Milestones Banquet' }
  ];

  const filteredImages = filter === 'All' ? images : images.filter(img => img.cat === filter);

  return (
    <div className={`gallery-page ${darkMode ? 'dark' : 'light'}`}>
      <header className="page-header section-padding">
        <div className="container">
          <h1 className="hero-title">Event <span className="text-accent">Gallery</span></h1>
          <p className="hero-desc">Capturing moments of innovation and collaboration.</p>
        </div>
      </header>

      <section className="gallery-section section-padding">
        <div className="container">
          <div className="filter-tabs">
            {categories.map(c => (
              <button 
                key={c} 
                className={`filter-btn ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredImages.map(img => (
              <div 
                key={img.id} 
                className="gallery-item floating-glass float-sm animate-fade-in"
                onClick={() => setSelectedImg(img)}
              >
                <div className="img-wrapper">
                  <img src={img.src} alt={img.title} className="gallery-img" loading="lazy" />
                </div>
                <div className="img-overlay">
                  <h4>{img.title}</h4>
                  <p>{img.cat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImg && (
        <div className="lightbox" onClick={() => setSelectedImg(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="lightbox-img-box">
              <img src={selectedImg.src} alt={selectedImg.title} className="lightbox-img-fluid" />
            </div>
            <button className="close-lightbox" onClick={() => setSelectedImg(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;