import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

async function connectToDataBase(){
  try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("[database]: successfully connected to database")
  }catch(err){
    console.log(err)
  }
}

export default connectToDataBase