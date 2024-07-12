import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/quiz/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizzes(response.data.quiz);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError('Error fetching quizzes. Please try again.');
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/quiz/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizzes(quizzes.filter(quiz => quiz._id !== id));
    } catch (error) {
      console.error('Error deleting quiz:', error);
      setError('Error deleting quiz. Please try again.');
    }
  };

  const handleEditQuiz = (id) => {
    navigate(`/edit-quiz/${id}`);
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="container-fluid">
      <TopNav />
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Quizzes</h1>
            <Link to="/create-quiz" className="btn btn-success mb-2 square-button">Add Quiz</Link>
          </div>

          {quizzes.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz._id}>
                    <td><Link className='text-dark no-underline' to={`/quiz/${quiz._id}`}>{quiz.question}</Link></td>
                    <td>
                      {/* <button className="btn btn-outline-primary btn-sm me-2 square-button" onClick={() => handleEditQuiz(quiz._id)}>Edit</button> */}
                      <button className="btn btn-danger btn-sm square-button" onClick={() => handleQuizDelete(quiz._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No quizzes found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Quizzes;
