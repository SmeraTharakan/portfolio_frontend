import React, { useState, useEffect } from "react";
import "./NavBar.css"; // Assuming you'll add styles here

const NavBar = () => {
  const [activeLink, setActiveLink] = useState(""); // Store the active link

  // Function to check the current active section
  const handleActiveLink = () => {
    const currentHash = window.location.hash;
    setActiveLink(currentHash); // Set the active link to the current hash in the URL
  };

  // Listen for hash changes and update active link
  useEffect(() => {
    handleActiveLink(); // Initial check on page load
    window.addEventListener("hashchange", handleActiveLink); // Listen for hash changes
    return () => {
      window.removeEventListener("hashchange", handleActiveLink); // Clean up event listener
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container">
        <a href="#home" className="navbar-brand">
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                href="#home"
                className={`nav-link ${activeLink === "#home" ? "active" : ""}`}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#aboutme"
                className={`nav-link ${activeLink === "#aboutme" ? "active" : ""}`}
              >
                About Me
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#skills"
                className={`nav-link ${activeLink === "#skills" ? "active" : ""}`}
              >
                Skills
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#education"
                className={`nav-link ${activeLink === "#education" ? "active" : ""}`}
              >
                Education
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#projects"
                className={`nav-link ${activeLink === "#projects" ? "active" : ""}`}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contactme"
                className={`nav-link ${activeLink === "#contactme" ? "active" : ""}`}
              >
                Contact Me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
