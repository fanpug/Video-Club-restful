module.exports = (sequelize, type) => {
    const MovieActor = sequelize.define('moviesActors', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        movieId: type.INTEGER,
        actorId: type.INTEGER
    });
    return MovieActor;
};