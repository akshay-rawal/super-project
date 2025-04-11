
import { apiResponseHandler } from "../../utills/apiResponseHandler.js";
import {apiError} from "../../utills/apiErrorHandler.js"
import { asyncHandlers } from "../../utills/asyncHandler.js";
import { User } from "../../models/user.models.js";

const  refreshAccessToken = asyncHandlers(async(req,res)=>{
          const refreshToken = req.cookies?.refreshToken

          if (!refreshToken) {
            return res.status(401).json(new apiError(401, "Refresh token not found in cookies"));
          }
          const user = await User.findOne({refreshToken})
          if(!user){
            return res.status(401).json(new apiError(404, "token not found"))
        }

        const newRefreshToken = user.generateRefreshToken()
        const newAccessToken = user.generateAccessToken()

        user.refreshToken = newRefreshToken;

            await user.save()

        res.cookie("refreshtoken",newRefreshToken,{
            httpOnly : true
         })

        return res.status(200).json(new apiResponseHandler(200, "sucessfully generate token", newAccessToken))

}) 

export {refreshAccessToken}