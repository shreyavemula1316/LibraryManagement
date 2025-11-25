import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    ISBN:{
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    genre:{
        type: String,
        required: true,
    },
    publisherYear:{
        type: Number,
        required: true,
    },
    copiesAvailable:{
        type: Number,
        required: true,
        default: 1,
    },
    shelfLocation:{
        type: String,
        required: true,
    },
    publisher:{
        name: {
            type: String,
            required: true,
        },
        phonenumber: {
            type: String,
            required: true,
        }
    },
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);