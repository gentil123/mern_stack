const express=require('express');
const router=express.Router();
const User=require('../Models/user');
router.post('/',async(req,res)=>{
    try{
        const user=new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            age:req.body.age
        });
        await user.save();
        res.status(200).json({message:"User added successfully",user});
    }catch(err){
        res.status(500).json({message:"Error adding user",error:err.message});
    }
});
router.get('/',async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json(users);
    }catch(err){    

        res.status(500).json({message:"Error fetching users",error:err.message});
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message:"Error fetching user",error:err.message});
    }
});
router.put('/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            age:req.body.age
        },{new:true});
        if(!user){

            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User updated successfully",user});
    }catch(err){
        res.status(500).json({message:"Error updating user",error:err.message});
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User deleted successfully"});
    }catch(err){
        res.status(500).json({message:"Error deleting user",err});
    }
});

module.exports= router;