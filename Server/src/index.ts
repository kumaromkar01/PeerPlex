import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectToDB } from './config/connectToDB';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('server running');
})
const startServer = async()=>{
    try {
        await connectToDB();
        app.listen(5000,()=>{
            console.log('server running on 5000');
        })
    } catch (error) {
        console.log('error starting in server');
    }
    
}
startServer();