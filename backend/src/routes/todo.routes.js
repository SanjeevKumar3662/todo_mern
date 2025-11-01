import { Router } from "express";
import {
  getAlltodos,
  createTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.route("/all-todos").get(getAlltodos);
router.route("/create").post(createTodo);
router.route("/delete/:id").delete(deleteTodo);

export default router;
