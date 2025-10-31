import mongoose from "mongoose";
import app from "./app.js";
// import { DB_NAME } from "./constants.js";

const PORT = 3000;
const DB_URI = process.env.DB_URI;

// Prevent multiple DB connections on Vercel
let isConnected = false;

const connectDb = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(`${DB_URI}`);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

// Only start a listener locally
if (process.env.MODE === "DEV") {
  connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running locally on port ${PORT}`);
    });
  });
} else {
  // For Vercel, just connect once
  await connectDb();
}
