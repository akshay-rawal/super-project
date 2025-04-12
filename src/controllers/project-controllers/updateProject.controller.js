import { Project } from "../../models/project.models.js";
import { ProjectMember } from "../../models/projectMember.models.js";
import { UserRoleEnum } from "../../utills/constant.js";
import { asyncHandlers } from "../../utills/asyncHandler.js";
import { apiError } from "../../utills/apiErrorHandler.js";
import { apiResponseHandler } from "../../utills/apiResponseHandler.js";

export const updateProject = asyncHandlers(async (req, res) => {
  const projectId = req.params.id;
  const userId = req.user.id;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(401).json(new apiError(401, "Project not available"));
  }

  // Check if user is ProjectAdmin or creator
  const isProjectAdmin = await ProjectMember.findOne({
    project: projectId,
    user: userId,
    role: UserRoleEnum.PROJECT_ADMIN,
  });

  const isProjectCreator = project.createdBy.toString() === userId;

  if (!isProjectAdmin && !isProjectCreator) {
    return res.status(403).json(new apiError(403, "Forbidden: You do not have permission to update this project"));
  }

  // Update fields
  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;

  await project.save();

  return res.status(200).json(new apiResponseHandler(200, "Project updated", project));
});
