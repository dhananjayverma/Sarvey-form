// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./component/WelcomeScreen";
import Survey from "./component/Survey";
import ThankYouScreen from "./component/ThankYouScreen";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/thank-you" element={<ThankYouScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
