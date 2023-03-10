
import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js";


//CREATE NEW hOTEL
export const addHotel = async(req, res, next)=>{
    try{
        const hotel = new Hotel({...req.body});
        const saveHotel = await hotel.save();
        return res.status(200).json(saveHotel)

    }catch(err){
        next(err)
    }
};


//UPDATE  hOTEL
export const updateHotel = async(req, res, next)=>{
    
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body}, {new:true});
    return res.status(200).json(updatedHotel);

    }catch(err){
        next(err)
    }
};


//DELTE  hOTEL
export const deleteHotel = async(req, res, next)=>{
    try{
     const deletedHotel=   await Hotel.findByIdAndDelete(req.params.id);
     if(!deletedHotel){
        return res.status(404).json("hotel not found!")
     }else{
        return res.status(200).json("Deleted succesfully !")
     }


    }catch(err){
        next(err)
    }
};

//GET A NEW hOTEL
export const getAHotel = async(req, res, next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)

    }catch(err){
        next(err)
    }
};

//GET ALL hOTEL
export const getHotels = async(req, res, next)=>{
    // const query = req.query.featured;
    const {min, max, ...others} = req.query;
    try{
        const hotels = await Hotel.find({ ...others, cheapestPrice:{$gte:min |1,$lt:max |1000}}).limit(req.query.limit);
        res.status(200).json(hotels);
    }catch(err){
        next(err);
    };
};




//GET  hOTEL COUNT BY CITY NAME 
export const countByCity  = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
       
        const list = await Promise.all(cities.map((city)=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list);
        
    } catch (err) {
        next(err)
    };
};

//  GET HOTEL COUNT BY TYPE 
export const countByType = async (req, res, next) => {


    try { 
      
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apertmentCount = await Hotel.countDocuments({type:"apartment"});
        const resortCount = await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type:"villa"});
        const cabinCount = await Hotel.countDocuments({type:"cabin"});

        res.status(200).json([
            {type:"hotel", count:hotelCount},
            { type: "apertment", count: apertmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },




        ])
        
    } catch (err) {
        next(err)
        console.log
    };
};



export const getRoomsfromHotel = async(req, res, next )=>{
    try{
    const hotel = await Hotel.findById(req.params.id);
        const rooms = await Promise.all(hotel.rooms.map((room)=>{
            return  Room.findById(room);
        }));
        res.status(200).json(rooms);
    }catch(err){
        next(err);
    }
}