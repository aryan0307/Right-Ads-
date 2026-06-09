import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import Top from "./components/Top";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Certificates from "./pages/Certificates";
import Gallery from "./pages/Gallery";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Login from "./hidden/pages/Login";
import Dashboard from "./hidden/pages/Dashboard";
import AdminContacts from "./hidden/pages/Contacts";
import AdminLeads from "./hidden/pages/Leads";
import AdminCareers from "./hidden/pages/Careers";
import AdminInternships from "./hidden/pages/Internships";
import AdminCertificates from "./hidden/pages/Certificates";
import AdminMeetings from "./hidden/pages/Meetings";
import ProtectedRoute from "./hidden/components/ProtectedRoute";
import DashboardLayout from "./hidden/components/DashboardLayout";
import MeetingRoom from "./hidden/components/MeetingRoom";
import "./styles/Global.css";
import "./styles/floating.css";

const MAX_SCROLL_DRIFT = 16;
const SCROLL_LERP = 0.08;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const isStandaloneRoute = (pathname) =>
  pathname === '/login' ||
  pathname.startsWith('/dashboard') ||
  pathname.startsWith('/meeting');

function AppContent({ darkMode, setDarkMode }) {
  const { pathname } = useLocation();
  const standalone = isStandaloneRoute(pathname);
  const [scrollDir, setScrollDir] = useState("");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDir("slide-left");
      } else if (currentScrollY < lastScrollY) {
        setScrollDir("slide-right");
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${darkMode ? "dark-theme" : "light-theme"} ${!standalone ? scrollDir : ""}`} style={{ minHeight: '100vh', transition: 'background-color 0.4s ease' }}>
      {!standalone && <Top darkMode={darkMode} setDarkMode={setDarkMode} />}

      <main>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/about" element={<About darkMode={darkMode} />} />
          <Route path="/services" element={<Services darkMode={darkMode} />} />
          <Route path="/certificates" element={<Certificates darkMode={darkMode} />} />
          <Route path="/gallery" element={<Gallery darkMode={darkMode} />} />
          <Route path="/career" element={<Career darkMode={darkMode} />} />
          <Route path="/contact" element={<Contact darkMode={darkMode} />} />

          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/contact" element={<AdminContacts />} />
              <Route path="/dashboard/leads" element={<AdminLeads />} />
              <Route path="/dashboard/careers" element={<AdminCareers />} />
              <Route path="/dashboard/internships" element={<AdminInternships />} />
              <Route path="/dashboard/certificates" element={<AdminCertificates />} />
              <Route path="/dashboard/meetings" element={<AdminMeetings />} />
            </Route>
          </Route>

          <Route path="/meeting/:roomId" element={<MeetingRoom darkMode={darkMode} />} />
        </Routes>
      </main>

      {!standalone && <Footer darkMode={darkMode} />}
      {!standalone && <ChatBot darkMode={darkMode} />}
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    let lastScrollY = window.scrollY;
    let currentDrift = 0;
    let targetDrift = 0;
    let rafId = null;

    const tick = () => {
      currentDrift += (targetDrift - currentDrift) * SCROLL_LERP;
      if (Math.abs(targetDrift - currentDrift) < 0.05) {
        currentDrift = targetDrift;
      }
      root.style.setProperty('--scroll-drift', `${currentDrift.toFixed(2)}px`);
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY) {
        targetDrift = MAX_SCROLL_DRIFT;
        root.classList.add('scroll-slide-down');
        root.classList.remove('scroll-slide-up');
      } else if (scrollY < lastScrollY) {
        targetDrift = -MAX_SCROLL_DRIFT;
        root.classList.add('scroll-slide-up');
        root.classList.remove('scroll-slide-down');
      }
      lastScrollY = scrollY;
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      root.style.removeProperty('--scroll-drift');
      root.classList.remove('scroll-slide-down', 'scroll-slide-up');
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
    </Router>
  );
}

export default App;
