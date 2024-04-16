const asyncHandler = require("express-async-handler");
const Task = require("../db/models/task");
const { errorMessage, successMessage } = require("../utils/helper");
const User = require("../db/models/user");
const { setOrGet } = require('../utils/redisHelper');
const { taskQueue } = require('../utils/bullHelper')

const createTask = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const created_by = req.userId;

    const task = await taskQueue.add('Task', { title, created_by })

    // if (!newTask) return res.status(400).json(errorMessage("Task could not be created!", "failed"));
    return res.status(200).json(successMessage("Task created successfully!", task.data));
});

const getAllTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: {
                model: User,
                attributes: { exclude: ['password'] }
            }
        });
        return res.status(200).json(successMessage("Task list fetched successfully!", tasks));
    } catch (e) {
        return res.status(400).json(errorMessage("Task list could not be fetched!", e.message));
    }
});

const getTasksByUser = asyncHandler(async (req, res) => {
    const userId = req.userId;
    try {
        const cachedTasks = await setOrGet(`tasks?${userId}`, async () => {
            return await Task.findAll({
                where: { created_by: userId },
                include: {
                    model: User,
                    attributes: { exclude: ['password'] }
                }
            });
        }, process.env.DEFAULT_EXPIRE_TIME);

        return res.status(200).json(successMessage("User's tasks fetched successfully!", cachedTasks));
    } catch (e) {
        return res.status(400).json(errorMessage("User's tasks could not be fetched!", e.message));
    }
});

const updateTask = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.id;
    const body = req.body;

    const task = await Task.findOne({
        where: { id: taskId, created_by: userId },
    });

    if (!task) {
        return res.status(400).json(errorMessage(`Task with id:${taskId} does not exist!`, "failure"));
    }

    task.title = body.title;
    task.completed = body.completed;

    const updatedTask = await task.save();

    return res.status(200).json(successMessage("Task updated successfully!", updatedTask));
});

const deleteTask = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.id;

    const task = await Task.findOne({
        where: { id: taskId, created_by: userId },
    });

    if (!task) {
        return res.status(400).json(errorMessage(`Task with id:${taskId} does not exist!`, "failure"));
    }

    await task.destroy();

    return res.status(200).json(successMessage("Task deleted successfully!", task));
});

module.exports = { createTask, getAllTasks, getTasksByUser, updateTask, deleteTask };
