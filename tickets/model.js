const Sequelize = require("sequelize");
const sequelize = require("../db");
const Comment = require("../comments/model");

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
  }
});

Ticket.hasMany(Comment);
Comment.belongsTo(Ticket);

module.exports = Ticket;
