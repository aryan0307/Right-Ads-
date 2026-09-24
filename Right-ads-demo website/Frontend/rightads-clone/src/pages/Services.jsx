import React, { useState, useMemo } from 'react';
import './Services.css';
import { CheckCircle, Search, ArrowRight } from 'lucide-react';
import { servicesCatalog } from '../data/servicesCatalog';
import LeadApplyModal from '../components/LeadApplyModal';

const Services = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [applyService, setApplyService] = useState(null);

  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return servicesCatalog;
    return servicesCatalog.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.keywords.some((k) => k.includes(q))
    );
  }, [searchQuery]);

  return (
    <div className={`services-page ${darkMode ? 'dark' : 'light'}`}>
      <section className="services-hero section-padding">
        <div className="container">
          <h1 className="hero-title">Find the Right <span className="text-accent">Service</span></h1>
          <p className="hero-desc">
            Discover digital solutions and compliance services tailored for your business needs.
          </p>

          <div className="service-search-box floating-glass float-md">
            <Search size={22} className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What service are you looking for?"
              aria-label="Search services"
            />
          </div>
        </div>
      </section>

      <section className="detailed-services section-padding">
        <div className="container">
          {filteredServices.length === 0 ? (
            <div className="no-services-found floating-glass">
              <p>No services match your search. Try a different keyword.</p>
            </div>
          ) : (
            <div className="services-list-grid">
              {filteredServices.map((s, i) => (
                <div
                  key={s.id}
                  className="detailed-service-card floating-glass float-lg animate-fade-in"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="card-accent" style={{ backgroundColor: s.color }} />
                  <div className="card-body">
                    <h2>{s.title}</h2>
                    <p className="description">{s.description}</p>
                    <div className="benefits-list">
                      {s.benefits.map((b) => (
                        <div key={b} className="benefit-item">
                          <CheckCircle size={18} className="text-accent" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="service-apply-btn"
                      onClick={() => setApplyService(s.title)}
                    >
                      Apply <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="custom-solutions section-padding">
        <div className="container cta-banner">
          <h2>Need a Custom Solution?</h2>
          <p>Contact our experts to discuss your specific requirements and get a tailored plan.</p>
          <button type="button" className="btn-primary" onClick={() => setApplyService('Custom Solution')}>
            Talk to Expert
          </button>
        </div>
      </section>

      {applyService && (
        <LeadApplyModal
          darkMode={darkMode}
          serviceTitle={applyService}
          onClose={() => setApplyService(null)}
        />
      )}
    </div>
  );
};

export default Services;
