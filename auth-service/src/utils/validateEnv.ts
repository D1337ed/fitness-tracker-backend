export const validateEnvVariables = () => {
    const DB_HOST = process.env.DATABASE_HOST;
    const DB_PORT = process.env.DATABASE_PORT;
    const DB_USER = process.env.DATABASE_USER;
    const DB_PASSWORD = process.env.DATABASE_PASSWORD;
    const DB_NAME = process.env.DATABASE_NAME;

    if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
        throw new Error('Database Environment Variables not found');
    }

    return { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME };
};