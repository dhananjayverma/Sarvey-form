// WelcomeScreen.js

import React from "react";
import { Link } from "react-router-dom";
import "./WelcomeScreen.css"; // Import CSS file

function WelcomeScreen() {
  return (
    <div className="welcome-container">
      <h1>Welcome to Our Survey</h1>
      <Link to="/survey">
        <button className="start-button">Start Survey</button>
      </Link>
    </div>
  );
}

export default WelcomeScreen;
