import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const { quizQuestions, totalScores } = location.state;
  const numofQuestions = quizQuestions.length;
  const percentage = Math.round((totalScores / numofQuestions) * 100);
  const navigate = useNavigate();
  const handleRetakeQuiz = () => {
    navigate("/quiz-stepper");
  };

  return (
    <section className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Your Quiz Result Summary</h3>
          <hr />
          <div className="text-center mb-4">
            <h5>
              You answered <strong>{totalScores}</strong> out of{" "}
              <strong>{numofQuestions}</strong> questions correctly.
            </h5>
            <p>Your total score is <strong>{percentage}%</strong>.</p>
          </div>

          {/* Progress Bar */}
          <div className="progress mb-4">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${percentage}%` }}
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percentage}%
            </div>
          </div>

          {/* Retake Quiz Button */}
          <div className="text-center">
            <button className="btn btn-primary btn-lg" onClick={handleRetakeQuiz}>
              Retake this Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizResult;
