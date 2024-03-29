import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

// All routes import
import healthRoute from './routes/healthRoute.js'
import { handle404 } from './routes/handle404.js'

const app = express()

app.use('/api/health', healthRoute)

app.get('/', (req, res) => {
    res.status(200).send({
        message: "Working!",
        status: 'Success!'
    })
})

app.use('*', handle404)

app.listen(process.env.PORT, () => {
    console.log("App is running on port " + process.env.PORT)
})