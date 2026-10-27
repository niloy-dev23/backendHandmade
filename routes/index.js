const express = require('express')
const router = express.Router()
const apiURL = process.env.BASE_URL
const auths = require('./api/authRoute')
const multer = require('./api/multerRoute')

router.use(apiURL, auths)
router.use(apiURL, multer)

module.exports = router