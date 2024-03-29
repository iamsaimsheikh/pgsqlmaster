const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const healthRoute = require('./routes/healthRoute.js');
const authRoute = require('./routes/authRoute.js');
const handle404 = require('./routes/handle404.js');

dotenv.config();

const app = express();

// Parse application/json requests
app.use(bodyParser.json());

// Parse urlencoded requests
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Working!',
        status: 'Success!'
    });
});

app.use('*', handle404);

app.listen(process.env.PORT, () => {
    console.log('App is running on port ' + process.env.PORT);
});
