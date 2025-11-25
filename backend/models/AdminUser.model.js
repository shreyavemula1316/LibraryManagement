import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{ 
        type:String,       
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },      
    role:{
        type:String,
        default:'admin',
    },
},{timestamps:true});
adminUserSchema.index({ email: 1 }, { unique: true });
const AdminUser = mongoose.model('AdminUser',adminUserSchema);
export default AdminUser;