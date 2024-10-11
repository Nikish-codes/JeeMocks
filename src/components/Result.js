import React from 'react';
import './Result.css';

function Result({ score, totalQuestions, userResponses, questions, onGoBack }) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="result-container">
      <h2>Test Results</h2>
      <div className="score-summary">
        <p>You scored {score} out of {totalQuestions} questions.</p>
        <p>Percentage: {percentage.toFixed(2)}%</p>
      </div>
      <div className="analysis">
        <h3>Detailed Analysis</h3>
        {questions.map((question, index) => (
          <div key={index} className="question-analysis">
            <h4>Question {index + 1}</h4>
            <p>Your Answer: {question.options[userResponses[index]]}</p>
            <p>Correct Answer: {question.options[question.correct_answer]}</p>
            {userResponses[index] !== question.correct_answer && (
              <div className="solution">
                <h5>Solution:</h5>
                <p>{question.solution}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={onGoBack}>Go Back</button>
    </div>
  );
}

export default Result;
