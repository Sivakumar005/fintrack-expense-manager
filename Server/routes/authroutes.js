const express=require('express');
const { signup ,login,getUserInfo} = require('../controllers/authcontroller');
const protect=require("../middlewares/authMiddleware");
const upload=require('../middlewares/uploadMiddleware');

const authRouter=express.Router();

authRouter.post('/login',login);
authRouter.post('/signup',signup);
authRouter.get('/getuser',protect,getUserInfo);

authRouter.post("/upload-image",upload.single('image'),(req,res)=>{
    if(!req.file){
        return res.status(400).json("no file uploaded");
    }

    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageUrl});
})

module.exports=authRouter;