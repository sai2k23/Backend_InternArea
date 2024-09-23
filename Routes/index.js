const express =require("express")
const router= express.Router();
const ApplicationRoute=require("./ApplicationRoute")
const intern=require("./internshipRout")
const job=require("./jobRoute")
const admin=require("./admin")
const paymentRoute = require("./paymentRoute"); // Import payment route

router.get("/",(req,res)=>{
    res.send("this is backend")
})
router.use('/application',ApplicationRoute);
router.use('/internship',intern);
router.use('/job',job);
router.use('/admin',admin);
router.use('/payment', paymentRoute); // Use payment route
module.exports=router;