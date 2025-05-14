// config/db.js
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    // Support either env-var name, but prefer MONGODB_URI
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      throw new Error(
        "Missing MongoDB connection string. Set MONGODB_URI (or MONGO_URI) in your environment."
      );
    }

    console.log("🔗 Connecting to MongoDB at:", uri);
    await mongoose.connect(uri, {
      dbName: "study-tracker",
      appName: "StudyTracker",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Database Connected Successfully.");
  } catch (error) {
    console.error(" Database Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
