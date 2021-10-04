module.exports = (sequelize, type) => {
    const Director = sequelize.define('director', {
        id: {type: type.INTEGER, primaryKey: true},
        name: type.STRING,
        lastName: type.STRING
    });
    return Director;
};
