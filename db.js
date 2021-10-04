const Sequelize = require('sequelize');

const directorModel = require('./models/directors');

//La clase de Sequelize recibe: 1)dbname 2)user 3)password 4)obj conf

const sequelize = new Sequelize('video-club', 'root', 'secret', {
    host: 'localhost',  //direccion de nuestro rdbms
    dialect: 'mysql'
});

const Director = directorModel(sequelize, Sequelize);

sequelize.sync({
    force: true
}).then(()=>{
    console.log("Base de datos actualizada correctamente!!");
});

module.exports = {Director};

