
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

//CREATE NEW room
export const addroom = async(req, res, next)=>{
    const hotelId = req.params.hotelId ;
    const room = new Room({...req.body, hotelId});
    try{
        const saveroom = await room.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                $push:{rooms:saveroom._id}
            });
        }catch(err){
            next(err);
        }
      return res.status(200).json(saveroom);
    }catch(err){
        next(err)
    }
};


//UPDATE  room
export const updateroom = async(req, res, next)=>{
    try{
        const updatedroom = await Room.findByIdAndUpdate(req.params.id,{$set:req.body}, {new:true});
    return res.status(200).json(updatedroom);

    }catch(err){
        next(err)
    }
};


//DELTE  room
export const deleteroom = async(req, res, next)=>{
    try{
     const deletedroom=   await Room.findByIdAndDelete(req.params.id);
     if(!deletedroom){
        return res.status(404).json("room not found!");
     }else{
        return res.status(200).json("Deleted succesfully !");
     }
    }catch(err){
        next(err)
    }
};

//GET A NEW room
export const getAroom = async(req, res, next)=>{
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room)

    }catch(err){
        next(err)
    }
};

//GET ALL room
export const getrooms = async(req, res, next)=>{
    try{
        const rooms = await Room.find().limit(10);
        res.status(200).json(rooms);

    }catch(err){
        next(err)
    };
};


