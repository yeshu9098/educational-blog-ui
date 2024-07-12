import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Logout';

const TopNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <Link className="navbar-brand me-auto" to="/">Himachal <span style={{ color: 'green' }}>Academia</span></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Logout />
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default TopNav;
