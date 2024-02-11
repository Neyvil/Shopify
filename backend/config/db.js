import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
       console.log(`Successfully Connected to Database `) 
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
        process.exit(1)
    }
}