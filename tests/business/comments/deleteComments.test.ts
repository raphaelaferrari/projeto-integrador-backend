import {CommentsBusiness} from "../../../src/business/CommentsBusiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { DeleteCommentsSchema } from "../../../src/dtos/comments/deleteComments.dto"

const commentsBusiness = new CommentsBusiness(
    new CommentsDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
)

describe("testando deleteComments", () => {
    test("deve deletar o comments",async () => {
        const input = DeleteCommentsSchema.parse({
            id: "id-comments-mock-fulano",
            token: "token-mock-fulano"
        })

        const output = await commentsBusiness.deleteComments(input)

        expect(output).toEqual(undefined)
    })
})

