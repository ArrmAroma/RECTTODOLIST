import express from "express";
import { loggerMiddleware } from "../middleware/logger.middleware";
import { getTodos, createTodo, updateTodo, deleteTodo, toggleFinished} from "../controller/todolist.controller";
  
const router = express.Router();

router.use(loggerMiddleware)
router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", toggleFinished);

export default router;

