const Sequelize = require('sequelize');

const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const movieActorModel = require('./models/movieactor');

//La clase de Sequelize recibe: 1)dbname 2)user 3)password 4)obj conf

const sequelize = new Sequelize('video-club', 'root', 'secret', {
    host: 'localhost',  //direccion de nuestro rdbms
    dialect: 'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);

//Un genero puede tener muchas peliculas
Genre.hasMany(Movie, {as: 'movies'});

//Una pelicula puede tener un genero
Movie.belongsTo(Genre, {as: 'genre'});

//Un director puede tener muchas peliculas
Director.hasMany(Movie, {as: 'movies'});

//Una pelicula puede tener un director
Movie.belongsTo(Director, {as: 'director'});

//Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreignKey:'movieId'});

//En una pelicula participan muchos actores
MovieActor.belongsTo(Actor, {foreignKey:'actorId'});

Movie.belongsToMany(Actor, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'moviesActors'
});

Movie.belongsToMany(Movie, {
    foreignKey: 'movieId',
    as: 'movies',
    through: 'moviesActors'
});


sequelize.sync({
    force: true
}).then(()=>{
    console.log("Base de datos actualizada correctamente!!");
});

module.exports = {Director, Genre, Movie, Actor, MovieActor};

