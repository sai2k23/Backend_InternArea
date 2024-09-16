const express=require("express");

const router=express.Router();
const adminUsername='admin'
const adminPassword='admin'

// For admin login
router.post("/adminLogin", (req,res)=>{
    const {username,password}=req.body
    if (username === adminUsername || password===adminPassword) {
        res.status(200).json({ message: "Admin login successful" });
    }
    else{
         // Invalid credentials
         res.status(401).json({ message: "Invalid credentials" });
    }
});
module.exports=router