import mongoose from "mongoose"

const mongoDbConnect = async ()=>{
    try {
              await  mongoose.connect(process.env.MONGO_URL)
              console.log("MONGO_URI:", process.env.MONGO_URL);

              console.log("mongoDB connected");
              
    } catch (error) {
        console.error("mongodb connection failed",error)
       await mongoose.disconnect()   //isse sab process pehle aram se close ho jayegi taki kuch pending reh na jaye
        process.exit(1)  // ab exit kar dege 
    }

}

export default mongoDbConnect