const asyncHandler = require("express-async-handler")
const project = require("../db/models/project")
const { errorMessage, successMessage } = require("../utils/helper")
const user = require("../db/models/user")

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
        const projects = await project.findAll({
            include: {
                model: user,
                attributes: { exclude: ['password'] }
            }
        })
        return res.status(200).json(successMessage("Project list fetched successfully!", projects));
    } catch (e) {
        return res.status(400).json(errorMessage("Project list could not be fetched!", e.message));
    }
})

const getProjectById = asyncHandler(async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const projectById = await project.findByPk(
            projectId,
            {
                include: {
                    model: user,
                    attributes: { exclude: ['password'] }
                }
            }
        );

        if (!projectById) return res.status(400).json(errorMessage(`Project with id:${projectId} does not exist!`, "failure"));
        return res.status(200).json(successMessage("Project fetched successfully!", projectById));

    } catch (e) {
        return res.status(400).json(errorMessage("Project could not be fetched!", e.message));
    }
})

const updateProject = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const projectId = req.params.id;
    const body = req.body;

    const result = await project.findOne({
        where: { id: projectId, createdBy: userId },
    });

    if (!result) {
        return res.status(400).json(errorMessage(`Project with id:${projectId} does not exist!`, "failure"));
    }

    result.title = body.title;
    result.productImage = body.productImage;
    result.price = body.price;
    result.shortDescription = body.shortDescription;
    result.description = body.description;
    result.productUrl = body.productUrl;
    result.category = body.category;
    result.tags = body.tags;

    const updatedResult = await result.save();

    return res.status(200).json(successMessage("Project fetched successfully!", updatedResult));

});

const deleteProject = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const projectId = req.params.id;

    const result = await project.findOne({
        where: { id: projectId, createdBy: userId },
    });

    if (!result) {
        return res.status(400).json(errorMessage(`Project with id:${projectId} does not exist!`, "failure"));
    }

    await result.destroy();

    return res.status(200).json(successMessage("Project fetched successfully!", result));

});

module.exports = { createProject, getAllProjects, getProjectById, deleteProject, updateProject }