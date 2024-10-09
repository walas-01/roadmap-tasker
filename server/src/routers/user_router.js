import express from 'express'
import userController from '../controllers/user_controller.js'

import authMiddleware from '../middlewares/auth-middleware.js'

const userRouter = express.Router()

userRouter.route('/users').get(userController.getAllUsers)

userRouter.route('/register').post(userController.register)
userRouter.route('/login').post(userController.login)


userRouter.route('/protected').get(authMiddleware,userController.protected)


export default userRouter