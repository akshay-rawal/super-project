import express from "express";
import healthCheckRoutes from "./controllers/healthcheck.controllers.js";
import userRoutes from "../src/routes/auth.routes.js"
import cookieParser from "cookie-parser";
import projectRoutes from "./routes/project.routes.js"

const app = express()
console.log(app);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()); 


app.use("/api/v1/healthcheck",healthCheckRoutes)

app.use("/api/v1/users",userRoutes)
app.use("/api/v1/projects",projectRoutes)


//routes import




export default app