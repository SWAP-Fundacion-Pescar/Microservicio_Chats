import mongoose from "mongoose";
import ConflictException from "../../../Application/Exceptions/ConflictException";
const MongoDB = async (): Promise<void> => {
    try {
        if (process.env.MONGODB) {
            await mongoose.connect(process.env.MONGODB);
            console.log("Se ha conectado la base de datos");
        }
        else {
            throw new ConflictException('No se especifico ninguna url');
        }
    }
    catch (error: any) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}
export default MongoDB;