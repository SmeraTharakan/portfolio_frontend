import React, { useEffect, useState } from "react";
import { getUser, updateUser, uploadProfilePicture, deleteProfilePicture } from "../../api/Api";
import AdminNavbar from "./AdminNavBar";
import AdminSidebar from "./AdminSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./AdminPanel.css"; 
import binIcon from "../../assets/bin.png";
import uploadIcon from "../../assets/upload.png";

const AdminAbout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({}); 
  const [uploading, setUploading] = useState(false); 
  const [refresh, setRefresh] = useState(false);

  const userId = "8b9698fc-a489-4251-b644-2560c3a53fac"; 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(userId);
        setUser(response);
        setFormData(response);
      } catch (err) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [refresh]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUser(userId, formData);
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user details");
    }
  };

  const handleUploadProfilePicture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setUploading(true);
    try {
      await uploadProfilePicture(userId, file);
      setRefresh(!refresh);
    } catch (error) {
      alert("Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };
  
  const handleDeleteProfilePicture = async () => {
    if (!user.profilePicture) return;
  
    try {
      await deleteProfilePicture(userId);
      setUser({ ...user, profilePicture: null });
    } catch (error) {
      alert("Failed to delete profile picture");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="admin-panel">
      <AdminNavbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <AdminSidebar isOpen={isOpen} />

      <div className="admin-container">
        <div className="admin-headline">
          <h2>Personal Information</h2>
        </div>

        {/* Profile Picture Section */}
        <div className="text-center">
          {user.profilePicture && (
            <img
              src={`data:image/jpeg;base64,${user.profilePicture}`}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px" }}
            />
          )}

        <div className="icon-group">
        <label htmlFor="fileUpload" className="icon-container">
            <img src={uploadIcon} alt="Upload" className="icon profile" />
        </label>
        <input 
            type="file" 
            id="fileUpload" 
            style={{ display: 'none' }} 
            onChange={handleUploadProfilePicture} 
        />
        <div className="icon-container" onClick={handleDeleteProfilePicture}>
            <img src={binIcon} alt="Delete" className="icon profile" />
        </div>
        </div>

        </div>

        <div className="admin-form-container">
            <div className="edit-profile">
          {!isEditing && (
            <button 
              className="admin-button" 
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
          </div>

          {/* Personal Info Form */}
          <div className="admin-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Bio:</label>
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>LinkedIn:</label>
              <input
                type="text"
                name="linkedinUrl"
                value={formData.linkedinUrl || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>GitHub:</label>
              <input
                type="text"
                name="githubUrl"
                value={formData.githubUrl || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-control"
              />
            </div>

            {isEditing && (
              <div className="d-flex justify-content-between mt-3">
                <button className="admin-button btn-success" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="admin-button btn-danger"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(user);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
