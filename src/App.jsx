import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import AboutMe from "./components/aboutme/AboutMe";
import Skills from "./components/skills/Skills"; // Assuming you have Skills component
import Education from "./components/education/Education"; // Assuming you have Education component
import Projects from "./components/projects/Projects"; // Assuming you have Projects component
import ContactMe from "./components/contact/Contact"; // Assuming you have ContactMe component
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <section id="home">
          <Home />
        </section>
        <section id="aboutme">
          <AboutMe />
        </section>
        <section id="skills">
          <Skills />
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
    </Router>
  );
}

export default App;
