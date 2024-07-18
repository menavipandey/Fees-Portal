import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Student/StudenLogin/Login.css'; // Import your CSS for styling

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token to localStorage or state
        localStorage.setItem('token', data.token);
        // Navigate to admin home
        navigate('/Admin/home');
      } else {
        setErrorMessage(data.msg || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Server error');
    }
  };

  return (
    <div className="loginDiv">
      <h1>Admin Login</h1>
      <div className="input-field">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-field">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className={`error ${errorMessage ? 'visible' : ''}`}>
        {errorMessage}
      </div>
      <button className="login" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
