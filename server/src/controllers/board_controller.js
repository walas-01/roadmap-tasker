import Board from '../models/board_model.js'
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

  res.status(201).send(newBoard)
})


export default boardController
