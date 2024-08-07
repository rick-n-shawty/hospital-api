import mongoose from "mongoose";


const ServiceSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
        min: 0
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }, 
    providedBy: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    currentQueue: {
        type: [mongoose.Types.ObjectId],
        default: [], 
        required: true
    }
}, {timestamps: true})


const Service = mongoose.model("Services", ServiceSchema); 


export default Service; 





