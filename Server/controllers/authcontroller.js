const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User=require('../models/users');
const { configDotenv } = require('dotenv');
configDotenv();

const createToken=(userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET,{expiresIn:'1h'});
}

const signup=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.create({email,password});
        const token=createToken(user._id);
        res.status(200).json({ token, email: user.email });
        console.log("user created");
    }catch(err){
        res.status(400).json({error:"signup failed",details: err.message});
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({error:"invalid email or password"});
        }
        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({error:"invalid email or password"});
        }
        const token=createToken(user._id);
        res.status(200).json({token,email:user.email});
        console.log("user logged in");
    }catch(err){

    }
}

module.exports={signup,login};