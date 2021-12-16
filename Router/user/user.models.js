const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage : './DB/db.sqlite',
    logging : false
});

//테이블 생성 id는 자동생성
const User = sequelize.define('User', {
    name : {
        type : Sequelize.STRING,
        unique : true
    } // VARCHAR(256)
});

module.exports = {User, Sequelize, sequelize};



