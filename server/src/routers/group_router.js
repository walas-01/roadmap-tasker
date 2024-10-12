import express from 'express'
const groupRouter = express.Router()

import groupController from '../controllers/group_controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'

// GET /api/group
groupRouter.route('/group').get(authMiddleware,groupController.getGroups)
// GET /api/group
groupRouter.route('/group').post(authMiddleware,groupController.createGroup)


export default groupRouter
