const express = require('express');
const PDFDocument = require('pdfkit');
const path = require('path');
const router = express.Router();
const Student = require('../models/Student'); // Adjust the import based on your schema

// Generate fees report
router.get('/', async (req, res) => {
  try {
    // Fetch student details
    const student = await Student.findOne({ studentId: req.query.studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const doc = new PDFDocument();
    let filename = `fees-report_${Date.now()}.pdf`;
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-type', 'application/pdf');

    // Start creating PDF content
    doc.pipe(res);

    // Add background logo
    const logoPath = path.join(__dirname, '../../client/src/components/Assets/logo-jjs-removebg-preview.png'); // Adjust the path as needed
    doc.image(logoPath, 50, 50, { width: 60, opacity: 0.3 });

    // Header section with school name and address
    doc.fontSize(20).text('Jay Jyoti School, Rewa', { align: 'center' });
    doc.fontSize(12).text('Madhya Pradesh (486450)', { align: 'center' });
    doc.moveDown();
    doc.moveTo(50, 120).lineTo(550, 120).stroke();

    // Student details section
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${student.name}`, { align: 'left' });
    doc.fontSize(14).text(`Roll No: ${student.rollNumber}`, { align: 'right' });
    doc.fontSize(14).text(`Student ID: ${student.studentId}`, { align: 'left' });
    doc.fontSize(14).text(`Class: ${student.class}`, { align: 'left' });
    doc.fontSize(14).text(`Section: ${student.section}`, { align: 'left' });
    doc.fontSize(14).text(`Session: ${student.session}`, { align: 'right' });
    doc.moveDown();

    // Fees details section
    doc.fontSize(14).text(`Fees Payment Type: ${req.query.paymentType}`, { align: 'left' });
    if (req.query.paymentType === 'monthly') {
      doc.fontSize(14).text(`Month: ${req.query.month}`, { align: 'left' });
    }
    doc.moveDown();

    // Fees breakdown
    const feesPaid = student.paymentDetails.feesPaid || {};
    doc.fontSize(12).text(`Tuition Fees:        ${feesPaid.tuitionFee || 0}`, { align: 'left' });
    doc.fontSize(12).text(`Development Fees:    ${feesPaid.developmentFee || 0}`, { align: 'left' });
    doc.fontSize(12).text(`Bus Fees:            ${feesPaid.busFee || 0}`, { align: 'left' });
    doc.fontSize(12).text(`Diary Fees:          ${feesPaid.diaryFee || 0}`, { align: 'left' });
    doc.fontSize(12).text(`Magazine Fees:       ${feesPaid.magazineFee || 0}`, { align: 'left' });
    doc.moveDown();

    // Total fees
    doc.fontSize(14).text(`Total Fees: ${req.query.total}`, { align: 'left' });

    doc.end(); // Finalize the document

  } catch (error) {
    console.error('Error generating fees report:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
