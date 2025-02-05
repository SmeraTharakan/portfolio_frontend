import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/Api.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./AdminNavBar.css"

const AdminNavBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Left section with Hamburger Icon and Admin Panel title */}
        <div className="navbar-left">
          <button className="btn hamburger-icon" onClick={toggleSidebar}>
            ☰
          </button>
          <h3 className="navbar-title">Admin Panel</h3>
        </div>

        {/* Right section with Logout and Portfolio buttons */}
        <div className="navbar-right">
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
          <Link to="/" className="btn btn-primary ms-2">Portfolio</Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
