import express from 'express';
import { reserveBook } from '../controllers/reservation.controller.js';


const router = express.Router();
router.post('/reservations/reserve', reserveBook);

export default router;