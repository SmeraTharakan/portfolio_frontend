import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, getProjectImageById } from "../../api/Api.jsx";
import "./ProjectDetails.css";
import NavBar from "../navbar/NavBar";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [projectImage, setProjectImage] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await getProjectById(projectId);
        setProject(projectData);

        if (projectData.imageId) {
          const imageData = await getProjectImageById(projectData.imageId);
          setProjectImage(imageData);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const formatDescription = (description) => {
    return description.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div>
    <NavBar hideRightItems={true} />
    <div className="project-details-container">
      <h2 className="projectd-title">{project.title}</h2>

      <div className="project-main-content">
        <div className="project-description-container">
          <div className="project-description">
            {formatDescription(project.description)}
          </div>
        </div>

        {projectImage && (
          <div className="project-image-container">
            <img
              src={`data:image/jpeg;base64,${projectImage}`}
              alt="Project"
              className="project-image"
            />
          </div>
        )}
      </div>

      <h3 className="tech-stack-title">Technologies and Tools Used</h3>
      <div className="project-tech-cards-container">
        {project.techStack.split(",").map((tech, index) => (
          <div key={index} className="tech-card">
            <h3>{tech.trim()}</h3>
          </div>
        ))}
      </div>

      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-repo-link">
          View Repository
        </a>
      )}
    </div>
    </div>
  );
};

export default ProjectDetails;
