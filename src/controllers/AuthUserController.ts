import {Request, Response} from 'express'
import { AuthUserService } from '../service/AuthUserService'

interface AuthUserRequest {
    name: string;
    password: string;
}

class AuthUserController {
    async handle(req: Request, res: Response){
        const { name, password } = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({
            name,
            password
        });

        return res.json(auth)
    }
}

export { AuthUserController }
