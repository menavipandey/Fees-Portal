// feestructure.js
const express = require('express');
const router = express.Router();
const FeesStructure = require('../models/Feestructure');

// Get all fee structures
router.get('/', async (req, res) => {
  try {
    const fees = await FeesStructure.find();
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update fee structure for a specific class
router.put('/:id', async (req, res) => {
  try {
    const updatedFees = await FeesStructure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedFees);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add fee structure for a class
router.post('/', async (req, res) => {
  try {
    const { className, tuitionFee, developmentFee, diaryFee, magazineFee, admissionFee, busFee, cautionMoney } = req.body;
    const newFeesStructure = new FeesStructure({
      className,
      tuitionFee,
      developmentFee,
      diaryFee,
      magazineFee,
      admissionFee,
      busFee,
      cautionMoney
    });

    const savedFeesStructure = await newFeesStructure.save();
    res.status(201).json(savedFeesStructure);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
