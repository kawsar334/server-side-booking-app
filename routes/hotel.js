
import  express from "express";
const router = express.Router();
import { addHotel, updateHotel, deleteHotel, getAHotel, getHotels, countByCity, countByType, getRoomsfromHotel } from "../controllers/hotel.js"
import {verifyUser, verifyAdmin} from "../verifyToken.js"
 
//create hotel
router.post("/",verifyAdmin,addHotel)
//UPDATE 
router.put("/:id",verifyAdmin,updateHotel)

//DELETE 
router.delete("/:id",verifyAdmin,deleteHotel)

//GET              
router.get("/find/:id",getAHotel);      
 
//GET ALL
router.get("/",getHotels);
//GET HOTLE COUNT BY CITY NAME 
router.get("/countbycity", countByCity)
// GET HOTEL COUNT BY TYPE
router.get("/countbytype",countByType)
router.get("/room/:id", getRoomsfromHotel);







export default router ;