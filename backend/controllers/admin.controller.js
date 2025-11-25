import AdminUser from '../models/AdminUser.model.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/sendEmail.js';

export const addstaff = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'User already exists with this email'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,  
            password: hashedPassword,
            role
        });
        
        await newUser.save();

        const subject = 'welcome to the library management system';
        const message = `
        Hi ${name},<br/>
        Your staff account has been created successfully.<br/>
        Here are your login details:<br/>
        Email: ${email}<br/>
        Password: ${password}<br/>
        Please change your password after your first login.<br/>
        Regards,<br/>
        Library Management System
        `;
        await sendEmail(email, subject, message, message);
        
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            });

    }catch(error){
        console.log('Error in add staff controller', error.message);
        res.status(500).json({error: 'Internal Server Error' });
    }
}; 

export const getAllStaffs = async (req, res) => {
    try {
        const staffs =  await User.find({ role:  'staff' }).select('-password');
        res.status(200).json(staffs);
    } catch (error) {
        console.log('Error in get all staffs controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteStaff = async (req, res) => {
    try {   
        const { staffId } = req.params;
        const staff = await User.findById(staffId);
        if (!staff) {   
            return res.status(404).json({ error: 'Staff not found' });
        }
        if (staff.role === 'admin') {
            return res.status(403).json({ error: 'Cannot delete admin users' });
        }
        await User.findByIdAndDelete(staffId);
        res.status(200).json({ message: 'Staff deleted successfully' });
    } catch (error) {
        console.log('Error in delete staff controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateStaff = async (req, res) => {
    try {
        const { staffId } = req.params;
        const { name, email, password, role } = req.body;
        const staff = await User.findById(staffId);
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        if (name) staff.name = name;
        if (email) staff.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            staff.password = hashedPassword;
        }
        if (role) staff.role = role;
        await staff.save();
        res.status(200).json({
            _id: staff._id,
            name: staff.name,
            email: staff.email,
            role: staff.role,
        });
    }   
    catch (error) {
        console.log('Error in update staff controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};