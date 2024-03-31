const router = require('express').Router()
const { createProject, getAllProjects } = require('../controllers/projectController')
const isAuthenticated = require('../middlewares/authMiddleware')

router.route('/new').post(isAuthenticated, createProject)
router.get('/all', getAllProjects)

module.exports = router
