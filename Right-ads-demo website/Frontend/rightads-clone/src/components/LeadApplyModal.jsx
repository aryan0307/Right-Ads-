import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { submitLead } from '../config/api';
import './LeadApplyModal.css';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry',
];

const LeadApplyModal = ({ darkMode, serviceTitle, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    businessType: '',
    state: '',
    requirementDetails: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const message = [
      `Company: ${form.companyName}`,
      `Business Type: ${form.businessType}`,
      `State: ${form.state}`,
      `Requirement: ${form.requirementDetails}`,
    ].join('\n');

    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service_required: serviceTitle,
        message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-modal-overlay" onClick={onClose}>
      <div
        className={`lead-modal floating-glass floating-glass--static ${darkMode ? 'dark' : 'light'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lead-modal-header">
          <h2>Apply for {serviceTitle}</h2>
          <button type="button" className="lead-modal-close" onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>

        {submitted ? (
          <div className="lead-modal-success">
            <CheckCircle size={56} className="text-accent" />
            <h3>Application Submitted!</h3>
            <p>Our team will contact you shortly regarding your {serviceTitle} enquiry.</p>
            <button type="button" className="btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className="lead-modal-form" onSubmit={handleSubmit}>
            <div className="lead-modal-body">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Your company" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Business Type</label>
                  <select name="businessType" value={form.businessType} onChange={handleChange} required>
                    <option value="">Select type</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Private Limited">Private Limited</option>
                    <option value="LLP">LLP</option>
                    <option value="Public Limited">Public Limited</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>State</label>
                  <select name="state" value={form.state} onChange={handleChange} required>
                    <option value="">Select state</option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Requirement Details</label>
                <textarea
                  name="requirementDetails"
                  value={form.requirementDetails}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your requirements..."
                  required
                />
              </div>
              {error && <p className="lead-modal-error">{error}</p>}
            </div>
            <div className="lead-modal-footer">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LeadApplyModal;
