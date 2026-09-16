import dotenv from "dotenv";
import express from "express";
dotenv.config({
    path:"./.env",
});

const app =express();
const port=process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.listen(port,()=>{
    console.log(`Server is listening on port http://localhost:${port}`);
})

console.log("welcom to MandiMantra");
