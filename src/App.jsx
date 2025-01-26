import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import AboutMe from "./components/aboutme/AboutMe";
import Education from "./components/education/Education";
import Projects from "./components/projects/Projects";
import ProjectDetails from "./components/projects/ProjectDetails";
import ContactMe from "./components/contact/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Main page with all sections */}
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
        {/* Separate route for Project Details */}
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
