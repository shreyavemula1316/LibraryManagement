
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
    },  

    email: {
    type: String,       
    required: true,
    unique: true,
    },

    address: {  
    type: String,
    },

    phone: {
    type: String,
    required: true,
    },  

    password: {
    type: String,
    required: true,
    },

    membershipStatus: {
    type: String,
    enum: ['active', 'inactive', 'expired'],
    default: 'active',
    },

    role: {
    type: String,
    enum: ['staff', 'member'],
    default: 'member',
    },

}, { timestamps: true });   
userSchema.index({ username: 1, email: 1 }, { unique: true });
const User = mongoose.model('User', userSchema);
export default User;