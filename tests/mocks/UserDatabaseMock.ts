import { USER_ROLES, UserDB } from "../../src/models/User";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export const usersMock: UserDB[] = [
  {
    id: "id-mock-fulano",
    name: "Fulano",
    email: "fulano@email.com",
    password: "hash-mock-fulano", // senha = "fulano123"
    role: USER_ROLES.NORMAL,
    created_at: new Date().toISOString()

  },
  {
    id: "id-mock-astrodev",
    name: "Astrodev",
    email: "astrodev@email.com",
    password: "hash-mock-astrodev", // senha = "astrodev99"
    role: USER_ROLES.ADMIN,
    created_at: new Date().toISOString()
  },
]

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_NAME = "users"

  public insertUser = async (userDB: UserDB): Promise<void> => {

  }

  public searchEmail = async (email: string): Promise<UserDB | undefined> => {
    return usersMock.filter(user => user.email === email)[0]
  }
}