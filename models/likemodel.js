const mongoose=require("mongoose");

const likemodelSchema =new mongoose.Schema({
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
        },
        user:{
            type:String,
            required:true,
        }
        
});


module.exports=mongoose.model("Like",likemodelSchema);