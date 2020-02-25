const Sequelize = require("sequelize");
const sequelize = require("../db");

const Comment = sequelize.define("comment", {
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Comment;
