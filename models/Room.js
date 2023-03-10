import mongoose from "mongoose";


const RoomSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    desc:{
         type:String,
        required:true,
    },    
    price:{
        type:Number,
        required:true,
    }
   ,
    
    maxPeople:{
        type:Number,
        required:true,
    }
    ,
    roomNumbers:{
        type:[{number:Number,unavailableDates:[{type:[Date]}] }]
    },
    hotelId:{
        type:String,
        required:true
    }
   
},{timestamps:true});


const Room = mongoose.model("Room", RoomSchema);

export default Room


