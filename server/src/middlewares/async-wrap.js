
/*
  the idea is that, instead of repeating the trycatch block for each funtion
  on my controllers, we do a function (async wrapper) that does it.
  From the controllers, we have to call this asyncWrap with our function in it
  and it will execute it within a trycatch block and next it to the error handler
  if necessary  :D 
*/

export default function asyncWrap(fn){
  return async (req,res,next)=>{
    try {
      await fn(req,res,next)
    } catch (err) {
     next(err)
    }
  }
}