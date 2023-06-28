import express  from "express"
import { PostsController } from "../controller/PostController"
import { PostsBusiness } from "../business/PostBusiness"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostDatabase } from "../database/PostDatabase"

export const postRouter = express.Router()

const postController = new PostsController(
    new PostsBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getPost)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)
postRouter.put("/:id/like", postController.likeOrDislikePost)
