import mariadb from 'mariadb';
import dotenv from "dotenv";

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

// TODO: make proper create if not exist
const database = mariadb.createConnection({
    host: DB_HOST || '127.0.0.1',
    port: Number(DB_PORT) || 3306,
    user: DB_USER || 'fitness_admin',
    password: DB_PASSWORD || 'password'
}).then(connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`)
        .then(res => res).catch(error => error);
    console.log('Successfully created fitness_tracker Database');
});

export default database;