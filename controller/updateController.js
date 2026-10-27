const userModel = require('../models/userModel')

const updateController = async (req,res) =>{
    const id = req.params.id
    const {userName, email, password} = req.body
    try{
        await userModel.findByIdAndUpdate(id, {userName, email, password})
        res.status(201).json({
            success:true,
            message:"User Information Updated Successfully",
        })
    }
    catch(error){
        res.status(409).json({
            success:false,
            message:"User Info can't be updated", 
            errorMessage:error
        })
    }
}

module.exports = updateController