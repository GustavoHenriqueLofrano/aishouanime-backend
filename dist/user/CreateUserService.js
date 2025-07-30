"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, password }) {
            if (!name || !password) {
                throw new Error("Name and password are required");
            }
            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }
            if (name.length < 4) {
                throw new Error("Name must be at least 4 characters long");
            }
            const userAlreadyExists = yield prisma_1.default.user.findFirst({
                where: {
                    name: name
                }
            });
            if (userAlreadyExists) {
                throw new Error("User already exists");
            }
            const user = yield prisma_1.default.user.create({
                data: {
                    name: name,
                    password: password
                },
                select: {
                    id: true,
                    name: true
                }
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
