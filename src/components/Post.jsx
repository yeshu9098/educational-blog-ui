import React from 'react';

const Post = ({ post, onClose }) => {
  return (
    <div className="container">
      <div className="card border-0 border-bottom shadow-sm" style={{ backgroundColor: "#fafafa" }}>
        <div className="card-body">
          <h2 className="card-title text-dark">{post.title}</h2>
          <div className="card-text" dangerouslySetInnerHTML={{ __html: post.body }} />
          <button className="btn btn-link text-dark no-underline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
