import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/posts/createPosts.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/posts/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/posts/editPost.dto";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/posts/getPost.dto";
import { LikeOrDislikePostInputDTO, LikeOrDislikePostOutputDTO } from "../dtos/posts/likeOrDislikePost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { LikeDislikeDB, POST_LIKE, Post } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostsBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const { content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("Token invalido")
        }

        const id = this.idGenerator.generate()

        const newPost = new Post(
            id,
            content,
            0,
            0,
            0,
            new Date().toDateString(),
            payload.id,
            payload.name
        )

        const newPostDB = newPost.toDBModel()
        await this.postDatabase.createPost(newPostDB)

        const output: CreatePostOutputDTO = undefined

        return output
    }

    public getPost = async (input: GetPostInputDTO): Promise<GetPostOutputDTO> => {
        const { q, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token invalido")
        }

        const postsDBName = await this.postDatabase.getPost(q)

        const posts = postsDBName.map((postName) => {

            const post = new Post(
                postName.id,
                postName.content,
                postName.likes,
                postName.dislikes,
                postName.comments,
                postName.created_at,
                postName.creator_id,
                postName.creator_name
            )
            
            return post.toBusinessModel()
        })
        const output: GetPostOutputDTO = posts

        return output
    }
    
    public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {
        const { id, content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token inválido")
        }

        const searchPostDB = await this.postDatabase.searchPostId(id)

        if (!searchPostDB) {
            throw new BadRequestError("não existe post com esse id")
        }

        if (payload.id !== searchPostDB.creator_id) {
            throw new BadRequestError("somente quem criou o post pode editar")
        }

        const post = new Post(
            searchPostDB.id,
            searchPostDB.content,
            searchPostDB.likes,
            searchPostDB.dislikes,
            searchPostDB.comments,
            searchPostDB.created_at,
            searchPostDB.creator_id,
            payload.name
        )

        post.setContent(content)

        const editPostDB = post.toDBModel()
        await this.postDatabase.editPost(editPostDB)

        const output: EditPostOutputDTO = undefined

        return output
    }

    public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const { id, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token inválido")
        }

        const searchPostDB = await this.postDatabase.searchPostId(id)

        if (!searchPostDB) {
            throw new BadRequestError("não existe post com esse id")
        }

        if (payload.role === USER_ROLES.ADMIN) {

        } else if (payload.id !== searchPostDB.creator_id) {
            throw new BadRequestError("somente quem criou o post pode deletar")
        }

        await this.postDatabase.deletePost(id)

        const output: DeletePostOutputDTO = undefined

        return output

    }

    public likeOrDislikePost = async (input: LikeOrDislikePostInputDTO): Promise<LikeOrDislikePostOutputDTO> => {
        const { token, postId, like } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token inválido")
        }

        const postDBCreatorName = await this.postDatabase.searchPostCreatorNameById(postId)
        
        if (!postDBCreatorName) {
            throw new BadRequestError("não existe post com esse id")
        }
        
        const post = new Post(
            postDBCreatorName.id,
            postDBCreatorName.content,
            postDBCreatorName.likes,
            postDBCreatorName.dislikes,
            postDBCreatorName.comments,
            postDBCreatorName.created_at,
            postDBCreatorName.creator_id,
            postDBCreatorName.creator_name
        )        

        const likeSQlite = like ? 1 : 0

        const likeDislikeDB : LikeDislikeDB = {
            user_id: payload.id,
            post_id: postId,
            like: likeSQlite
        } 

        const likeDislikeExists = await this.postDatabase.searchLikeDislike(likeDislikeDB)

        if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeLike()
            }else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeLike()
                post.addDislike()
            }
        }else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
            if (like === false) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeDislike()
            }else{
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeDislike()
                post.addLike()
            }
        } else {
            await this.postDatabase.insertLikeDislike(likeDislikeDB)
            like ? post.addLike() : post.addDislike()
        }

        const updatePostDb = post.toDBModel()
        await this.postDatabase.updatePost(updatePostDb)

        const output: LikeOrDislikePostOutputDTO = undefined

        return output

    }


}