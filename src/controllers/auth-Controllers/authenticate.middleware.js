import { apiResponseHandler } from "../../utills/apiResponseHandler.js";
import { apiError } from "../../utills/apiErrorHandler.js";
import { asyncHandlers } from "../../utills/asyncHandler.js";
import { User } from "../../models/user.models.js";
import jwt from "jsonwebtoken";

export const authenticate = asyncHandlers(async (req, res, next) => {
  const token = req.cookies?.refreshtoken;
  if (!token) {
    return res
      .status(401)
      .json(new apiError(401, "Access denied. Token missing."));
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_REFRESH_SECRET);

    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json(new apiError(401, "User not found."));
    }

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json(new apiError(401, "Invalid or expired token.", error));
  }
});

