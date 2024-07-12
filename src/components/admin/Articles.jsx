import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Error fetching articles. Please try again.');
      }
    };

    fetchArticles();
  }, []);

  const handleArticleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/article/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArticles(articles.filter(article => article._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
      setError('Error deleting article. Please try again.');
    }
  };

  const handleEditArticle = (id) => {
    navigate(`/edit-article/${id}`);
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
            <h1 className="h2">Articles</h1>
            <Link to="/create-article" className="btn btn-success square-button mb-2">Add Article</Link>
          </div>

          {articles.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article._id}>
                    <td><Link className='text-dark no-underline' to={`/${article._id}`}>{article.title}</Link></td>
                    <td>
                      {/* <button className="btn btn-outline-primary btn-sm me-2 square-button" onClick={() => handleEditArticle(article._id)}>Edit</button> */}
                      <button className="btn btn-danger btn-sm square-button" onClick={() => handleArticleDelete(article._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No articles found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Articles;
