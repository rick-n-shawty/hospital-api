import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Cash', 'Card', 'Neither']
    },
    amountBeforeDeduction: {
        type: Number,
        min: 0,
        required: true,
    },
    bonusDeduction: {
        type: Number,
        min: 0,
        default: 0
    },
    amountFinal: {
        type: Number,
        min: 0,
        required: true
    },
    packagesPaid: {
        type: [mongoose.Types.ObjectId], 
    },
    servicePaid:{ 
        type: mongoose.Types.ObjectId
    }, 
    isRefunded: {
        type: Boolean,
        default: false
    },
    bonusCardId: {
        type: mongoose.Types.ObjectId
    },
    createdAt: {
        type: Number,
        required: true
    }
}, { timestamps: true });




const Payment = mongoose.model('payments', PaymentSchema); 
export default Payment; 
