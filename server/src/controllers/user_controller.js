import User from '../models/user_model.js'
import bcrypt from 'bcrypt'


import asyncWrap from '../middlewares/async-wrap.js'
import CustomError from '../customError/custom-error.js'
const userController = {}


userController.getAllUsers = asyncWrap (async (req,res,next)=>{ // ---------------------------------- [GET] -
  console.log(">[GET]: getting all users")

  const userList = await User.find()

  //! this is how to throw a custom error:
  // if(userList.length === 0 ){return next(new CustomError(300,'No users found'))}

  res.status(200).send({ message: 'getting all users', data: userList })

  // res.status(500).send({ message: 'error while getting all users', error: err.message })
  // console.log(err)

})

userController.register = asyncWrap(async(req,res,next)=>{
  console.log(">[POST]: creating new user")

  const {username,email,password} = req.body
  const user = await User.findOne({email})

  if(user){return next(new CustomError(400,'Email already in use'))}
  if(username.length < 3 || username.length > 16){
    return next(new CustomError(400,'Username must be at least 3 characters long and cannot be more than 16 characters long'))
  }
  if(password.length < 6){return next(new CustomError(400,'Password can not have less than 6 characters'))}

  const hashedPass = await bcrypt.hash(password,11)

  const newUser = new User({
    username,
    email,
    password:hashedPass
  })

  await User.create(newUser)

  res.status(200).send({message:'User registered.'})
})

export default userController