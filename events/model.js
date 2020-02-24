const Sequelize = require("sequelize");
const sequelize = require("../db");
const Ticket = require("../tickets/model");

const Event = sequelize.define("event", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

Event.hasMany(Ticket);
Ticket.belongsTo(Event);

module.exports = Event;
