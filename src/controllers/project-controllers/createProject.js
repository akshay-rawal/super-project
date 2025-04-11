import { Project } from "../../models/project.models.js";

 import { apiError } from "../../utills/apiErrorHandler.js";
 import { apiResponseHandler } from "../../utills/apiResponseHandler.js";
 import { asyncHandlers } from "../../utills/asyncHandler.js";

 export const createProject = asyncHandlers(async(req,res)=>{
           
         const {name,description} = req.body
 
          const dbProject = await Project.findOne({name})
        if (dbProject){
            return res.status(401).json( new apiError(401,"project already available"))
         }

         const project = await Project.create({
            name,
            description,
            createdBy:req.user.id
         })

          await project.save()

            return res.status(200).json(new apiResponseHandler(200, "project create successfully",project))
          
 })