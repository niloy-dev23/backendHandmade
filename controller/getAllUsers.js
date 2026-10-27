const userModel = require("../models/userModel")

const getAllUsers = async (req, res)=>{
    const allUsers = await userModel.find()
    res.send(allUsers)
}

module.exports = getAllUsers