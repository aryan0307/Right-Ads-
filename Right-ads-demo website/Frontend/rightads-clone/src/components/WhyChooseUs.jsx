import React from 'react';
import './WhyChooseUs.css';
import { Briefcase, Users, Cpu, Layers, Zap, TrendingUp } from 'lucide-react';

const WhyChooseUs = ({ darkMode }) => {
  const features = [
    { icon: <Briefcase />, title: "Industry Experience", desc: "Decades of collective expertise in navigating the digital landscape." },
    { icon: <Users />, title: "Client Focus", desc: "Your goals are our blueprint. We prioritize your business needs above all." },
    { icon: <Cpu />, title: "Digital Expertise", desc: "Mastering the latest technologies to give your brand a competitive edge." },
    { icon: <Layers />, title: "End-to-End Solutions", desc: "From concept to conversion, we handle every aspect of your digital journey." },
    { icon: <Zap />, title: "Fast Support", desc: "Rapid response times and dedicated support for seamless operations." },
    { icon: <TrendingUp />, title: "Result Driven", desc: "Data-backed strategies focused on maximizing your ROI." }
  ];

  return (
    <section className={`why-choose-us ${darkMode ? 'dark' : 'light'}`}>
      <div className="container section-padding">
        <h2 className="section-title">Why Partner With <span className="text-accent">Us?</span></h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card floating-glass float-md animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
