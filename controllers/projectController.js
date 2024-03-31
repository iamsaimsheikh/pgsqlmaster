const asyncHandler = require("express-async-handler")
const project = require("../db/models/project")
const { errorMessage, successMessage } = require("../utils/helper")

const createProject = asyncHandler(async (req, res) => {
    const body = req.body
    const userId = req.userId

    const newProject = await project.create({
        title: body.title,
        isFeatured: body.isFeatured,
        productImage: body.productImage,
        price: body.price,
        shortDescription: body.shortDescription,
        description: body.description,
        productUrl: body.productUrl,
        category: body.category,
        tags: body.tags,
        createdBy: userId,
    });

    if (!newProject) return res.status(400).json(errorMessage("Project could not be created!", "failed"));
    return res.status(200).json(successMessage("Project created successfully!", newProject));

})

const getAllProjects = asyncHandler(async (req, res) => {
    try {
        const projects = await project.findAll()
        return res.status(200).json(successMessage("Project list fetched successfully!", projects));
    } catch (e) {
        return res.status(400).json(errorMessage("Project list could not be fetched!", e.message));
    }
})

module.exports = { createProject, getAllProjects }