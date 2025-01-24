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
    console.log(response.data);
    return response.data;
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

export const getAllProjectImages = async () => {
  try {
    const response = await api.get("/project-images");
    return response.data;
  } catch (error) {
    console.error("Error fetching project images:", error);
    throw error;
  }
};

export const getProjectImageById = async (imageId) => {
  try {
    const response = await api.get(`/project-images/${imageId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project image by ID:", error);
    throw error;
  }
};

export const getAllSkills = async () => {
  try {
    const response = await api.get("/skills");
    return response.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

export const getAllEducation = async () => {
  try {
    const response = await api.get("/education");
    return response.data;
  } catch (error) {
    console.error("Error fetching education:", error);
    throw error;
  }
};

export const getProfilePicture = async (userId) => {
    try {
      const response = await api.get(`/user/${userId}/profile`, { responseType: 'arraybuffer' });
      const base64ProfilePicture = Buffer.from(response.data, 'binary').toString('base64');
      console.log(base64ProfilePicture);
      return `data:image/jpeg;base64,${base64ProfilePicture}`;
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      throw error;
    }
  };
export default api;
