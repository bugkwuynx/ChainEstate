import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav>
      <div className="navbar-container" ref={navRef}>
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          &#9776;
        </button>
        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/properties" className="navbar-item">
            Properties
          </Link>
          <Link to="/my-portfolio" className="navbar-item">
            My Portfolio
          </Link>
          <Link to="/invest" className="navbar-item">
            Invest
          </Link>
          <Link to="/transactions" className="navbar-item">
            Transactions
          </Link>
          <Link to="/faqs" className="navbar-item">
            FAQs
          </Link>
          <Link to="/connect-wallet" className="navbar-item">
            Connect Wallet
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
