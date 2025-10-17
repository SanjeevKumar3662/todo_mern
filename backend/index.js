import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).send("<h1>this is the / homepage</h1>");
});

app.listen(PORT, () => {
  console.log("Sever Started !");
});
