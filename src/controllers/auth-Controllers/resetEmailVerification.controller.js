import {User} from "../../models/user.models.js";
import { apiError } from "../../utills/apiErrorHandler.js";
import { asyncHandlers } from "../../utills/asyncHandler.js";
import { sendMail } from "../../utills/mails/mail.js";
import { emailVerificationMailGenContent } from "../../utills/mails/emailverification.js";
import { apiResponseHandler } from "../../utills/apiResponseHandler.js";

const resetEmailVerification = asyncHandlers(async (req, res) => {
  const email = req.body?.email;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json(new apiError(404, "User not found"));
  }

  if (user.isEmailVerified) {
    return res.status(400).json(new apiError(400, "Email is already verified"));
  }

  const { unHashedToken, hashToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashToken;
  user.emailVerificationExpiry = tokenExpiry;

  const verifyLink = `${process.env.BASE_URL}/api/v1/users/verify-email/${unHashedToken}`;

  await sendMail({
    to: email,
    subject: "Resend Email Verification",
    generatecontent: emailVerificationMailGenContent(user.username, verifyLink),
  });
  return res.status(200).json(new apiResponseHandler(200, { message: "verification Link sent." }))

});

export {resetEmailVerification}