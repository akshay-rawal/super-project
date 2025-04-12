import { ProjectMember } from "../models/projectMember.models.js";
import { Project } from "../models/project.models.js";
import { apiError } from "../utills/apiErrorHandler.js";
import { apiResponseHandler } from "../utills/apiResponseHandler.js";
import { asyncHandlers } from "../utills/asyncHandler.js";
import { UserRoleEnum,AvailableUserRoles } from "../utills/constant.js";

 const addMemberToProject = asyncHandlers(async (req, res) => {
  const adminId = req.user.id;
  const { projectId, userId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json(new apiError(404, "Project not found"));
  }

  const isAdmin = await ProjectMember.findOne({
    user: adminId,
    project: projectId,
    role: UserRoleEnum.PROJECT_ADMIN,
  });

  if (!isAdmin) {
    return res
      .status(403)
      .json(new apiError(403, "Only project admin can add members"));
  }

  const existingMember = await ProjectMember.findOne({
    user: userId,
    project: projectId,
  });

  if (existingMember) {
    return res
      .status(400)
      .json(new apiError(400, "User already a member of the project"));
  }

  const newMember = await ProjectMember.create({
    user: userId,
    project: projectId,
  });

  return res
    .status(200)
    .json(
      new apiResponseHandler(
        200,
        "User added to project successfully",
        newMember
      )
    );
});

 const getOnlyProjectMembers = asyncHandlers(async (req, res) => {
  const { projectId } = req.params;

  const members = await ProjectMember.find({
    project: projectId,
    role: UserRoleEnum.MEMBER,
  }).populate("user", "name email");

  if (!members || members.length === 0) {
    return res
      .status(404)
      .json(new apiError(404, "No members (excluding admin) found"));
  }

  return res
    .status(200)
    .json(
      new apiResponseHandler(
        200,
        "Project members fetched successfully",
        members
      )
    );
});

 const updateMemberRole = asyncHandlers(async (req, res) => {
  const { projectId,userId } = req.params;
  const { role } = req.body;
  

  const projectMember = await ProjectMember.findOne({
    project: projectId,
    user: req.user.id,
  });
 
if (!AvailableUserRoles.includes(role)) {
  return res.status(400).json(new apiError(400, "Invalid role provided"));
}

const requestingUser = await ProjectMember.findOne({
  project: projectId,
  user: req.user.id,
});

if (!requestingUser || requestingUser.role !== UserRoleEnum.PROJECT_ADMIN) {
  return res.status(403).json(new apiError(403, "Unauthorized action"));
}

  const memberRecord = await ProjectMember.findOne({
    project: projectId,
    user: userId,
  });

  if (!memberRecord) {
    return res
      .status(404)
      .json(new apiError(404, "Member not found in the project"));
  }

  memberRecord.role = role 

  await memberRecord.save();

  return res
    .status(200)
    .json(
      new apiResponseHandler(
        200,
        "Member role updated successfully",
        memberRecord
      )
    );
});

const deleteProjectMember = asyncHandlers(async (req, res) => {
  const adminId = req.user.id;
  const { projectId, userId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json(new apiError(404, "Project not found"));
  }

  const adminRecord = await ProjectMember.findOne({
    user: adminId,
    project: projectId,
    role: UserRoleEnum.PROJECT_ADMIN,
  });

  if (!adminRecord) {
    return res
      .status(403)
      .json(new apiError(403, "Only project admin can delete members"));
  }

  const memberRecord = await ProjectMember.findOne({
    user: userId,
    project: projectId,
  });

  if (!memberRecord) {
    return res
      .status(404)
      .json(new apiError(404, "Member not found in this project"));
  }

  if (userId === adminId) {
    return res
      .status(400)
      .json(new apiError(400, "Admin cannot remove themselves"));
  }

  await ProjectMember.deleteOne({ _id: memberRecord._id });

  return res
    .status(200)
    .json(
      new apiResponseHandler(
        200,
        "Project member deleted successfully",
        memberRecord
      )
    );
});



export {updateMemberRole,getOnlyProjectMembers,addMemberToProject,deleteProjectMember}