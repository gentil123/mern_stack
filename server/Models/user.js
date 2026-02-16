const mongoose= require('mongoose');
const userschema=new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    age:Number
},{timestamps:true});
module.exports=mongoose.model("user",userschema);