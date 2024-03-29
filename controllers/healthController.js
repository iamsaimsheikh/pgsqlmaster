const asyncHandler = require('express-async-handler');

const getHealth = asyncHandler((req, res) => {
    try {
        res.status(200).send({ message: 'API IS WORKING!' });
    } catch (error) {
        res.status(400).send({ message: 'API NOT WORKING!' });
    }
});

module.exports = { getHealth };
