import { Router } from "express";
import userModel from "../models/user.model";
import bookModel from "../models/book.model";
import reviewModel from "../models/review.model";

const router = Router();

router.get('/values', async (req, res) => {
  try {
    const [userCnt, bookCnt, reviewCnt] = await Promise.all([
      userModel.countDocuments(),
      bookModel.countDocuments(),
      reviewModel.countDocuments(),
    ]);

    res.status(200).json({ userCnt, bookCnt, reviewCnt });
  } catch (error) {
    res.status(500).json({ message: "Error in insight controller" });
  }
});


export default router;