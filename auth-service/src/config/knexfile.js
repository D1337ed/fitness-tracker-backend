require('knex');
require('dotenv').config({
    path: './.env',
});

const DB_HOST = process.env.DATABASE_HOST;
const DB_PORT = process.env.DATABASE_PORT;
const DB_USER = process.env.DATABASE_USER;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_NAME = process.env.DATABASE_NAME;

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    throw new Error('Database Environment Variables not set');
}

module.exports = {
    client: 'mysql',
    connection: {
        host: process.env.DATABASE_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        user: process.env.DATABASE_USER || 'fitness_admin',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'fitness_tracker'
    },
    migrations: {
        directory: '../database/migrations',
    },
    seeds: {
        directory: '../database/seeds',
    },
};
