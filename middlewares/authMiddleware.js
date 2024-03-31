const jwt = require('jsonwebtoken');
const { errorMessage } = require('../utils/helper');

const isAuthenticated = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorMessage('Unauthorized access. Token is missing or invalid!', 'failed'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json(errorMessage('Unauthorized access. Invalid token!', 'failed'));
  }
};

module.exports = isAuthenticated;
