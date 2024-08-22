import mongoose from "mongoose";

const MongoDB = async (): Promise<void> => 
    {
        try
        {
            await mongoose.connect("mongodb://localhost:27017/MicroservicioChat");
            console.log("Se ha conectado la base de datos");
        }
        catch (error: any)
        {   
            console.error("MongoDB connection failed:", error.message);
            process.exit(1);
        }
    }
export default MongoDB;