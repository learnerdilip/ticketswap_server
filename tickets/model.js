const Sequelize = require("sequelize");
const sequelize = require("../db");
const Comment = require("../comments/model");
const User = require("../user/model");

const Ticket = sequelize.define("ticket", {
  title: {
    type: Sequelize.STRING
  },
  imageurl: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  risk: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

Ticket.hasMany(Comment);
Comment.belongsTo(Ticket);
User.hasOne(Ticket);

module.exports = Ticket;
