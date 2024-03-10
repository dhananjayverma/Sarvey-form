import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Survey.css";

function Survey() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const navigate = useNavigate();
  const questions = JSON.parse(localStorage.getItem("surveyQuestions")) || [
    "How satisfied are you with our products?",
    "How fair are the prices compared to similar retailers?",
    "How satisfied are you with the value for money of your purchase?",
    "On a scale of 1-10 how would you recommend us to your friends and family?",
    "What could we do to improve our service?",
  ];
  const sessionId = localStorage.getItem("sessionId") || generateSessionId();

  useEffect(() => {
    localStorage.setItem("sessionId", sessionId);
  }, [sessionId]);

  function generateSessionId() {
    return Math.random().toString(36).substring(2, 15);
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setConfirmationOpen(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    const updatedResponses = { ...responses };
    updatedResponses[`question${currentQuestionIndex}`] = "Skipped";
    setResponses(updatedResponses);
    handleNext();
  };

  const handleResponseChange = (value) => {
    setResponses({ ...responses, [`question${currentQuestionIndex}`]: value });
  };

  const saveResponses = () => {
    const existingResponses =
      JSON.parse(localStorage.getItem("surveyResponses")) || {};
    localStorage.setItem(
      "surveyResponses",
      JSON.stringify({
        ...existingResponses,
        [sessionId]: { ...responses },
      })
    );
  };

  const handleSubmit = () => {
    saveResponses();
    localStorage.setItem("surveyStatus", "COMPLETED");
    navigate("/thank-you");
  };

  const handleConfirmation = (confirmed) => {
    setConfirmationOpen(false);
    if (confirmed) {
      handleSubmit();
    }
  };

  return (
    <div className="survey-container">
      <h2>
        Question {currentQuestionIndex + 1} / {questions.length}
      </h2>
      <h3>{questions[currentQuestionIndex]}</h3>
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            className={`rating-button ${
              responses[`question${currentQuestionIndex}`] === rating
                ? "selected"
                : ""
            }`}
            onClick={() => handleResponseChange(rating)}
          >
            {rating}
          </button>
        ))}
      </div>
      <div className="nav-buttons">
        <button onClick={handlePrevious} className="nav-button previous-button">
          Previous
        </button>
        <button onClick={handleSkip} className="nav-button skip-button">
          Skip
        </button>
        <button onClick={handleNext} className="nav-button next-button">
          {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
      {confirmationOpen && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to submit the survey?</p>
          <button onClick={() => handleConfirmation(false)}>Cancel</button>
          <button onClick={() => handleConfirmation(true)}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default Survey;
