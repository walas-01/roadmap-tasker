import User from '../models/user_model.js'

import asyncWrap from '../middlewares/async-wrap.js'
import CustomError from '../customError/custom-error.js'
const userController = {}


userController.getAllUsers = asyncWrap (async (req,res,next)=>{ // ---------------------------------- [GET] -
  console.log("----------[GET]")

  const userList = await User.find()

  //! this is how to throw a custom error:
  // if(userList.length === 0 ){return next(new CustomError(300,'No users found'))}

  res.status(200).send({ message: 'getting all users', data: userList })

  // res.status(500).send({ message: 'error while getting all users', error: err.message })
  // console.log(err)

})


export default userController