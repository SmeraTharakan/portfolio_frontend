import React, { useEffect, useState } from "react";
import { getUser, getAllSkills } from "../../api/Api.jsx";
import "./AboutMe.css";

const AboutMe = () => {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState({}); // Object to store skills grouped by category

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 1;
        const userData = await getUser(userId);
        setUser(userData);
        console.log("users", user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchSkillsData = async () => {
      try {
        const skillsData = await getAllSkills();
        // Group skills by category
        const groupedSkills = skillsData.reduce((acc, skill) => {
          if (!acc[skill.category]) {
            acc[skill.category] = [];
          }
          acc[skill.category].push(skill.name);
          return acc;
        }, {});
        setSkills(groupedSkills);
        console.log("skills", groupedSkills);
      } catch (error) {
        console.error("Error fetching skills data:", error);
      }
    };

    fetchUserData();
    fetchSkillsData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-me-container" id="aboutme">
      <h2 className="about-me-title">About Me</h2>
      <div className="about-me-content">
        {/* Left Side: Profile Summary */}
        <div className="about-me-left">
          <h3 className="about-me-heading">Profile Summary</h3>
          <p className="profile-summary">{user.bio}</p>
        </div>

        {/* Right Side: Skills */}
        <div className="about-me-right">
          <h3 className="about-me-heading">Skills</h3>
          <div className="skills-container">
            {Object.entries(skills).map(([category, skillNames], index) => (
              <div key={index} className="skill-category">
                <h4 className="skill-category-name">{category}</h4>
                <div className="skill-cards">
                  {skillNames.map((name, i) => (
                    <div key={i} className="skill-card">
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
