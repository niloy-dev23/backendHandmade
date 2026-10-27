const userModel = require('../models/userModel')

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

module.exports = registration