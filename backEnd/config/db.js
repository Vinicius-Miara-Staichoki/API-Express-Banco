import mongoose from "mongoose";

const ConnectDB = async () => {
    
    if(!process.env.MONGO_URI){
        throw new Error ("MONGO_URI não foi encontrado no arquivo .env")
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected with MONGODB")

    } catch (error) {
        console.log("ERROR:",error);

    }
}

export default ConnectDB