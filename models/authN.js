const mongoose=require("mongoose");

const Authn=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    number:{
        type:String,
        required:true,
    },
    roles:{
        type:String,
        enum:["student","admin"]
    },

});

module.exports=mongoose.model("authNuser",Authn);