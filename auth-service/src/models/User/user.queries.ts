import databaseConnection from "../../database/connection";

const selectByEmailQuery = `SELECT * FROM users WHERE email = ?;`;
const insertUserQuery = `
    INSERT INTO users(name, email)
    VALUES (?, ?) ON DUPLICATE KEY
    UPDATE name = VALUES (name);`;

export const findUserByEmail = async (email: string)=> {

    try {
        const connection = await databaseConnection;
        const result = await connection.query(selectByEmailQuery, [email])
        if (result.length === 0) {
            console.log(`User with email ${email} not found`);
            return null;
        }
        console.log(`Found user with email ${email}`);
    } catch (error) {
        console.error(`Error occurred while trying to find user by ${email}`);
        throw error;
    }
};

export const createUser = async (name: string, email: string) => {

    try {
        const connection = await databaseConnection;
        await connection.query(insertUserQuery, [name, email]);
        await connection.end()
        console.log(`Saved user ${name} with email ${email}`);
    } catch (error) {
        console.error(`${error} occurred while trying to save user`);
        throw error;
    }
}