const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      // Fetch the user from the database to get the role
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(401).json({ msg: 'User not found, authorization denied' });
      }

      // Check if the user's role matches the required role
      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).json({ msg: 'Access denied: Insufficient role' });
      }

      next();
    } catch (err) {
      console.error(err.message);
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};

module.exports = auth;
