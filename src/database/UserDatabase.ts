import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
    public static TABLE_NAME = "users"

    public insertUser =async (userDB: UserDB) : Promise<void> => {
        await BaseDatabase
        .connection(UserDatabase.TABLE_NAME)
        .insert(userDB)
    }

    public searchEmail =async (email: string) : Promise<UserDB | undefined> => {
        const [userDB] = await BaseDatabase
        .connection(UserDatabase.TABLE_NAME)
        .select()
        .where({ email })

        return userDB as UserDB | undefined
    }
}