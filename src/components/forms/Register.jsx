import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/signup', { username, email, password });

      if (response.data.message === 'User already exists!!!') {
        setErrorMessage('User already exists!!!');
      } else {
        setSuccessMessage('User registered successfully!');
        setErrorMessage('');
        // Optionally redirect to login page or another page
        navigate('/login'); // Assuming you have a login route
      }
    } catch (error) {
      console.error('Error during signup:', error.response ? error.response.data : error.message);  // Log the actual error response
      setErrorMessage(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Error during signup. Please try again.');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center" style={{ minHeight: '100vh', backgroundColor: "#fafafa" }}>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-5 col-lg-4">
            <div className="">
              <Link to="/login" className='text-dark text-decoration-none'>Login</Link> | <Link to="/" className='text-dark text-decoration-none'>Home</Link>
              <h2>Register</h2>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="my-2">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-sm my-2"
                    value={email}
                    style={{ borderRadius: '0' }}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username" className="my-2">Username:</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control form-control-sm my-2"
                    value={username}
                    style={{ borderRadius: '0' }}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="my-2">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-sm my-2"
                    value={password}
                    style={{ borderRadius: '0' }}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark btn-block my-2" style={{ borderRadius: '0' }}>
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
