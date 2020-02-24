const app = require("./index");

const Sequelize = require("sequelize");

const databseUrl =
  process.env.DATABSE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

const db = new Sequelize(databseUrl);

db.sync()
  .then(() => console.log("The TICKETSWAP database  is now connected..."))
  .catch(console.error);

module.exports = db;
