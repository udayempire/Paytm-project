const {JWT_Secret} = require("./config")
const jwt = require("jsonwebtoken")

const authMiddleWare = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401).json({
            message:"Incorrect token or Bearer missing Authorization"
        })
    }
    const jwtToken = authHeader.split(" ")[1];
    try{
        const decodedValue = jwt.verify(jwtToken,JWT_Secret);
        req.userId = decodedValue.userId;  //passing UserId with the middleware so people using this middleWare can retrive userId
        req.username = decodedValue.username; 
        next()
    }
    catch(err){
        return res.status(403).json({
            message:"Signin again"
    })}
}

module.exports= authMiddleWare