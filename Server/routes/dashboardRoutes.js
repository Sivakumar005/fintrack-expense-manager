const express=require('express');
const protect=require('../middlewares/authMiddleware');
const {getDashboardData}=require('../controllers/dashboardcontroller');

const router=express.Router();
router.get('/',protect,getDashboardData);

module.exports=router;
