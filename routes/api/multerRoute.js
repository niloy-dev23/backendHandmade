const express = require('express')
const router = express.Router()
const multer = require('multer')
const registration = require('../../controller/authController')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'firstCloudinary',
    allowedFormat: ['png', 'jpeg', 'jpg']
  },
});
// const uploadStorage = multer.diskStorage({
//     destination: function (req, file, cb){
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb){
//         const uniqueSuffix = 'img- ' + file.originalname
//         cb(null, file.fieldname + uniqueSuffix)
//     }
// })

const upload = multer({storage: cloudStorage})
router.post('/registration', upload.single('picture'), registration)

module.exports = router