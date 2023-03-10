
import User from "../models/User.js";

//UPDATE  user
export const updateuser = async(req, res, next)=>{
    try{
        const updateduser = await User.findByIdAndUpdate(req.params.id,{$set:req.body}, {new:true});
    return res.status(200).json(updateduser);
    }catch(err){
        next(err)
    }
};


//DELeTE  user
export const deleteuser = async(req, res, next)=>{
    try{
     const deleteduser=   await User.findByIdAndDelete(req.params.id);
     if(!deleteduser){
        return res.status(404).json("user not found!");
     }else{
        return res.status(200).json("Deleted succesfully !")
     }


    }catch(err){
        next(err)
    }
};

//GET A NEW user
export const getAuser = async(req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user)

    }catch(err){
        next(err)
    }
};

//GET ALL user
export const getusers = async(req, res, next)=>{
    try{
        const users = await User.find().limit(10);
        res.status(200).json(users);

    }catch(err){
        next(err)
    };
};


