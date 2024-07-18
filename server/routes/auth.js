const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();



// Example protected route
// app.get('/api/protected', authMiddleware, (req, res) => {
//   res.json({ msg: 'This is a protected route' });
// });




// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password, role });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '25d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    console.log('User found:', user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id, role: user.role, studentId: user.studentId } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '25d' }, (err, token) => {
      if (err) {
        console.error('JWT signing error:', err);
        throw err;
      }
      res.json({ token });
    });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
});





// Get all users
router.get('/users', auth('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password field from response
    res.json(users);
  } catch (err) {
    // console.error(err.message);
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



// Delete all users
router.delete('/users', auth('admin'), async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ msg: 'All users deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
