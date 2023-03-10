

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER 
export const register = async(req, res, next)=>{
   
    try{
       
        const user = new User({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10)
        })
        const saveUser = await user.save();
        res.status(200).json(saveUser) 
 
    }catch(err){
    console.log(err)
        next(err);
    }
}
 
// signin 
export const login = async(req, res, next)=>{
    try{
        
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json("user not found !");
        }else{
            // const hashedPassword = await bcrypt.compare(req.body.password, user.password);
            const hashedPassword = await bcrypt.compare(req.body.password,user.password)
            if(!hashedPassword){
            return res.status(404).json("invalid credintials !");
            }else{
                const {password, ...others} = user._doc;  
                const token = jwt.sign({id:user._id, user:user, isAdmin:user.isAdmin},`${process.env.SECRET}`,);
                res.cookie("acces_token", token,{httpOnly:true}).status(200).json({token, others, isAdmin:others.isAdmin}); 
            }; 
        } 
    }catch(err){ 
        console.log(err)
        next(err);
    }

   
}


// Logout

 export const Logout = async(req, res, next)=>{
    try{
        res.clearCookie("acces_token",{
            sameSite:"none",
            secure:true
        }).status(200).json("user hassbeen logged Out")

    }catch(err){
        next(err)
    }
}


 