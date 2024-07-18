// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/feestructures', require('./routes/feestructure'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/fines', require('./routes/fines')); // New route for fines
app.use('/api/dashboard', require('./routes/dashboard')); 
app.use('/api/pay', require('./routes/pay'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
