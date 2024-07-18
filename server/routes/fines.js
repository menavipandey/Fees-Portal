// routes/fines.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/', async (req, res) => {
  const { studentId, amount, reason } = req.body;

  try {
    let student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const newFine = {
      amount,
      reason
    };

    student.fines.push(newFine);
    await student.save();

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
