import React, { useEffect, useState } from "react";
import { getAllEducation, createEducation, updateEducation, deleteEducation } from "../../api/Api";
import AdminNavbar from "./AdminNavBar";
import AdminSidebar from "./AdminSideBar";
import addIcon from "../../assets/add.png";
import binIcon from "../../assets/bin.png";
import editIcon from "../../assets/edit.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPanel.css";

const AdminEducation = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [educationList, setEducationList] = useState([]);
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institute: "",
    startYear: "",
    endYear: "",
    marks: "",
  });
  const [editingEducation, setEditingEducation] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const educationData = await getAllEducation();
      setEducationList(educationData);
    } catch (error) {
      console.error("Error fetching education:", error);
    }
  };

  const toggleAdd = () => {
    setShowAddModal(!showAddModal);
    setNewEducation({ degree: "", institute: "", startYear: "", endYear: "", marks: "" });
  };

  const openEditModal = (education) => {
    setShowEditModal(true);
    setEditingEducation({ ...education });
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingEducation(null);
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    if (!newEducation.degree || !newEducation.institute || !newEducation.startYear || !newEducation.marks) {
      alert("Please fill all required fields!");
      return;
    }
    try {
      await createEducation(newEducation);
      setNewEducation({ degree: "", institute: "", startYear: "", endYear: "", marks: "" });
      fetchEducation();
      toggleAdd();
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  const handleUpdateEducation = async (e) => {
    e.preventDefault();
    if (!editingEducation.degree || !editingEducation.institute || !editingEducation.startYear || !editingEducation.marks) {
      alert("Please fill all required fields!");
      return;
    }
    try {
      await updateEducation(editingEducation.id, editingEducation);
      fetchEducation();
      closeEditModal();
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  const handleDeleteEducation = async (id) => {
    try {
      await deleteEducation(id);
      fetchEducation();
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  return (
    <div className="admin-panel">
      <AdminNavbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <AdminSidebar isOpen={isOpen} />

      <div className="admin-container">
        <div className="admin-headline">
          <h2>Manage Education</h2>
          <img src={addIcon} alt="Add" onClick={toggleAdd} style={{ cursor: 'pointer', width: '33px' }} />
        </div>

        {/* Education List */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Degree</th>
              <th>Institute</th>
              <th>Start Year</th>
              <th>End Year</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {educationList.map((education) => (
              <tr key={education.id}>
                <td>{education.degree}</td>
                <td>{education.institute}</td>
                <td>{education.startYear}</td>
                <td>{education.endYear || "Present"}</td>
                <td>{education.marks}</td>
                <td>
                  <img
                    src={editIcon}
                    alt="Edit"
                    onClick={() => openEditModal(education)}
                    className="icon"
                  />
                  <img
                    src={binIcon}
                    alt="Delete"
                    onClick={() => handleDeleteEducation(education.id)}
                    className="icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Education Modal */}
      {showAddModal && (
        <div className="admin-overlay">
          <div className="add-edit">
            <div onClick={toggleAdd} className="close">&#x2715;</div>
            <h3>Add New Education</h3>
            <form onSubmit={handleAddEducation} className="add-edit-content">
              <div>
                <label>Degree:</label>
                <input
                  type="text"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Institute:</label>
                <input
                  type="text"
                  value={newEducation.institute}
                  onChange={(e) => setNewEducation({ ...newEducation, institute: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Start Year:</label>
                <input
                  type="number"
                  value={newEducation.startYear}
                  onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>End Year:</label>
                <input
                  type="number"
                  value={newEducation.endYear}
                  onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
                />
              </div>
              <div>
                <label>Marks:</label>
                <input
                  type="number"
                  value={newEducation.marks}
                  onChange={(e) => setNewEducation({ ...newEducation, marks: e.target.value })}
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

      {/* Edit Education Modal */}
      {showEditModal && (
        <div className="admin-overlay">
          <div className="add-edit">
            <div onClick={closeEditModal} className="close">&#x2715;</div>
            <h3>Edit Education</h3>
            <form onSubmit={handleUpdateEducation} className="add-edit-content">
              <div>
                <label>Degree:</label>
                <input
                  type="text"
                  value={editingEducation?.degree}
                  onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Institute:</label>
                <input
                  type="text"
                  value={editingEducation?.institute}
                  onChange={(e) => setEditingEducation({ ...editingEducation, institute: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Start Year:</label>
                <input
                  type="number"
                  value={editingEducation?.startYear}
                  onChange={(e) => setEditingEducation({ ...editingEducation, startYear: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>End Year:</label>
                <input
                  type="number"
                  value={editingEducation?.endYear}
                  onChange={(e) => setEditingEducation({ ...editingEducation, endYear: e.target.value })}
                />
              </div>
              <div>
                <label>Marks:</label>
                <input
                  type="number"
                  value={editingEducation?.marks}
                  onChange={(e) => setEditingEducation({ ...editingEducation, marks: e.target.value })}
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

export default AdminEducation;
