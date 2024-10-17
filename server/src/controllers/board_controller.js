import Board from '../models/board_model.js'
import Group from '../models/group_model.js'

import asyncWrap from '../middlewares/async-wrap.js'

const boardController = {}

boardController.getBoards =  asyncWrap(async(req,res,next)=>{ // ------------------------------- [GET] -
  console.log('[Board]: GET')
  const {user_id,username} = req.user

  const boardList = await Board.find({ownerUser_id:user_id})

  res.status(200).send(boardList)
})


boardController.createBoard =  asyncWrap(async(req,res,next)=>{ // ---------------------------- [POST] -
  console.log('[Board]: POST')
  const {user_id,username} = req.user
  const {tittle} = req.body
  
  console.log('[creating board for]: ',username)
  
  const newBoard = new Board({
    ownerUser_id:user_id ,
    tittle
  })

  await Board.create(newBoard)

  res.status(201).send( {board_id:newBoard.board_id} )
})


boardController.deleteBoard = asyncWrap(async (req,res,next)=>{ // ---------------------------- [DELETE] -
  console.log('>[Board]: DELETE')

  const {board_id} = req.body


  await Board.deleteOne({board_id})

  await Group.deleteMany({ownerBoard_id:board_id})


  res.status(204).send({message:'group deleted'})
})


export default boardController
