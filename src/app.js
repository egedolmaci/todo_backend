import express from "express";
import dotenv from "dotenv";
import { getTasks } from "./index.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

dotenv.config();

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    err: "Internal server error",
    message: "err.message",
  });
});

app.get("/tasks", getTasks);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
