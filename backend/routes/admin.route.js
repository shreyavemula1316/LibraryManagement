import express from 'express';
import { addstaff, getAllStaffs,deleteStaff, updateStaff } from '../controllers/admin.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/admin/add-staff', protectRoute, addstaff);
router.get('/admin/staffs', protectRoute, getAllStaffs);
router.delete('/admin/staff/:staffId', protectRoute, deleteStaff);
router.patch('/admin/staff/:staffId', protectRoute, updateStaff);  

export default router;