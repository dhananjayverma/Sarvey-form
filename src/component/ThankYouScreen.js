// ThankYouScreen.js

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYouScreen.css"; // Import CSS file

function ThankYouScreen() {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thank-you-container">
      <h1>Thank You for Completing the Survey</h1>
      <p>Go to the  Welcome Screen...</p>
    </div>
  );
}

export default ThankYouScreen;
