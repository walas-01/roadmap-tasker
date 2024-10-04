import express from 'express'
import userController from '../controllers/user_controller.js'

const userRouter = express.Router()

userRouter.route('/users').get(userController.getAllUsers)

export default userRouter