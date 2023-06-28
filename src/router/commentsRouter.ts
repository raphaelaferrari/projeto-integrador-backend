import express  from "express"
import { CommentsController } from "../controller/CommentsController"
import { CommentsBusiness } from "../business/CommentsBusiness"
import { CommentsDatabase } from "../database/CommentsDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"

export const commentsRouter = express.Router()

const commentsController = new CommentsController(
    new CommentsBusiness(
        new CommentsDatabase(),
        new TokenManager(),
        new IdGenerator()
    )
)

commentsRouter.post("/:id", commentsController.createComments) // TROCAR ESSE CREATE POST
commentsRouter.delete("/:id", commentsController.deleteComments)
commentsRouter.get("/", commentsController.getComments)
commentsRouter.put("/:id/like", commentsController.likeOrDislikeComments)