import z from "zod"
import { PostModel } from "../../models/Post"

export interface GetPostInputDTO {
    q: string,
    token: string
}

export type GetPostOutputDTO = PostModel[]

export const GetPostSchema = z.object({
    q: z.string().min(1).optional(),
    token: z.string().min(10)
}).transform(data => data as GetPostInputDTO)