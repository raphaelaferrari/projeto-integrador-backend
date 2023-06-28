import z from "zod"

export interface CreateCommentstInputDTO {
    idPost: string
    content: string,
    token: string
}

export type CreateCommentstOutputDTO = undefined

export const CreateCommentstSchema = z.object({
    idPost: z.string().min(1),
    content: z.string().min(1),
    token: z.string().min(10)
}).transform(data => data as CreateCommentstInputDTO)