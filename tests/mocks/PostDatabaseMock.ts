import { LikeDislikeDB, POST_LIKE, PostDB, PostDBCreatorName } from "../../src/models/Post";
import { BaseDatabase } from "../../src/database/BaseDatabase"
import { usersMock } from "../mocks/UserDatabaseMock"

const postMock: PostDB[] = [
    {
        id: "id-post-mock-fulano",
        creator_id: "id-mock-fulano",
        content: "post-fulano",
        likes: 0,
        dislikes: 0,
        comments: 0,
        created_at: new Date().toISOString()
    },
    {
        id: "id-post-mock-astrodev",
        creator_id: "id-mock-astrodev",
        content: "post-astrodev",
        likes: 0,
        dislikes: 0,
        comments: 0,
        created_at: new Date().toISOString()
    },
]

const likeDislikeMock : LikeDislikeDB[] = []

export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_TYPE_LIKES = "likes_dislikes"

    public createPost = async (createPost: PostDB): Promise<void> => {

    }

    public getPost = async (q: string | undefined): Promise<PostDBCreatorName[]> => {
        if (q) {
            const searchPost = postMock.filter(post => post.id === q)[0]

            const searchUser = usersMock.filter(user => user.id === searchPost.creator_id)[0]

            const result = [{
                id: searchPost.id,
                creator_id: searchPost.creator_id,
                content: searchPost.content,
                likes: searchPost.likes,
                dislikes: searchPost.dislikes,
                comments: searchPost.comments,
                created_at: searchPost.created_at,
                creator_name: searchUser.name
            }]

            return result as PostDBCreatorName[]
        } else {

            const result = postMock.map(post => {
                const searchUser = usersMock.filter(user => user.id === post.creator_id)[0]

                return {
                    id: post.id,
                    creator_id: post.creator_id,
                    content: post.content,
                    likes: post.likes,
                    dislikes: post.dislikes,
                    comments: post.comments,
                    created_at: post.created_at,
                    creator_name: searchUser.name
                }
            })

            return result as PostDBCreatorName[]
        }




    }

    public searchPostId = async (id: string): Promise<PostDB | undefined> => {
        return postMock.filter(post => post.id === id)[0]
    }

    public editPost = async (postDb: PostDB): Promise<void> => {
    }

    public updatePost = async (
        postDB: PostDB
    ): Promise<void> => {
        // await BaseDatabase
        //   .connection(PostDatabase.TABLE_POSTS)
        //   .update(postDB)
        //   .where({ id: postDB.id })
    }

    public deletePost = async (id: string): Promise<void> => {

    }

    public searchPostCreatorNameById = async (postId: string): Promise<PostDBCreatorName | undefined> => {

        const searchPost = postMock.filter(post => post.id === postId)[0]

        const searchUser = usersMock.filter(user => user.id === searchPost.creator_id)[0]

        if (searchPost) {

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
        } else {
            return undefined
        }



    }

    public searchLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<POST_LIKE | undefined> => {

        const [result] = likeDislikeMock.filter(likeDislike => likeDislike.user_id && likeDislike.post_id === likeDislikeDB.user_id && likeDislikeDB.post_id)
        

        if (result === undefined) {
            return undefined
        }else if(result.like === 1) {
            return POST_LIKE.ALREADY_LIKED
        }else if(result.like === 0){
            return POST_LIKE.ALREADY_DISLIKED
        }

    }

    public removeLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {

    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {

    }

    public insertLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {

    }
}