import express from 'express'
const boardRouter = express.Router()

import authMiddleware from '../middlewares/auth-middleware.js'
import boardController from '../controllers/board_controller.js'


boardRouter.route('/board')
  .get(authMiddleware, boardController.getBoards) // GET /api/board
  .post(authMiddleware, boardController.createBoard) // POST /api/board
  .delete(authMiddleware, boardController.deleteBoard) // DELETE /api/board

export default boardRouter