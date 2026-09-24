import React from 'react';
import './CertificatePreview.css';
import { FileText, Landmark, ShieldCheck, ClipboardList, Briefcase } from 'lucide-react';

const CertificatePreview = ({ darkMode }) => {
  const financialServices = [
    { icon: <FileText />, title: "PAN Card Services", desc: "Expert assistance for new applications and corrections." },
    { icon: <Landmark />, title: "GST Services", desc: "End-to-end registration and return filing solutions." },
    { icon: <Briefcase />, title: "Registration Services", desc: "MSME, Shop Act, and other business registrations." },
    { icon: <ClipboardList />, title: "Financial Documentation", desc: "Compiling robust documentation for business needs." },
    { icon: <ShieldCheck />, title: "Business Compliance", desc: "Ensuring your business meets all legal requirements." }
  ];

  return (
    <section className={`cert-preview ${darkMode ? 'dark' : 'light'}`}>
      <div className="container section-padding">
        <h2 className="section-title">Certification & <span className="text-accent">Financial Services</span></h2>
        <p className="section-subtitle">Simplifying business compliance for your growth.</p>
        
        <div className="cert-grid">
          {financialServices.map((s, i) => (
            <div key={i} className="cert-card floating-glass float-md animate-fade-in">
              <div className="cert-icon">{s.icon}</div>
              <div className="cert-content">
                <h3 className="cert-title">{s.title}</h3>
                <p className="cert-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatePreview;
