import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feesstucture.css';
import axios from 'axios';

const FeesStructure = () => {
  const [feeStructure, setFeeStructure] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedFees, setUpdatedFees] = useState({
    tuitionFee: 0,
    developmentFee: 0,
    diaryFee: 0,
    magazineFee: 0,
    admissionFee: 0,
    busFee: 0,
    cautionMoney: 0
  });

  const [newFees, setNewFees] = useState({
    className: '',
    tuitionFee: 0,
    developmentFee: 0,
    diaryFee: 0,
    magazineFee: 0,
    admissionFee: 0,
    busFee: 0,
    cautionMoney: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchFeeStructure();
  }, []);

  const fetchFeeStructure = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/feestructures/`);
      setFeeStructure(response.data);
    } catch (error) {
      console.error('Error fetching fee structure:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setUpdatedFees({

      tuitionFee: item.tuitionFee,
      developmentFee: item.developmentFee,
      diaryFee: item.diaryFee,
      magazineFee: item.magazineFee,
      admissionFee: item.admissionFee,
      busFee: item.busFee,
      cautionMoney: item.cautionMoney
    });
  };

  const handleEditChange = (e) => {
    setUpdatedFees({ ...updatedFees, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/feestructures/${id}`, updatedFees);
      setEditingId(null);
      fetchFeeStructure(); // Refresh data after update
    } catch (error) {
      console.error('Error updating fee structure:', error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/feestructures/`, newFees);
      console.log('New fees structure added:', response.data);
      fetchFeeStructure(); // Refresh data after adding
      setNewFees({
        className: '',
        tuitionFee: 0,
        developmentFee: 0,
        diaryFee: 0,
        magazineFee: 0,
        admissionFee: 0,
        busFee: 0,
        cautionMoney: 0
      });
    } catch (error) {
      console.error('Error adding new fees structure:', error);
    }
  };

  return (
    <div>
      <button onClick={handleBack} className="back-button">
        Back
      </button>
      <div className="fees-structure-container">
        <h2>Fees Structure Details and Edits</h2>
        <table className="fees-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Tuition Fee</th>
              <th>Development Fee</th>
              <th>Diary Fee</th>
              <th>Magazine Fee</th>
              <th>Admission Fee</th>
              <th>Bus Fee</th>
              <th>Caution Money</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={newFees.className}
                  onChange={(e) => setNewFees({ ...newFees, className: e.target.value })}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newFees.tuitionFee}
                  onChange={(e) => setNewFees({ ...newFees, tuitionFee: parseInt(e.target.value) })}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newFees.developmentFee}
                  onChange={(e) => setNewFees({ ...newFees, developmentFee: parseInt(e.target.value) })}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newFees.diaryFee}
                  onChange={(e) => setNewFees({ ...newFees, diaryFee: parseInt(e.target.value) })}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newFees.magazineFee}
                  onChange={(e) => setNewFees({ ...newFees, magazineFee: parseInt(e.target.value) })}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newFees.admissionFee}
                  onChange={(e) => setNewFees({ ...newFees, admissionFee: parseInt(e.target.value) })}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newFees.busFee}
                  onChange={(e) => setNewFees({ ...newFees, busFee: parseInt(e.target.value) })}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newFees.cautionMoney}
                  onChange={(e) => setNewFees({ ...newFees, cautionMoney: parseInt(e.target.value) })}
                  required
                />
              </td>
              <td>
                <button onClick={handleAdd}>Add Fees Structure</button>
              </td>
            </tr>
            {feeStructure.map((item) => (
              <tr key={item._id}>
                {editingId === item._id ? (
                  <>
                    <td>{item.className}</td>
                    <td>
                      <input
                        type="number"
                        name="tuitionFee"
                        value={updatedFees.tuitionFee}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="developmentFee"
                        value={updatedFees.developmentFee}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="diaryFee"
                        value={updatedFees.diaryFee}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="magazineFee"
                        value={updatedFees.magazineFee}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="admissionFee"
                        value={updatedFees.admissionFee}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="busFee"
                        value={updatedFees.busFee}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="cautionMoney"
                        value={updatedFees.cautionMoney}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSave(item._id)}>Save</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.className}</td>
                    <td>{item.tuitionFee}</td>
                    <td>{item.developmentFee}</td>
                    <td>{item.diaryFee}</td>
                    <td>{item.magazineFee}</td>
                    <td>{item.admissionFee}</td>
                    <td>{item.busFee}</td>
                    <td>{item.cautionMoney}</td>
                    <td>
                      <button onClick={() => handleEditClick(item)}>Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeesStructure;
