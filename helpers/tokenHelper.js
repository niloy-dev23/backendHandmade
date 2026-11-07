const crypto = require('crypto')
const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex')
}

const generateAccessToken = (user)=>{
    if(!process.env.JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in environment variables")
    }
    const payload = {
        id:user._id,
        name:user.name,
        email:user.email,
        tokenUse:'access'
    }
    return jwt.sign(payload, process.env.JWT_SECRET, 
        {
            algorithm:"HS256",
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m'
        }
    )
}

module.exports = { hashToken, generateAccessToken }