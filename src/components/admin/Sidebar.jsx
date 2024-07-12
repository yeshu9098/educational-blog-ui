import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/admin">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/admin/articles">
              Articles
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/admin/quizzes">
              Quizzes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
