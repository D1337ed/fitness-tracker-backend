import { getDb } from './initDatabase';

export async function getSportByName(name: string) {
    const db = getDb();
    const [rows]: [any[], any] = await db.query('SELECT * FROM sports WHERE name = ?', [name]);
    return rows[0];
}
