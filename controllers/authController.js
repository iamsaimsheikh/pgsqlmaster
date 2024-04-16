const asyncHandler = require('express-async-handler');
const { errorMessage, successMessage } = require('../utils/helper');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const User = require('../db/models/user');
const { generateToken } = require('../utils/generateToken');

const signUp = asyncHandler(async (req, res) => {
    const body = req.body;

    const exists = await User.findOne({ where: { email: body.email } })
    if (exists) return res.status(400).json(errorMessage('User already exists!', 'failed'));

    const hashedPassword = await hashPassword(body.password);
    const confirmedHashedPassword = await hashPassword(body.confirmPassword)

    const newUser = await User.create({
        user_type: body.userType,
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        password: hashedPassword,
        confirm_password: confirmedHashedPassword
    });

    if (!newUser) return res.status(400).json(errorMessage('User already exists!', 'failed'));

    const result = newUser.toJSON()
    delete result.password
    delete result.deletedAt

    result.token = generateToken({
        id: result.id
    })

    return res.status(200).json(successMessage('User created!', result));
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

    const token = generateToken({
        id: existingUser.id
    })

    return res.status(200).json(successMessage('Login successful!', { token }));
});

module.exports = { signUp, login };
