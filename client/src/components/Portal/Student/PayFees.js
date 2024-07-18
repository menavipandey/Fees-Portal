import React, { useEffect, useState } from 'react';
import './payfees.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PayFees = () => {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    studentId: '',
    rollNumber: '',
    class: '',
    section: '',
    session: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    paymentType: 'monthly', // Default value
    month: '',
    quota: '',
  });

  const [feesDetails, setFeesDetails] = useState({
    tuitionFee: 0,
    developmentFee: 0,
    diaryFee: 0,
    magazineFee: 0,
    admissionFee: 0,
    busFee: 0,
    cautionMoney: 0,
    total: 0,
  });
  const navigate = useNavigate();
  const [feesStatus, setFeesStatus] = useState('pending');

  useEffect(() => {
    const fetchFeesDetails = async () => {
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

        const student = response.data;
        setStudentDetails({
          name: student.name,
          studentId: student.studentId,
          rollNumber: student.rollNumber,
          class: student.class,
          section: student.section,
          session: student.session,
        });

        const feesStructure = student.feesStructure;
        setFeesDetails(feesStructure);
        setFeesStatus(student.feesStatus); // Assuming feesStatus is part of the student data
      } catch (error) {
        console.error('Fetch fees details error:', error.message);
      }
    };

    fetchFeesDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });

    if (name === 'paymentType' || name === 'month' || name === 'quota') {
      calculateTotalFees(
        name === 'paymentType' ? value : paymentDetails.paymentType,
        name === 'month' ? value : paymentDetails.month,
        name === 'quota' ? value : paymentDetails.quota
      );
    }
  };

  const calculateTotalFees = (paymentType, month, quota) => {
    let total = 0;
    const { tuitionFee, developmentFee, diaryFee, magazineFee, busFee } = feesDetails;

    if (paymentType === 'yearly') {
      total = (tuitionFee * 12) + (quota !== 'staff' ? (developmentFee * 12) + diaryFee + magazineFee : 0) + busFee;
    } else if (paymentType === 'monthly') {
      if (month === 'April') {
        total = tuitionFee + (quota !== 'staff' ? developmentFee + diaryFee + magazineFee : 0) + busFee;
      } else {
        total = tuitionFee + (quota !== 'staff' ? developmentFee : 0);
      }
    }

    setFeesDetails({
      ...feesDetails,
      total,
    });
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/pay`, {
        studentId: studentDetails.studentId,
        total: feesDetails.total,
        paymentType: paymentDetails.paymentType,
        month: paymentDetails.month,
        quota: paymentDetails.quota,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      alert(response.data.message);
      navigate('/success'); // Redirect to a success page or update the UI
    } catch (error) {
      console.error('Payment error:', error.message);
      alert('Payment failed: ' + error.message);
    }
  };
  

  const handlePrintReport = async () => {
    try {
      console.log('Printing report with:');
      console.log('Student Details:', studentDetails);
      console.log('Payment Details:', paymentDetails);
      console.log('Fees Details:', feesDetails);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/reports/`, {
        params: {
          studentId: studentDetails.studentId,
          paymentType: paymentDetails.paymentType,
          month: paymentDetails.month,
          total: feesDetails.total,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'blob',
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `fees-report_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generating fees report:', error.message);
      alert('Failed to generate fees report');
    }
  };

  

  return (
    <div>
      <div className="payfees-container">
        <h2>Pay Academic Fees</h2>
        
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <p>{studentDetails.name}</p>
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
          <label htmlFor="session">Session</label>
          <p>{studentDetails.session}</p>
        </div>
        <div className="form-group">
          <label htmlFor="paymentType">Fees Payment Type</label>
          <select id="paymentType" name="paymentType" value={paymentDetails.paymentType} onChange={handleChange} disabled={feesStatus === 'paid'}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        {paymentDetails.paymentType === 'monthly' && (
          <div className="form-group">
            <label htmlFor="month">Month</label>
            <select id="month" name="month" value={paymentDetails.month} onChange={handleChange} disabled={feesStatus === 'paid'}>
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="quota">Quota</label>
          <select id="quota" name="quota" value={paymentDetails.quota} onChange={handleChange} disabled={feesStatus === 'paid'}>
            <option value="">Select Quota</option>
            <option value="none">None</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <div className="form-group">
          <label>Fees Details</label>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tuition Fees</td>
                <td>{feesDetails.tuitionFee}</td>
              </tr>
              {paymentDetails.quota !== 'staff' && (
                <>
                  <tr>
                    <td>Development Fees</td>
                    <td>{feesDetails.developmentFee}</td>
                  </tr>
                  <tr>
                    <td>Diary Fees</td>
                    <td>{feesDetails.diaryFee}</td>
                  </tr>
                  <tr>
                    <td>Magazine Fees</td>
                    <td>{feesDetails.magazineFee}</td>
                  </tr>
                </>
              )}
              <tr>
                <td>Bus Fees</td>
                <td>{feesDetails.busFee}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{feesDetails.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {feesStatus === 'pending' && (
          <button className="submit-button" onClick={handlePayment}>Pay Fees</button>
        )}
        {feesStatus === 'paid' && (
          <button className="submit-button" onClick={handlePrintReport}>Print Report</button>
        )}
      </div>
    </div>
  );
};

export default PayFees;

