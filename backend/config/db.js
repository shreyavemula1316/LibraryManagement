import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/library';
console.log("MONGO_URI:", MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

export default connectDB;
