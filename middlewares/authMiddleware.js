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

const restrictTo = (...userType) => {
  const checkPermission = (req, res, next) => {
    if (!userType.includes(req.user.userType)) {
      return next(new Error("You don't have permission to perform this action!"))
    }
    return next();
  }

  return checkPermission;
}

module.exports = { isAuthenticated, restrictTo };
