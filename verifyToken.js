import User from"./models/User.js";

import jwt from "jsonwebtoken"


export const verifyToken =async (req, res, next)=>{

    const token = req.cookies.acces_token ;
    if(!token){
        console.log("you are not authenticated ")
        return res.status(404).json("your are not authenticated !");
    };

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
                return res.status(422).json("token is not valid ");
        }
        req.user = user; 
        next()
    })
};


export const  verifyUser=async(req, res, next)=>{
    verifyToken(req, res,next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("you are not authorized !");
        };
    });

}; 
 
export const verifyAdmin = async (req, res,next)=>{
    verifyToken(req, res,next ,()=>{
            if(req.user.isAdmin == true){
                    next();
            }else{
                  return res.status(403).json("you are not authorized !");
            };
    })
}; 




