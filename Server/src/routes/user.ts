import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../models/user.model";
const router = Router();

router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization as string;
        if (!token) res.status(400).json({ message: "invalid request" });

        const decoded = jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload;
        // console.log(decoded);
        const userId = decoded.userId;
        const user = await userModel.findOne({ _id: userId });
        res.status(200).json({name : user?.name, email : user?.email});
    } catch (error) {
        res.status(500).json({ message: "error in user profile controller" });
        console.log(error);
    }

});

export default router;