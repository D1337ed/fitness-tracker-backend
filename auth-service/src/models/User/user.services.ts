import db from '../../config/knex';
import { User, UserSignUp} from "./user.types";
import { findUserByEmail, createUser} from "./user.queries";

export const findOrCreateUser = async (
    userData: UserSignUp
): Promise<User> => {
    return db.transaction(async (trx) => {
        const existingUser = await findUserByEmail(
            userData.email,
        ).transacting(trx);

        if (existingUser) {
            return existingUser;
        } else {
            return await createUser(userData).transacting(trx);
        }
    });
};