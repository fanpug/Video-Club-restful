module.exports = (sequelize, type) => {
    const Genre = sequelize.define('genres', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        description: type.TEXT,
        status: type.INTEGER
    });
    return Genre;
};
