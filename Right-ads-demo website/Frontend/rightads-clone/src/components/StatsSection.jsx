import React from 'react';
import './StatsSection.css';

const StatsSection = ({ darkMode }) => {
  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "150+", label: "Happy Clients" },
    { value: "10+", label: "Years Experience" },
    { value: "24/7", label: "Expert Support" }
  ];

  return (
    <section className={`stats-section ${darkMode ? 'dark' : 'light'}`}>
      <div className="container section-padding">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-item floating-glass floating-glass--accent stats-float-horizontal scroll-slide animate-fade-in"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <h2 className="stat-value">{s.value}</h2>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
