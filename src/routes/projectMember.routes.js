import { authenticate } from "../controllers/auth-Controllers/authenticate.middleware.js";
import {
  updateMemberRole,
  getOnlyProjectMembers,
  addMemberToProject,
  deleteProjectMember,
} from "../controllers/projectMember.js";

import { Router } from "express";

const router = Router();

router
  .route("/update-member/:projectId/:userId")
  .put(authenticate, updateMemberRole);
router.route("/getProject-member/:projectId").get(getOnlyProjectMembers);
router
  .route("/add-projectmember/:projectId/:userId")
  .post(authenticate, addMemberToProject);
router
  .route("/delete-projectmember/:projectId/:userId")
  .delete(authenticate, deleteProjectMember);
