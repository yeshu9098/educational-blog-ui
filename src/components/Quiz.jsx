import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState({});
  const [visibleQuizzes, setVisibleQuizzes] = useState(5);

  useEffect(() => {
    axios.get('http://localhost:8000/quiz/all')
      .then(response => {
        const sortedQuizzes = response.data.quiz.sort((a, b) => new Date(b.date) - new Date(a.date));
        setQuizzes(sortedQuizzes);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  const playQuiz = (quizId, selectedOptionIndex) => {
    axios.post(`http://localhost:8000/quiz/play/${quizId}`, { selectedOptionIndex })
      .then(response => {
        setResults(prevResults => ({
          ...prevResults,
          [quizId]: response.data.isCorrect ? 'Correct!' : 'Incorrect!',
        }));
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const loadMoreQuizzes = () => {
    setVisibleQuizzes(prevVisible => prevVisible + 5);
  };

  return (
    <div>
  {quizzes.slice(0, visibleQuizzes).map(quizItem => (
    <div key={quizItem._id} className="card mt-2 mb-4 p-3">
      <div className="card-body">
        <h5 className="card-title">{quizItem.question}</h5>
        <div>
          {quizItem.options.map((option, index) => (
            <div key={index} className="form-check mb-2">
              <input
                className="me-2"
                type="radio"
                name={`quiz-${quizItem._id}`}
                id={`quiz-${quizItem._id}-option-${index}`}
                onClick={() => playQuiz(quizItem._id, index)}
              />
              <label className="form-check-label" htmlFor={`quiz-${quizItem._id}-option-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
        {results[quizItem._id] && (
          <div className={`mt-3 ${results[quizItem._id] === 'Correct!' ? 'text-success' : 'text-danger'}`}>
            {results[quizItem._id]}
          </div>
        )}
      </div>
    </div>
  ))}
  
  <div className="d-flex justify-content-center">
    {visibleQuizzes < quizzes.length && (
      <button className="btn border-0 text-dark no-underline mt-3 mb-5" onClick={loadMoreQuizzes}>Load More</button>
    )}
  </div>
</div>

  );
};

export default Quiz;
