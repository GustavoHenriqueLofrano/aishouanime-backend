import {Request, Response} from 'express'
import { CreateUserService } from '../service/CreateUserService'

class CreateUserController{
  async handle(req: Request, res: Response){
    const { name, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      password
    });

    return res.json(user)
  }
}

export { CreateUserController }