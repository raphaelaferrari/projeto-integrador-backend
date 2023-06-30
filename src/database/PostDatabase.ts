import { LikeDislikeDB, POST_LIKE, PostDB, PostDBCreatorName } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"
    public static TABLE_TYPE_LIKES = "likes_dislikes"

    public createPost= async (createPost : PostDB) : Promise<void> => {

        const result : PostDB = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(createPost);
    }

    public getPost =async (q: string | undefined) :  Promise<PostDBCreatorName[]> => {
    
        if (q) {
            
            const result = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.dislikes`,
                `${PostDatabase.TABLE_POSTS}.comments`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${UserDatabase.TABLE_NAME}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_NAME}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_NAME}.id`,
    
            )
            .where({ [`${PostDatabase.TABLE_POSTS}.id`]: q})
    
            return result as PostDBCreatorName[]
        }else{
            const result = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.dislikes`,
                `${PostDatabase.TABLE_POSTS}.comments`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${UserDatabase.TABLE_NAME}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_NAME}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_NAME}.id`,
    
            )
            return result as PostDBCreatorName[]
        }
    }

    public searchPostId =async (id: string) : Promise<PostDB | undefined> => {
        const [result] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .select()
        .where({id})

        return result as PostDB | undefined
    }

    public editPost =async (postDb: PostDB) : Promise<void>=> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .update(postDb)
        .where({id: postDb.id})
    }

    public updatePost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .update(postDB)
        .where({ id: postDB.id })
    }
      
    public deletePost =async (id: string) : Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .delete()
        .where({ id })
    }

    public searchPostCreatorNameById =async (postId: string) :  Promise<PostDBCreatorName | undefined> => {
        
        const [result] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .select(
            `${PostDatabase.TABLE_POSTS}.id`,
            `${PostDatabase.TABLE_POSTS}.creator_id`,
            `${PostDatabase.TABLE_POSTS}.content`,
            `${PostDatabase.TABLE_POSTS}.likes`,
            `${PostDatabase.TABLE_POSTS}.dislikes`,
            `${PostDatabase.TABLE_POSTS}.comments`,
            `${PostDatabase.TABLE_POSTS}.created_at`,
            `${UserDatabase.TABLE_NAME}.name as creator_name`
        )
        .join(
            `${UserDatabase.TABLE_NAME}`,
            `${PostDatabase.TABLE_POSTS}.creator_id`,
            "=",
            `${UserDatabase.TABLE_NAME}.id`,
        )
        .where({ [`${PostDatabase.TABLE_POSTS}.id`]: postId})
        
        return result as PostDBCreatorName | undefined
    }

    public searchLikeDislike =async (likeDislikeDB: LikeDislikeDB) : Promise<POST_LIKE| undefined> => {
        
        const [result]: Array<LikeDislikeDB | undefined>= await BaseDatabase.connection(PostDatabase.TABLE_TYPE_LIKES)
        .select()
        .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
        })

        if (result === undefined) {
            return undefined
        }else if(result.like === 1) {
            return POST_LIKE.ALREADY_LIKED
        }else if(result.like === 0){
            return POST_LIKE.ALREADY_DISLIKED
        }
        
    }

    public removeLikeDislike =async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await  BaseDatabase.connection(PostDatabase.TABLE_TYPE_LIKES)
        .delete()
        .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
        })
    }

    public updateLikeDislike =async (likeDislikeDB: LikeDislikeDB) : Promise<void>=> {
        await  BaseDatabase.connection(PostDatabase.TABLE_TYPE_LIKES)
        .update(likeDislikeDB)
        .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
        })
    }

    public insertLikeDislike =async (likeDislikeDB: LikeDislikeDB) : Promise<void>=> {
        await  BaseDatabase.connection(PostDatabase.TABLE_TYPE_LIKES)
        .insert(likeDislikeDB)
    }
}