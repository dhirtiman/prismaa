import z from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const updateTodoSchema = z.object({
  id: z.number(),
  done: z.boolean(),
});

export const todoSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  done: z.boolean(),
  user_id: z.number(),
});

export type todoOutput = z.infer<typeof todoSchema>;
