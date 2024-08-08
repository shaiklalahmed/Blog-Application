const express=require("express");
const mongoose=require("mongoose");
const blogApp=express();

require("dotenv").config();

const PORT=process.env.PORT;

blogApp.use(express.json());

const blog=require("./routes/blog");

blogApp.use("/api/v1",blog);

const connectdb=require("./config/database");
connectdb();

blogApp.listen(PORT, () =>{
    console.log("app started");
});