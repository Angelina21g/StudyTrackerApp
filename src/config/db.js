import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();


 //Function to connect with the Database
 //Docs: https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.connect
 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'study-tracker',    
      appName: 'StudyTracker',     
    });
    console.log('Database Connected Successfully.');
  } catch (error) {
    console.error('Database Connection Failed:', error);
    process.exit(1);
  }
};

export default connectDB;
