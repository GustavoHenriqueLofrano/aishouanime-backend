import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthUserController } from "./controllers/AuthUserController";
import { DetailUserController } from "./controllers/DetailUserController";
import { CreateCommentController } from "./controllers/CreateCommentController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// Rotas públicas
router.post('/users', new CreateUserController().handle);
router.post('/auth', new AuthUserController().handle);

// Rotas protegidas (requerem autenticação)
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.post('/comments', isAuthenticated, new CreateCommentController().handle);

export { router };