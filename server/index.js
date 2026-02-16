const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const userRoutes=require('./Routes/userRoutes');
const app=express();
app.use(express.json());
app.use(cors());
app.use('/api/user',userRoutes);
mongoose.connect("mongodb://localhost:27017/mycrud").then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
});
app.listen(7000,()=>{
    console.log("Server is running on port 5000");
})
