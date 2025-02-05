import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./AdminSideBar.css";

const AdminSideBar = ({ isOpen }) => {
  const location = useLocation(); // Get the current route

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="list-unstyled">
        <li>
          <Link 
            to="/admin" 
            className={`sidebar-link ${location.pathname === "/admin" ? "active" : ""}`}
          >
            Editors
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/personal-info" 
            className={`sidebar-link ${location.pathname === "/admin/personal-info" ? "active" : ""}`}
          >
            Personal Info
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/skills" 
            className={`sidebar-link ${location.pathname === "/admin/skills" ? "active" : ""}`}
          >
            Skills
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/education" 
            className={`sidebar-link ${location.pathname === "/admin/education" ? "active" : ""}`}
          >
            Education
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/projects" 
            className={`sidebar-link ${location.pathname === "/admin/projects" ? "active" : ""}`}
          >
            Projects
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
