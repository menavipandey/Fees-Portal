import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './fineimposter.css'; // Import your CSS file
import axios from 'axios';

const FineImposition = () => {
  const [studentId, setStudentId] = useState('');
  const [amount, setamount] = useState('');
  const [reason, setreason] = useState('');

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/fines`, {
        studentId,
        amount,
        reason
      });
      console.log('Fine imposed successfully:', response.data);
      // Clear form fields after successful submission
      setStudentId('');
      setamount('');
      setreason('');
    } catch (error) {
      console.error('Error imposing fine:', error);
    }
  };

  return (
    <div>
      <button onClick={handleBack} className="back-button">Back</button>
      <div className="fine-imposition-container">
        <h2>Fine Imposition</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student ID:</label>
            <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Fine Amount:</label>
            <input type="number" value={amount} onChange={(e) => setamount(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Reason:</label>
            <textarea value={reason} onChange={(e) => setreason(e.target.value)} required />
          </div>
          <button type="submit" className="submit-button">Impose Fine</button>
        </form>
      </div>
    </div>
  );
};

export default FineImposition;
