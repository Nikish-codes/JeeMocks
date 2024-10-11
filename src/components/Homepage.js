import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MockTest from './MockTest';
import Result from './Result';
import './Homepage.css';

function Homepage({ questions }) {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState(null);
  const [showTest, setShowTest] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userResponses, setUserResponses] = useState([]);

  const handleTestSelect = (test) => {
    setSelectedTest(test);
    setShowTest(true);
  };

  const handleTestEnd = (testScore, responses) => {
    setScore(testScore);
    setUserResponses(responses);
    setShowTest(false);
    setShowResult(true);
  };

  const handleGoBack = () => {
    setShowResult(false);
    setSelectedTest(null);
  };

  return (
    <div className="homepage-container">
      {!showTest && !showResult && (
        <div className="test-selection">
          <h2>Select a Mock Test</h2>
          {Object.keys(questions).map((test) => (
            <button key={test} onClick={() => handleTestSelect(test)}>
              {test}
            </button>
          ))}
          <button onClick={() => navigate('/question-bank')}>
            Question Bank
          </button>
        </div>
      )}
      {showTest && selectedTest && (
        <MockTest
          questions={questions[selectedTest]}
          onTestEnd={handleTestEnd}
        />
      )}
      {showResult && (
        <Result
          score={score}
          totalQuestions={questions[selectedTest].length}
          userResponses={userResponses}
          questions={questions[selectedTest]}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  );
}

export default Homepage;
