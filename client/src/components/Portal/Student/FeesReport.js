import React, { useState } from 'react';
import axios from 'axios';
import './FeesReport.css';

const FeesReport = () => {
  const [studentId, setStudentId] = useState('');
  const [feesReport, setFeesReport] = useState(null);

  const handleFetchReport = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/reports/`, { studentId });
      setFeesReport(response.data.feesReport);
    } catch (error) {
      console.error('Failed to fetch fees report:', error.message);
      alert('Failed to fetch fees report: ' + error.message);
    }
  };

  return (
    <div className="fees-report-container">
      <div className="fetch-report">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={handleFetchReport}>Fetch Report</button>
      </div>

      {feesReport && (
        <div className="report">
          <div className="report-header">
            <img src="logo_of_school.png" alt="School Logo" className="school-logo" />
            <div>
              <h1>Jay Jyoti School, Rewa</h1>
              <p>Madhya Pradesh (486450)</p>
            </div>
          </div>
          <hr />
          <div className="report-body">
            <div className="report-row">
              <p><strong>Name:</strong> {feesReport.name}</p>
              <p><strong>Roll No:</strong> {feesReport.rollNumber}</p>
              <p><strong>Student ID:</strong> {feesReport.studentId}</p>
            </div>
            <div className="report-row">
              <p><strong>Class:</strong> {feesReport.class}</p>
              <p><strong>Section:</strong> {feesReport.section}</p>
              <p><strong>Session:</strong> {feesReport.session}</p>
            </div>
            <div className="report-row">
              <p><strong>Payment Type:</strong> {feesReport.paymentType} {feesReport.paymentType === 'monthly' ? `(Month: ${feesReport.month})` : ''}</p>
            </div>
            <div className="report-row">
              <p><strong>Tuition Fees:</strong> {feesReport.fees.tuitionFee}</p>
              <p><strong>Development Fees:</strong> {feesReport.fees.developmentFee}</p>
              <p><strong>Bus Fees:</strong> {feesReport.fees.busFee}</p>
              <p><strong>Diary Fees:</strong> {feesReport.fees.diaryFee}</p>
              <p><strong>Magazine Fees:</strong> {feesReport.fees.magazineFee}</p>
            </div>
            <div className="report-row">
              <p><strong>Total Fees:</strong> {feesReport.total}</p>
            </div>
            <div className="report-row">
              <p><strong>Date:</strong> {feesReport.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesReport;
