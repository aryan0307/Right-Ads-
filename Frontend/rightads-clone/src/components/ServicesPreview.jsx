import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesPreview.css';
import { Globe, Code, Search, Share2, BarChart, Megaphone, UserCheck, Layout } from 'lucide-react';

const ServicesPreview = ({ darkMode }) => {
  const services = [
    { icon: <Megaphone />, title: "Digital Marketing", desc: "Comprehensive strategies to amplify your brand's voice online." },
    { icon: <Layout />, title: "Website Design", desc: "Modern, aesthetic, and user-centric designs that convert." },
    { icon: <Code />, title: "Website Development", desc: "Robust and scalable web applications built for performance." },
    { icon: <Search />, title: "SEO", desc: "Data-driven optimization to rank your business at the top." },
    { icon: <Share2 />, title: "Social Media Marketing", desc: "Engaging your community across all social platforms." },
    { icon: <BarChart />, title: "Google Ads", desc: "High-ROI PPC campaigns targeted at your ideal customers." },
    { icon: <Globe />, title: "Brand Promotion", desc: "Global scaling strategies for professional brand identity." },
    { icon: <UserCheck />, title: "Lead Generation", desc: "Fueling your sales pipeline with high-intent leads." }
  ];

  return (
    <section className={`services-preview ${darkMode ? 'dark' : 'light'}`}>
      <div className="container section-padding">
        <h2 className="section-title">Professional <span className="text-accent">Digital Services</span></h2>
        <p className="section-subtitle">Comprehensive solutions for the modern enterprise.</p>
        
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card floating-glass float-md animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="service-icon-wrapper">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <Link to="/services" className="service-link">Learn More &rarr;</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
