import { Router } from 'express'
import { userController } from '../controllers/user_controller.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

export default router
