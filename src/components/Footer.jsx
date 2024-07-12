import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Footer = ({ setView, setFilter, setSelectedPost, setViewPost }) => {
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/category/jobs')
      .then(response => {
        setJobPosts(response.data.articles);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  const handleQuizClick = () => {
    setView('quiz');
    setFilter('quizzes'); // Assuming 'quizzes' as the filter for quizzes
    setSelectedPost(null);
    setViewPost(false);
  };

  const handleJobClick = (job) => {
    setSelectedPost(job);
    setViewPost(true);
    setView('content');
    setFilter('jobs');
  };

  return (
    <div className="container">
 <div className="card mb-3 mt-4 shadow-sm bg-secondary text-white" style={{ cursor: 'pointer' }} onClick={handleQuizClick}>
        <div className="card-body text-center mt-4 mb-4">
          <div className="quiz-title mb-3">Practice Questions</div>
          <div className="quiz-subtitle mb-2">Test your Knowledge here</div>
          <div className="quiz-subtitle">Click here</div>
        </div>
      </div>
      
      {/* Display job category posts */}
      {jobPosts.length > 0 && (
        <div className="mt-3">
          <h5 className='text-center'>Vacancies or jobs</h5>
          <ul className="list-unstyled text-center">
            {jobPosts.map((job) => (
              <li key={job._id} style={{ padding: '10px 15px' }}>
                <Link
                  href="#"
                  className="text-dark"
                  style={{ textDecoration: 'none', color: '#343a40', fontSize: '15px' }}
                  onMouseEnter={(e) => e.target.style.color = '#007bff'}
                  onMouseLeave={(e) => e.target.style.color = '#343a40'}
                  onClick={() => handleJobClick(job)}
                >
                  {job.title}
                </Link>
                <hr style={{ margin: '5px 0', border: '0', borderTop: '1px solid #ccc' }} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Footer;
