import React from 'react';
import './About.css'; // Import CSS file for styling

const About = () => {
  return (
    <div className="about-me">
      <div className="about-me-content">
        <img
          src="../../../img/krishi-blue-pic.jpg"
          alt="Profile"
          className="profile-img"
        />
        <div className="text-container">
          <h2>About Me</h2>
          <p>
            Hi there! I'm Krishi Agrawal, a passionate web developer currently studying at IIIT Gwalior. 
            I have a keen interest in building modern and
            responsive web applications using the latest technologies.
          </p>
          <p>
            My journey in web development started in my first year of college.
            Since then, I have been constantly learning and exploring new
            technologies to improve my skills.
          </p>
          <p>
            I also love to contribute to open-source projects and engage with the
            developer community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
