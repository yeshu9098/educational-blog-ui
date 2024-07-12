import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      
      if (response.data.token) {
        // Store the token in local storage
        localStorage.setItem('token', response.data.token);
        
        // Redirect or handle successful login
        // Example: redirect to dashboard or load user data
        navigate('/admin'); // Assuming you are using React Router
      } else {
        setErrorMessage(response.data); // Handle other error responses
        console.log('Login Failed:', response.data);
      }
      
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error during login. Please try again.');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center" style={{ minHeight: '100vh', backgroundColor: "#fafafa" }}>

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-6 col-md-5 col-lg-4">
          <div className="">
            <Link to="/register" className="text-dark text-decoration-none">Register</Link> | <Link to="/" className="text-dark text-decoration-none">Home</Link>
            <h2>Login</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
