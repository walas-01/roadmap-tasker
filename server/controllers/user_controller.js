import User from '../models/user_model.js'

import asyncWrap from '../middlewares/async-wrap.js'
const userController = {}


userController.getAllUsers = asyncWrap (async (req,res)=>{ // ---------------------------------- [GET] -

  const userList = await User.find()

  res.status(200).send({ message: 'getting all users', data: userList })

  // res.status(500).send({ message: 'error while getting all users', error: err.message })
  // console.log(err)

})


export default userController