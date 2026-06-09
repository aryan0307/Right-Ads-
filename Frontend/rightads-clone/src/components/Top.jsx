import { Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.jpg";
import logoDark from "../assets/logo_dark.png";
import "./Top.css";

function Top({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Certificate & Financial Services", path: "/certificates" },
    { name: "Event Gallery", path: "/gallery" },
    { name: "Career", path: "/career" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="navbar-wrapper">
        <nav className="navbar antigravity">
          <Link to="/" className="navbar-logo">
            <img
              src={darkMode ? logoDark : logo}
              alt="Right Ads"
              className="main-logo"
            />
          </Link>

          <ul className="nav-links">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>

          <div className="right-section">
            <button
              className="theme-btn"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link to="/contact" className="contact-btn">
              Get Started
            </Link>

            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        {navItems.map((item, index) => (
          <Link key={index} to={item.path} onClick={() => setMenuOpen(false)}>
            {item.name}
          </Link>
        ))}

        <Link to="/contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>
          Get Started
        </Link>
      </div>
    </header>
  );
}

export default Top;
