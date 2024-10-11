// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import QuestionBank from './components/QuestionBank';
import { loadQuestions } from './utils/questionLoader';
import './App.css';

function App() {
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const loadedQuestions = await loadQuestions();
      setQuestions(loadedQuestions);
    };

    fetchQuestions();
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app-container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/question-bank">Question Bank</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Homepage questions={questions} />} />
          <Route path="/question-bank" element={<QuestionBank questions={questions} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
