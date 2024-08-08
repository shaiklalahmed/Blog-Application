const Post=require("../models/postmodel");

exports.postController=async (request,response) =>{
   try{
        const {title,body}=request.body;

        const post=new Post({
            title,body
        });

        const savedpost=await post.save();

        response.json({
            post:savedpost,
        });
   }
   catch(err){
       console.log(error);
       err:"err while powting";
   }
}


exports.postall=async(request,response) => {
    try{
        const posts=await Post.find().populate("comments").exec();
        response.json({
            posts,
        })
    }
    catch(err){
       err:"err while fet postsall";
    }

}
