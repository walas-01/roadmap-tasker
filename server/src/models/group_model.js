import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  ownerBoard_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
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
  },
  tasks: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  }
})



export default mongoose.model('Group',groupSchema)