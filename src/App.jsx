import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import AboutMe from "./components/aboutme/AboutMe";
import Education from "./components/education/Education";
import Projects from "./components/projects/Projects";
import ProjectDetails from "./components/projects/ProjectDetails";
import ContactMe from "./components/contact/Contact";
import AdminPanel from "./components/admin/AdminPanel";
import Login from "./components/login/Login"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// App component - wrapper for all routes and layout
const App = () => {
  return (
    <Router>
      <RouteWrapper />
    </Router>
  );
};

// RouteWrapper component - conditional rendering of NavBar
const RouteWrapper = () => {
  const location = useLocation();

  return (
    <>
      {/* Render NavBar only on Home page */}
      {location.pathname === "/" && <NavBar />}
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
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
