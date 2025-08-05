const xlsx=require('xlsx');
const Income=require('../models/income');


exports.addIncome = async(req, res) => {
    const userId=req.user.id;
    try{
        const {icon,source,amount,date}=req.body;

        if(!source||!amount||!date){
            return res.status(400).json({message:"All fields are required"});
        }
        const newIncome=await Income.create({
            userId,
            icon,
            source,
            amount,
            date:new Date(date)
        });
        res.status(200).json(newIncome);
    }catch(err){
        res.status(500).json("server error");
    }
    
}
exports.getAllIncome = async(req, res) => {
    const userId=req.user.id;
    try{
        const income=await Income.find({userId}).sort({date:-1});
        res.json(income);
    }catch(err){
        res.status(500).json({msg:"server error"});
    }

}
exports.downloadIncomeExcel =async(req, res) => {
    const userId=req.user.id;
    try{
        const income=await Income.find({userId}).sort({date:-1});
        const data=income.map((item)=>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date
        }))

        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws,"Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    }catch(err){
        res.status(500).json({msg:"server error"});
    }

}
exports.deleteIncome = async(req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"Income deleted sucessfully"});
    }catch(err){
        res.status(500).json({msg:"server error"});
    }

}