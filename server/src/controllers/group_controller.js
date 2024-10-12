import Group from '../models/group_model.js'
import asyncWrap from '../middlewares/async-wrap.js'

const groupController = {}

groupController.getGroups = asyncWrap( async(req,res,next)=>{ // ------------------------------- [GET] -
  console.log('[Group]: GET')
  const {user_id,username} = req.user

  const groupList = await Group.find({ownerUser_id:user_id})

  res.status(200).send(groupList)
})


groupController.createGroup = asyncWrap(async(req,res,next)=>{ // ------------------------------- [POST] -
  console.log('[Group]: POST')
  const {user_id,username} = req.user
  const {ownerBoard_id,tittle} = req.body

  console.log('[creating group for]: ',username)

  const newGroup = new Group({
    ownerBoard_id:ownerBoard_id,
    ownerUser_id:user_id,
    tittle
  })

  await Group.create(newGroup)

  res.status(201).send({group_id:newGroup.group_id})
})


export default groupController