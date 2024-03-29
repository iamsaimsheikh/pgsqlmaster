const jwt = require('jsonwebtoken');
const { errorMessage } = require('../utils/helper');

const isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json(errorMessage('Unauthorized access. Token is missing!', 'failed'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json(errorMessage('Unauthorized access. Invalid token!', 'failed'));
  }
};

module.exports = isAuthenticated;
