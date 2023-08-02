// src/components/LeftMenuBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LeftMenuBar.css'; // Import the CSS file

const LeftMenuBar = () => {
  return (
    <div className="left-menu-bar">
      <div className="menu-item">
        <Link to="/create-quiz">Create Quiz</Link>
      </div>
      <div className="menu-item">
        <Link to="/join-quiz">Join Quiz</Link>
      </div>
      <div className="menu-item">
        <Link to="/show-dashboard">Show Dashboard</Link>
      </div>
    </div>
  );
};

export default LeftMenuBar;
