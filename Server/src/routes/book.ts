import { Router } from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import bookModel from '../models/book.model';
import cloudinary from '../config/cloudinary';

const router = Router();

// Multer config
const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { title, desc, url, email } = req.body;
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) return res.status(401).json({ message: 'Invalid token' });

    const user = await userModel.findOne({ email }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!req.file) return res.status(400).json({ message: 'No image file provided' });

    // Upload image using upload_stream
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
      user,
    });

    await newBook.save();

    res.status(201).json({ newBook, message: 'Book created successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Internal server error at /create' });
  }
});

export default router;
