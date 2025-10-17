import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

const app = express();

const PORT = 3000;
const DB_URI = configDotenv().parsed.DB_URI;

app.get("/", (req, res) => {
  res.status(200).send("<h1>this is the / homepage</h1>");
});

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("connected to DB!");
    app.listen(PORT, () => {
      console.log("Sever Started !");
      // console.log(DB_URI);
    });
  } catch (error) {
    console.log(error.message);
  }
};

connectDb();
