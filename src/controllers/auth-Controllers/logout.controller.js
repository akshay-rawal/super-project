import {User} from "../../models/user.models.js";
import { apiError } from "../../utills/apiErrorHandler.js";
import { asyncHandlers } from "../../utills/asyncHandler.js";
import { apiResponseHandler } from "../../utills/apiResponseHandler.js";

export const logout = asyncHandlers(async (req, res) => {
  const refreshToken  = req.cookies?.refreshToken;

  res.clearCookie("refreshtoken", {
    httpOnly: true,
  });

  if (!refreshToken) {
    return res
      .status(200)
      .json(new apiResponseHandler(200, "Logged out successfully", null));
  }
  const user = await User.findOne({ refreshToken });

  if (user) {
    user.refreshToken = null;
    await user.save();
  }
});
