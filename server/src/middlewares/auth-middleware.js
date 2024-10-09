import jwt from 'jsonwebtoken'
import CustomError from '../customError/custom-error.js'

function authMiddleware(req,res,next){

  const token = req.cookies.access_token 

  if(!token){return next(new CustomError(403,'Looks like you are not sign in'))}

  try {
    const {user_id,username} = jwt.verify(token,process.env.JWT_SECRET) // throws error if incorrect token

    req.user = {user_id,username}
    next()

  } catch (error) {
    return next(new CustomError(401,'Access not authorized'))
  }
}

export default authMiddleware