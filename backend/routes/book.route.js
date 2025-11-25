import { addBook, getAllBooks,updateBook,deleteBook } from "../controllers/book.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import express from "express";


const router = express.Router();

router.post('/books/add-book', protectRoute, addBook);
router.get('/books/getbooks', protectRoute, getAllBooks);
router.put('/books/update-book/:bookId', protectRoute, updateBook);
router.delete('/books/delete-book/:bookId', protectRoute, deleteBook);

export default router;