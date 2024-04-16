const express = require('express');
const dotenv = require('dotenv');
const { errorHandler } = require('./utils/errorHandler.js');
const { ExpressAdapter } = require('@bull-board/express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const { taskQueue } = require('./utils/bullHelper.js')


dotenv.config();

const serverAdapter = new ExpressAdapter().setBasePath('/bull')
createBullBoard({
    queues: [new BullAdapter(taskQueue)],
    serverAdapter,
})

// route imports
const healthRoute = require('./routes/healthRoute.js');
const authRoute = require('./routes/authRoute.js');
const projectRoute = require('./routes/projectRoute.js')
const taskRoutes = require('./routes/taskRoute.js')
const handle404 = require('./routes/handle404.js');

const app = express();
// Parse application/json requests
app.use(express.json());

// Routes
app.use('/bull',serverAdapter.getRouter())
app.use('/api/health', healthRoute);
app.use('/api/auth', authRoute);
app.use('/api/project', projectRoute);
app.use('/api/task', taskRoutes);

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
