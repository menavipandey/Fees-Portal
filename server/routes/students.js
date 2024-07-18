const express = require('express');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const FeesStructure = require('../models/Feestructure');
const User = require('../models/User');
const auth = require('../middleware/auth'); // Import auth middleware
const router = express.Router();

// Add student (Only accessible to admin)
router.post('/', auth('admin'), async (req, res) => {
  const {
    name,
    class: studentClass,
    section,
    studentId,
    rollNumber,
    address,
    bloodGroup,
    height,
    email,
    gender,
    dob,
    session,
    parentName,
    parentContact,
    phone,
    enrollmentDate,
    emergencyContact,
    nationality,
    previousSchool,
    profilePicture
  } = req.body;

  try {
    const feestructure = await FeesStructure.findOne({ className: studentClass });


    // Determine admission status based on enrollment date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const twoYearsAgo = currentYear - 2;
    const enroldate = new Date(enrollmentDate);
    // console.log(currentDate);
    // console.log(currentYear);
    // console.log(enroldate.getFullYear());
    let adminstatus = 'old';
    if (enroldate.getFullYear() >= twoYearsAgo || enroldate.getFullYear() === currentYear) {
      adminstatus = 'new';
    }

   



    let student = new Student({
      name,
      class: studentClass,
      section,
      studentId,
      rollNumber,
      address,
      bloodGroup,
      height,
      email,
      gender,
      dob,
      session, 
      parentName,
      parentContact,
      phone,
      enrollmentDate,
      admissionStatus: adminstatus,
      emergencyContact,
      nationality,
      previousSchool,
      profilePicture,
      feesStructure: feestructure._id
    });


     // Register the student as a user with a default password
     const defaultPassword = 'password';
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(defaultPassword, salt);
 
     let user = new User({
       name,
       email,
       password: hashedPassword,
       role: 'student'
     });
 
     await user.save();
  

    await student.save();
    res.json(student);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Student ID or email already exists' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all students (Accessible to admin and staff)
router.get('/', auth('admin'), async (req, res) => {
  try {
    const students = await Student.find().populate('feesStructure');
    res.json(students);
  } catch (err) {
    console.log(error);
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific student by ID (Accessible to admin and staff)
router.get('/:studentId', auth('admin'), async (req, res) => {
  try {
    const { studentId } = req.params;
    let student = await Student.findOne({ studentId }).populate('feesStructure');

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// GET student details by email

router.get('/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    console.log('Email:', email);
    let student = await Student.findOne({email}).populate('feesStructure');
    

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const feesStructure = await FeesStructure.findOne({ className: student.class });
    if (!feesStructure) {
      return res.status(404).json({ msg: 'Fees structure not found' });
    }

    // Adjust the fields based on your Student model
    const { name, studentId, rollNumber, class: studentClass, section, address, bloodGroup, height ,feesStatus } = student;
    res.json({ name, studentId, rollNumber, class: studentClass, section, address, bloodGroup, height,feesStructure ,feesStatus});
  } catch (err) {
    console.error('Error fetching student details:', err.message);
    res.status(500).send('Server Error');
  }
});











// Update student details (Only accessible to admin)
router.put('/:id', auth('admin'), async (req, res) => {

 
  try {
    const { id } = req.params;
    const {
      name,
      class: studentClass,
      section,
      rollNumber,
      address,
      bloodGroup,
      height,
      email,
      gender,
      dob,
      session, 
      parentName,
      parentContact,
      phone,
      enrollmentDate,
      emergencyContact,
      nationality,
      previousSchool,
      profilePicture
    } = req.body;

    const feestructure = await FeesStructure.findOne({ className: studentClass });

    let student = await Student.findByIdAndUpdate(
      id,
      {
        name,
        class: studentClass,
        section,
        rollNumber,
        address,
        bloodGroup,
        height,
        email,
        gender,
        dob,
        session, 
        parentName,
        parentContact,
        phone,
        enrollmentDate,
        emergencyContact,
        nationality,
        previousSchool,
        profilePicture,
        feesStructure: feestructure._id
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
