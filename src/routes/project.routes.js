import { createProject } from "../controllers/project-controllers/createProject.js";
import { projectValidator } from "../validators/index.js";
import { validate } from "../middleware/validator.middleware.js";
import { updateProject } from "../controllers/project-controllers/updateProject.controller.js";
import { authenticate } from "../controllers/auth-Controllers/authenticate.middleware.js";

import { Router } from "express";

const router = Router()


router.route("/create-project").post(authenticate,projectValidator(),validate,createProject)
router.route("/update-project/:id").post(authenticate,projectValidator(),validate,updateProject)


export default router