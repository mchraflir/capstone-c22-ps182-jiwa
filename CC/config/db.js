require('dotenv').config();
const sequelize = require("sequelize");

const db = new sequelize(process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST,
});

db.sync({});

module.exports = db;
