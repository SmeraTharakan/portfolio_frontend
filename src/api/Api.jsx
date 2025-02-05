import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", 
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUser = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}`);
    console.log("users:",response.data.response);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateUser = async (userId, updatedUser) => {
  try {
    const response = await api.put(`/user/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getAllProjects = async () => {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};

export const getProjectImageById = async (imageId) => {
  try {
    const response = await api.get(`/project-images/${imageId}`, { responseType: "text" });
    return response.data;
  } catch (error) {
    console.error("Error fetching project image by ID:", error);
    throw error;
  }
};

// Project CRUD Operations

export const createProject = async (projectData) => {
  try {
    const response = await api.post("/projects", projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const updateProject = async (projectId, updatedProject) => {
  try {
    const response = await api.put(`/projects/${projectId}`, updatedProject);
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    await api.delete(`/projects/${projectId}`);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// Project Image Operations

// Project Image Operations

export const uploadProjectImage = async (projectId, file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    // Step 1: Upload the image
    const response = await api.post("/project-images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Step 2: Extract imageId from the response
    const { imageId, message } = response.data; // Adjust if the response has a different structure

    // Step 3: Update the project with the new imageId
    await updateProjectImage(projectId, imageId); // Updating the project with the imageId

    return response.data;  // Returning image data
  } catch (error) {
    console.error("Error uploading and updating project image:", error);
    throw error;
  }
};

// Update project image with the new imageId
export const updateProjectImage = async (projectId, imageId) => {
  try {
    const response = await api.put(`projects/${projectId}/update-image`, {
      imageId: imageId, // Can be null to remove image
    });

    return response.data;
  } catch (error) {
    console.error("Error updating project image:", error);
    throw error;
  }
};



export const deleteProjectImage = async (imageId,projectId) => {
  await updateProjectImage(projectId, null); 
  try {
    await api.delete(`/project-images/${imageId}`);
  } catch (error) {
    console.error("Error deleting project image:", error);
    throw error;
  }
};


export const getAllSkills = async () => {
  try {
    const response = await api.get("/skills");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

// Fetch a single skill by ID
export const getSkillById = async (skillId) => {
  try {
    const response = await api.get(`/skills/${skillId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching skill:", error);
    throw error;
  }
};

// Create a new skill
export const createSkill = async (skillData) => {
  try {
    const response = await api.post("/skills", skillData);
    return response.data;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
};

// Update an existing skill
export const updateSkill = async (skillId, updatedSkill) => {
  try {
    const response = await api.put(`/skills/${skillId}`, updatedSkill);
    return response.data;
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
};

// Delete a skill
export const deleteSkill = async (skillId) => {
  try {
    await api.delete(`/skills/${skillId}`);
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
};


export const getAllEducation = async () => {
  try {
    const response = await api.get("/educations");
    return response.data;
  } catch (error) {
    console.error("Error fetching education:", error);
    throw error;
  }
};

// Fetch a single education record by ID
export const getEducationById = async (educationId) => {
  try {
    const response = await api.get(`/educations/${educationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching education record:", error);
    throw error;
  }
};

// Create a new education record
export const createEducation = async (educationData) => {
  try {
    const response = await api.post("/educations", educationData);
    return response.data;
  } catch (error) {
    console.error("Error creating education record:", error);
    throw error;
  }
};

// Update an existing education record
export const updateEducation = async (educationId, updatedEducation) => {
  try {
    const response = await api.put(`/educations/${educationId}`, updatedEducation);
    return response.data;
  } catch (error) {
    console.error("Error updating education record:", error);
    throw error;
  }
};

// Delete an education record by ID
export const deleteEducation = async (educationId) => {
  try {
    await api.delete(`/educations/${educationId}`);
  } catch (error) {
    console.error("Error deleting education record:", error);
    throw error;
  }
};

// Upload Profile Picture
export const uploadProfilePicture = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post(`/user/${userId}/upload-profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};

// Get Profile Picture
export const getProfilePicture = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}/profile`, { responseType: "json" });

    if (response.data.statusCode === 200) {
      console.log("Profile Picture (Base64):", response.data.response);
      return response.data.response; 
    } else {
      console.error("Failed to fetch profile picture:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    throw error;
  }
};

// Delete Profile Picture
export const deleteProfilePicture = async (userId) => {
  try {
    await api.delete(`/user/${userId}/delete-profile`);
  } catch (error) {
    console.error("Error deleting profile picture:", error);
    throw error;
  }
};


export const sendMessage = async (messageData) => {
    try {
      const response = await api.post("/contact", messageData);
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };
  
export const getMessages = async () => {
    try {
      const response = await api.get("/contact");
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  };

  // Fetch all admin users
export const getAllAdminUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin users:", error);
    throw error;
  }
};

// Add a new admin user
export const addAdminUser = async (userData) => {
  try {
    const response = await api.post("/admin/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error adding admin user:", error);
    throw error;
  }
};

// Update an existing admin user
export const updateAdminUser = async (userId, updatedUserData) => {
  try {
    const response = await api.put(`/admin/users/${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    console.error("Error updating admin user:", error);
    throw error;
  }
};


// Delete an admin user by ID
export const deleteAdminUser = async (userId) => {
  try {
    await api.delete(`/admin/users/${userId}`);
  } catch (error) {
    console.error("Error deleting admin user:", error);
    throw error;
  }
};

export const login = async (username, password) => {
    try {
        const response = await api.post("/auth/login", null, {
            params: {
                username: username,
                password: password
            }
        });

        if (response.status === 200 && response.data === "Login successful") {
          localStorage.setItem('auth', 'true');  
          localStorage.setItem('username', username); 

          return { success: true, message: "Login successful" };
      } else {
          return { success: false, message: "Invalid username or password" };
      }
      } catch (error) {
          console.error("Login error: ", error);
          return { success: false, message: "Invalid username or password" };
      }
};


export const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true'; 
};


export const logout = () => {
    localStorage.removeItem('auth');
    window.location.href = "/login"; 
};
export default api;
