import express from "express" ;
import env from "dotenv";
env.config();
import { DB} from "./db/DB.js";
import authRoute  from "./routes/auth.js";
import hotelRoute  from "./routes/hotel.js";
import roomRoute  from "./routes/room.js";
import userRoute  from "./routes/user.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors"; 
 
 
const app = express();
const PORT = process.env.PORT || 4003; 
 
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json());
 
//enable url encode for POST requests
// app.use(bodyParser.urlencoded({ extended: true }));
 
app.use("/api/auth", authRoute); 
app.use("/api/user", userRoute);  
app.use("/api/hotel", hotelRoute); 
app.use("/api/room", roomRoute); 


app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const  message = err.message || "something went wrong";
    return res.status(status).json({
        status, 
        message,
        success:false,
    })
}) 




//CONNECTION DATABASE FUNCTION 
DB();


app.listen(PORT, ()=>{
    console.log(`server connected on port nuber  ${PORT}`);
});
