import express from 'express'
import userController from '../controllers/user_controller.js'

const userRouter = express.Router()

userRouter.route('/users').get(userController.getAllUsers)

userRouter.route('/register').post(userController.register)


export default userRouter