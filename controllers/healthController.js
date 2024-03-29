import asyncHandler from 'express-async-handler'

export const getHealth = asyncHandler((req, res) => {
    try {
        res.status(200).send({ message: "API IS WORKING!" })
    } catch (error) {
        res.status(400).send({ message: "API NOT WORKING!" })
    }
})

