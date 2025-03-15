import db from '../../config/knex';
import {User, UserSignUp} from './user.types';

export const findUserByEmail = async (
    email: string
): Promise<User | undefined> => {
    return db<User>('users')
        .where('email', email)
        .first();
};

export const createUser = async (
    userData: UserSignUp
): Promise<User> => {
    const [newUser] = await db<User>('users')
        .insert(userData)
        .returning('*');

    return newUser;
}