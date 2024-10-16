import express from 'express'
import userController from '../controllers/user_controller.js'

const userRouter = express.Router()

// POST /api/register
userRouter.route('/register').post(userController.register)
// POST /api/login
userRouter.route('/login').post(userController.login)
// POST /api/logo
userRouter.route('/logout').post(userController.logout)


export default userRouter