import React, { useState, useEffect } from 'react';
import './MockTest.css';

function MockTest({ questions, onTestEnd }) {
	
	
	// ... (previous code)

  // ... (other state variables)
  const [markedQuestions, setMarkedQuestions] = useState([]);

  // ... (other functions)

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

  // ... (rest of the component code)

  return (
    <div className="mock-test-container">
      {/* ... (other sections) */}

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

      {/* ... (rest of the component code) */}

      <div className="navigation-section">
        {/* ... (previous buttons) */}
        <button onClick={handleMarkQuestion}>Mark for Review</button>
      </div>

      {/* ... (rest of the component code) */}
    </div>
  );

	
	
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [userResponses, setUserResponses] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      handleTestEnd();
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

  const handleTestEnd = () => {
    // Calculate score and pass responses to parent component
    const score = userResponses.reduce((acc, response, index) => {
      if (response === questions[index].correct_answer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    onTestEnd(score, userResponses);
  };

  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const question = questions[currentQuestion];

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
      </div>
      <div className="timer-section">
        Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
}



export default MockTest;