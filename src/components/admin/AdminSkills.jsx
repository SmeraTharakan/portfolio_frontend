import React, { useEffect, useState } from "react";
import { getAllSkills, createSkill, updateSkill, deleteSkill } from "../../api/Api";
import AdminNavbar from "./AdminNavBar";
import AdminSidebar from "./AdminSideBar";
import addIcon from "../../assets/add.png";
import binIcon from "../../assets/bin.png";
import editIcon from "../../assets/edit.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPanel.css";

const AdminSkills = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", category: "" });
  const [editingSkill, setEditingSkill] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const skillsData = await getAllSkills();
      setSkills(skillsData);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const toggleAdd = () => {
    setShowAddModal(!showAddModal);
    setNewSkill({ name: "", category: "" });
  };

  const openEditModal = (skill) => {
    setShowEditModal(true);
    setEditingSkill({ ...skill });
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingSkill(null);
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.category) {
      alert("Both name and category are required!");
      return;
    }
    try {
      await createSkill(newSkill);
      setNewSkill({ name: "", category: "" });
      fetchSkills();
      toggleAdd();
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleUpdateSkill = async (e) => {
    e.preventDefault();
    if (!editingSkill.name || !editingSkill.category) {
      alert("Both name and category are required!");
      return;
    }
    try {
      await updateSkill(editingSkill.id, editingSkill);
      fetchSkills();
      closeEditModal();
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await deleteSkill(id);
      fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <div className="admin-panel">
      <AdminNavbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <AdminSidebar isOpen={isOpen} />

      <div className="admin-container">
        <div className="admin-headline">
          <h2>Manage Skills</h2>
          <img src={addIcon} alt="Add" onClick={toggleAdd} style={{ cursor: 'pointer', width: '33px' }} />
        </div>

        {/* Skills List */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Skill Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td>{skill.name}</td>
                <td>{skill.category}</td>
                <td>
                  <img
                    src={editIcon}
                    alt="Edit"
                    onClick={() => openEditModal(skill)}
                    className="icon"
                  />
                  <img
                    src={binIcon}
                    alt="Delete"
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="admin-overlay">
          <div className="add-edit">
            <div onClick={toggleAdd} className="close">&#x2715;</div>
            <h3>Add New Skill</h3>
            <form onSubmit={handleAddSkill} className="add-edit-content">
              <div>
                <label>Skill Name:</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Category:</label>
                <input
                  type="text"
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  required
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

      {/* Edit Skill Modal */}
      {showEditModal && (
        <div className="admin-overlay">
          <div className="add-edit">
            <div onClick={closeEditModal} className="close">&#x2715;</div>
            <h3>Edit Skill</h3>
            <form onSubmit={handleUpdateSkill} className="add-edit-content">
              <div>
                <label>Skill Name:</label>
                <input
                  type="text"
                  value={editingSkill?.name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Category:</label>
                <input
                  type="text"
                  value={editingSkill?.category}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
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

export default AdminSkills;
