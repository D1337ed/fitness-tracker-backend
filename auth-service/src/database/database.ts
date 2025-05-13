import mariadb from 'mariadb';
import dotenv from "dotenv";
import {createUserTable} from "./user.table";
import {validateEnvVariables} from "../utils/validateEnv";

dotenv.config({
    path: '../config/.env'
});

const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} = validateEnvVariables();

const databaseSetup = mariadb.createConnection({
    host: DB_HOST || '127.0.0.1',
    port: Number(DB_PORT) || 3306,
    user: DB_USER || 'fitness_admin',
    password: DB_PASSWORD || 'password'
})
    // mariadb doesn't support multiple SQL statement execution in one query by default for security reasons
    // now using multiple queries instead of enabling multipleStatements: true
    .then(async connection => {
        try {
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
            await connection.query(`USE ${DB_NAME};`);
            await connection.query(createUserTable);
            await connection.end()
                .then(res => res).catch(error => error);
            // TODO: fix log, shows up even when the database is already present
            console.log(`Successfully created ${DB_NAME} Database and added Table User, ${__filename}`);
        } catch (error) {
            console.log(`Failed to create ${DB_NAME} Database and add Table User, ${__filename}`);
        }
    });

export default databaseSetup;