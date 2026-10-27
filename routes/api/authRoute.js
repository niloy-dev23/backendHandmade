const express = require('express')
const router = express.Router()
const registration = require('../../controller/authController')
const deleteController = require('../../controller/deleteController')
const getAllUsers = require('../../controller/getAllUsers')
const updateController = require('../../controller/updateController')


router.post('/update/:id', updateController)
router.delete('/delete/:id', deleteController)
router.get('/getAllUsers', getAllUsers)

module.exports = router