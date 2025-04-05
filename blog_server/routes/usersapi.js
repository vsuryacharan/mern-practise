const express=require('express')
const user=require('../models/users')
const router=express.Router()
const path=require('path')
const multer=require('multer')


const storage=multer.diskStorage({
    destination:'./uploads/',
    filename:function(req,res,cb){
        cb(null,this.filename.filename+'-'+Date.now()+'.png')
    }
})

const upload=multer({
    storage:storage,
    limits:{fileSize:10000000}
})

router.post('/uploadimage',upload.single('profie_pic'),(req,res)=>{
    res.json({'msg':'image uploaded'})
})
//localhost:5000/api/user/adduser
router.post('/adduser',async(req,res)=>{
    try{
        const newUser=new user({
            user_name :req.body.user_name,
            user_email :req.body.user_email,
            user_dob :req.body.user_dob,
            gender :req.body.gender,        
        })
        const saveUser= await newUser.save();
        res.json(saveUser);
    }catch(error){
        res.status(500).json({'error':error});
    }

})
//localhost:5000/api/user/viewuser
router.get('/viewuser',async(req,res)=>{
    try {
        const users=await user.find();
        res.json(users)
    }
    catch(error){
        res.status(500).json({'error':error})
    }
})

//localhost:5000/api/user/singleuser/:userid
router.get('/singleuser/:userId',async(req,res)=>{
    const uid=req.params.userId
    try{
        const thisuser=await user.findById(uid);
        res.json(thisuser);
    }catch(error){
    res.status(500).json({'error':error});}
});

//localhost:5000/api/user/update/67f02d5e219f7ffbb7809271
router.put('/update/:userId',async(req,res)=>{
    const uid=req.params.userId
    try{
        const userupdate=await user.findByIdAndUpdate(uid,{$set:req.body},{new:true})
        res.json(userupdate)
    }catch(error){
        res.status(500).json({'error':error})
    }
})

router.delete('/delete/:userId',async(req,res)=>{
    const userid=req.params.userId
    try{
        const deleteuser=await user.findByIdAndDelete(userid)
        res.status(200).json({'msg':'deleted user','sts':'1'})
    }catch(error){
        res.status(500).json({'error':error})
    }
})

module.exports=router;