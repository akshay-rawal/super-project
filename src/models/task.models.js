import mongoose,{Schema} from 'mongoose'
import {TaskStatusEnum,AvailableTaskStatuses} from "../utills/constant.js"
import { type } from 'server/reply'

const taskSchema = new Schema({
    title:{
        required:true,
        trim:true,
        type:String
    },
    description:{
        type:String, 
    },
   
    project:{
        type:Schema.Types.ObjectId,
        ref:"Project",
        required:true
      },
      assignedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
      },
      assignTo:{
        type:Schema.Types.ObjectId,
        ref:"User",
      },
      status:{
        enum:AvailableTaskStatuses,
        default:TaskStatusEnum.TODO
      },
      attachments:{
        type:[
            {
             url:String,
             mimetype:String,
             size:Number,

        }
    ],
         default:[]
      }

},

{ timestamps: true }
)


export const Task = mongoose.model("Task",taskSchema)