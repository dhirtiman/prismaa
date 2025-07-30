// userRouter?

import { Router } from "express";
import {
  createUserSchema,
  signinUserSchema,
  updateUserSchema,
} from "../schemas/userSchema";
import { auth, AuthenticatedRequest } from "../middlewares";
import { createUser, signin, updateUser } from "../services/userService";

import JWT from "jsonwebtoken";
import { updateTodoSchema } from "../schemas/todoSchema";

const JWT_SECRET = process.env.JWT_SECRET as string;

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { success, data, error } = createUserSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: error.issues[0].message });
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

userRouter.post("/signin", async (req, res) => {
  const { success, data, error } = signinUserSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: error.issues[0].message });
  }

  try {
    const user = await signin(data.username, data.password);
    const token = JWT.sign(JSON.stringify(user), JWT_SECRET);

    return res.status(200).json({
      msg: "signed in successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
      msg: "error signing in",
    });
  }
});

userRouter.put("/update", auth,async (req: AuthenticatedRequest, res) => {



  const { success, data, error } = updateUserSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: error.issues[0].message });
  }
  const userid = req.user?.id
  
  if (!userid) {
    return res.status(400).json({
      msg: 'username undefined from auth',
      userid,
    })
  }




  try {
    const updatedUser = await updateUser(userid as number,{
      firstName: data.firstName,
      lastName: data.lastName
    })

    if (updatedUser) {
      return res.status(200).json({
        msg: 'user updated succesfully',
        user: updatedUser,
      })
    }
  } catch (error) {
   return res.status(500).json({
    msg: 'error updating user',
    error,
   }) 
  }



});



userRouter.get("/", async (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

export default userRouter;
