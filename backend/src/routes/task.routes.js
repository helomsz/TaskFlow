import { Router } from 'express'
import {
  createTask,
  listTasks,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(authMiddleware)

router.post('/', createTask)
router.get('/', listTasks)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
