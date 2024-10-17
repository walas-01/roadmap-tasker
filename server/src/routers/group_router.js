import express from 'express'
const groupRouter = express.Router()

import groupController from '../controllers/group_controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'

// GET /api/group
groupRouter.route('/group').get(authMiddleware,groupController.getGroups)
// POST /api/group
groupRouter.route('/group').post(authMiddleware,groupController.createGroup)
// DELETE /api/group
groupRouter.route('/group').delete(authMiddleware,groupController.deleteGroup)
// PUT /api/group
groupRouter.route('/group').put(authMiddleware,groupController.updateGroup)

export default groupRouter
