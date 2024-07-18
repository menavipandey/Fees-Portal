import React, { useState, useEffect } from 'react';

const FeeDetails = () => {
  const [feesData, setFeesData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        // Fetch fee details for the logged-in student
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('/api/student/fees', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch fee details');
        }

        const data = await response.json();
        setFeesData(data);
      } catch (error) {
        console.error('Fetch fee details error:', error.message);
        setError(error.message);
      }
    };

    fetchFeeDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!feesData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fee-details">
      <h2>Fee Details</h2>
      <p>Total Paid: {feesData.totalPaid}</p>
      <p>Pending Fees: {feesData.pendingFees}</p>
      {/* Display additional fee details as needed */}
      {/* <button onClick={handlePayment}>Pay Fees</button> */}
    </div>
  );
};

export default FeeDetails;
