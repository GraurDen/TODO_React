const { Sequelize } = require("sequelize");

// Connect to database
// TODO: change to 'connection string'
// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USERNAME,
//     process.env.DB_PASS,
//     {
//         host: process.env.HOST,
//         dialect: "postgres",
//     }
// );

const sequelize = new Sequelize(
    "postgres://postgres:admin@localhost:5432/todo_db"
);

module.exports = sequelize;
