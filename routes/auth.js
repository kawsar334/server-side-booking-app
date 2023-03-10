
import  express from "express";
const router = express.Router();
import { register, login, Logout } from "../controllers/auth.js"

 
// REGISTER 
router.post("/register", register)

//LOGIN 
router.post("/login", login);

//logout 
router.post("/logout", Logout)





export default router ; 