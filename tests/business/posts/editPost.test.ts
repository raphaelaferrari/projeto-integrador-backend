import { PostsBusiness } from "../../../src/business/PostBusiness"
import { EditPostSchema } from "../../../src/dtos/posts/editPost.dto"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

const postsBusiness = new PostsBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
)

describe("testando editPost", () => {
    test("deve editar o post",async () => {
        const input = EditPostSchema.parse({
            id: "id-post-mock-fulano",
            content: "editando",
            token: "token-mock-fulano"
        })
        
        const output = await postsBusiness.editPost(input)

        expect(output).toEqual(undefined)
    })
})


