require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASS,
        database: 'todo_db',
        host: process.env.HOST,
        dialect: 'postgres',
    },
};
