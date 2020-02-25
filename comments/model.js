const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("../user/model");

const Comment = sequelize.define("comment", {
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  risk: {
    type: Sequelize.INTEGER
  }
});

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = Comment;
