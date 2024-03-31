const express = require('express');
const dotenv = require('dotenv');
const healthRoute = require('./routes/healthRoute.js');
const authRoute = require('./routes/authRoute.js');
const projectRoute = require('./routes/projectRoute.js')
const handle404 = require('./routes/handle404.js');
const { errorHandler } = require('./utils/errorHandler.js');

dotenv.config();

const app = express();

// Parse application/json requests
app.use(express.json());

// Routes
app.use('/api/health', healthRoute);
app.use('/api/auth', authRoute);
app.use('/api/project', projectRoute)

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Working!',
        status: 'Success!'
    });
});

app.use('*', handle404);
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log('App is running on port ' + process.env.PORT);
});
