import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Studentdetails.css'; // Corrected CSS file import

const StudentDetails = () => {
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset student details and error on component mount
    setStudentDetails(null);
    setError('');
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/students/${studentId}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setStudentDetails(response.data);
      setEditMode(false); // Exit edit mode when fetching new student details
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Server error');
      setStudentDetails(null);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/students/${studentDetails._id}`, studentDetails, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setStudentDetails(response.data);
      setEditMode(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Server error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({ ...studentDetails, [name]: value });
  };

  return (
    <div>
      <button onClick={handleBack} className="back-button">Back</button>
      <div className="student-details-container">
        <h2>Student Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student ID:</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Get Student Details</button>
        </form>
        {error && <p className="error">{error}</p>}
        {studentDetails && (
          <div className="student-info">
            <h3>Student Information:</h3>
            <p>
              <strong>Name:</strong> {studentDetails.name}
            </p>
            <p>
              <strong>Class:</strong> {studentDetails.class}
            </p>
            <p>
              <strong>Section:</strong> {studentDetails.section}
            </p>
            <p>
              <strong>Student ID:</strong> {studentDetails.studentId}
            </p>
            <p>
              <strong>Session:</strong> {studentDetails.session}
            </p>
            <p>
              <strong>Email:</strong> {studentDetails.email}
            </p>
            <p>
              <strong>Gender:</strong> {studentDetails.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong> {new Date(studentDetails.dob).toLocaleDateString()}
            </p>
            <p>
              <strong>Parent Name:</strong> {studentDetails.parentName}
            </p>
            <p>
              <strong>Parent Contact:</strong> {studentDetails.parentContact}
            </p>
            <p>
              <strong>Phone:</strong> {studentDetails.phone}
            </p>
            <p>
              <strong>Enrollment Date:</strong> {new Date(studentDetails.enrollmentDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Emergency Contact:</strong> {studentDetails.emergencyContact}
            </p>
            <p>
              <strong>Nationality:</strong> {studentDetails.nationality}
            </p>
            <p>
              <strong>Previous School:</strong> {studentDetails.previousSchool}
            </p>

            {studentDetails.feesStructure && (
              <div>
                <h3>Fees Details:</h3>
                <table className="fees-table">
                  <thead>
                    <tr>
                      <th>Fee Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tuition Fee</td>
                      <td>{studentDetails.feesStructure?.tuitionFee}</td>
                    </tr>
                    <tr>
                      <td>Development Fee</td>
                      <td>{studentDetails.feesStructure?.developmentFee}</td>
                    </tr>
                    <tr>
                      <td>Diary Fee</td>
                      <td>{studentDetails.feesStructure?.diaryFee}</td>
                    </tr>
                    <tr>
                      <td>Magazine Fee</td>
                      <td>{studentDetails.feesStructure?.magazineFee}</td>
                    </tr>
                    <tr>
                      <td>Admission Fee</td>
                      <td>{studentDetails.feesStructure?.admissionFee}</td>
                    </tr>
                    <tr>
                      <td>Bus Fee</td>
                      <td>{studentDetails.feesStructure?.busFee}</td>
                    </tr>
                    <tr>
                      <td>Caution Money</td>
                      <td>{studentDetails.feesStructure?.cautionMoney}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <h3>Fines Details:</h3>
            {studentDetails.fines.length > 0 ? (
              <table className="fines-table">
                <thead>
                  <tr>
                    <th>Reason</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {studentDetails.fines.map((fine, index) => (
                    <tr key={index}>
                      <td>{fine.reason}</td>
                      <td>{fine.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No fines recorded</p>
            )}

            <h3>Fees Status:</h3>
            <p>{studentDetails.feesStatus}</p>

            {editMode ? (
              <div>
                <h3>Edit Student Information:</h3>
                <form onSubmit={handleSave}>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={studentDetails.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Class:</label>
                    <input
                      type="text"
                      name="class"
                      value={studentDetails.class}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Section:</label>
                    <input
                      type="text"
                      name="section"
                      value={studentDetails.section}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={studentDetails.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Roll Number:</label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={studentDetails.rollNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={studentDetails.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Blood Group:</label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={studentDetails.bloodGroup}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Height:</label>
                    <input
                      type="text"
                      name="height"
                      value={studentDetails.height}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Parent Name:</label>
                    <input
                      type="text"
                      name="parentName"
                      value={studentDetails.parentName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Parent Contact:</label>
                    <input
                      type="text"
                      name="parentContact"
                      value={studentDetails.parentContact}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={studentDetails.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Enrollment Date:</label>
                    <input
                      type="date"
                      name="enrollmentDate"
                      value={studentDetails.enrollmentDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Emergency Contact:</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={studentDetails.emergencyContact}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nationality:</label>
                    <input
                      type="text"
                      name="nationality"
                      value={studentDetails.nationality}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Previous School:</label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={studentDetails.previousSchool}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender:</label>
                    <input
                      type="text"
                      name="gender"
                      value={studentDetails.gender}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                      type="date"
                      name="dob"
                      value={studentDetails.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="submit-button">Save Changes</button>
                </form>
              </div>
            ) : (
              <button onClick={handleEdit} className="submit-button">Edit Student Details</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
