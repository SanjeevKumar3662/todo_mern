import { Router } from "express";
import {
  getAlltodos,
  createTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/all-todos").get(getAlltodos);
router.route("/create").post(authenticateToken, createTodo);
router.route("/delete/:id").delete(authenticateToken, deleteTodo);

export default router;
