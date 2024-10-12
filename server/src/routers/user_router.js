import express from 'express'
import userController from '../controllers/user_controller.js'

const userRouter = express.Router()

//! MUST DELETE getAllUSers
userRouter.route('/users').get(userController.getAllUsers)
// POST /api/register
userRouter.route('/register').post(userController.register)
// POST /api/login
userRouter.route('/login').post(userController.login)

export default userRouter