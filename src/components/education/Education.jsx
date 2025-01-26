import React, { useEffect, useState } from "react";
import { getAllEducation } from "../../api/Api.jsx";
import "./Education.css";

const Education = () => {
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const educationData = await getAllEducation();
        setEducations(educationData);
        console.log("Education data:", educationData);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };

    fetchEducationData();
  }, []);

  if (educations.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="education-timeline-container" id="education">
      <h2 className="education-title">Education</h2>
      <div className="timeline">
        {educations.map((education, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-year">
              {education.startYear} - {education.endYear || "Present"}
            </div>
            <div className="timeline-circle"></div>
            <div className="timeline-content">
              <h3 className="timeline-degree">{education.degree}</h3>
              <p className="timeline-institute">{education.institute}</p>
              <p className="timeline-description">
                Percentage : {education.marks}% 
              </p>
            </div>
          </div>
        ))}
        <div className="timeline-line"></div>
      </div>
    </div>
  );
};

export default Education;
