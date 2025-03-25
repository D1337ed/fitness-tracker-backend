# Installation of all dependencies
> `npm install express express-session typescript @types/express @types/express-session @types/node @types/passport @types/passport-google-oauth20 @types/jsonwebtoken passport passport-google-oauth20 jsonwebtoken dotenv mariadb mysql knex`
 
> `npm install --save-dev nodemon ts-node`

# Knex
## Create users table
> `npx knex migrate:make create_users_table`
or
> `npx knex --knexfile src/config/knexfile.js migrate:make create_users_table`
## Run migration
> `npx knex migrate:latest`
or
> `npx knex --knexfile src/config/knexfile.js migrate:latest`
