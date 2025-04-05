const express=require('express')
require('dotenv').config()
const bodyparser=require('body-parser')
const db=require('./db')
const cors=require('cors')
const app=express()



app.use(cors());
app.use(bodyparser.json());
const port=process.env.PORT
const userRoute=require('./routes/usersapi'); 
app.use('/api/user',userRoute);
console.log(port)
app.get('/',(req,res)=>{
        res.send("Hello server");
});
app.listen(port,()=>{
    console.log(`server listening : http://localhost:${port}`);
});