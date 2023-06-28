import {CommentsBusiness} from "../../../src/business/CommentsBusiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { GetCommentsSchema } from "../../../src/dtos/comments/getComments.dto"

const commentsBusiness = new CommentsBusiness(
    new CommentsDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
)

describe("testando getComments", () => {
    test("deve retornar os comments do post escolhido",async () => {
        const input = GetCommentsSchema.parse({
            q: "id-post-mock-astrodev",
            token: "token-mock-fulano"
        })

    const output = await commentsBusiness.getComments(input)

        expect(output).toHaveLength(1)
    })
})