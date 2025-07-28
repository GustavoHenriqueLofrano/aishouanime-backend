import prismaClient from "../prisma";
import { compare } from "bcryptjs";
import {sign}from "jsonwebtoken";

interface AuthUserRequest {
    name: string;
    password: string;
}


class AuthUserService {
    async execute({ name, password }: AuthUserRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                name: name
            }
        })

        if (!user) {
            throw new Error("User not found");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Password not match");
        }

        const token = sign({ 
            name: user.name 
        }, process.env.SECRET_KEY,
        {
            subject: user.id,
            expiresIn: "30d"
        }
            
            
        );

        return {
            id: user.id,
            name: user.name,
            token: token
        };
            
        
    }
}   

export { AuthUserService }