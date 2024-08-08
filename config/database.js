const mongoose=require("mongoose");
require("dotenv").config();

const dbconnect=  () =>{
     mongoose.connect(process.env.MONGOOSE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
     })
     .then(() =>{console.log("db connected")})
     .catch((error) =>{
        console.log(error);
        console.log("error in connect");
        process.exit(1);
     })
};

module.exports=dbconnect;