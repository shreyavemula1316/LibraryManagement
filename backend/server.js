import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import AdminUser from './models/AdminUser.model.js';
import authRoute from './routes/auth.route.js';
import adminRoute from './routes/admin.route.js';
import bookRoute from './routes/book.route.js';
import loanRoute from './routes/loan.route.js';
import reservationRoute from './routes/reservation.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Library Management System API');
});

app.use('/api',authRoute);
app.use('/api',adminRoute);
app.use('/api',bookRoute)
app.use('/api', loanRoute);
app.use('/api', reservationRoute);


const startServer = async () =>{
  await connectDB();
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}

startServer();
