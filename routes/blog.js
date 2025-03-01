const {Router}=require("express")

const router=Router()
const upload = require("../middlewares/multer");

const Blog=require('../models/blog')
const Comment =require('../models/comment')


 


router.get('/add-new',(req,res)=>{
    return res.render("addBlog",{
        user:req.user
    })

    
})

router.get('/:id',async (req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments= await Comment.find({blogId:req.params.id}).populate("createdBy")
    return res.render('blog',{
        user: req.user,
        blog,
        comments
    })
})

router.post('/comment/:blogId',async(req,res)=>{
     await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`)
})

router.post("/",upload.single('coverImage'),async (req,res)=>{
    const {title,body}=req.body
    const imageUrl = req.file ? req.file.path : '';
    const blog=await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageURL:imageUrl
    })
    return res.redirect(`/blog/${blog._id}`)
})
module.exports=router