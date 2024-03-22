import Service from "../../../db/models/Service.js";
import { Unauthorized } from "../../../customErrors/Errors.js";
import { StatusCodes } from "http-status-codes";

const getServices = async (req, res, next) => {
    try{
        const { isAdmin } = req; 
        if(!isAdmin) throw new Unauthorized("Not authorized to perform this action"); 
        const services = await Service.find();
        return res.status(StatusCodes.OK).json({success: true, services}); 
    }catch(err){
        return next(err); 
    }
}


export default getServices; 