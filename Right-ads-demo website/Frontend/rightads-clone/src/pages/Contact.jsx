import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const cities_right_ads = {
  DEHRADUN: {
    address: "2nd Floor, Vohra Tower, Sudhowala, Uttarakhand 248015",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525845.1331433943!2d73.33004608749995!3d30.345034100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d5d72a8e825f%3A0x92abfaf641fdd793!2sDigital%20Right%20%7C%20Best%20Digital%20Marketing%20Agency!5e0!3m2!1sen!2sin!4v1780743031205!5m2!1sen!2sin",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525845.1331433943!2d73.33004608749995!3d30.345034100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d5d72a8e825f%3A0x92abfaf641fdd793!2sDigital%20Right%20%7C%20Best%20Digital%20Marketing%20Agency!5e0!3m2!1sen!2sin!4v1780743031205!5m2!1sen!2sin"
  },
  KOTA: {
    address: "Ground Floor, 62, Atwal Nagar, Kota, Rajasthan 324001",
    mapLink: "https://www.google.com/maps/place/Right+Ads+-+Website+Designing,+Development+Company+in+Kota+%7C+Digital+Marketing+SEO+Company+in+Kota/@25.1786046,75.8609518,17z/data=!3m1!4b1!4m6!3m5!1s0x396f9bd93241e50f:0x3184f22c828e47e0!8m2!3d25.1785998!4d75.8635267!16s%2Fg%2F11s7wljjpc?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.7296574721972!2d75.86095177437616!3d25.17860463245544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f9bd93241e50f%3A0x3184f22c828e47e0!2sRight%20Ads%20-%20Website%20Designing%2C%20Development%20Company%20in%20Kota%20%7C%20Digital%20Marketing%20SEO%20Company%20in%20Kota!5e0!3m2!1sen!2sin!4v1780742376363!5m2!1sen!2sin"
  },
  FARIDABAD: {
    address: "45, Sector 15A, Near Crown Interiorz Mall, Faridabad, Haryana, India",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112111.6624193239!2d77.16739444335936!3d28.58509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5c60f7ac28b%3A0xaae4b27180657cc1!2sRight%20Ads%20Digital!5e0!3m2!1sda!2sin!4v1780742612332!5m2!1sda!2sin",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112111.6624193239!2d77.16739444335936!3d28.58509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5c60f7ac28b%3A0xaae4b27180657cc1!2sRight%20Ads%20Digital!5e0!3m2!1sda!2sin!4v1780742612332!5m2!1sda!2sin" 
  },
  NOIDA: {
    address: "3rd Floor, A-71, A Block, Sector 2, Noida, Uttar Pradesh 201301",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.489294467791!2d77.30901507450801!3d28.585094686235152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5c60f7ac28b%3A0xaae4b27180657cc1!2sRight%20Ads%20Digital!5e0!3m2!1sda!2sin!4v1780742796061!5m2!1sda!2sin",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.489294467791!2d77.30901507450801!3d28.585094686235152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5c60f7ac28b%3A0xaae4b27180657cc1!2sRight%20Ads%20Digital!5e0!3m2!1sda!2sin!4v1780742796061!5m2!1sda!2sin"
  }
};

const Contact = ({ darkMode }) => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeCity, setActiveCity] = useState('KOTA');

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.sendForm('service_45n7u5m', 'template_td0ipal', form.current, '1jki_4b0GOi64tTkn')
      .then((result) => {
          setLoading(false);
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 5000);
      }, (error) => {
          console.log(error.text);
          alert("Mail nahi gaya, console check kar!");
          setLoading(false);
      });
  };

  return (
    <div className={`contact-page ${darkMode ? 'dark' : 'light'}`}>
      <section className="contact-main section-padding">
        <div className="container contact-grid">
          <div className="contact-info-section">
            {/* Info Card */}
            <div className="info-card-detailed floating-glass float-md">
              <div className="info-item">
                <div className="info-icon"><MapPin /></div>
                <div>
                  <h3>Our Office ({activeCity})</h3>
                  <a href={cities_right_ads[activeCity].mapLink} target="_blank" rel="noopener noreferrer" className="contact-link-item">
                    {cities_right_ads[activeCity].address}
                  </a>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="map-section-wrapper">
              <div className="map-header-controls">
                <h4>Branch Location</h4>
                <select value={activeCity} onChange={(e) => setActiveCity(e.target.value)} className="city-dropdown-selector">
                  {Object.keys(cities_right_ads).map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <div className="map-container">
                <iframe src={cities_right_ads[activeCity].embedUrl} width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
              </div>
            </div>
          </div>
          <div className="contact-form-section">
            <div className="form-container floating-glass float-lg">
              <h2>Send a Message</h2>
              {submitted ? (
                <div className="success-message">
                  <CheckCircle size={60} className="text-accent" />
                  <h3>Message Sent!</h3>
                </div>
              ) : (
                <form ref={form} onSubmit={sendEmail} className="contact-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="user_name" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="user_email" placeholder="john@example.com" required />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select name="user_subject" required>
                      <option>General Inquiry</option>
                      <option>Web Development</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea name="message" rows="6" required></textarea>
                  </div>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"} <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;