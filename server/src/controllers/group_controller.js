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


groupController.deleteGroup = asyncWrap( async(req,res,next)=>{ // ------------------------------- [DELETE] -
  console.log('[Group]: DELETE')

  const {group_id} = req.body

  await Group.deleteOne({group_id})

  res.status(204).send({message:'group deleted'})
})

groupController.updateGroup = asyncWrap( async(req,res,next)=>{ // ------------------------------- [UPDATE] -
  console.log('>[Group]: UPDATE')

  const {group_id,groupObject} = req.body

  console.log("i want to update group ",group_id)
  console.log(groupObject)


  const result = await Group.updateOne(
    {group_id},
    {$set:groupObject}
  )
  console.log(result)


  if (result.modifiedCount === 0) {
    console.log('No se encontró el item o no se realizaron cambios')
    res.status(200).send({message:'no group modified'})
  }

  res.status(200).send({message:'group updated, i guess?'})
})


export default groupController