import z from "zod"

export interface LikeOrDislikeCommentsInputDTO {
    commentsId: string,
    token: string,
    like: boolean
}

export type LikeOrDislikeCommentsOutputDTO = undefined

export const LikeOrDislikeCommentsSchema = z.object({
    commentsId: z.string().min(1),
    token: z.string().min(10),
    like: z.boolean()
}).transform(data => data as LikeOrDislikeCommentsInputDTO)