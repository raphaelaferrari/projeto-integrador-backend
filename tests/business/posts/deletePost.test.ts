import { PostsBusiness } from "../../../src/business/PostBusiness"
import { DeletePostSchema } from "../../../src/dtos/posts/deletePost.dto"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

const postsBusiness = new PostsBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
)


describe("testando deletePost", () => {
    test("deve deletar o post",async () => {
        const input = DeletePostSchema.parse({
            id: "id-post-mock-fulano",
            token: "token-mock-fulano"
        })

        const output = await postsBusiness.deletePost(input)
    
        expect(output).toEqual(undefined)
    })
})