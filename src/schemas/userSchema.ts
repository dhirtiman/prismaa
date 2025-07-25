import { z } from 'zod';



export const createUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
