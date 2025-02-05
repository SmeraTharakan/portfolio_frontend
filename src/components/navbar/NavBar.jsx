import React from "react";
import { Link } from "react-scroll"; // Import from react-scroll
import "./NavBar.css";

const NavBar = ({ hideRightItems }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container">
        <a href="/" className="navbar-brand">
          <span className="first-name">Smera</span>
          <span className="last-name">Tharakan</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Conditionally render right-side nav items */}
          {!hideRightItems && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="home" smooth={true} duration={500}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="aboutme" smooth={true} duration={500}>
                  About Me
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="education" smooth={true} duration={500}>
                  Education
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="projects" smooth={true} duration={500}>
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="contactme" smooth={true} duration={500}>
                  Contact Me
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;