import { PrismaClient } from "../../src/generated/prisma/client"
const prismaClient = new PrismaClient({
    log: ['info', 'warn', 'error']
});

export default prismaClient;