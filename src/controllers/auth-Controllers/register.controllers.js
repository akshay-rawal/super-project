import { asyncHandlers } from "../../utills/asyncHandler.js";
import { apiError } from "../../utills/apiErrorHandler.js";
import {User} from "../../models/user.models.js";
import { sendMail } from "../../utills/mails/mail.js";
import { emailVerificationMailGenContent } from "../../utills/mails/emailverification.js";
import { apiResponseHandler } from "../../utills/apiResponseHandler.js";

const register = asyncHandlers(async (req, res, next) => {
  const { username, email, password } = req.body;

  const exitingUser = await User.findOne({ email });
  if (exitingUser) {
   return res.status(400).json(new apiError(400, "User already avaiable"))

  }

  const user = await User.create({
    username,
    email,
    password,
    isEmailVerified: false,
  });

  const { unHashedToken, hashToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save();

  const verifyLink = `${process.env.BASE_URL}/api/v1/users/verify-email/${unHashedToken}`;

  await sendMail({
    to: email,
    subject: "Verify your email",
    generatecontent: emailVerificationMailGenContent(username, verifyLink),
  });

  return res.status(200).json(new apiResponseHandler(200, { message: "user register sucessFully" }))
});

export {register};
