import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import your CSS file


const Dashboard = () => {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/students/`, {
        headers: {
          'x-auth-token': token
        }
      });
      setStudentList(response.data);
      setLoading(false);
      setError('');
    } catch (error) {
      console.error('Error fetching student list:', error.message);
      setError('Error fetching student list. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* <h2>Dashboard</h2> */}
      {error && <p className="error-message">{error}</p>}
      <div className="student-list-container">
        <h3>Student List:</h3>
        <table className="student-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Roll Number</th>
              <th>Address</th>
              <th>Blood Group</th>
              <th>Height</th>
              <th>Session</th>
              <th>Fees Status</th>
              {/* <th>Total Paid Fees</th>
              <th>Pending Fees</th> */}
            </tr>
          </thead>
          <tbody>
            {studentList.map((student, index) => (
              <tr key={student.studentId}>
                <td>{index + 1}</td>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>{student.rollNumber}</td>
                <td>{student.address}</td>
                <td>{student.bloodGroup}</td>
                <td>{student.height}</td>
                <td>{student.session}</td>
                <td>{student.feesStatus}</td>
                {/* <td>{student.totalPaid}</td>
                <td>{student.pendingFees}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
