import express from "express";
import { join } from "path";

/**
 * Small Express Server just to serve
 * React App
 */
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static(join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`React app started on port ${PORT}`);
});
