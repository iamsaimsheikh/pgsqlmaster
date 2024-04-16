const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { createTask, getAllTasks, getTasksByUser, updateTask, deleteTask } = require('../controllers/taskController');

router.post('/new', isAuthenticated, createTask);
router.get('/all', isAuthenticated, getAllTasks);
router.get('/user', isAuthenticated, getTasksByUser);
router.patch('/:id', isAuthenticated, updateTask);
router.delete('/:id', isAuthenticated, deleteTask);

module.exports = router;
