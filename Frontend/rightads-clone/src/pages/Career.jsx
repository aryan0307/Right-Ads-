import React, { useState } from 'react';
import './Career.css';
import { Briefcase, GraduationCap, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { API_BASE } from '../config/api';

const Career = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('Jobs');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('Job');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  const jobs = [
    { title: "Senior Digital Marketer", loc: "Faridabad / Remote", type: "Full-Time", exp: "3-5 Years" },
    { title: "React Developer", loc: "Faridabad", type: "Full-Time", exp: "2-4 Years" },
    { title: "SEO Specialist", loc: "Remote", type: "Contract", exp: "2+ Years" }
  ];

  const internships = [
    { title: "Marketing Intern", duration: "3 Months", loc: "Faridabad", req: "Graduate / Final Year" },
    { title: "Frontend Developer Intern", duration: "6 Months", loc: "Remote", req: "Knowledge of React/JS" }
  ];

  const handleApply = (type) => {
    setFormType(type);
    setShowForm(true);
    setSubmitted(false);
    setError('');
    setResumeFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.target;
    const formData = new FormData();

    if (formType === 'Job') {
      formData.append('name', form.name.value);
      formData.append('email', form.email.value);
      formData.append('phone', form.phone.value);
      formData.append('skills', form.skills.value);
      formData.append('experience', form.experience.value);
      if (resumeFile) formData.append('resume', resumeFile);

      try {
        const res = await fetch(`${API_BASE}/api/careers`, { method: 'POST', body: formData });
        if (!res.ok) throw new Error('Submission failed');
        setSubmitted(true);
      } catch {
        setError('Failed to submit application. Please try again.');
      }
    } else {
      const branchYear = form.branchYear.value.split(' ');
      formData.append('name', form.name.value);
      formData.append('college', form.college.value);
      formData.append('branch', branchYear.slice(0, -1).join(' ') || form.branchYear.value);
      formData.append('year', branchYear.slice(-1).join(' ') || '');
      formData.append('skills', form.skills.value);
      formData.append('domain', form.domain.value);
      if (resumeFile) formData.append('resume', resumeFile);

      try {
        const res = await fetch(`${API_BASE}/api/internships`, { method: 'POST', body: formData });
        if (!res.ok) throw new Error('Submission failed');
        setSubmitted(true);
      } catch {
        setError('Failed to submit application. Please try again.');
      }
    }

    setLoading(false);
  };

  return (
    <div className={`career-page ${darkMode ? 'dark' : 'light'}`}>
      <header className="page-header section-padding">
        <div className="container">
          <h1 className="hero-title">Build Your <span className="text-accent">Future</span></h1>
          <p className="hero-desc">Join a team of visionaries and creators.</p>
        </div>
      </header>

      <section className="career-tabs-section section-padding">
        <div className="container">
          <div className="career-tabs">
            <button className={`tab-btn ${activeTab === 'Jobs' ? 'active' : ''}`} onClick={() => setActiveTab('Jobs')}>
              <Briefcase size={20} /> Open Positions
            </button>
            <button className={`tab-btn ${activeTab === 'Internships' ? 'active' : ''}`} onClick={() => setActiveTab('Internships')}>
              <GraduationCap size={20} /> Internship Program
            </button>
          </div>

          <div className="listings-grid">
            {activeTab === 'Jobs' ? (
              jobs.map((job, i) => (
                <div key={i} className="listing-card floating-glass float-md">
                  <h3>{job.title}</h3>
                  <div className="listing-meta">
                    <span><MapPin size={16} /> {job.loc}</span>
                    <span><Clock size={16} /> {job.type}</span>
                  </div>
                  <p>Experience: {job.exp}</p>
                  <button className="apply-btn" onClick={() => handleApply('Job')}>Apply Now <ArrowRight size={16} /></button>
                </div>
              ))
            ) : (
              internships.map((intern, i) => (
                <div key={i} className="listing-card internship-card floating-glass float-md">
                  <div className="cat-badge">Internship</div>
                  <h3>{intern.title}</h3>
                  <div className="listing-meta">
                    <span><Clock size={16} /> {intern.duration}</span>
                    <span><MapPin size={16} /> {intern.loc}</span>
                  </div>
                  <p>Requirement: {intern.req}</p>
                  <button className="apply-btn" onClick={() => handleApply('Internship')}>Apply For Internship <ArrowRight size={16} /></button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {showForm && (
        <div className="form-modal" onClick={() => setShowForm(false)}>
          <div className="modal-content floating-glass floating-glass--static" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{formType === 'Job' ? 'Job Application' : 'Internship Application'}</h2>
              <button className="close-modal" onClick={() => setShowForm(false)}>×</button>
            </div>

            {submitted ? (
              <div className="success-message-career animate-scale-up">
                <CheckCircle size={60} className="text-accent" />
                <h3>Application Received!</h3>
                <p>Thank you for applying. We will review your profile and get back to you soon.</p>
                <button className="btn-primary" onClick={() => setShowForm(false)}>Close</button>
              </div>
            ) : (
              <form className="application-form" onSubmit={handleSubmit}>
                <div className="modal-body-scroll">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="Enter your name" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" name="email" placeholder="example@mail.com" required />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="tel" name="phone" placeholder="+91" required />
                    </div>
                  </div>
                  {formType === 'Internship' ? (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label>College</label>
                          <input type="text" name="college" placeholder="University name" required />
                        </div>
                        <div className="form-group">
                          <label>Branch/Year</label>
                          <input type="text" name="branchYear" placeholder="B.Tech 3rd Year" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Domain</label>
                        <input type="text" name="domain" placeholder="e.g. Frontend Development" required />
                      </div>
                    </>
                  ) : (
                    <div className="form-group">
                      <label>Experience</label>
                      <input type="text" name="experience" placeholder="e.g. 3 years" required />
                    </div>
                  )}
                  <div className="form-group">
                    <label>Skills</label>
                    <input type="text" name="skills" placeholder="Your key skills" required />
                  </div>
                  <div className="form-group">
                    <label>Resume (PDF or DOCX)</label>
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                      required
                    />
                  </div>
                  {error && <p className="career-form-error">{error}</p>}
                </div>
                <div className="modal-footer-sticky">
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Submitting..." : (formType === 'Job' ? 'Submit Application' : 'Apply For Internship')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Career;
