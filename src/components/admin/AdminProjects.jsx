import React, { useEffect, useState } from "react";
import { getAllProjects, createProject, updateProject, deleteProject, getProjectImageById, uploadProjectImage, deleteProjectImage} from "../../api/Api";
import AdminNavbar from "./AdminNavBar";
import AdminSidebar from "./AdminSideBar";
import addIcon from "../../assets/add.png";
import editIcon from "../../assets/edit.png";
import binIcon from "../../assets/bin.png";
import uploadIcon from "../../assets/upload.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPanel.css";

const AdminProjects = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [projectsList, setProjectsList] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    brief: "",
    description: "",
    techStack: "",
    repoUrl: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const projectsData = await getAllProjects();

      // Fetch images for each project
      const projectsWithImages = await Promise.all(
        projectsData.map(async (project) => {
          let projectImage = null;
          if (project.imageId) {
            try {
              projectImage = await getProjectImageById(project.imageId);
            } catch (error) {
              console.error(`Error fetching image for project ID ${project.id}:`, error);
            }
          }
          return { ...project, projectImage };
        })
      );

      setProjectsList(projectsWithImages);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const toggleAdd = () => {
    setShowAddModal(!showAddModal);
    setNewProject({
      title: "",
      brief: "",
      description: "",
      techStack: "",
      repoUrl: "",
    });
  };

  const openEditModal = (project) => {
    setShowEditModal(true);
    setEditingProject({ ...project });
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingProject(null);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.brief || !newProject.techStack || !newProject.repoUrl) {
      alert("Please fill all required fields!");
      return;
    }
    try {
      await createProject(newProject);
      fetchProjects();
      toggleAdd();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    if (!editingProject.title || !editingProject.brief || !editingProject.techStack || !editingProject.repoUrl) {
      alert("Please fill all required fields!");
      return;
    }
    try {
      await updateProject(editingProject.id, editingProject);
      fetchProjects();
      closeEditModal();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleUploadImage = async (event, projectId) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      await uploadProjectImage(projectId,file);
      fetchProjects();
    } catch (error) {
      console.error("Error uploading project image:", error);
    }
  };

  const handleDeleteImage = async (imageId,projectId) => {
    try {
      await deleteProjectImage(imageId,projectId);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project image:", error);
    }
  };

  return (
    <div className="admin-panel">
      <AdminNavbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <AdminSidebar isOpen={isOpen} />

      <div className="admin-container">
        <div className="admin-headline">
          <h2>Manage Projects</h2>
          <img
            src={addIcon}
            alt="Add"
            onClick={toggleAdd}
            style={{ cursor: 'pointer', width: '33px' }}
          />
        </div>

        {/* Project List */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Brief</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectsList.map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>
                  {project.projectImage ? (
                    <>
                      <img
                        src={`data:image/jpeg;base64,${project.projectImage}`}
                        alt="Project"
                        className="project-image"
                      />

                      <img
                        src={binIcon}
                        alt="Delete Image"
                        onClick={() => handleDeleteImage(project.imageId,project.id)}
                        className="icon"
                      />
                    </>
                  ) : (
                    "No Image"
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id={`upload-${project.id}`}
                    onChange={(e) => handleUploadImage(e, project.id)}
                  />
                  <label htmlFor={`upload-${project.id}`}>
                    <img
                      src={uploadIcon}
                      alt="Upload"
                      className="icon"
                    />
                  </label>
                </td>
                <td>{project.brief}</td>
                <td>
                <img
                src={editIcon}
                alt="Edit"
                onClick={(e) => {
                    e.stopPropagation(); 
                    openEditModal(project);
                }}
                className="icon"
                />

                  <img
                    src={binIcon}
                    alt="Delete"
                    onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}
                    className="icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="admin-overlay">
          <div className="add-edit">
            <div onClick={toggleAdd} className="close">&#x2715;</div>
            <h3>Add New Project</h3>
            <form onSubmit={handleAddProject} className="add-edit-content">
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Brief:</label>
                <input
                  type="text"
                  value={newProject.brief}
                  onChange={(e) => setNewProject({ ...newProject, brief: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>
              <div>
                <label>Tech Stack:</label>
                <input
                  type="text"
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Repository URL:</label>
                <input
                  type="text"
                  value={newProject.repoUrl}
                  onChange={(e) => setNewProject({ ...newProject, repoUrl: e.target.value })}
                  
                />
              </div>
              <div className="bi-button">
                <button type="submit" className="admin-button">Submit</button>
                <button type="button" className="admin-button" onClick={toggleAdd}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && (
        <div className="admin-overlay">
          <div className="add-edit">
            <div onClick={closeEditModal} className="close">&#x2715;</div>
            <h3>Edit Project</h3>
            <form onSubmit={handleUpdateProject} className="add-edit-content">
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={editingProject?.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Brief:</label>
                <input
                  type="text"
                  value={editingProject?.brief}
                  onChange={(e) => setEditingProject({ ...editingProject, brief: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  value={editingProject?.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                />
              </div>
              <div>
                <label>Tech Stack:</label>
                <input
                  type="text"
                  value={editingProject?.techStack}
                  onChange={(e) => setEditingProject({ ...editingProject, techStack: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Repository URL:</label>
                <input
                  type="text"
                  value={editingProject?.repoUrl}
                  onChange={(e) => setEditingProject({ ...editingProject, repoUrl: e.target.value })}
                  required
                />
              </div>
              <div className="bi-button">
                <button type="submit" className="admin-button">Update</button>
                <button type="button" className="admin-button" onClick={closeEditModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
