"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./controllers/CreateUserController");
const AuthUserController_1 = require("./controllers/AuthUserController");
const DetailUserController_1 = require("./controllers/DetailUserController");
const CreateCommentController_1 = require("./controllers/CreateCommentController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const router = (0, express_1.Router)();
exports.router = router;
// Rotas públicas
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/auth', new AuthUserController_1.AuthUserController().handle);
// Rotas protegidas (requerem autenticação)
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
router.post('/comments', isAuthenticated_1.isAuthenticated, new CreateCommentController_1.CreateCommentController().handle);
