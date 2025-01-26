import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { getAllProjects } from "../../api/Api.jsx";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const projectData = await getAllProjects();
        setProjects(projectData);
        console.log("Projects data:", projectData);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };

    fetchProjectsData();
  }, []);

  const handleCardClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };
  

  if (projects.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="projects-container" id="projects">
      <h2 className="projects-title">My Projects</h2>
      <div className="projects-cards-container">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => handleCardClick(project.id)} // Click to navigate to the project details page
          >
            <h3 className="project-title">{project.title}</h3>
            <p className="project-brief">{project.brief}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
