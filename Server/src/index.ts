import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectToDB } from './config/connectToDB';
import authRouter from './routes/auth';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/user',authRouter);

app.use('/',(req,res)=>{
    res.status(200).json({message : "sever running"});
})
const startServer = async()=>{
    try {
        await connectToDB();
        const PORT = process.env.PORT?process.env.PORT:5000;
        app.listen(PORT,()=>{
            console.log('server is running');
        })
    } catch (error) {
        console.log('server starting error ');
    }
}
startServer();