import app from './app.js'
import connectToDataBase from './db.js'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3000


async function start(){
  try {
    await connectToDataBase()
    app.listen(PORT,()=>{
      console.log("[Server]: server up and running on port ",PORT)
    })
  } catch (err) {
   console.log(err) 
  }
}


start()