const { configDotenv } = require('dotenv');
const express=require('express');
const connectDB=require('./config/db');
const cors=require('cors');
const path=require('path'); 
const authroutes=require('./routes/authroutes');
const incomeroutes=require('./routes/incomeRoutes');
const expenseroutes=require('./routes/expenseRoutes');
const dashboardroutes=require('./routes/dashboardRoutes');
connectDB();
configDotenv()

const app=express();
app.use(cors({
    origin:process.env.CLIENT_URL||"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))
app.use(express.json());


app.use('/api/auth',authroutes);
app.use('/api/income',incomeroutes);
app.use('/api/expense',expenseroutes);
app.use('/api/dashboard',dashboardroutes);

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

port=process.env.port||5000;
app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
})