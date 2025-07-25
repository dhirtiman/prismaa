import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();





async function createUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const res = await prisma.users.create({
      data: {
        username,
        password,
        firstName,
        lastName,
      },
    });
  
    console.log(res);
  }
  
  interface UpdateParams {
    firstName: string;
    lastName: string;
  }
  
  async function updateUser(
    username: string,
    { firstName, lastName }: UpdateParams
  ) {
    const res = await prisma.users.update({
      where: {
        username,
      },
      data: {
        firstName,
        lastName,
      },
    });
    console.log(res);
  }
  
  async function getUser(username: string) {
    const user = await prisma.users.findFirst({
      where: {
        username,
      },
    });
    console.log(user);
  }
  
  async function createTodo(user_id: number, title: string, description: string) {
    const res = await prisma.todos.create({
      data: {
        title,
        description,
        user_id,
      },
    });
    console.log(res);
  }
  
  const getTodos = async (user_id: number) => {
    const todos = await prisma.todos.findMany({
      where: {
        user_id,
      },
    });
    console.log(todos);
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
              }
          }
      }
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
