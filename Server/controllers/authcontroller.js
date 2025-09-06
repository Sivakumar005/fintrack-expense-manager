const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User=require('../models/users');
const { configDotenv } = require('dotenv');
configDotenv();


const createToken=(userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET,{expiresIn:'1h'});
}

const signup=async(req,res)=>{
    const {fullname,email,password,profileImageUrl}=req.body;
    if(!fullname||!email||!password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email is already in use"});
        }
        const user=await User.create({fullname,email,password,profileImageUrl});
        const token=createToken(user._id);
        res.status(200).json({id:user._id, token, user });
        console.log("user created");
    }catch(err){
        res.status(400).json({error:"signup failed",details: err.message});
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({message:"All fields are required"});
    }
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
        res.status(200).json({id:user._id,token,user});
        console.log("user logged in");
    }catch(err){
        res.status(400).json({error:"login failed",details: err.message});
    }
}

const getUserInfo=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id).select("-password");
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error:"error getting user Info",details: err.message});
    }
}
module.exports={signup,login,getUserInfo};