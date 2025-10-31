import app from "./app.js";

const PORT = 3000;

// Only start a listener locally
if (process.env.MODE === "DEV") {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}
