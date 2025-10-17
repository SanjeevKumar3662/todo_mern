import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 3000;
const DB_URI = configDotenv().parsed.DB_URI;

//importing todo model
import Todo from "./models/todo.model.js";

express.urlencoded({ extended: true });
app.use(express.json());

//test endpoint
app.get("/", (req, res) => {
  res.status(200).send("<h1>this is the / homepage</h1>");
});

//create a todo
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  try {
    await Todo.create({ title, description });
    res.status(200).json({ message: "Created Successfully" });
    // console.log(title, "created");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//db connection
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
