
import Router from 'express';
import bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';

import userModel from '../models/user.model';


const router = Router();

router.post('/signup',async(req,res)=>{

    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password) {
            res.status(400).json({message : "all feids are mandatory"});
            return;
        }
        const user = await userModel.findOne({email});
        if(user){
            res.status(400).json({message : 'user already exists'});
            return;
        }

        const hashedPass = await bcrypt.hash(password,10);
        const newUser = new userModel({name,email,password : hashedPass});
        await newUser.save();
        // openssl rand -base64 32 => jwt token
        const token = jwt.sign({userId : newUser._id}, process.env.JWT_SECRET as string);
        res.status(200).json({token});
    } catch (error) {
        console.log('error in signup controller',error);
        res.status(500).json({message : "server error"});
    }
});

router.post('/login',async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user || !password){
            res.status(400).json({message : "user not found"});
            return;
        }
        const check = bcrypt.compare(password, user.password??"");
        if(!check){
            res.status(400).json({message : "Invalid credentials"});
        }

        const token = jwt.sign({userId : user._id},process.env.JWT_SECRET as string);
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message : "error in login controller"});
        console.log('error in login route',error);
    }
});

router.get('/verify',(req,res)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
            res.status(400).json({message : "token doesn't exist"});
            return;
        }
        const user = jwt.verify(token,process.env.JWT_SECRET as string);
        res.status(200).json({message:"user verified"});
    } catch (error) {
        console.log('error in verification controller',error);
        res.status(500).json({message : "error in verification controller"});
    }
    

})
export default router;
