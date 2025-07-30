import prismaClient from "../prisma";



interface UserRequest {
    name: string;
    password: string;
}

class CreateUserService {
    async execute({ name, password }: UserRequest) {

        if (!name || !password) {
            throw new Error("Name and password are required");
        }
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }
        if (name.length < 4) {
            throw new Error("Name must be at least 4 characters long");
        }
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                name: name
            }
        })

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

    const user = await prismaClient.user.create({
      data:{
        name: name,
        password: password
      },
      select:{
        id: true,
        name: true     
      }
    })


    return user;
  }
}

export { CreateUserService }