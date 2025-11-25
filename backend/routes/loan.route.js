import express from 'express';
import { getAllLoans, getUserLoans, issueBook,returnBook } from '../controllers/loan.controller.js';
import { staffProtectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/books/issue',staffProtectRoute, issueBook);
router.post('/books/return/:loanId',staffProtectRoute, returnBook);
router.get('/loans/all',staffProtectRoute,getAllLoans );
router.get('/loans/user/:userId',staffProtectRoute,getUserLoans );

export default router;
