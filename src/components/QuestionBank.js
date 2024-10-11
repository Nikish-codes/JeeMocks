import React, { useState, useEffect } from 'react';
import './QuestionBank.css';

function QuestionBank({ questions }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const filtered = Object.values(questions)
      .flat()
      .filter(question => {
        if (selectedSubject && question.subject !== selectedSubject) {
          return false;
        }
        if (selectedTopic && question.topic !== selectedTopic) {
          return false;
        }
        return true;
      });
    setFilteredQuestions(filtered);
  }, [questions, selectedSubject, selectedTopic]);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedTopic(null); // Reset topic when subject changes
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <div className="question-bank-container">
      <h2>Question Bank</h2>
      <div className="filters">
        <div>
          <label htmlFor="subject">Subject:</label>
          <select id="subject" value={selectedSubject || ''} onChange={handleSubjectChange}>
            <option value="">All</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
          </select>
        </div>
        <div>
          <label htmlFor="topic">Topic:</label>
          <select id="topic" value={selectedTopic || ''} onChange={handleTopicChange}>
            <option value="">All</option>
            {selectedSubject === 'Physics' && (
              <>
                <option value="Mechanics">Mechanics</option>
                <option value="Thermodynamics">Thermodynamics</option>
              </>
            )}
            {selectedSubject === 'Chemistry' && (
              <>
                <option value="Organic Chemistry">Organic Chemistry</option>
                <option value="Inorganic Chemistry">Inorganic Chemistry</option>
              </>
            )}
            {selectedSubject === 'Mathematics' && (
              <>
                <option value="Calculus">Calculus</option>
                <option value="Algebra">Algebra</option>
              </>
            )}
          </select>
        </div>
      </div>
      <div className="question-list">
        {filteredQuestions.map((question, index) => (
          <div key={index} className="question-item">
            <div className="question-header">
              <span className="question-number">Question {question.question_number}</span>
              <span className="question-subject">{question.subject}</span>
            </div>
            <div className="question-text">{question.question_value.text}</div>
            {question.question_value.img_url && (
              <img src={question.question_value.img_url} alt="Question Illustration" />
            )}
            <details>
              <summary>View Solution</summary>
              <div className="solution">{question.solution}</div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionBank;
