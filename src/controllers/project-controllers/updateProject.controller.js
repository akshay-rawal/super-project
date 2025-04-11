
 import { Project } from "../../models/project.models.js";
import { asyncHandlers } from "../../utills/asyncHandler.js";
 import { apiError } from "../../utills/apiErrorHandler.js";
import { apiResponseHandler } from "../../utills/apiResponseHandler.js";



export const updateProject = asyncHandlers(async(req,res)=>{
        const projectId = req.params.id
        const userId = req.user.id

        const project = await Project.findById(projectId)

        if(!project){
            return res.status(401).json(new apiError(401,"project not avaiable"))
        }
        if(project.createdBy.toString()!==userId){
            return res.status(401).json(new apiError(401,"wrong user input for project update"))

        }

            // Update fields
    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;

    await project.save()

    return res.status(200).json(new apiResponseHandler(200,"Project updated", project))

        
})
 