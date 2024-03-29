const express = require('express');
const { signUp, login } = require('../controllers/authController.js');
const isAuthenticated = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.use(isAuthenticated);

module.exports = router;
