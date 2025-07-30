import { Router } from "express";
import { auth, AuthenticatedRequest } from "../middlewares";
import { Response } from "express";
import {
  createTodoSchema,
  todoSchema,
  updateTodoSchema,
} from "../schemas/todoSchema";
import { createTodo, getTodos, updateTodo } from "../services/todoService";

const todoRouter = Router();

todoRouter.post("/", auth, async (req: AuthenticatedRequest, res: Response) => {
  const userid = req.user?.id;

  if (!userid) {
    return res.status(400).json({
      msg: "user_id undefined from auth",
      userid,
    });
  }

  const { success, data, error } = createTodoSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: error.issues[0].message });
  }

  try {
    const todo = await createTodo(userid, data.title, data.description);

    return res.status(200).json({
      msg: "todo successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      msg: "error creating todo",
      error,
    });
  }
});

todoRouter.put(
  "/update",
  auth,
  async (req: AuthenticatedRequest, res: Response) => {
    const userid = req.user?.id;

    if (!userid) {
      return res.status(400).json({
        msg: "user_id undefined from auth",
        userid,
      });
    }

    const { success, data, error } = updateTodoSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ error: error.issues[0].message });
    }

    try {
      const todo = await updateTodo(data.id, data.done);

      res.status(200).json({
        msg: "todo updated succesfully",
        todo,
      });
    } catch (error) {
      res.status(500).json({
        msg: "failed to update todo",
        error,
      });
    }
  }
);

todoRouter.get("/", auth, async (req: AuthenticatedRequest, res: Response) => {
  const userid = req.user?.id;

  if (!userid) {
    return res.status(400).json({
      msg: "user_id undefined from auth",
      userid,
    });
  }

  try {
    const todos = await getTodos(userid);

    return res.status(200).json({
      msg: "todos retrieved successfully",
      todos,
    });
  } catch (error) {
    return res.json(500).json({
      msg: "couldnt retrieve todos",
      error,
    });
  }
});

todoRouter.get("/health", (req, res) => {
  return res.status(200).json({
    msg: "ok from todoRouter",
  });
});

export default todoRouter;
