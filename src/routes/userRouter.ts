// userRouter?

import { Router } from "express";
import { createUserSchema } from "../schemas/userSchema";
import { createUser } from "../services/userService";

import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { success, data, error } = createUserSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const user = await createUser(
      data.username,
      data.password,
      data.firstName,
      data.lastName
    );

    const token = JWT.sign(JSON.stringify(user), JWT_SECRET);

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      msg: "error creating user",
    });
  }
});

userRouter.get('/',async (req,res)=>{
    res.status(200).json({
      status: 'ok';
    })
})

export default userRouter;
