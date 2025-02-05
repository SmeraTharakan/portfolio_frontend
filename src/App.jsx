import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import AboutMe from "./components/aboutme/AboutMe";
import Education from "./components/education/Education";
import Projects from "./components/projects/Projects";
import ProjectDetails from "./components/projects/ProjectDetails";
import ContactMe from "./components/contact/Contact";
import AdminPanel from "./components/admin/AdminPanel";
import AdminAbout from "./components/admin/AdminAbout";
import AdminSkills from "./components/admin/AdminSkills";
import AdminProjects from "./components/admin/AdminProjects";
import AdminEducation from "./components/admin/AdminEducation";
import AdminNavBar from "./components/admin/AdminNavBar";
import Login from "./components/login/Login"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem("auth");

  return auth === "true" ? children : <Navigate to="/login" replace />;
};

// App component - wrapper for all routes and layout
const App = () => {
  return (
    <Router>
      <RouteWrapper />
    </Router>
  );
};

// RouteWrapper component - conditional rendering of NavBar and AdminNavBar
const RouteWrapper = () => {
  const location = useLocation();

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show NavBar only on home page */}
      {location.pathname === "/" && <NavBar />}
      
      {/* Show AdminNavBar only on admin pages */}
      {isAdminRoute && <AdminNavBar />}

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <section id="home">
                <Home />
              </section>
              <section id="aboutme">
                <AboutMe />
              </section>
              <section id="education">
                <Education />
              </section>
              <section id="projects">
                <Projects />
              </section>
              <section id="contactme">
                <ContactMe />
              </section>
            </div>
          }
        />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/personal-info"
          element={
            <ProtectedRoute>
              <AdminAbout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute>
              <AdminSkills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/education"
          element={
            <ProtectedRoute>
              <AdminEducation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
