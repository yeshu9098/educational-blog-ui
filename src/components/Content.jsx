import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Content = ({ filter, setSelectedPost, setViewPost }) => {
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(5);

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(response => {
        const sortedArticles = response.data.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        setArticles(sortedArticles);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  const filteredArticles = filter === 'all' ? articles : articles.filter(article => article.category === filter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
  };

  const truncateText = (text, maxLength) => {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
  };

  const loadMoreArticles = () => {
    setVisibleArticles(prevVisible => prevVisible + 5);
  };

  return (
    <div className="container">
      {filteredArticles.length === 0 ? (
        <div className="text-center mt-4">
          <h5>Content not available</h5>
        </div>
      ) : (
        filteredArticles.slice(0, visibleArticles).map(article => (
          <div key={article._id} className="card mt-4 mb-4 border-0 border-bottom shadow-sm" style={{ backgroundColor: "#fafafa" }}>
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{formatDate(article.date)}</h6>
              <p className="card-text" dangerouslySetInnerHTML={{ __html: truncateText(article.body, 155) }} />
              <Link to="" className="card-link text-dark no-underline" onClick={() => {
                setSelectedPost(article);
                setViewPost(true);
              }}>
                Read More
              </Link>
            </div>
          </div>
        ))
      )}

      {visibleArticles < filteredArticles.length && (
        <div className="text-center mt-3 mb-5">
          <button className="btn btn-link text-dark no-underline" onClick={loadMoreArticles}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default Content;
