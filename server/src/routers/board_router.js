import express from 'express'
const boardRouter = express.Router()

import authMiddleware from '../middlewares/auth-middleware.js'
import boardController from '../controllers/board_controller.js'

// GET /api/board
boardRouter.route('/board').get(authMiddleware, boardController.getBoards)
// POST /api/board
boardRouter.route('/board').post(authMiddleware, boardController.createBoard)


export default boardRouter