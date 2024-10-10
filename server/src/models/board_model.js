import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
  board_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  ownerUser_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tittle:{
    type:String,
    required:true,
    trim:true
  }
},{timestamps:true})


export default mongoose.model('Board',boardSchema)
