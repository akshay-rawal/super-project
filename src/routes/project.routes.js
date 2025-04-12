import { createProject } from "../controllers/project-controllers/createProject.js";
import { projectValidator } from "../validators/index.js";
import { validate } from "../middleware/validator.middleware.js";
import { updateProject } from "../controllers/project-controllers/updateProject.controller.js";
import { authenticate } from "../controllers/auth-Controllers/authenticate.middleware.js";
import { getProjectById } from "../controllers/project-controllers/getProject.js";
import { getProjects } from "../controllers/project-controllers/getProject.js";

import { Router } from "express";

const router = Router();

router
  .route("/create-project")
  .post(authenticate, projectValidator(), validate, createProject);
router
  .route("/update-project/:id")
  .put(authenticate, projectValidator(), validate, updateProject);
router.route("/get-project/:id").get(authenticate, getProjectById);
router.route("/get-projects").get(authenticate, getProjects);

export default router;
