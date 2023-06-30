import z from "zod"
import { CommentsModel } from "../../models/Comments"

export interface GetCommentsInputDTO {
    q: string,
    token: string
}

export type GetCommentsOutputDTO = CommentsModel[] | undefined

export const GetCommentsSchema = z.object({
    q: z.string().min(1),
    token: z.string().min(10)
})