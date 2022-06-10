const Sequelize = require("sequelize");
const db = require("../config/db");

const moodmodel = db.define(
   	"mymentalmood",
    {
        MoodID: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        MoodEmot: {type: Sequelize.STRING, allowNull: false},
        MoodNotes: {type: Sequelize.STRING, allowNull: false},
        MoodOwner: {type: Sequelize.STRING, allowNull: false},
        InputDate: {type: Sequelize.DATE, allowNull: false},
        CreatedBy: {type: Sequelize.STRING, allowNull: false},
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = moodmodel;