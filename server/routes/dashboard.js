// routes/dashboard.js

const express = require('express');
const router = express.Router();
// const Student = require('../models/Student');
const student = require('../models/Student'); // Adjust if Fine model is used for collections

// Endpoint to fetch dashboard summary
router.get('/summary', async (req, res) => {
  try {
    // Calculate total fee collection
    const feeCollections = await student.feesStructure.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Calculate total fine collection
    const fineCollections = await student.fines.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Calculate total dues (assuming all fees are summed up and fines deducted)
    const totalDues = feeCollections.length > 0 ? feeCollections[0].total : 0 - (fineCollections.length > 0 ? fineCollections[0].total : 0);

    const summaryData = {
      feeCollections: feeCollections.length > 0 ? feeCollections[0].total : 0,
      fineCollections: fineCollections.length > 0 ? fineCollections[0].total : 0,
      totalDues: totalDues
    };

    res.json(summaryData);
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
