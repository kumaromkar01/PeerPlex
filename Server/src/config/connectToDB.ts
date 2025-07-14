import mongoose from "mongoose"
export const connectToDB = async()=>{
    try {
        const uri= process.env.DB_URI;
        if(!uri) throw new Error('uri undefined');
        await mongoose.connect(uri);
        console.log('DB connected');
    } catch (error) {
        console.log('error connecting DB',error);
    }
}