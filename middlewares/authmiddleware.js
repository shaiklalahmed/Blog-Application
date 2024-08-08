const jwt=require("jsonwebtoken");

require("dotenv").config();

exports.authcheck=async(request,response,next) =>{
      try{
        const token=request.body.token;

        if(!token){
            return response.json({
                message:"token is missing",
            });
        }

       try{
            const decode=jwt.verify(token,process.env.JWT_TOKEN);
             request.usercheck=decode;
       }
       catch(e){
             return response.json({
                 message:"token is not verified",
             });
       }

          next();
      }
      catch(err){
        return response.json({
            message:"went wrong while verifing",
        });
      }
}

exports.studentcheck=async(request,response,next) =>{
      try{
        if(request.usercheck.roles != "student"){
            return response.json({
                 message:"sorry this is student data u cannot visit",
            });
          }
          else{
            return response.json({
                message:"this is student data",
           });
          }
          next();
      }
      catch(e){
        return response.json({
            message:"eror while fetchng student data",
       });
      }
}

exports.admincheck=async(request,response,next) =>{
    try{
      if(request.usercheck.roles != "admin"){
          return response.json({
               message:"sorry this is admin data u cannot visit",
          });
        }
        else{
            return response.json({
                message:"this is admin data",
           });
          }
       
        next();
    }
       
    
    catch(e){
      return response.json({
          message:"eror while fetchng admin data",
     });
    
}
}