import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ setFilter, setView, resetPostView }) => {
  const handleFilterClick = (filter) => {
    setFilter(filter);
    setView('content');
    resetPostView();
  };

  return (
    <div className="nav-container vh-100 d-flex flex-column bg-ligh">
      {/* Show only on large screens */}
      <div className="text-center py-3 d-none d-lg-block">
        <Link className='text-dark no-underline' to="/"><h3 style={{ fontWeight: 'bold' }}>Himachal <span style={{ color: 'green' }}>Academia</span></h3></Link>
      </div>

      <div className="nav flex-column nav-pills text-center">
        {['all', 'currentaffairs', 'jobs', 'hpgk', 'syllabus'].map((filter) => (
          <button key={filter} className="nav-link btn btn-link text-dark" onClick={() => handleFilterClick(filter)}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
        <Link className="nav-link btn btn-link text-dark" onClick={() => setView('quiz')}>Quiz</Link>
        <Link className="nav-link btn btn-link text-dark" onClick={() => setView('about')}>About Us</Link>
        {/* <Link className="nav-link btn btn-link text-dark" to="/login">Login</Link>
        <Link className="nav-link btn btn-link text-dark" to="/admin">Admin</Link> */}
      </div>
    </div>
  );
};

export default Nav;
