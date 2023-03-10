
import  express from "express";
const router = express.Router();
import {verifyUser, verifyAdmin} from "../verifyToken.js"


import {addroom, updateroom, deleteroom, getAroom, getrooms} from "../controllers/room.js"




//create room
router.post("/:hotelId", verifyAdmin,addroom)
//UPDATE 
router.put("/:id",verifyAdmin,updateroom)

//DELETE 
router.delete("/:id",verifyAdmin,deleteroom)
//GET 
router.get("/find/:id",getAroom);
//GET ALL
router.get("/",getrooms);








export default router ;