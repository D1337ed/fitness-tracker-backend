import mariadb from "mariadb";
import dotenv from "dotenv";
import database from "./database";
import { validateEnvVariables } from "../utils/validateEnv";

dotenv.config({
    path: '../config/.env'
});

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = validateEnvVariables();

const connection = mariadb.createConnection({
    host: DB_HOST || '127.0.0.1',
    port: Number(DB_PORT) || 3306,
    user: DB_USER || 'fitness_admin',
    password: DB_PASSWORD || 'password',
    database: DB_NAME || 'fitness_tracker_auth'

}).then(connection => {
    console.log(`Connected to ${DB_NAME} Database`);
    return connection;
});

// TODO: fix console log order messages
const tryConnecting = async (attempts: number) => {
    try {
        console.log(`Trying to connect to ${DB_NAME}`)
        await connection;
    } catch (error) {
        console.log(`Caught error while trying to connect to ${DB_NAME}`)
        if (attempts > 0) {
            console.log(`Retrying to connect for ${attempts} more time(s) in 1 second...`);
            setTimeout(() => tryConnecting(attempts - 1), 1000);
            if (attempts === 0) {
                console.log(`All retries failed, Database ${DB_NAME} may not exist`)
                console.log(`Trying to set up ${DB_NAME} Database if not exists...`);
                await database;
                console.log(`Set up ${DB_NAME}`);
            }
        }
    }
}

tryConnecting(2).then(res => res);

export default connection;