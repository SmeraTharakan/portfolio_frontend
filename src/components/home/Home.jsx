import React, { useEffect, useState } from 'react';
import './Home.css'; 
import { getUser, getProfilePicture } from '../../api/Api.jsx'; 
import defaultProfile from '../../assets/profile.jpg'; 

const Home = () => {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState({});
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 1; // Hardcoded for now, replace with dynamic ID if needed
        const userData = await getUser(userId);
        setUser(userData);

        // Fetch the profile picture after user data
        const picture = await getProfilePicture(userId);
        setProfilePicture(picture); // Set the profile picture

        setSkills({
          "Programming Languages": userData.programmingLanguages || [],
          "Web Development": userData.webDevelopment || [],
          Databases: userData.databases || [],
          Frameworks: userData.frameworks || [],
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="home-page">
      <header className="header">
        <div className="intro">
          <h1 className="name">Hi, I'm {user?.name || 'Loading...'}</h1>
          <p className="bio">
            {user?.bio ||
              'Passionate and motivated software developer currently working as an Associate Software Developer.'}
          </p>
        </div>
        <div className="profile">
          <img
            src={profilePicture ? `data:image/jpeg;base64,${profilePicture}` : defaultProfile}
            alt="Profile"
            className="profile-pic"
          />
        </div>
      </header>

      <section className="skills-section">
        <h2>Skills</h2>
        <div className="skills">
          {Object.keys(skills).map((category) => (
            <div key={category} className="skills-card">
              <h3 className="skills-category-title">{category}</h3>
              <ul className="skills-list">
                {skills[category].map((skill) => (
                  <li key={skill} className="skill-item">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
