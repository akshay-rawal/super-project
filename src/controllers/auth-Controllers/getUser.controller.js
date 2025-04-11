
import { apiResponseHandler } from "../../utills/apiResponseHandler.js";
import {apiError} from "../../utills/apiErrorHandler.js"
import { asyncHandlers } from "../../utills/asyncHandler.js";
import { User } from "../../models/user.models.js";

const getUser = asyncHandlers(async(req,res)=>{
        const userId = req.user.id
         const user = await User.findById(userId)
         if(!user){
            return res.status(200).json(new apiError(404, "User not found"))
         }

         return res
         .status(200)
         .json(new apiResponseHandler(200, "User fetched successfully", user));
     });

     export {getUser}