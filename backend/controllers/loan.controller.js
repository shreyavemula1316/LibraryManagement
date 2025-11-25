import Book from "../models/Book.model.js";
import Loan from "../models/Loan.model.js";
import Reservation from "../models/Reservation.model.js";

export const issueBook = async (req, res) => {
    try {
        const { bookId, userId, dueDate } = req.body;
        const book = await Book.findById(bookId);
        if (!book) {    
            return res.status(404).json({ error: 'Book not found' });
        }
        if (book.copiesAvailable < 1) {
            return res.status(400).json({ error: 'No copies available for this book' });
        }

        const existingLoan = await Loan.findOne({ book: bookId, user: userId, returnDate: null });
        if (existingLoan) {
            return res.status(400).json({ error: 'User already has this book issued' });
        }
        const loan = new Loan({
            book: bookId,
            user: userId,   
            dueDate,
        });
        await loan.save();
        book.copiesAvailable -= 1;
        await book.save();
        res.status(201).json({ message: 'Book issued successfully', loan });
    } catch (error) {
        console.log('Error in issueBook controller: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const returnBook = async (req, res) => {
    try {
        const { loanId } = req.params;  
        const loan = await Loan.findById(loanId).populate('book');
        if (!loan || loan.returnDate) {
            return res.status(404).json({ error: 'Loan record not found or book already returned' });
        }
        loan.returnDate = new Date();

        const currentDate = new Date();
        if (currentDate > loan.dueDate) {
            const lateDays = Math.ceil((currentDate - loan.dueDate) / (1000 * 60 * 60 * 24));
            loan.Fine = lateDays * 1; 
        }
        await loan.save();
        const book = await Book.findById(loan.book._id);
        book.copiesAvailable += 1;
        await book.save();

        const nextreservation = await Reservation.findOne({ book: book._id, status: 'reserved' }).sort({ reservationDate: 1 });
        if (nextreservation) {
            nextreservation.status = 'completed';
            await nextreservation.save();
        }

        res.status(200).json({ message: 'Book returned successfully', loan });
    } catch (error) {
        console.log('Error in returnBook controller: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
};

export const getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate('book').populate('user');
        res.status(200).json({ loans });
    } catch (error) {
        console.log('Error in getAllLoans controller: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserLoans = async (req, res) => {
    try {
        const { userId } = req.params;
        const loans = await Loan.find({ user: userId }).populate('book');
        res.status(200).json({ loans });
    }
    catch (error) {
        console.log('Error in getUserLoans controller: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};