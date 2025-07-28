import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { userInput } from "../schemas/userSchema";

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function checkPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

async function login(username: string, password: string) {
  const user = await prisma.users.findFirst({
    where: {
      username,
    },
  });
  if (user) {
    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) {
      return new Error("invalid password");
    }
    return user;
  }
  return new Error("user not found");
}

async function createUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<userInput | Error> {
  const hashedPassword = await hashPassword(password);

  try {
    const res = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    return res;
  } catch (error: any) {
    return error;
  }
}

interface UpdateParams {
  firstName: string;
  lastName: string;
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdateParams
) {
  try {
    const res = await prisma.users.update({
      where: {
        username,
      },
      data: {
        firstName,
        lastName,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
}

async function getUser(username: string) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        username,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
}

async function createTodo(user_id: number, title: string, description: string) {
  try {
    const res = await prisma.todos.create({
      data: {
        title,
        description,
        user_id,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

const getTodos = async (user_id: number) => {
  try {
    const todos = await prisma.todos.findMany({
      where: {
        user_id,
      },
    });
    return todos;
  } catch (error) {
    return error;
  }
};

const getDetails = async (username: string) => {
  const res = await prisma.users.findFirst({
    where: { username },
    // include: { todos: true },
    select: {
      username: true,
      firstName: true,
      lastName: true,
      todos: {
        select: {
          title: true,
          description: true,
          done: true,
        },
      },
    },
  });
  console.log(res);
};

export { createUser, updateUser, getUser, createTodo, getTodos, getDetails };

// async function main() {
//   await getUser("smallpp");
//   await updateUser("smallpp", { firstName: "Dhirtiman", lastName: "Khati" });
//   await getUser("smallpp");
//   await getUser("susi");
// }

// createUser('smallpp','12345678','Dhirtiman','Khati')
// createUser('susi','12345678','Batak','ji')
// main();

// createTodo(1,'Gym','do some gym nigag')
// createTodo(1,'cook','make roti at 8:30 pm')

// getTodos(1);

// getDetails("smallpp");
// getDetails("susi");
