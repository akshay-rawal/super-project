import {User} from "../../models/user.models.js";
import { apiResponseHandler } from "../../utills/apiResponseHandler.js";
import { apiError } from "../../utills/apiErrorHandler.js";
import { asyncHandlers } from "../../utills/asyncHandler.js";

 const loginUser = asyncHandlers(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json(new apiError(401, "User not found!"))
  }
  const validPassword = await user.isPasswordCorrect(password);
  if (!validPassword) {
    return res.status(400).json(new apiError(401, "User not found!"))
  }

  const accesstoken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()


res.cookie("refreshtoken",refreshToken,{
   httpOnly : true
})

return res.status(200).json(new apiResponseHandler(200, "Email verified successfully", {
    accesstoken,
    email:user.email
}));

});

export {loginUser}