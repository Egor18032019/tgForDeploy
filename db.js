const {
  Sequelize
} = require('sequelize');

module.exports = new Sequelize(
  "tg_bot", // Название БД
  "postgres", // Пользователь
  "222324", // ПАРОЛЬ
  {
    dialect: 'postgres',
    host: "localhost",
    port: 5000,
  }
)