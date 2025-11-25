import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reservationDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,   
        enum:['reserved','cancelled','completed'],
        default:'reserved',
    },
}, { timestamps: true });

export default mongoose.model('Reservation', ReservationSchema);