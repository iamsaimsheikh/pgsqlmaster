const { Sequelize } = require('sequelize');
const user = require('../db/models/user');
const asyncHandler = require('express-async-handler');
const { successMessage } = require('../utils/helper');

const getAllUser = asyncHandler(async (req, res, next) => {
    const users = await user.findAndCountAll({
        where: {
            user_type: {
                [Sequelize.Op.ne]: '0',
            },
        },
        attributes: { exclude: ['password'] },
    });
    return res.status(200).json(successMessage("Fetched all users", users));
});

module.exports = { getAllUser };