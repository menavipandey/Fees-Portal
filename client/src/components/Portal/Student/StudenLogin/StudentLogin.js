import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const navigate = useNavigate();

  
// This handles the login logic in your React frontend
const handleLogin = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const { token } = await response.json();
    localStorage.setItem('token', token); // Store the JWT token in localStorage for future requests
    localStorage.setItem('email', username);
    // Redirect to student home upon successful login
    navigate('/Student/Home');
  } catch (error) {
    console.error('Login error:', error.message);
    setErrorVisible(true);
  }
};

  const handleCloseModal = () => {
    setSuccessVisible(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="loginDiv">
      <h1>Login</h1>
      <div className="inputField">
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-invalid={username ? 'false' : 'true'}
        />
        <label>Email or Username</label>
      </div>
      <div className="inputField">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={password ? 'false' : 'true'}
        />
        <label>Password</label>
      </div>
      <div className={`error ${errorVisible ? 'visible' : ''}`} aria-errormessage="Invalid username or password." id="error">
        <p>You have entered an invalid username or password.</p>
      </div>
      <button className="login" onClick={handleLogin}>Login</button>

      <div id="success" className={`modal ${successVisible ? 'visible' : ''}`} aria-modal="true">
        <div className="modal-content">
          <h1>Login Successful!</h1>
          <span>Welcome to my website!</span>
          <span id="smile">😁</span>
          <button className="login" onClick={handleCloseModal}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
