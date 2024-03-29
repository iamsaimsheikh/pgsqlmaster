const asyncHandler = require('express-async-handler');

const handle404 = asyncHandler((req, res) => {
    res.status(400).send({ message: 'Endpoint not found!' });
});

module.exports = handle404;
