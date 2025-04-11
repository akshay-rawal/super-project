import {apiResponseHandler} from '../utills/apiResponseHandler.js'

const healthCheck = (req,res)=>{
    res.status(200).json(
      new apiResponseHandler(200,{message:"server is running"})
    )
}

export default healthCheck