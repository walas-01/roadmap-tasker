import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // same type as the default _id type
    default: () => new mongoose.Types.ObjectId(), // generate new ObjectId for user_id
  },
  username:{
    type:String,
    unique:true,
    required:true,
    trim:true,
    minlength: [3,'Username must be at least 3 characters long!'],
    maxlength: [16,'Username cannot be more than 16 characters long']
  },
  email:{
    type:String,
    required:true,
    unique:true, // email must be unique
    validate: {
      validator: function (v) { // simple email validation regex
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v); 
      },
      message: props => `${props.value} is not a valid email!`,
    }  
  },
  password:{
    type:String,
    required:true,
    minlength: [6, 'Password must be at least 6 characters long'] // will never happend becouse is encrypted :/
  }
},{timestamps:true})


export default  mongoose.model('User',userSchema)