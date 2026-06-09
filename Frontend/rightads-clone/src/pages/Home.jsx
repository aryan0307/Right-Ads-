import React from 'react';
import Hero from '../components/Hero';
import AboutPreview from '../components/AboutPreview';
import WhyChooseUs from '../components/WhyChooseUs';
import ServicesPreview from '../components/ServicesPreview';
import StatsSection from '../components/StatsSection';
import CertificatePreview from '../components/CertificatePreview';
import CareerPreview from '../components/CareerPreview';
import ContactCTA from '../components/ContactCTA';

const Home = ({ darkMode }) => {
  return (
    <div className="home-page">
      <Hero darkMode={darkMode} />
      <AboutPreview darkMode={darkMode} />
      <WhyChooseUs darkMode={darkMode} />
      <ServicesPreview darkMode={darkMode} />
      <StatsSection darkMode={darkMode} />
      <CertificatePreview darkMode={darkMode} />
      <CareerPreview darkMode={darkMode} />
      <ContactCTA darkMode={darkMode} />
    </div>
  );
};

export default Home;
