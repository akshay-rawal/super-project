import mongoose, { Schema } from "mongoose";
import {UserRoleEnum,AvailableUserRoles} from "../utills/constant.js"
const projectMemberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project:{
      type: Schema.Types.ObjectId,                                          
      ref:"Project"
    },
    role:{
        type:String,
        enum:AvailableUserRoles,// ["admin", "project_admin", "member"]
        default:UserRoleEnum.MEMBER
    }
  },
  { timestamps: true }
);

export const ProjectMember = mongoose.model(
  "ProjectMember",
  projectMemberSchema
);

