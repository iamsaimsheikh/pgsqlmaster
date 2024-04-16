const { Sequelize } = require("sequelize")
const env = process.env.NODE_ENV || "development"
const config = require("./config")

const sequelize = new Sequelize(config[env])
if(sequelize) console.log("Connected to DB!")

module.exports = sequelize