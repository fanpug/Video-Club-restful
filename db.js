const Sequelize = require('sequelize');

const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');

//La clase de Sequelize recibe: 1)dbname 2)user 3)password 4)obj conf

const sequelize = new Sequelize('video-club', 'root', 'secret', {
    host: 'localhost',  //direccion de nuestro rdbms
    dialect: 'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);

//Un genero puede tener muchas peliculas
Genre.hasMany(Movie, {as: 'movies'});

//Una pelicula puede tener un genero
Movie.belongsTo(Genre, {as: 'genre'});

//Un director puede tener muchas peliculas
Director.hasMany(Movie, {as: 'movies'});

//Una pelicula puede tener un director
Movie.belongsTo(Director, {as: 'director'});


sequelize.sync({
    force: true
}).then(()=>{
    console.log("Base de datos actualizada correctamente!!");
});

module.exports = {Director, Genre, Movie};

