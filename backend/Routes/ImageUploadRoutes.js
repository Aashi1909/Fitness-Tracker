const express = require('express');
const router = express.Router();
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const sharp = require('sharp');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploadimage', upload.any(), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ ok: false, error: 'No image file provided' });
    }

    const file = req.files[0];    if (!file) {
        return res.status(400).json({ ok: false, error: 'No image file provided' });
    }

    try {
        const resizedImageBuffer = await sharp(file.buffer)
          .resize({ width: 800 })
          .toBuffer();
        
        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            return res.status(500).json({ ok: false, error: 'Error uploading image to Cloudinary' });
          }
    
          res.json({ ok: true, imageUrl: result.url, message: 'Image uploaded successfully' });
        }).end(resizedImageBuffer);
      } catch (err) {
        console.error('Image processing error:', err);
        return res.status(500).json({ ok: false, error: 'Error processing image' });
      }
    });
module.exports = router;