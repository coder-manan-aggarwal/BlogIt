const {Router}=require("express")
const User=require("../models/user")
const upload = require("../middlewares/multer");
const router=Router()

router.get("/signin",(req,res)=>{
    return res.render("signin")
})

router.get("/signup",(req,res)=>{
    return res.render("signup")
})
router.post("/signin",async (req,res)=>{
    const {email,password}=req.body
    try{
    const token=await User.matchPasswordAndGenerateToken(email,password)

    
    return res.cookie("token",token).redirect('/')
    }
    catch(error){
        return res.render('signin',{
            error: "incorrect email or password",
        })
    }
})
router.post("/signup",upload.single("profileImage"),async(req,res)=>{
    const {fullName,email,password}=req.body
    const profileImageUrl = req.file 
    ? req.file.path 
    : "https://res.cloudinary.com/demo/image/upload/v1693527900/default-profile.png";
    await User.create({
        fullName,
        email,
        password,
        profileImageUrl
    })

    return res.redirect('/')
})
router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/")
})
module.exports=router