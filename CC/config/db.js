const sequelize = require("sequelize");

const db = new sequelize("mymentaldb", "root", "", {
    dialect:"mysql"
});

db.sync({});

module.exports = db;