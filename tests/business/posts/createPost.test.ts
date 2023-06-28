import {PostsBusiness} from "../../../src/business/PostBusiness"
import { CreatePostSchema } from "../../../src/dtos/posts/createPosts.dto"

import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

const postsBusiness = new PostsBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
)

describe("testando createPost", () => {
    test("deve criar um post",async () => {
        const input = CreatePostSchema.parse({
            content: "teste",
            token: "token-mock-fulano"
        })

        const output = await postsBusiness.createPost(input)

        expect(output).toEqual(undefined)
    })
})