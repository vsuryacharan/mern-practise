const {mongoose}=require('mongoose')
require("dotenv").config()

const dburi=process.env.DB_URI
mongoose.connect(dburi);


    mongoose.connection.on('connected',()=>{
        console.log("connected to mongoose");
    });

    mongoose.connection.on('error',(err)=>{
        console.error('Connection Error ',err);
    })



module.exports=mongoose