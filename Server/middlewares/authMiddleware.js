const jwt=require('jsonwebtoken');
const User=require('../models/users');
const protect=async(req,res,next)=>{
    let token=req.headers.authorization?.split(" ")[1];
    if(!token)res.status(400).json({msg:"Not Authorized, no token"});
    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select("-password");
        next();
    }
    catch(err){
        res.status(401).json({msg:"Not Authorized ,token failed"});
    }
}

module.exports=protect;