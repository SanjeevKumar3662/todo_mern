import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const DB_URI = process.env.DB_URI;

const connectDb = async () => {
  try {
    const db = await mongoose.connect(`${DB_URI}/${DB_NAME}`);
    // isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDb;
