const express=require("express");
const router=express.Router();

const {createComment} =require("../controllers/CommentController");
const {postController}=require("../controllers/PostController");
const {postall} =require("../controllers/PostController");
const {createlike}=require("../controllers/LikeController");
const {unlikecontrol}=require("../controllers/LikeController");
const {createAuthN,createlogin} =require("../controllers/authNController");

const {authcheck,studentcheck,admincheck} = require("../middlewares/authmiddleware");

router.get("/test",authcheck,(request,response) =>{
    response.json({
        message:"welocme to test",
    });
});
router.get("/student",authcheck,studentcheck,(request,response) =>{
    response.json({
        message:"welcome to student data",
    });
});
router.get("/admin",authcheck,admincheck,(request,response) =>{
    response.json({
        message:"welcome to admin data",
    });
});

router.post("/createcom",createComment);
router.post("/createpos",postController);
router.get("/postall",postall);

router.post("/authcreate",createAuthN);
router.post("/login",createlogin);

router.post("/createlike",createlike);
router.post("/unlike",unlikecontrol);

module.exports=router;
