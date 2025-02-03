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

export const getAllEducation = async () => {
  try {
    const response = await api.get("/educations");
    return response.data;
  } catch (error) {
    console.error("Error fetching education:", error);
    throw error;
  }
};

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
export default api;
