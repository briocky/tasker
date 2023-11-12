

type CommentDto = {
    id?: number;
    text: string;
    createdAt: Date;
    authorEmail?: string;
    taskId: number;
}

export type {CommentDto}