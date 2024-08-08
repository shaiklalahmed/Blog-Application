const Post=require("../models/postmodel");
const Comment=require("../models/commentmodel");


exports.createComment=async (request,response) =>{
      try{
        const {post,user,body} =request.body;
       

      

      const comment=new Comment({
        post,user,body
      });

         const savedcomm=await comment.save();


      const updatepost=await Post.findByIdAndUpdate(post,{$push:{comments:savedcomm._id}} ,{new:true}).populate("comments").exec();
     
       response.json({
        post:updatepost,
       });

      }
      catch(err){
        return response.status(500).json({
            err:"erro has occured in commenbt",
        });
      }
      
}

