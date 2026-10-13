const { Router } = require('express')
const {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  addComment,
} = require('../controllers/taskController')

const router = Router()

router.get('/', listTasks)
router.get('/:id', getTask)
router.post('/', createTask)
router.put('/:id', updateTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)
router.post('/:id/comments', addComment)

module.exports = router
