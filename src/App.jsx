import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/projects"
          element={
            <div>
              <h1>Projects Page</h1>
              <p>This is the placeholder for Projects. Add your content here.</p>
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div>
              <h1>Contact Page</h1>
              <p>This is the placeholder for Contact. Add your content here.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
