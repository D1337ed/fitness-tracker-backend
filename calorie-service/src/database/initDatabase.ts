import mysql, { Pool } from 'mysql2/promise';

let db: Pool; 

export async function initializeDatabase() {
    const tempPool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'newpassword',
    });

    await tempPool.query('CREATE DATABASE IF NOT EXISTS calories_db');
    await tempPool.end();

    db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'newpassword',
        database: 'calories_db',
    });

    await db.query(`
        CREATE TABLE IF NOT EXISTS sports (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            metsValue FLOAT NOT NULL
        )
    `);

    const [rows]: [any[], any] = await db.query('SELECT COUNT(*) AS count FROM sports');
    if (rows[0].count === 0) {
        await db.query(`
            INSERT INTO sports (name, metsValue) VALUES
            ('Running', 9.8),
            ('Swimming', 6.0),
            ('Cycling', 7.5),
            ('Walking', 3.8)
        `);
    }
}

export function getDb(): Pool {
    if (!db) {
        throw new Error("Database not initialized. Call initializeDatabase() first.");
    }
    return db;
}
