import {Schema,model} from 'mongoose'

const groupSchema = new Schema({
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
    type: [Schema.Types.Mixed],
    default: []
  }
})



export default model('Group',groupSchema)