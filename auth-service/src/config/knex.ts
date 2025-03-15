import knex from 'knex';
// TODO: fix path or module
import config from './knexfile';

const db = knex(config);

export default db;