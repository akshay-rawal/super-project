import { User } from "../../models/user.models.js";
import { asyncHandlers } from "../../utills/asyncHandler.js";
import { apiError } from "../../utills/apiErrorHandler.js";
import { forgotPasswordVerification } from "../../utills/mails/passwordVerification.js";
import { sendMail } from "../../utills/mails/mail.js";
import crypto from "crypto"
import { apiResponseHandler } from "../../utills/apiResponseHandler.js";
const forgotPassword = asyncHandlers(async (req, res) => {
  const { email } = req.body;
  console.log("ROUTE HIT HUA");
  console.log("Request Body:", req.body);

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json(new apiError(200, "user is invalid"));
  }
  const { unHashedToken, hashToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.forgotPasswordToken = hashToken;
  user.forgotPasswordExpiry = tokenExpiry;

  await user.save();

  const verifyLink = `${process.env.BASE_URL}/api/v1/users/reset-password /${unHashedToken}`;
  await sendMail({
    to: email,
    subject: "Resend Email Verification",
    generatecontent: forgotPasswordVerification(user.username, verifyLink),
  });
});






const resetPassword = asyncHandlers(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  //db me rakhe token
  const hashUpcomingToken = crypto.createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashUpcomingToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(200).json(new apiError(404, "User not found"));
  }
  user.password = password;
  user.forgotPasswordToken = null;
  user.forgotPasswordExpiry = null;

  const accesstoken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await user.save();

  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
  });

  return res
    .status(200)
    .json(
      new apiResponseHandler(200, "password reset successfully", accesstoken)
    );
});

export { forgotPassword, resetPassword };
