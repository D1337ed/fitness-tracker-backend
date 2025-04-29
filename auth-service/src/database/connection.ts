import mariadb from "mariadb";
import dotenv from "dotenv";
import database from "./database";
import {createUserTable} from "./user.table";

dotenv.config({
    path: '../config/.env'
});

const DB_HOST = process.env.DATABASE_HOST;
const DB_PORT = process.env.DATABASE_PORT;
const DB_USER = process.env.DATABASE_USER;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_NAME = process.env.DATABASE_NAME;

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    throw new Error('Database Environment Variables not found');
}

const connection = mariadb.createConnection({
    host: DB_HOST || '127.0.0.1',
    port: Number(DB_PORT) || 3306,
    user: DB_USER || 'fitness_admin',
    password: DB_PASSWORD || 'password',
    database: DB_NAME || 'fitness_tracker'
}).then(connection => {
    console.log('Connected to fitness_tracker Database');
    return connection;
});

// TODO: fix console log order messages
const tryConnecting = async (attempts: number) => {
    try {
        await connection;
    } catch (error) {
        if (attempts > 0) {
            console.log(`Connection to fitness_tracker Database failed, retrying for ${attempts} more time(s) in 1 second...`);
            setTimeout(() => tryConnecting(attempts - 1), 1000);
            if (attempts === 0) {
                console.log('Trying to set up fitness_tracker Database...');
                await database;
                await addTableToDatabase();
            }
        }
    }
}

// TODO: fix user.table.ts
const addTableToDatabase = async () => {
    try {
        console.log('Trying to create users table in fitness_tracker Database...');
        await createUserTable();
        console.log('Successfully created users table in fitness_tracker Database');
    } catch (error) {
        console.log('Failed to create users table in fitness_tracker Database');
    }
}

tryConnecting(2).then(res => res);

export default connection;