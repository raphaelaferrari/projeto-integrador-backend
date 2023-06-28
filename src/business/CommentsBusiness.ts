import { CommentsDatabase } from "../database/CommentsDatabase"
import { PostDatabase } from "../database/PostDatabase"
import { CreateCommentstInputDTO, CreateCommentstOutputDTO } from "../dtos/comments/createComments.dto"
import { DeleteCommentsInputDTO, DeleteCommentsOutputDTO } from "../dtos/comments/deleteComments.dto"
import { GetCommentsInputDTO, GetCommentsOutputDTO } from "../dtos/comments/getComments.dto"
import { LikeOrDislikeCommentsInputDTO, LikeOrDislikeCommentsOutputDTO } from "../dtos/comments/likeOrDislikeComments.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { COMMENTS_LIKE, Comments, LikeDislikeDB } from "../models/Comments"
import { Post} from "../models/Post"
import { USER_ROLES } from "../models/User"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class CommentsBusiness {
    constructor(
        private commentsDatabase: CommentsDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ) { }

    public createComments = async (input: CreateCommentstInputDTO): Promise<CreateCommentstOutputDTO> => {
        const { idPost, content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("Token invalido")
        }

        const id = this.idGenerator.generate()

        const newComments = new Comments(
            id,
            idPost,
            content,
            0,
            0,
            new Date().toDateString(),
            payload.id,
            payload.name
        )


        const newCommentsDB = newComments.toDBModel()
        await this.commentsDatabase.createComments(newCommentsDB)

        const post = await this.commentsDatabase.searchPostId(newCommentsDB.post_id)

        const newPost =  new Post(
            post.id,
            post.content,
            post.likes,
            post.dislikes,
            post.comments,
            post.created_at,
            post.creator_id,
            post.creator_name
        )
        const quantityComments = await this.commentsDatabase.quantityComments(idPost)
        
        newPost.setComments(quantityComments)
        
        const editPostDB= newPost.toDBModel()
        await this.commentsDatabase.editPost(editPostDB)

        const output: CreateCommentstOutputDTO = undefined
        return output
    }

    public getComments = async (input: GetCommentsInputDTO): Promise<GetCommentsOutputDTO> => {
        const { q, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token inválido")
        }

        const commentsDBName = await this.commentsDatabase.getComments(q)

        const getComments = commentsDBName.map((commentsName) => {
            const comments = new Comments(
                commentsName.id,
                commentsName.post_id,
                commentsName.content,
                commentsName.likes,
                commentsName.dislikes,
                commentsName.created_at,
                commentsName.creator_comments_id,
                commentsName.creator_coments_name
            )

            return comments.toBusinessModel()
        })

        const output: GetCommentsOutputDTO = getComments

        return output
    }

    public deleteComments = async (input: DeleteCommentsInputDTO): Promise<DeleteCommentsOutputDTO> => {
        const { id, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token inválido")
        }

        const searchCommentsDB = await this.commentsDatabase.searchCommentsId(id)

        if (!searchCommentsDB) {
            throw new BadRequestError("não existe comments com esse id")
        }

        if (payload.role === USER_ROLES.ADMIN) {

        } else if (payload.id !== searchCommentsDB.creator_comments_id) {
            throw new BadRequestError("somente quem criou o comments pode deletar")
        }

        await this.commentsDatabase.deleteComments(id)

        const output: DeleteCommentsOutputDTO = undefined

        return output
    }

    public likeOrDislikeComments = async (input: LikeOrDislikeCommentsInputDTO): Promise<LikeOrDislikeCommentsOutputDTO> => {
        const { commentsId, token, like } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token inválido")
        }

        const commentsCreatorName = await this.commentsDatabase.searchCreatorCommentsId(commentsId)

        if (!commentsCreatorName) {
            throw new BadRequestError("não existe comments com esse id")
        }

        const comments = new Comments(
            commentsCreatorName.id,
            commentsCreatorName.post_id,
            commentsCreatorName.content,
            commentsCreatorName.likes,
            commentsCreatorName.dislikes,
            commentsCreatorName.created_at,
            commentsCreatorName.creator_comments_id,
            commentsCreatorName.creator_coments_name
        )

        const likeSQlite = like ? 1 : 0

        const likeDislikeDB: LikeDislikeDB = {
            user_id: payload.id,
            comments_id: commentsId,
            like: likeSQlite
        }

        const likeOrDislikeExists = await this.commentsDatabase.searchLikeDislike(likeDislikeDB)

        if (likeOrDislikeExists === COMMENTS_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.commentsDatabase.removeLikeDislike(likeDislikeDB)
                comments.removeLike()
            } else {
                await this.commentsDatabase.updateLikeDislike(likeDislikeDB)
                comments.removeLike()
                comments.addDislike()
            }
        } else if (likeOrDislikeExists === COMMENTS_LIKE.ALREADY_DISLIKED) {
            if (like === false) {
                await this.commentsDatabase.removeLikeDislike(likeDislikeDB)
                comments.removeDislike()
            } else {
                await this.commentsDatabase.updateLikeDislike(likeDislikeDB)
                comments.removeDislike()
                comments.addLike()
            }
        } else {
            await this.commentsDatabase.insertLikeDislike(likeDislikeDB)
            like ? comments.addLike() : comments.addDislike()
        }

        const updateCommentsDB = comments.toDBModel()
        await this.commentsDatabase.updateComments(updateCommentsDB)

        const output: LikeOrDislikeCommentsOutputDTO = undefined

        return output
    }

}