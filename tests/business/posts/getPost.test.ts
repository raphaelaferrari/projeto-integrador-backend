import { PostsBusiness } from "../../../src/business/PostBusiness"
import { GetPostSchema } from "../../../src/dtos/posts/getPost.dto"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

const postsBusiness = new PostsBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
)


describe("testando getPost", () => {
    test("deve retornar o(s) post(s)",async () => {
        const input = GetPostSchema.parse({
            q: "id-post-mock-fulano",
            token: "token-mock-fulano"
        })
        const output = await postsBusiness.getPost(input)
    
        expect(output).toHaveLength(1)
    })
})