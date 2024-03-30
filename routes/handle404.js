const asyncHandler = require('express-async-handler');

const handle404 = asyncHandler((req, res, next) => {
   return next(new Error("Endpoint does not exist!"))
});

module.exports = handle404;
