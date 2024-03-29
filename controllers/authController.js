const asyncHandler = require('express-async-handler');
const { errorMessage, successMessage } = require('../utils/helper');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../db/models/user');

const signUp = asyncHandler(async (req, res) => {
    const body = req.body;

    const hashedPassword = await hashPassword(body.password);

    const newUser = user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
    });

    return res.status(200).json(successMessage('User created!', newUser));
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
        return res.status(400).json(errorMessage('Invalid credentials. User does not exist!', 'failed'));
    }

    const isPasswordValid = await comparePassword(password, existingUser.password);
    if (!isPasswordValid) {
        return res.status(400).json(errorMessage('Invalid credentials. Password is incorrect!', 'failed'));
    }

    const payload = {
        user: {
            id: existingUser.id,
        },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json(successMessage('Login successful!', { token }));
});

module.exports = { signUp, login };
