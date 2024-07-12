import React, { useState } from 'react';
import Nav from './Nav';
import Content from './Content';
import Footer from './Footer';
import Quiz from './Quiz';
import About from './About';
import Post from './Post';
import { Link } from 'react-router-dom';

const Home = () => {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('content');
  const [selectedPost, setSelectedPost] = useState(null);
  const [viewPost, setViewPost] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const resetPostView = () => {
    setSelectedPost(null);
    setViewPost(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFilterClick = (filter) => {
    setFilter(filter);
    setView('content');
    resetPostView();
    setDropdownOpen(false); // Close the dropdown after selecting a filter
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Navigation */}
        <div className="col-lg-2 col-md-12 p-0 d-none d-lg-block" style={{ backgroundColor: "#e6e8f5"}}>
          <Nav setFilter={setFilter} setView={setView} resetPostView={resetPostView} />
        </div>

        {/* Content */}
        <div className="col-lg-7 col-md-12 p-0" style={{ backgroundColor: "#fafafa" }}>
          <div className="container-fluid">
            {/* Navbar for small screens */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-lg-none">
              <div className="container-fluid">
                <div className="text-center">
                  <Link className="navbar-brand" to="#">Himachal <span style={{ color: 'green' }}>Academia</span></Link>
                </div>
                <button 
                  className="navbar-toggler" 
                  type="button" 
                  onClick={toggleDropdown}
                  style={{ border: 'none' }} // Remove border from dropdown button
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                {/* Dropdown menu */}
                <div className={`collapse navbar-collapse ${dropdownOpen ? 'show d-flex justify-content-center' : ''}`}>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {['all', 'currentaffairs', 'jobs', 'hpgk', 'syllabus'].map((filter) => (
                      <li key={filter} className="nav-item">
                        <button className="nav-link btn btn-link text-dark" onClick={() => handleFilterClick(filter)}>
                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                      </li>
                    ))}
                    <li className="nav-item">
                      <button className="nav-link btn btn-link text-dark" onClick={() => setView('quiz')}>Quiz</button>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link btn btn-link text-dark" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link btn btn-link text-dark" to="/admin">Admin</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            {/* Main content */}
            <main className="p-0 mt-4">
              {view === 'content' && !viewPost && (
                <Content filter={filter} setSelectedPost={setSelectedPost} setViewPost={setViewPost} />
              )}
              {viewPost && <Post post={selectedPost} onClose={() => setViewPost(false)} />}
              {view === 'quiz' && <Quiz />}
              {view === 'about' && <About />}
            </main>
          </div>
        </div>

        {/* Footer */}
        <div className="col-lg-3 col-md-12 p-0" style={{ backgroundColor: "#fafafa" }}>
          <Footer setView={setView} setFilter={() => setFilter('jobs')} setSelectedPost={setSelectedPost} setViewPost={setViewPost} />
        </div>
      </div>
    </div>
  );
};

export default Home;
