import express from 'express';
import { loginAdmin } from '../controllers/auth.controller.js';
import { RegisterUser } from '../controllers/auth.controller.js';
import { LoginUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/admin/login', loginAdmin);
router.post('/user/register', RegisterUser);
router.post('/user/login', LoginUser);

export default router;