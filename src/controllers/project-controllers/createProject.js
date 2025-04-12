   import { Project } from "../../models/project.models.js";
   import { ProjectMember } from "../../models/projectMember.models.js";
   import { UserRoleEnum } from "../../utills/constant.js";

   import { apiError } from "../../utills/apiErrorHandler.js";
   import { apiResponseHandler } from "../../utills/apiResponseHandler.js";
   import { asyncHandlers } from "../../utills/asyncHandler.js";

   export const createProject = asyncHandlers(async(req,res)=>{
            
            const {name,description} = req.body
   
            const dbProject = await Project.findOne({name})
         if (dbProject){
               return res.status(401).json( new apiError(401,"project already available"))
            }

            const newProject = await Project.create({
               name,
               description,
               createdBy:req.user.id
            })

            await ProjectMember.create({
               user: req.user.id,
               project: newProject._id,
               role: UserRoleEnum.PROJECT_ADMIN,
            });
         

            await newProject.save()

               return res.status(200).json(new apiResponseHandler(200, "project create successfully",newProject))
            
   })