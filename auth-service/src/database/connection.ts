import mariadb from "mariadb";
import dotenv from "dotenv";
import databaseSetup from "./database";
import {validateEnvVariables} from "../utils/validateEnv";

dotenv.config({
    path: '../config/.env'
});

const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} = validateEnvVariables();

const databaseConnection = mariadb.createConnection({
    host: DB_HOST || '127.0.0.1',
    port: Number(DB_PORT) || 3306,
    user: DB_USER || 'fitness_admin',
    password: DB_PASSWORD || 'password',
    database: DB_NAME || 'fitness_tracker_auth'

}).then(databaseConnection => {
    console.log(`Connected to ${DB_NAME} Database on ${DB_HOST}:${DB_PORT}, ${__filename}`);
    return databaseConnection;
});

// TODO: fix console log order messages
const tryConnecting = async (attempts: number) => {
    try {
        console.log(`Trying to connect to ${DB_NAME}`)
        await databaseConnection;
    } catch (error) {
        console.log(`Caught error while trying to connect to ${DB_NAME}`)
        if (attempts > 0) {
            console.log(`Retrying to connect for ${attempts} more time(s) in 1 second...`);
            setTimeout(() => tryConnecting(attempts - 1), 1000);
            if (attempts === 0) {
                console.log(`All retries failed, Database ${DB_NAME} may not exist`)
                console.log(`Trying to set up ${DB_NAME} Database if not exists...`);
                await databaseSetup;
                tryConnecting(1).then(res => res);
                console.log(`Set up ${DB_NAME}`);
            }
        }
    }
}

tryConnecting(2).then(res => res);

export default databaseConnection;