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

async function signin(username: string, password: string) {
  const user = await prisma.users.findFirst({
    where: {
      username,
    },
  });
  if (user) {
    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) {
      throw new Error("invalid password");
    }
    return user;
  }

  throw new Error("user not found");
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
  firstName: string | undefined;
  lastName: string | undefined;
}

async function updateUser(
  id: number,
  { firstName, lastName }: UpdateParams
): Promise<userInput | Error> {
  const updateData: Record<string, any> = {};
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;

  try {
    const res = await prisma.users.update({
      where: {
        id,
      },
      data: updateData,
    });
    return res;
  } catch (error) {
    throw error;
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


export {
  createUser,
  updateUser,
  getUser,
  signin,
};

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
