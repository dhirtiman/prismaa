import { PrismaClient } from "../generated/prisma";
import { todoOutput } from "../schemas/todoSchema";
const prisma = new PrismaClient();

const createTodo = async (
  user_id: number,
  title: string,
  description: string
): Promise<todoOutput | Error> => {
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
    throw error;
  }
};


const updateTodo = async (id: number, done: boolean) : Promise<todoOutput | Error>  =>{
  try {
    const res = await prisma.todos.update({
      where: {
        id,
      },
      data: {
        done,
      }
    })

    return res;
  } catch (error) {
    throw error;
  }
}

const getTodos = async (user_id: number): Promise<todoOutput[] | Error> => {
  try {
    const todos = await prisma.todos.findMany({
      where: {
        user_id,
      },
    });
    return todos;
  } catch (error) {
    throw error;
  }
};




const getDetails = async (id: number) => {
  try {
    const res = await prisma.users.findFirst({
      where: { id },
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

    return res;
  } catch (error) {
    throw error;
  }
};

export { createTodo, getTodos, getDetails,updateTodo };
