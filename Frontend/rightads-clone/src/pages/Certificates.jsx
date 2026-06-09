import React, { useState } from 'react';
import './Certificates.css';
import { X, CheckCircle2, FileText, Clock, HelpCircle } from 'lucide-react';
import { certificationServices } from '../data/certificationServices';
import LeadApplyModal from '../components/LeadApplyModal';

const Certificates = ({ darkMode }) => {
  const [detailService, setDetailService] = useState(null);
  const [applyService, setApplyService] = useState(null);

  return (
    <div className={`certificates-page ${darkMode ? 'dark' : 'light'}`}>
      <header className="page-header section-padding">
        <div className="container">
          <h1 className="hero-title">Certification & <span className="text-accent">Compliance Services</span></h1>
          <p className="hero-desc">
            Government registrations and quality certifications to help your business grow with confidence.
          </p>
        </div>
      </header>

      <section className="cert-cards-section section-padding">
        <div className="container">
          <div className="cert-cards-grid">
            {certificationServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.id}
                  className="cert-service-card floating-glass float-lg animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="cert-card-accent" style={{ backgroundColor: service.color }} />
                  <div className="cert-card-body">
                    <div className="cert-card-icon" style={{ background: `${service.color}18`, color: service.color }}>
                      <Icon size={28} />
                    </div>
                    <h2>{service.title}</h2>
                    <p className="cert-card-desc">{service.shortDescription}</p>
                    <div className="cert-card-actions">
                      <button
                        type="button"
                        className="cert-btn-outline"
                        onClick={() => setDetailService(service)}
                      >
                        Learn More
                      </button>
                      <button
                        type="button"
                        className="cert-btn-primary"
                        onClick={() => setApplyService(service.title)}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="why-us-financial section-padding">
        <div className="container">
          <div className="info-banner animate-fade-in">
            <h2>Why Choose Our Compliance Services?</h2>
            <ul className="info-list">
              <li>100% Secure Document Handling</li>
              <li>Official & Government Verified Processes</li>
              <li>Competitive Pricing</li>
              <li>Expert Support Team</li>
            </ul>
          </div>
        </div>
      </section>

      {detailService && (
        <div className="cert-modal-overlay" onClick={() => setDetailService(null)}>
          <div
            className="cert-detail-modal floating-glass floating-glass--static"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-detail-header">
              <h2>{detailService.title}</h2>
              <button type="button" className="cert-modal-close" onClick={() => setDetailService(null)}>
                <X size={22} />
              </button>
            </div>
            <div className="cert-detail-body">
              <section className="cert-detail-section">
                <h3><FileText size={18} /> Description</h3>
                <p>{detailService.details.description}</p>
              </section>
              <section className="cert-detail-section">
                <h3><CheckCircle2 size={18} /> Benefits</h3>
                <ul>
                  {detailService.details.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </section>
              <section className="cert-detail-section">
                <h3><FileText size={18} /> Required Documents</h3>
                <ul>
                  {detailService.details.documents.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
              <section className="cert-detail-section">
                <h3><CheckCircle2 size={18} /> Eligibility</h3>
                <ul>
                  {detailService.details.eligibility.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </section>
              <section className="cert-detail-section">
                <h3><Clock size={18} /> Processing Time</h3>
                <p>{detailService.details.processingTime}</p>
              </section>
              <section className="cert-detail-section">
                <h3><HelpCircle size={18} /> Frequently Asked Questions</h3>
                <div className="cert-faq-list">
                  {detailService.details.faqs.map((faq) => (
                    <div key={faq.q} className="cert-faq-item">
                      <strong>{faq.q}</strong>
                      <p>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="cert-detail-footer">
              <button
                type="button"
                className="cert-btn-primary"
                onClick={() => {
                  setDetailService(null);
                  setApplyService(detailService.title);
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Certificates;
