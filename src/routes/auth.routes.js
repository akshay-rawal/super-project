import { Router } from "express";
import {register} from "../controllers/auth-Controllers/register.controllers.js";
import { userLoginValidator,userregisterValidator } from "../validators/index.js";
import { validate } from "../middleware/validator.middleware.js";
import { VerifyEmail } from "../controllers/auth-Controllers/emailVerification.controller.js";
import { logout } from "../controllers/auth-Controllers/logout.controller.js";
import { loginUser } from "../controllers/auth-Controllers/login.controller.js";
import { forgotPassword,resetPassword } from "../controllers/auth-Controllers/forgotPassword.controller.js";
import { resetPasswordValidator } from "../validators/index.js";
import { resetEmailVerification } from "../controllers/auth-Controllers/resetEmailVerification.controller.js";
import { getUser } from "../controllers/auth-Controllers/getUser.controller.js";
import { refreshAccessToken } from "../controllers/auth-Controllers/refreshAccess.controller.js"
import { authenticate } from "../controllers/auth-Controllers/authenticate.middleware.js";
const router = Router();
router.route("/register").post(userregisterValidator(), validate, register);
router.route("/verify-email/:token").get(VerifyEmail)
router.route('/login').post(userLoginValidator(),validate,loginUser)
router.route("/logout").get(logout)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:token").post(resetPasswordValidator(),validate,resetPassword)
router.route("/resend-verification").get(resetEmailVerification)
router.route("/refreshAccessToken").get(refreshAccessToken)
router.route("/get-user").get(authenticate,getUser)



export default router;
