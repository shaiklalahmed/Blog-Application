const AuthN=require("../models/authN");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.createAuthN=async(request,response) =>{
     try{
        const {name,email,password,number,roles}=request.body;
     
        const saveauth=new AuthN({
           name,email,password,number,roles
        });
       
        const useristhere=await AuthN.findOne({email});
        if(useristhere){
            return response.json({
                message:"user already exist",
                success:false,
            });
        }
     let hashpass;
        try{
             hashpass=await bcrypt.hash(password,10);
              
        }
        catch(errr){
           return response.json({
            message:"canot hash the pass",
            success:false,
           });
        }

        const create=await AuthN.create({
            name,email,password:hashpass,number,roles
        });

        response.json({
            message:"created account",
        });
   
     }
     catch(err){
           return response.json({
            message:"cannot create account for this user error has happwnd",
           });
     }
}


//login

exports.createlogin=async(request,response) => {
    try{
        const {email,password}=request.body;

        if(!email || !password){
            return response.json({
                message:"please fill the forn first",
            });
        }
        let usercheck=await AuthN.findOne({email});
        if(!usercheck){
            return response.json({
                message:"sign up first",
            });
        }
         let payload={
            email:usercheck.email,
            id:usercheck._id,
            roles:usercheck.roles,
         }
        if(await bcrypt.compare(password,usercheck.password)){
               let token=jwt.sign(payload,process.env.JWT_TOKEN,{expiresIn:"2h"});
               
               usercheck=usercheck.toObject();
               usercheck.token=token;
               usercheck.password=undefined;

               const options={
                  expires:new Date(Date.now() + 3*24*60*60*1000),
                  httpOnly:true
               }
               response.cookie("ahmed",token,options).json({
                usercheck, 
                message:"cookie generated",
               });
        }
        else{
            return response.json({
                message:"please enter valid password",
            });
        }
    }
    catch(err){
          return response.json({
            message:"erro in login ",
          })
    }


}