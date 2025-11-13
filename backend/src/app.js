import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./db/db.js";
import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/users.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: ["https://todo.sanjeevkumar.site", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect DB
await connectDb();

//test endpoint
app.get("/", (req, res) => {
  res.status(200).send("<h1>this is the / homepage</h1>");
});

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/users", userRouter);

export default app;
