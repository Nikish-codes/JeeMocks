import React, { useState, useEffect, useCallback } from 'react';
import './MockTest.css';

function MockTest({ questions, onTestEnd }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [userResponses, setUserResponses] = useState([]);
  const [markedQuestions, setMarkedQuestions] = useState([]);

  // Move handleTestEnd here (above its first use)
  const handleTestEnd = useCallback(() => {
    const score = userResponses.reduce((acc, response, index) => {
      if (response === questions[index].correct_answer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    onTestEnd(score, userResponses);
  }, [userResponses, questions, onTestEnd]);

  // Use useEffect with handleTestEnd
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      handleTestEnd();  // Now handleTestEnd is defined before being used
    }

    return () => clearInterval(timer);
  }, [timeLeft, handleTestEnd]);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(parseInt(event.target.value, 10));
  };

  const handleNextQuestion = () => {
    setUserResponses(prevResponses => {
      const newResponses = [...prevResponses];
      newResponses[currentQuestion] = selectedAnswer;
      return newResponses;
    });

    setSelectedAnswer(null);
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
  };

  const handleQuestionPaletteClick = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setSelectedAnswer(userResponses[questionIndex]);
  };

  const handleMarkQuestion = () => {
    setMarkedQuestions(prevMarked => {
      if (prevMarked.includes(currentQuestion)) {
        return prevMarked.filter(index => index !== currentQuestion);
      } else {
        return [...prevMarked, currentQuestion];
      }
    });
  };

  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const question = questions[currentQuestion];
  const progressPercentage = (currentQuestion / (questions.length - 1)) * 100;

  return (
    <div className="mock-test-container">
      <div className="question-section">
        <div className="question-count">
          <span>Question {currentQuestion + 1}</span>/{questions.length}
        </div>
        <div className="question-text">{question.question_value.text}</div>
        {question.question_value.img_url && (
          <img src={question.question_value.img_url} alt="Question Illustration" />
        )}
      </div>
      <div className="answer-section">
        {question.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option${index}`}
              name="answer"
              value={index}
              checked={selectedAnswer === index}
              onChange={handleAnswerChange}
            />
            <label htmlFor={`option${index}`}>
              {typeof option === 'object' ? (
                <img src={option.img_url} alt={`Option ${index}`} />
              ) : (
                option
              )}
            </label>
          </div>
        ))}
      </div>
      <div className="navigation-section">
        {currentQuestion > 0 && (
          <button onClick={() => setCurrentQuestion(prevQuestion => prevQuestion - 1)}>
            Previous
          </button>
        )}
        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Next</button>
        ) : (
          <button onClick={handleTestEnd}>Submit</button>
        )}
        <button onClick={handleMarkQuestion}>Mark for Review</button>
      </div>
      <div className="timer-section">
        Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="question-palette">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleQuestionPaletteClick(index)}
            className={`palette-button ${
              userResponses[index] !== undefined ? 'answered' : ''
            } ${markedQuestions.includes(index) ? 'marked' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MockTest;
