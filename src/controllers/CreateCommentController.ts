import { Request, Response } from 'express';
import { CreateCommentService } from '../comment/CreateCommentService';

class CreateCommentController {
    async handle(req: Request, res: Response) {
        const { content } = req.body;
        const user_id = req.user_id;

        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        const createCommentService = new CreateCommentService();

        try {
            const comment = await createCommentService.execute({
                content,
                userId: user_id
            });

            return res.status(201).json(comment);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { CreateCommentController };