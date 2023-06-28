import { PostsBusiness } from "../../../src/business/PostBusiness"
import { LikeOrDislikePostSchema } from "../../../src/dtos/posts/likeOrDislikePost.dto"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

const postsBusiness = new PostsBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
)


describe("testando likeOrDislikePost", () => {
    test("deve dar ou retirar like/dislike",async () => {
       
        const input = LikeOrDislikePostSchema.parse({
            token: "token-mock-fulano",
            postId: "id-post-mock-astrodev",
            like: true
        })

        const output = await postsBusiness.likeOrDislikePost(input)
    

        expect(output).toEqual(undefined)
    })
})