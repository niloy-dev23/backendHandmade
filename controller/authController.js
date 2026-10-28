const userModel = require('../models/userModel')
const {hashToken} = require('../helpers/tokenHelper')

const registration = async (req, res) => {
    try {
        const { username, email, password, profilePic, address, gender, role } = req.body
        if (!username || !email || !password || !gender) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, password and gender are required'
            })
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email is not valid'
            })
        }

        if (!['male', 'female', 'others'].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: 'Gender must be male, female, or others'
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            })
        }

        const normalizedEmail = email.toLowerCase().trim()
        const existingEmail = await userModel.findOne({ email: normalizedEmail })
        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            })
        }

        const { plainToken, hashedToken } = generateSecureToken()

        const user = new userModel({
            username: username.trim(),
            email: normalizedEmail,
            password,
            profilePic,
            address,
            gender,
            isEmailVerified: false,
            emailVerificationToken: hashedToken,
            emailVerificationTokenExpires: getVerificationExpiry()
        })

        await user.save()

        return res.status(201).json({
            success: true,
            message: 'User registered successfully. Please check your email to verify your account.',
            data: user.toSafeObject()
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        })
    }
}

const verifyEmail = async (req, res)=>{
    try {
        const token = req.query.token || req.body.token
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Verification Token Required"
            })
        }
        const hashedToken = hashToken(token)
        const user = await userModel.findOne({emailVerificationToken: hashedToken})
        .select('+emailVerificationToken +emailVerificationTokenExpires')

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid Token"
            })
        }
        if(user.isEmailVerified){
            return res.status(400).json({
                success:false,
                message:"Email is already Verified"
            })
        }
        if(!user.emailVerificationTokenExpires || user.emailVerificationTokenExpires < new Date()){
            return res.status(400).json({
                success:false,
                message:"Verification Token Expired. Please request a new token"
            })
        }
        const updatedUser = await userModel.findByIdAndUpdate(user._id, {
            $set: {isEmailVerified: true},
            $unset: {
                emailVerificationToken:1,
                emailVerificationTokenExpires:1
            }
        })

        const verifiedUser = await userModel.findById(user._id)

        res.status(201).json({
            success:true,
            message:"Email Verified Successfully",
            user:verifiedUser.toSafeObject()
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:error
        })
    }

}

module.exports = registration