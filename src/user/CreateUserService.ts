import { compare, hash } from 'bcryptjs'
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

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                name: name
            }
        })

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);
        const passwordDecript = await compare(password, passwordHash);

    const user = await prismaClient.user.create({
      data:{
        name: name,
        password: passwordHash
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