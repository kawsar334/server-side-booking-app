import mongoose from "mongoose";

export const DB =()=>{
   mongoose.connect(process.env.MONGO)
     .then(()=>{
        console.log("connected db")
     }).catch((err)=>{ 
        console.log(err); 
        
     })
}