import React, { useState } from 'react';
import axios from 'axios';
import './studententry.css'; // Assuming the CSS is saved in this file

const Studententry = () => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    section: '',
    studentId: '',
    rollNumber: '',
    address: '',
    bloodGroup: '',
    height: '',
    email: '',
    gender: '',
    dob: '',
    session: '',
    parentName: '',
    parentContact: '',
    phone: '',
    enrollmentDate: '',
    emergencyContact: '',
    nationality: '',
    previousSchool: '',
    profilePicture: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/students/`, formData, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      console.log('Student added:', response.data);
      // Clear form after successful submission
      setFormData({
        name: '',
        class: '',
        section: '',
        studentId: '',
        rollNumber: '',
        address: '',
        bloodGroup: '',
        height: '',
        email: '',
        gender: '',
        dob: '',
        session: '',
        parentName: '',
        parentContact: '',
        phone: '',
        enrollmentDate: '',
        emergencyContact: '',
        nationality: '',
        previousSchool: '',
        profilePicture: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
      <button className="back-button" onClick={() => window.history.back()}>Back</button>
      <div className="student-details-container">
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="class">Class</label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="section">Section</label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              type="number"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group</label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height</label>
            <input
              type="text"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="session">Session</label>
            <input
              type="text"
              id="session"
              name="session"
              value={formData.session}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="parentName">Parent's Name</label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="parentContact">Parent's Contact</label>
            <input
              type="text"
              id="parentContact"
              name="parentContact"
              value={formData.parentContact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="enrollmentDate">Enrollment Date</label>
            <input
              type="date"
              id="enrollmentDate"
              name="enrollmentDate"
              value={formData.enrollmentDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContact">Emergency Contact</label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="previousSchool">Previous School</label>
            <input
              type="text"
              id="previousSchool"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture URL</label>
            <input
              type="text"
              id="profilePicture"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">Add Student</button>
        </form>
      </div>
    </div>
  );
};

export default Studententry;
