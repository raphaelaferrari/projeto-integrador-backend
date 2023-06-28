import z from "zod"

export interface DeleteCommentsInputDTO {
    id: string,
    token: string
}

export type  DeleteCommentsOutputDTO = undefined

export const DeleteCommentsSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(10)
}).transform(data => data as DeleteCommentsInputDTO)