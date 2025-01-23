import React from 'react';
import './Home.css'; 
import Profile from '../../assets/profile.jpg';

const Home = () => {
  const skills = {
    "Programming Languages": ["Python", "C", "Java"],
    "Web Development": ["HTML", "CSS", "JavaScript"],
    Databases: ["PostgreSQL"],
    Frameworks: ["Spring Boot", "React"],
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="intro">
          <h1 className="name">Hi, I'm Smera Tharakan</h1>
          <p className="bio">
            Passionate and motivated software developer currently working as an
            Associate Software Developer.
          </p>
        </div>
        <div className="profile">
          <img src={Profile} alt="Profile" className="profile-pic" />
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
