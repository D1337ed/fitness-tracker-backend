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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// TODO: fix console log order messages, maybe just use create if not exists without retries
const tryConnecting = async (attempts: number) => {
    while (attempts > 0) {
        try {
            console.log(`Trying to connect to ${DB_NAME}...`)
            await databaseConnection;
            return;
        } catch (error) {
            console.log(`Connection attempt failed while trying to connect to ${DB_NAME}. Remaining attempts: ${attempts - 1}`);
            attempts--;
            if (attempts > 0) {
                console.log(`Retrying to connect for ${attempts} more time(s) in 1 second...`);
                await delay(1000);
            }
        }


        console.log(`All retries failed. Database ${DB_NAME} may not be existent. Attempting to create ${DB_NAME}...`);
        try {
            await databaseSetup;
            console.log(`${DB_NAME} setup complete. Retrying to connect...`);
            await delay(2500);
            await databaseConnection;
            await delay(2500);
            console.log(`Successfully connected to ${DB_NAME} after setup`);
            /// TODO: currently throwing error even though databaseSetup passes
        } catch (setupError) {
            console.log(`Failed to setup or connect to ${DB_NAME} with ${setupError}`);
        }
    }
}

tryConnecting(2).then(res => res);

export default databaseConnection;