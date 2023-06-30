import { COMMENTS_LIKE, CommentsDB, CommentsDBCreatorName, LikeDislikeDB } from "../models/Comments";
import { PostDB, PostDBCreatorName } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { PostDatabase } from "./PostDatabase";
import { UserDatabase } from "./UserDatabase";

export class CommentsDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_TYPE_LIKES_COMMENTS = "likes_dislikes_comments"


    public createComments = async (createComments: CommentsDB): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
            .insert(createComments)
    }

    public editPost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id: postDB.id })
    }

    public getComments = async (q: string): Promise<CommentsDBCreatorName[]> => {
        const result = await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
            .select(
                `${CommentsDatabase.TABLE_COMMENTS}.id`,
                `${CommentsDatabase.TABLE_COMMENTS}.creator_comments_id`,
                `${CommentsDatabase.TABLE_COMMENTS}.post_id`,
                `${CommentsDatabase.TABLE_COMMENTS}.content`,
                `${CommentsDatabase.TABLE_COMMENTS}.likes`,
                `${CommentsDatabase.TABLE_COMMENTS}.dislikes`,
                `${CommentsDatabase.TABLE_COMMENTS}.created_at`,
                `${UserDatabase.TABLE_NAME}.name as creator_coments_name`

            )
            .join(
                `${UserDatabase.TABLE_NAME}`,
                `${CommentsDatabase.TABLE_COMMENTS}.creator_comments_id`,
                "=",
                `${UserDatabase.TABLE_NAME}.id`
            )
            .where({ [`${CommentsDatabase.TABLE_COMMENTS}.post_id`]: q })

        return result as CommentsDBCreatorName[]

    }

    public updateComments = async (commentsDB: CommentsDB): Promise<void> => {
        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .update(commentsDB)
            .where({ id: commentsDB.id })
    }

    public deleteComments = async (id: string): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
            .delete()
            .where({ id })
    }

    public quantityComments = async (id: string) => {
        const [result] = await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
            .select()
            .count()
            .where({ [`${CommentsDatabase.TABLE_COMMENTS}.post_id`]: id })

        return result['count(*)'] as number
    }

    public searchCommentsId = async (id: string): Promise<CommentsDB | undefined> => {
        const [result] = await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
            .select()
            .where({ id })

        return result as CommentsDB | undefined
    }

    public searchCreatorCommentsId = async (id: string): Promise<CommentsDBCreatorName | undefined> => {
        const [result] = await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
            .select(
                `${CommentsDatabase.TABLE_COMMENTS}.id`,
                `${CommentsDatabase.TABLE_COMMENTS}.creator_comments_id`,
                `${CommentsDatabase.TABLE_COMMENTS}.post_id`,
                `${CommentsDatabase.TABLE_COMMENTS}.content`,
                `${CommentsDatabase.TABLE_COMMENTS}.likes`,
                `${CommentsDatabase.TABLE_COMMENTS}.dislikes`,
                `${CommentsDatabase.TABLE_COMMENTS}.created_at`,
                `${UserDatabase.TABLE_NAME}.name as creator_coments_name`

            )
            .join(
                `${UserDatabase.TABLE_NAME}`,
                `${CommentsDatabase.TABLE_COMMENTS}.creator_comments_id`,
                "=",
                `${UserDatabase.TABLE_NAME}.id`
            )
            .where({ [`${CommentsDatabase.TABLE_COMMENTS}.id`]: id })

        return result as CommentsDBCreatorName | undefined
    }
    
    public searchPostId = async (id: string): Promise<PostDBCreatorName> => {
        const [result] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
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
            .where({ [`${PostDatabase.TABLE_POSTS}.id`]: id })

        return result as PostDBCreatorName

    }

    public searchLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<COMMENTS_LIKE | undefined> => {

        const [result]: Array<LikeDislikeDB | undefined> = await BaseDatabase.connection(CommentsDatabase.TABLE_TYPE_LIKES_COMMENTS)
            .select()
            .where({
                user_id: likeDislikeDB.user_id,
                comments_id: likeDislikeDB.comments_id
            })

        if (result === undefined) {
            return undefined
        } else if (result.like === 1) {
            return COMMENTS_LIKE.ALREADY_LIKED
        } else if (result.like === 0) {
            return COMMENTS_LIKE.ALREADY_DISLIKED
        }

    }

    public removeLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_TYPE_LIKES_COMMENTS)
            .delete()
            .where({
                user_id: likeDislikeDB.user_id,
                comments_id: likeDislikeDB.comments_id
            })
    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_TYPE_LIKES_COMMENTS)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                comments_id: likeDislikeDB.comments_id
            })
    }

    public insertLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_TYPE_LIKES_COMMENTS)
            .insert(likeDislikeDB)
    }
}