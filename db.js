const {Sequelize} = require('sequelize');
// ssh-keygen
//ssh root@79.141.68.82
// 
//root:aXuBWe5IIIeg
//Susanne egor
//
// sudo apt update
// sudo apt install git
// sudo apt install nodejs
// sudo apt install npm
// npm i pm2 -g
// pm2 start index.js
module.exports = new Sequelize(
    'tg_bot', // название бд
    'root',//username
    'root',// passsword
    {
        host: '79.141.68.85',
        port: '6432',
        dialect: 'postgres'
    }
)

