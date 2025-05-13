import {createUser, findUserByEmail} from "./user.queries";

export const findOrCreateUser = async (name: string, email: string) => {

    try {
        const emailResult = await findUserByEmail(email);
        if (emailResult == null) {
            // TODO: remove console log later
            console.log(`No matching user found for ${email}, attempting to create new user`);
            await createUser(name, email);
        } else {
            // TODO: allow pass for middleware
            return null;
        }
    } catch (error) {
        console.error(`${error} occurred while trying to find or create user with ${email}`);
        throw error;
    }
};