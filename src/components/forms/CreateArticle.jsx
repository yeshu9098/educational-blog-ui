import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RichTextEditor from './RichTextEditor'
import 'react-quill/dist/quill.snow.css'; // import styles

// Component using react-quill for rich text editing
const CreateArticle = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/article', { title, body, category }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Article created:', response.data);
      navigate('/admin'); // Redirect to admin page after successful creation
    } catch (error) {
      console.error('Error creating article:', error);
      setError('Failed to create article. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Body:</label>
          <RichTextEditor value={body} onChange={setBody} />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category:</label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="articles">Articles</option>
            <option value="currentaffairs">Current Affairs</option>
            <option value="jobs">Jobs</option>
            <option value="hpgk">HP GK</option>
            <option value="syllabus">Syllabus</option>
            <option value="hasmains">HAS Mains</option>
          </select>
        </div>
        <button type="submit" className="btn btn-dark">Create Article</button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateArticle;
