const router = require('express').Router()
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController')
const { isAuthenticated, restrictTo } = require('../middlewares/authMiddleware')

router.route('/new').post(isAuthenticated, restrictTo('1'), createProject)

router.get('/all', isAuthenticated, restrictTo('1'), getAllProjects)

router.route('/:projectId')
    .get(isAuthenticated, getProjectById)
    .patch(isAuthenticated, restrictTo('1'), updateProject)
    .delete(isAuthenticated, restrictTo('1'), deleteProject);

module.exports = router
