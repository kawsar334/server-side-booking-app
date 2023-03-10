
import  express from "express";
const router = express.Router();

import {verifyUser, verifyAdmin} from "../verifyToken.js"

import { updateuser, deleteuser, getAuser, getusers} from "../controllers/user.js"


//UPDATE 
router.put("/:id",verifyUser,updateuser)

//DELETE 
router.delete("/:id",verifyUser,deleteuser)

//GET 
router.get("/find/:id",verifyUser,getAuser);

//GET ALL 
router.get("/",verifyAdmin,getusers);





export default router ;