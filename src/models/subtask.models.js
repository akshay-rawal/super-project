import mongoose,{Schema} from 'mongoose'

const subTaskSchema = new Schema({

  task:{
    type:Schema.Types.ObjectId,
    ref:"Task",
    required:true
  },
  isCompleted:{
    type:Boolean,
    default:false
  },
   createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

},
{ timestamps: true }

)


export const subTask = mongoose.model("subTask",subTaskSchema)