const {Sequelize} = require('sequelize');
//root:dSgIQTCzu6Qu
//Egor
//ssh root@185.91.55.195
module.exports = new Sequelize(
    'telega_bot',
    'root',
    'root',
    {
        host: '5.188.128.98',
        port: '6432',
        dialect: 'postgres'
    }
)
