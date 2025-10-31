import mongoose from "mongoose";
const DB_URI = process.env.DB_URI;

const connectDb = async () => {
  try {
    const db = await mongoose.connect(`${DB_URI}`);
    // isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDb;
