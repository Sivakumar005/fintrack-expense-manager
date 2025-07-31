const { configDotenv } = require('dotenv');
const express=require('express');
const connectDB=require('./config/db');
connectDB();
configDotenv()

const app=express();
app.use(express.json());

const authroutes=require('./routes/authroutes');

app.use('/api/auth',authroutes);

port=process.env.port||5000;
app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
})