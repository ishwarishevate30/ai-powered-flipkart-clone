import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection function
const connectToDatabase = async () => {
  try {
    const URL = process.env.MONGO_URI || 'mongodb://localhost:27017/flipkart-clone';
    await mongoose.connect(URL); // Removed useNewUrlParser and useUnifiedTopology
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectToDatabase;
