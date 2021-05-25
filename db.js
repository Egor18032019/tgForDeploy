const {
  Sequelize
} = require('sequelize');

module.exports = new Sequelize(
  "dc484he6p1vgo5", // Название БД
  "dhqqmudfzhudws", // Пользователь
  "51afaf26ea47a9e48497c8273cfac16b078e58067f18ddc519b55deb3ff58946", // ПАРОЛЬ
  {
    host: "ec2-54-155-208-5.eu-west-1.compute.amazonaws.com",
    dialect: 'postgres',
    port: 5432,
  }
)

// URI postgres://dhqqmudfzhudws:51afaf26ea47a9e48497c8273cfac16b078e58067f18ddc519b55deb3ff58946@ec2-54-155-208-5.eu-west-1.compute.amazonaws.com:5432/dc484he6p1vgo5