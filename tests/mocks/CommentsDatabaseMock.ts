import { BaseDatabase } from "../../src/database/BaseDatabase"
import { LikeDislikeDB, CommentsDB, CommentsDBCreatorName, COMMENTS_LIKE } from "../../src/models/Comments"
import { PostDB, PostDBCreatorName } from "../../src/models/Post"
import { postMock } from "./PostDatabaseMock"
import { usersMock } from "./UserDatabaseMock"

const commentsMock: CommentsDB[] = [
    {
        id: "id-comments-mock-fulano",
        creator_comments_id: "id-mock-fulano",
        post_id: "id-post-mock-astrodev",
        content: "comments-fulano",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString()
    },
    {
        id: "id-comments-mock-astrodev",
        creator_comments_id: "id-mock-astrodev",
        post_id: "id-post-mock-fulano",
        content: "comments-astrodev",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString()
    }
]

const likeDislikeMock : LikeDislikeDB[] = []

export class CommentsDatabaseMock extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_TYPE_LIKES_COMMENTS = "likes_dislikes_comments"


    public createComments = async (createComments: CommentsDB): Promise<void> => {

    }

    public quantityComments = async (id: string)=> {
        const result = commentsMock.map(comments => comments.post_id === id)
        
        return result.length as number
    }
    
    public searchPostId =async (id: string) : Promise<PostDBCreatorName> => {
        
        const searchPost = postMock.filter(post => post.id === id)[0]

        const searchUser = usersMock.filter(user => user.id === searchPost.creator_id)[0]

            const result: PostDBCreatorName = {
                id: searchPost.id,
                creator_id: searchPost.creator_id,
                content: searchPost.content,
                likes: searchPost.likes,
                dislikes: searchPost.dislikes,
                comments: searchPost.comments,
                created_at: searchPost.created_at,
                creator_name: searchUser.name
            }

            return result 

    }

    public editPost =async (postDB: PostDB) : Promise<void>=> {
        
    }
    
    public getComments = async (q: string): Promise<CommentsDBCreatorName[]> => {
        const searchComments = commentsMock.filter(comments => comments.post_id === q)[0]
        const searchUser = usersMock.filter(user => user.id === searchComments.creator_comments_id)[0]


        const result = [{
            id: searchComments.id,
            creator_comments_id: searchComments.creator_comments_id,
            post_id: searchComments.post_id,
            content: searchComments.content,
            likes: searchComments.likes,
            dislikes: searchComments.dislikes,
            created_at: searchComments.created_at,
            creator_coments_name: searchUser.name
        }]

        return result as CommentsDBCreatorName[]

    }

    public updateComments = async (commentsDB: CommentsDB): Promise<void> => {

    }

    public searchCommentsId = async (id: string): Promise<CommentsDB | undefined> => {
        const searchComments = commentsMock.filter(comments => comments.id === id)[0]

        if (searchComments) {

            const result = {
                id: searchComments.id,
                creator_comments_id: searchComments.creator_comments_id,
                post_id: searchComments.post_id,
                content: searchComments.content,
                likes: searchComments.likes,
                dislikes: searchComments.dislikes,
                created_at: searchComments.created_at
            }

            return result as CommentsDB
        } else {
            return undefined
        }
    }

    public searchCreatorCommentsId = async (id: string): Promise<CommentsDBCreatorName | undefined> => {

        const searchComments = commentsMock.filter(comments => comments.id === id)[0]
        const searchUser = usersMock.filter(user => user.id === searchComments.creator_comments_id)[0]

        if (searchComments) {

            const result = {
                id: searchComments.id,
                creator_comments_id: searchComments.creator_comments_id,
                post_id: searchComments.post_id,
                content: searchComments.content,
                likes: searchComments.likes,
                dislikes: searchComments.dislikes,
                created_at: searchComments.created_at,
                creator_coments_name: searchUser.name
            }

            return result as CommentsDBCreatorName
        } else {
            return undefined
        }

    }

    public deleteComments = async (id: string): Promise<void> => {

    }

    public searchLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<COMMENTS_LIKE | undefined> => {

        const [result] = likeDislikeMock.filter(likeDislike => likeDislike.user_id && likeDislike.comments_id === likeDislikeDB.user_id && likeDislikeDB.comments_id)
        

        if (result === undefined) {
            return undefined
        }else if(result.like === 1) {
            return COMMENTS_LIKE.ALREADY_LIKED
        }else if(result.like === 0){
            return COMMENTS_LIKE.ALREADY_DISLIKED
        }


    }

    public removeLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {

    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {

    }

    public insertLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {

    }
}