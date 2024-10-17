import CustomError from "../customError/custom-error.js"

const errorHandler = (err,req,res,next)=>{
  console.log(err.message)

  if(err instanceof CustomError){
    return res.status(err.statusCode).send({
      message:err.message? err.message : 'Something went wrong'
    })
  }

  return res.status(500).send({message:'Something went wrong',error:err.message})
}

export default errorHandler