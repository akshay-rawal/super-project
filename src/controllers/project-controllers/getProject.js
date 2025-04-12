import { Project } from "../../models/project.models.js";
import { apiError } from "../../utills/apiErrorHandler.js";
import { asyncHandlers } from "../../utills/asyncHandler.js";
import { apiResponseHandler } from "../../utills/apiResponseHandler.js";
import { ProjectMember } from "../../models/projectMember.models.js";

export const getProjectById = asyncHandlers(async (req, res) => {
  const projectId = req.params.id;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status.json(new apiError(404, "Project not found"));
  }

  return res
    .status(200)
    .json(new apiResponseHandler(200, "successfully go into project", project));
});

export const getProjects = asyncHandlers(async (req, res) => {
  const projects = await Project.find();

  if (!projects || projects.length === 0) {
    throw new apiError(404, "No projects found");
  }

  // Manual filtering of unnecessary fields
  const filteredProjects = projects.map((project) => ({
    name: project.name,
    description: project.description,
    createdBy: project.createdBy,
  }));

  return res
    .status(200)
    .json(
      new apiResponseHandler(
        200,
        "all projects get successfully",
        filteredProjects
      )
    );
});

export const deleteProject = asyncHandlers(async (req, res) => {
  const projectId = req.params.id;

  // Check if project exists
  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json(new apiError(404, "Project not found"));
  }

  const isProjectAdmin = ProjectMember.findOne({
    project: projectId,
    user: req.user.id,
    role: UserRoleEnum.PROJECT_ADMIN,
  });

  const isProjectCreator = project.createdBy.toString() === req.user.id;

  if (!isProjectAdmin && !isProjectCreator) {
    return res
      .status(403)
      .json(
        new apiError(
          403,
          "Forbidden: You do not have permission to delete this project"
        )
      );
  }

  // Delete project
  await Project.findByIdAndDelete(projectId);

  return res
    .status(200)
    .json(new apiResponseHandler(200, "project deleted successfully"));
});


