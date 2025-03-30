import app from "./app.js";
import dotenv from 'dotenv'
import mongoDbConnect from "./db/connect.db.js";

dotenv.config({
    path:"../.env"
})
const PORT = process.env.PORT || 8000;

mongoDbConnect()
.then(()=>
    {app.listen(()=>console.log(`server is running on port:${PORT}`))})
.catch((error)=>{
    console.error("mongoDB connection failed",error);
    
})



