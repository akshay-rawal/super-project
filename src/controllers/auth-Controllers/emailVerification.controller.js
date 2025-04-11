/* yahan dono token user ke liye create karege
aur jo email se aaya hai mtlb param se vo sahi hai ya nhi vo check karege
hai ya nhi vo check karege
db se baat karunga */

import { User } from "../../models/user.models.js";
import { asyncHandlers } from "../../utills/asyncHandler.js";
import { apiError } from "../../utills/apiErrorHandler.js";
import  crypto from "crypto"
import { apiResponseHandler } from "../../utills/apiResponseHandler.js";

export const VerifyEmail = asyncHandlers(async(req,res)=>{
           const {token} = req.params
         //db me rakhe token 
           const hashUpcomingToken = crypto.createHash("sha256")
           .update(token)
           .digest("hex");

           const user = await User.findOne({
             emailVerificationToken:hashUpcomingToken,
             emailVerificationExpiry:{ $gt: Date.now()}
           })

           if(!user){
              return res.status(200).json(new apiError(404, "User not found"))
        }
           user.isEmailVerified = true
           user.emailVerificationExpiry = null
           user.emailVerificationToken = null

           const accesstoken = user.generateAccessToken()
           const refreshToken = user.generateRefreshToken()

         await user.save()

         res.cookie("refreshtoken",refreshToken,{
            httpOnly : true
         })
         
         return res.status(200).json(new apiResponseHandler(200, "Email verified successfully", accesstoken))
        })


