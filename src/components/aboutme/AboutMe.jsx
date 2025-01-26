import React, { useEffect, useState } from "react";
import { getUser } from "../../api/Api.jsx";
import "./AboutMe.css"; 

const AboutMe = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 1; 
        const userData = await getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-me-container" id="aboutme">
      <h2>About Me</h2>
      <p>{user.bio}</p>
    </div>
  );
};

export default AboutMe;
