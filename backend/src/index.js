import mongoose from "mongoose";

const PORT = 3000;
const DB_URI = process.env.DB_URI;
import { DB_NAME } from "./constants.js";

import app from "./app.js";

//db connection
const connectDb = async () => {
  try {
    await mongoose.connect(`${DB_URI}/${DB_NAME}`);
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
