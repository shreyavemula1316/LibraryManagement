import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import AdminUser from '../models/AdminUser.model.js';
import generateToken from '../utils/generateToken.js';

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AdminUser.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        generateToken( user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,    
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.log('Error in admin login controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
};

export const RegisterUser = async(req,res) =>{
    try{
        const {name, email, address, phone, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'User already exists with this email'});
        }   
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,  
            address,
            phone,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            address: newUser.address,
            phone: newUser.phone,
            role: newUser.role,
            });
    }catch(error){
        console.log('Error in user registration controller', error.message);
        res.status(500).json({error: 'Internal Server Error' });
    }
}

export const LoginUser = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error: 'Invalid email or password'});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({error: 'Invalid email or password'});
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            role: user.role,
        });
    }catch(error){
        console.log('Error in user login controller', error.message);
        res.status(500).json({error: 'Internal Server Error' });
    }
}