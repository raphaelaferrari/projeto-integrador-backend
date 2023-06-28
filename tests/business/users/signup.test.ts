import {UserBusiness} from "../../../src/business/UserBusiness"
import { SignupSchema } from "../../../src/dtos/users/signup.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
)

describe("testando signup", () => {
    test("deve gerar token ao se cadastrar",async () => {
        const input = SignupSchema.parse({
            name: "Labenu",
            email: "labenu@email.com",
            password: "Labenu123"
        })

        const output = await userBusiness.signup(input)

        expect(output).toEqual({
            token: "token-mock"
        })
    })
})