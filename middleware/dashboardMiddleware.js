const dashboardMiddleware = (req,res,next)=>{
    const {userName, password} = req.body
    if(password=='dashboard'){
        next()
    }
    else{
        res.send("Password didn't Match")
    }
}

module.exports = dashboardMiddleware