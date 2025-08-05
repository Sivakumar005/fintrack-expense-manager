const express= require('express');

const {
    addExpense,
    deleteExpense,
    getAllExpenses,
    downloadExpenseExcel
}=require('../controllers/expensecontroller');

const protect=require('../middlewares/authMiddleware');

const router=express.Router();

router.post("/add",protect,addExpense);
router.get("/get",protect,getAllExpenses);
router.get("/downloadExcel",protect,downloadExpenseExcel);
router.delete("/:id",protect,deleteExpense);

module.exports=router;
