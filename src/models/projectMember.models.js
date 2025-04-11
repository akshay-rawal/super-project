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
        enum:AvailableUserRoles,
        default:UserRoleEnum.MEMBER
    }
  },
  { timestamps: true }
);

export const projectMember = mongoose.model(
  "projectMember",
  projectMemberSchema
);
