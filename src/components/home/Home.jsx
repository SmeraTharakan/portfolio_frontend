import React, { useEffect, useState } from "react";
import "./Home.css";
import { Typewriter } from "react-simple-typewriter";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { getUser, getProfilePicture } from "../../api/Api.jsx";
import resume from '../../assets/smera_tharakan_resume.pdf'
import defaultimg from '../../assets/profile_nobg.png'

const Home = () => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    setTypedText("Associate Software Developer");
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = "8b9698fc-a489-4251-b644-2560c3a53fac"; 
        const userData = await getUser(userId);
        setUser(userData);

        const picture = await getProfilePicture(userId);
        setProfilePicture(picture);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user || !profilePicture) {
    return <div>Loading...</div>;
  }

  return (
    <div id="home" className="home-container">
      <div className="home-text">
        <h1 className="greeting">
          Hi, I'm <span className="name">{user.name}</span>
        </h1>
        <h2 className="role">
          <Typewriter words={["Associate Software Developer"]} loop={0} cursor color="#28a745" />
        </h2>
        <p className="intro">
          I am an Associate Software Developer currently working with Tarento Technologies, focusing on building scalable and efficient software solutions.
        </p>
        <div className="social-icons">
          <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href={user.githubUrl} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
            <FaEnvelope />
          </a>
        </div>
        <a href={resume} className="resume-link">
          Download Resume
        </a>
      </div>
      <div className="home-image">
      <img
  src={profilePicture ? `data:image/jpeg;base64,${profilePicture}` : defaultimg}
  onError={(e) => { e.target.src = defaultimg; }} 
  alt="Smera Tharakan"
  className="profile-img"
/>

      </div>
    </div>
  );
};

export default Home;
