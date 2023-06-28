import {UserBusiness} from "../../../src/business/UserBusiness"
import { LoginSchema } from "../../../src/dtos/users/login.dto"
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

describe("testando login", () => {
    test("deve gerar token ao logar",async () => {
        const input = LoginSchema.parse({
            email: "fulano@email.com",
            password: "fulano123"
        })

        const output = await userBusiness.login(input)

        expect(output).toEqual({
            token: "token-mock-fulano"
        })
    })
})