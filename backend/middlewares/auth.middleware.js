import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.model.js';
import User from '../models/User.js';



export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
        }
        let user = await AdminUser.findById({_id:decoded.userId}).select('-password');
        if (user && user.role === 'admin') {
            user = await AdminUser.findById(decoded.userId).select('-password');
        } else {
            return res.status(404).json({ error: 'User not found/not admin' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log('Error in protectRoute middleware: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }   
};

export const staffProtectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
        }
        let user = await User.findById({_id:decoded.userId}).select('-password');
        if (user && (user.role === 'staff')) {
            user = await User.findById(decoded.userId).select('-password');
        } else {
            return res.status(404).json({ error: 'User not found/not authorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log('Error in staffProtectRoute middleware: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};