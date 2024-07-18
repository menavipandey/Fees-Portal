const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/', async (req, res) => {
  const { studentId, total, paymentType, month, quota, tuitionFee, developmentFee, diaryFee, magazineFee, busFee } = req.body;

  try {
    const student = await Student.findOne({ studentId: studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update student's payment details
    const paymentDetails = {
      paymentType: paymentType,
      month: paymentType === 'monthly' ? month : null,
      quota: quota,
      feesPaid: {
        tuitionFee: tuitionFee,
        developmentFee: developmentFee,
        diaryFee: diaryFee,
        magazineFee: magazineFee,
        busFee: busFee,
      },
      totalPaid: total,
    };

    student.paymentDetails = paymentDetails;
    student.totalPaid += total;
    student.pendingFees -= total;
    student.feesStatus = 'paid'; // Assuming all payments mark feesStatus as 'paid'

    await student.save();

    res.status(200).json({ message: 'Payment successful', student });
  } catch (error) {
    console.error('Payment error:', error.message);
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
});

module.exports = router;
