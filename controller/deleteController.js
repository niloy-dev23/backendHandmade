const userModel = require('../models/userModel')

const deleteController = async (req, res) => {
    const id = req.params.id
    try{
        await userModel.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"User deleted sucessfully"
        })
    }
    catch(error){
        res.status(404).json({
            success:false,
            message:"User didn't exist"
        })
    }

}

module.exports = deleteController