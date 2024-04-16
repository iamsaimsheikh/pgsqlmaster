const Queue = require('bull')
const Task = require('../db/models/task')

const taskQueue = new Queue('taskQueue', {
    redis: {
        host: 'localhost',
        port: 6379
    }
})

taskQueue.process('Task', async (job) => {
    const { title, created_by } = job.data
    const task = await Task.create({ title, created_by })
    return task
})

taskQueue.on("completed", (job) => {
    console.log(`Job: ${job.name} has been completed!`)
})

taskQueue.on("failed", (job, err) => {
    console.error(`Job: ${JSON.stringify(job.name)} could not be completed!`)
})

module.exports = { taskQueue }
