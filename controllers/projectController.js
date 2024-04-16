const asyncHandler = require("express-async-handler")
const Project = require("../db/models/project")
const User = require("../db/models/user")
const { errorMessage, successMessage } = require("../utils/helper")

const createProject = asyncHandler(async (req, res) => {
    const body = req.body
    const userId = req.userId

    const newProject = await Project.create({
        title: body.title,
        is_featured: body.isFeatured,
        product_image: body.productImage,
        price: body.price,
        short_description: body.shortDescription,
        description: body.description,
        product_url: body.productUrl,
        category: body.category,
        tags: body.tags,
        created_by: userId,
    });

    if (!newProject) return res.status(400).json(errorMessage("Project could not be created!", "failed"));
    return res.status(200).json(successMessage("Project created successfully!", newProject));

})

const getAllProjects = asyncHandler(async (req, res) => {
    try {
        const projects = await Project.findAll({
            include: {
                model: User,
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
        const projectById = await Project.findByPk(
            projectId,
            {
                include: {
                    model: User,
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

    const result = await Project.findOne({
        where: { id: projectId, created_by: userId },
    });

    if (!result) {
        return res.status(400).json(errorMessage(`Project with id:${projectId} does not exist!`, "failure"));
    }

    result.title = body.title;
    result.product_image = body.productImage;
    result.price = body.price;
    result.short_description = body.shortDescription;
    result.description = body.description;
    result.product_url = body.productUrl;
    result.category = body.category;
    result.tags = body.tags;

    const updatedResult = await result.save();

    return res.status(200).json(successMessage("Project fetched successfully!", updatedResult));

});

const deleteProject = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const projectId = req.params.id;

    const result = await Project.findOne({
        where: { id: projectId, created_by: userId },
    });

    if (!result) {
        return res.status(400).json(errorMessage(`Project with id:${projectId} does not exist!`, "failure"));
    }

    await result.destroy();

    return res.status(200).json(successMessage("Project fetched successfully!", result));

});

module.exports = { createProject, getAllProjects, getProjectById, deleteProject, updateProject }
