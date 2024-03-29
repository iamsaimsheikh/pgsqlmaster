import asyncHandler from "express-async-handler";

export const handle404 = asyncHandler((req, res) => {
    res.status(400).send({ message: "Endpoint not found!" })
})

