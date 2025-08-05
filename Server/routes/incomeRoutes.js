const express= require('express');

const {
    addIncome,
    deleteIncome,
    getAllIncome,
    downloadIncomeExcel
}=require('../controllers/incomecontroller');

const {protect}=require('../middlewares/authMiddleware');

const router=express.Router();

router.post('/add',protect,addIncome);
router.get('/get',protect,getAllIncome);
router.get('/downloadExcel',protect,downloadIncomeExcel);
router.delete('/:id',protect,deleteIncome);

module.exports=router;
