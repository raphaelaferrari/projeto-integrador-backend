import {CommentsBusiness} from "../../../src/business/CommentsBusiness"

import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { LikeOrDislikeCommentsSchema } from "../../../src/dtos/comments/likeOrDislikeComments.dto"

const commentsBusiness = new CommentsBusiness(
    new CommentsDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
)

describe("testando likeOrDislikeComments", () => {
    test("deve dar ou retirar like/dislike",async () => {
       
        const input = LikeOrDislikeCommentsSchema.parse({
            commentsId: "id-comments-mock-astrodev",
            token: "token-mock-fulano",
            like: true
        })

        const output = await commentsBusiness.likeOrDislikeComments(input)
        
        expect(output).toEqual(undefined)
    })
})