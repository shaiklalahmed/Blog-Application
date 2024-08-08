const Post=require("../models/postmodel");
const Like=require("../models/likemodel");


exports.createlike=async (request,response) =>{
      try{
        const {post,user} =request.body;
        const check=await Post.findOne({post});
        

      const like=new Like({
        post,user,
      });
      
      
      const savedlike=await like.save();

      const updatepost=await Post.findByIdAndUpdate(post,{$push:{likes:savedlike._id}} ,{new:true}).populate("likes").populate("comments").exec();
     
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

exports.unlikecontrol=async(request,response) =>{
      try{
          const {post,like} =request.body;
          
          const del=await Like.findOneAndDelete({post:post,_id:like});

          const update=await Post.findByIdAndUpdate(post,{$pull:{likes:del._id}},{new:true});

          response.json({
            post:update,
          });
      }
      catch(err){
            response.json({
                err:"not able to unlike",
            });
      }
}

