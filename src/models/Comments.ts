export interface CommentsDB {
    id: string,
    creator_comments_id: string,
    post_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string
}

export interface CommentsDBCreatorName {
    id: string,
    creator_comments_id: string,
    post_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    creator_coments_name: string
}

export interface CommentsModel {
    id: string,
    post_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    creator: {
        id: string,
        name: string
    }
}

export interface LikeDislikeDB {
    user_id: string,
    comments_id: string,
    like: number
}

export enum COMMENTS_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}

export class Comments {
    constructor(
        private id: string,
        private postId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private creatorCommentsId: string,
        private creatorCommentsName: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getPostId(): string {
        return this.postId
    }

    public setPostId(value: string): void {
        this.postId = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }

    public addLike = (): void => {
        this.likes++
    }

    public removeLike = (): void => {
        this.likes--
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public addDislike = (): void => {
        this.dislikes++
    }

    public removeDislike = (): void => {
        this.dislikes--
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getCommentsCreatorId(): string{
        return this.creatorCommentsId
    }

    public setCommentsCreatorId(value: string): void{
        this.creatorCommentsId = value
    }

    public getCommentsCreatorName(): string{
        return this.creatorCommentsName
    }

    public setCommentsCreatorName(value: string): void{
        this.creatorCommentsName = value
    }
    
    public toDBModel(): CommentsDB {
        return {
            id: this.id,
            creator_comments_id: this.creatorCommentsId,
            post_id: this.postId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
        }
    }

    public toBusinessModel(): CommentsModel {
        return {
            id: this.id,
            post_id: this.postId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            creator: {
                id: this.creatorCommentsId,
                name: this.creatorCommentsName
            }
        }
    }
}