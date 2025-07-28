import prismaClient from "../prisma";

interface CreateCommentRequest {
    content: string;
    userId: string;
}

interface CommentWithUser {
    id: string;
    content: string;
    createdAt: Date;
    user: {
        id: string;
        name: string;
    };
}

class CreateCommentService {
    async execute({ content, userId }: CreateCommentRequest): Promise<Omit<CommentWithUser, 'createdAt'> & { created_at: string }> {
        if (!content) {
            throw new Error("Content is required");
        }

        const comment = await prismaClient.comment.create({
            data: {
                content: content,
                user: {
                    connect: {
                        id: userId
                    }
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return {
            id: comment.id,
            content: comment.content,
            created_at: comment.createdAt.toISOString(),
            user: {
                id: comment.user.id,
                name: comment.user.name
            }
        };
    }
}

export { CreateCommentService }
