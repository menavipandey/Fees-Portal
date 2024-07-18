import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './personal.css';

const Personal = () => {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    id: '',
    rollNumber: '',
    class: '',
    section: '',
    address: '',
    bloodGroup: '',
    height: ''
  });

  const navigate = useNavigate();

  // Fetch student details from the backend upon component mount
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        
        if (!token || !email) {
          throw new Error('No token or email found');
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/students/email/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data; // Assuming response contains student details
        setStudentDetails(data);
      } catch (error) {
        console.error('Fetch student details error:', error.message);
        // Handle error or redirect to login page if token is invalid/expired
        // navigate('/Login');
      }
    };


    fetchStudentDetails();
  }, [navigate]); // Ensure useEffect runs only once or when navigate changes

  return (
    <div>
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      <div className="personal-container">
        <h2>Student Personal Details</h2>
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <p>{studentDetails.name}</p>
        </div>
        <div className="form-group">
          <label htmlFor="id">Student ID</label>
          <p>{studentDetails.studentId}</p>
        </div>
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number</label>
          <p>{studentDetails.rollNumber}</p>
        </div>
        <div className="form-group">
          <label htmlFor="class">Class</label>
          <p>{studentDetails.class}</p>
        </div>
        <div className="form-group">
          <label htmlFor="section">Section</label>
          <p>{studentDetails.section}</p>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <p>{studentDetails.address}</p>
        </div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <p>{studentDetails.bloodGroup}</p>
        </div>
        <div className="form-group">
          <label htmlFor="height">Height</label>
          <p>{studentDetails.height}</p>
        </div>
      </div>
    </div>
  );
};

export default Personal;
