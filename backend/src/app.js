import express from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./routes/todo.routes.js";
import connectDb from "./db/db.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect DB
await connectDb();

//test endpoint
app.get("/", (req, res) => {
  res.status(200).send("<h1>this is the / homepage</h1>");
});

app.use("/api/v1/todos", userRouter);

export default app;
