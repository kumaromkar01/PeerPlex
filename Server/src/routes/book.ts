import { Router } from 'express';
import multer from 'multer';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userModel from '../models/user.model';
import bookModel from '../models/book.model';
import cloudinary from '../config/cloudinary';
import reviewModel from '../models/review.model';

const router = Router();

// Multer config
const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { title, desc, url } = req.body;
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    if (!decoded) return res.status(401).json({ message: 'Invalid token' });

    const user = await userModel.findById(decoded.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!req.file) return res.status(400).json({ message: 'No image file provided' });

    const streamUpload = (): Promise<any> =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'books' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file?.buffer);
      });

    const imageRes = await streamUpload();

    const newBook = new bookModel({
      title,
      desc,
      url,
      image: imageRes.secure_url,
      user: user._id,
    });

    await newBook.save();
    user.uploads.push(newBook._id);
    await user.save();

    res.status(201).json({ newBook, message: 'Book created successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Internal server error at /create' });
  }
});



router.get('/all', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const skip = (page - 1) * limit;

    const count = await bookModel.countDocuments();

    const books = await bookModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', '-password');

    res.status(200).json({ count, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error in fetching all books' });
  }
});


router.get('/myuploads', async (req, res) => {

  try {
    const token = req.headers.authorization as string;
    if (!token) return res.status(400).json({ message: "no token provide" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const user = await userModel.findOne({ _id: decoded.userId }).select('uploads').populate('uploads');
    if(!user) return res.status(400).json({message : "no user found"});
    res.status(200).json({ uploads: user.uploads, });
  } catch (error) {
    res.status(500).json({ message: "server error in myupload route" });
  }

})
router.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const book = await bookModel.findById(id).populate('user').populate('reviews');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ book });
  } catch (error) {
    console.error('Error in GET /:id:', error);
    res.status(500).json({ message: 'Server error while fetching book' });
  }
});

router.post('/addreview/:id', async (req, res) => {
  try {
    const token = req.headers.authorization as string;
    if (!token) return res.status(401).json({ msg: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await userModel.findById(decoded.userId);
    if (!user) return res.status(400).json({ msg: 'Invalid user' });

    const { id } = req.params;
    const book = await bookModel.findById(id);
    if (!book) return res.status(400).json({ msg: "Invalid book ID" });

    const { comment } = req.body;
    if (!comment) return res.status(400).json({ msg: "Comment is required" });

    const newReview = new reviewModel({
      username : user.name,
      user: user._id,
      book: book._id,
      comment,
    });

    await newReview.save();

    book.reviews.push(newReview._id);
    await book.save();

    user.reviews.push(newReview._id);
    await user.save();

    res.status(200).json(newReview);
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ msg: "Server error", error });
  }
});


router.get('/latestrev', async (req, res) => {
  try {
    const review = await reviewModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5) 
      .populate('book', 'title'); // optional: include book title

    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching latest reviews:", error);
    res.status(500).json({ msg: "Failed to fetch latest reviews" });
  }
});


export default router;
