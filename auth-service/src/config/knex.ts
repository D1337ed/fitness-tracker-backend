import knex from 'knex';
// @ts-ignore
import config from '../config/knexfile';

const environment = process.env.NODE_ENV || 'development';
export default knex(config[environment])