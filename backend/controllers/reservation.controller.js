import Reservation from "../models/Reservation.model.js";
import Book from "../models/Book.model.js";
import Loan from "../models/Loan.model.js";

export const reserveBook = async (req, res) => {
    try {
        const { bookId, userId} = req.body;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        if(book.copiesAvailable > 0 ) {
            return res.status(400).json({ error: 'Book is available, no need to reserve' });
        }

        const activeLoan = await Loan.findOne({ book: bookId, user: userId, returnDate: null });
        if (activeLoan) {
            return res.status(400).json({ error: 'You have already borrowed this book' });
        }
    // use the Reservation model to check for an existing reservation
    const existingReservation = await Reservation.findOne({ book: bookId, user: userId, status: 'reserved' });
        if (existingReservation) {
            return res.status(400).json({ error: 'User already has a reservation for this book' });
        }
        const reservation = new Reservation({
            book: bookId,
            user: userId,
            status: 'reserved',
        });
        await reservation.save();
        res.status(201).json({ message: 'Book reserved successfully', reservation });
    } catch (error) {
        console.log('Error in reserveBook controller: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};