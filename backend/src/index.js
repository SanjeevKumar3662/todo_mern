import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 3000;
const DB_URI = process.env.DB_URI;

//importing todo model
import Todo from "../models/todo.model.js";

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
    console.log(title, "created");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.send(todos);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//delete an item
app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.deleteOne({ _id: req.params.id });
    // console.log(req.params.id);

    if (deletedTodo.deletedCount === 1) {
      console.log("todo deleted");
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: "Todo not found" });
      console.log("404 can't find todo");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
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

export default app;
