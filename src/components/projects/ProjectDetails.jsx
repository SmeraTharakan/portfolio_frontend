import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../api/Api.jsx";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { projectId } = useParams(); // Extract projectId from URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await getProjectById(projectId); // Fetch project by ID
        setProject(projectData);
        console.log("Project data:", projectData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [projectId]); // Re-fetch data if projectId changes

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details-container">
      <h2 className="project-title">{project.title}</h2>
      <p className="project-description">{project.description}</p>
      <p className="project-techstack">Tech Stack: {project.techStack}</p>
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
          View Repository
        </a>
      )}
    </div>
  );
};

export default ProjectDetails;
