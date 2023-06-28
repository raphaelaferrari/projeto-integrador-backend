import z from "zod"

export interface DeletePostInputDTO {
    id: string,
    token: string
}

export type DeletePostOutputDTO = undefined

export const DeletePostSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(10)
}).transform(data => data as DeletePostInputDTO)