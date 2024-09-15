import express from "express";
import dotenv from "dotenv";
import {
  getTasks,
  addTask,
  deleteTaskById,
  updateTaskByTitle,
} from "./task.js";
import { addUser } from "./user.js";
import { dbAuthorizer } from "./db.js";
import basicAuth from "express-basic-auth";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

dotenv.config();

app.use(
  basicAuth({
    authorizer: dbAuthorizer,
    authorizeAsync: true,
  }),
);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    err: "Internal server error",
    message: "err.message",
  });
});

app.get("/tasks", getTasks);

app.post("/tasks", addTask);

app.delete("/tasks/:id", deleteTaskById);

app.put("/tasks/:title", updateTaskByTitle);

app.put("/users", addUser);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
