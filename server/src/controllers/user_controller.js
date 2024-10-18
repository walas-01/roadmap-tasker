import User from '../models/user_model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

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

userController.register = asyncWrap(async(req,res,next)=>{ // ---------------------------------- [REGISTER] -
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

userController.login = asyncWrap(async(req,res,next)=>{ // ---------------------------------- [LOGIN] -
  console.log(">[LOGIN]: loging user")

  const {email,password} = req.body

  const user = await User.findOne({email})

  if(!user){return next(new CustomError(400,'No user found with that email'))} // ERROR if not exist
  const isCorrectPass = await bcrypt.compare(password,user.password)
  console.log(isCorrectPass)
  if(!isCorrectPass){return next(new CustomError(400,'Incorrect password'))} // ERROR if wrong password

  const token = jwt.sign({user_id:user.user_id,username:user.username},process.env.JWT_SECRET,{
    expiresIn: '15d'
  })

  res.cookie('access_token',token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'None',
    maxAge: 60 * 60 * 1000 * 24 * 15,
  }).status(200).send({message:'User logged in. Session started.'})
})


userController.logout = asyncWrap( (req,res,next)=>{
  res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'strict' });
  res.status(200).json({ message: 'session ended' });
})

export default userController