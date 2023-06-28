import { Request, Response } from "express";
import { CommentsBusiness } from "../business/CommentsBusiness";
import { CreateCommentstSchema } from "../dtos/comments/createComments.dto";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { DeleteCommentsSchema } from "../dtos/comments/deleteComments.dto";
import { GetCommentsSchema } from "../dtos/comments/getComments.dto";
import { LikeOrDislikeCommentsSchema } from "../dtos/comments/likeOrDislikeComments.dto";

export class CommentsController {
    constructor(
        private commentsBusiness: CommentsBusiness
    ) {}
    
    public createComments=async (req: Request, res: Response) => {
        try {
            const input = CreateCommentstSchema.parse({
                idPost: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            })

            const output = await this.commentsBusiness.createComments(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getComments=async (req: Request, res: Response) => {
        try {
            const input = GetCommentsSchema.parse({
                q: req.query.q,
                token: req.headers.authorization
            })

            const output = await this.commentsBusiness.getComments(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deleteComments =async (req: Request, res: Response) => {
        try {
            const input = DeleteCommentsSchema.parse({
                id: req.params.id,
                token: req.headers.authorization
            })

            const output = await this.commentsBusiness.deleteComments(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public likeOrDislikeComments =async (req: Request, res: Response) => {
        try {
            const input = LikeOrDislikeCommentsSchema.parse({
                commentsId: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            })

            const output = await this.commentsBusiness.likeOrDislikeComments(input)
            
            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}