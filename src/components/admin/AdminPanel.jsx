import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavBar";
import AdminSidebar from "./AdminSideBar";
import { getAllAdminUsers, addAdminUser, deleteAdminUser, updateAdminUser } from "../../api/Api";
import binIcon from "../../assets/bin.png";
import editIcon from "../../assets/edit.png";
import addIcon from "../../assets/add.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./AdminPanel.css";

const AdminPanel = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [adminUsers, setAdminUsers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [editUserId, setEditUserId] = useState(null);
    const [refresh, setRefresh] = useState(false);
  
    useEffect(() => {
      fetchAdminUsers();
    }, [refresh]);
  
    const fetchAdminUsers = async () => {
      try {
        const users = await getAllAdminUsers();
        setAdminUsers(users);
      } catch (error) {
        console.error("Error fetching admin users:", error);
      }
    };
  
    const toggleAdd = () => {
      setShowAddModal(!showAddModal);
      setUsername('');
      setEmail('');
      setPassword('');
    };
  
    const openEditModal = (user) => {
      setShowEditModal(true);
      setUsername(user.username);
      setEditUserId(user.id);
      setEmail(user.email);
      setPassword('');
    };
  
    const closeEditModal = () => {
      setShowEditModal(false);
      setUsername('');
      setEmail('');
      setPassword('');
      setEditUserId(null);
    };
  
    const handleAddUser = async (e) => {
      e.preventDefault();
      const newUserData = { username, email, password };
    
      try {
        await addAdminUser(newUserData);
        setRefresh(!refresh);
        toggleAdd();
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data); // Show backend error message in an alert
        } else {
          console.error("Error adding admin user:", error);
        }
      }
    };
    
  
    const handleEditUser = async (e) => {
      e.preventDefault();
      if (!editUserId) return;
  
      const updatedUserData = { username, email, password };
      try {
        await updateAdminUser(editUserId, updatedUserData);
        setRefresh(!refresh);
        closeEditModal();
      } catch (error) {
        console.error("Error updating admin user:", error);
      }
    };
  
    const handleDeleteUser = async (userId) => {
      try {
        await deleteAdminUser(userId);
        setRefresh(!refresh);
      } catch (error) {
        console.error("Error deleting admin user:", error);
      }
    };
  
    return (
      <div className="admin-panel">
        <AdminNavbar toggleSidebar={() => setIsOpen(!isOpen)} />
        <AdminSidebar isOpen={isOpen} />
  
        <div className="admin-container">
          <div className="admin-headline">
            <h2>Admin Users</h2>
            <img src={addIcon} alt="Add" onClick={toggleAdd} style={{ cursor: 'pointer', width: '33px' }} />
          </div>
  
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <img
                      src={editIcon}
                      alt="Edit"
                      onClick={() => openEditModal(user)}
                      className="icon"
                    />
                    <img
                      src={binIcon}
                      alt="Delete"
                      onClick={() => handleDeleteUser(user.id)}
                      className="icon"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Add Admin Modal */}
        {showAddModal && (
          <div className="admin-overlay">
            <div className="add-edit">
              <div onClick={toggleAdd} className="close">&#x2715;</div>
              <h3>Add New Admin</h3>
              <form onSubmit={handleAddUser} className="add-edit-content">
                <div>
                  <label>Username:</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label>Password:</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="bi-button">
                  <button type="submit" className="admin-button">Submit</button>
                  <button type="button" className="admin-button" onClick={toggleAdd}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
  
        {/* Edit Admin Modal */}
        {showEditModal && (
          <div className="admin-overlay">
            <div className="add-edit">
              <div onClick={closeEditModal} className="close">&#x2715;</div>
              <h3>Edit Admin User</h3>
              <form onSubmit={handleEditUser} className="add-edit-content">
                <div>
                  <label>Username:</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label>Password :</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
  
  export default AdminPanel;
  
