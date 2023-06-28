import {CommentsBusiness} from "../../../src/business/CommentsBusiness"

import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { CreateCommentstSchema } from "../../../src/dtos/comments/createComments.dto"

const commentsBusiness = new CommentsBusiness(
    new CommentsDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
)

describe("testando createComments", () => {
    test("deve criar um comments",async () => {
        const input = CreateCommentstSchema.parse({
            idPost: "id-post-mock-astrodev",
            content: "create-comments-fulano",
            token: "token-mock-fulano"
        })
        
        const output = await commentsBusiness.createComments(input)

        expect(output).toEqual(undefined)
    })
})

