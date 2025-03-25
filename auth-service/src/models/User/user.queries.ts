import db from '../../config/knex';
import {DataBaseUser, UserInput} from './user.types';

export const findUserByEmail = async (
    email: string
): Promise<DataBaseUser | undefined> => {
    return db.queryBuilder().from('users')
        .where('email', email)
        .first();
};

export const createUser = async (
    userData: UserInput
): Promise<DataBaseUser> => {
    const [newUser] = await db.queryBuilder().into('users')
        .insert(userData)
        .returning('*');

    return newUser;
}