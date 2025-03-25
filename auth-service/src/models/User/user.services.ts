import db from '../../config/knex';
import { DataBaseUser, UserInput} from './user.types';
import { findUserByEmail, createUser} from './user.queries';

/**
 * Check if a user is already present in the database
 * @param userData
 */
export const findOrCreateUser = async (
    userData: UserInput
): Promise<DataBaseUser> => {
    return db.transaction(async (trx) => {
        const existingUser = await findUserByEmail(
            userData.email
        ).finally(trx)

        if (existingUser) {
            return existingUser;
        } else {
            return await createUser(userData).finally(trx);
        }
    });
};