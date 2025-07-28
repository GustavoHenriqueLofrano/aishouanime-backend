import { PrismaClient } from "../generated/prisma/client"
const prismaClient = new PrismaClient({
    log: ['info', 'warn', 'error']
});

export default prismaClient;