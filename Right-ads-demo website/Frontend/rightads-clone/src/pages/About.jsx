import React from 'react';
import './About.css';
import { Target, Eye, Heart, Shield, Users, Clock } from 'lucide-react';

const About = ({ darkMode }) => {
  const values = [
    { icon: <Heart />, title: "Integrity", desc: "We believe in honest work and transparent relationships." },
    { icon: <Shield />, title: "Trust", desc: "Building long-term partnerships through reliability." },
    { icon: <Users />, title: "Collaboration", desc: "Working together to achieve extraordinary results." },
    { icon: <Target />, title: "Innovation", desc: "Constantly pushing boundaries in the digital space." }
  ];

  const timeline = [
    { year: "2014", event: "Right Ads Digital founded with a vision for excellence." },
    { year: "2016", event: "Expanded services to include Web Development." },
    { year: "2019", event: "Launched dedicated Certification & Financial Services." },
    { year: "2023", event: "Reached major milestone of 500+ successful projects." }
  ];

  return (
    <div className={`about-page ${darkMode ? 'dark' : 'light'}`}>
      <section className="about-hero section-padding">
        <div className="container">
          <h1 className="hero-title">Our Story, <span className="text-accent">Our Passion</span></h1>
          <p className="hero-desc">
            Right Ads Digital was born from a simple idea: to make professional digital 
            services accessible and effective for businesses of all sizes.
          </p>
        </div>
      </section>

      <section className="mission-vision section-padding">
        <div className="container about-grid-2">
          <div className="mission-box floating-glass float-lg animate-slide-up">
            <Target className="text-accent" size={48} />
            <h2>Our Mission</h2>
            <p>To empower global brands through innovative digital solutions and strategic marketing that delivers measurable growth and sustainable success.</p>
          </div>
          <div className="vision-box animate-slide-up">
            <Eye className="text-accent" size={48} />
            <h2>Our Vision</h2>
            <p>To be the world's most trusted digital expansion partner, known for our commitment to excellence and our clients' long-term prosperity.</p>
          </div>
        </div>
      </section>

      <section className="core-values section-padding">
        <div className="container">
          <h2 className="section-title">Core <span className="text-accent">Values</span></h2>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card floating-glass float-md">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-timeline section-padding">
        <div className="container">
          <h2 className="section-title">Our <span className="text-accent">Journey</span></h2>
          <div className="timeline-container">
            {timeline.map((t, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-content">
                  <p>{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="leadership section-padding">
        <div className="container">
          <h2 className="section-title">Our <span className="text-accent">Leadership</span></h2>
          <div className="leadership-grid">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="leader-card">
                <div className="leader-image-placeholder floating-glass float-sm"></div>
                <h3>Executive Member</h3>
                <p>Strategist & Visionary</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
