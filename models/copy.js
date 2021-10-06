module.exports = (sequelize, type) => {
    const Copy = sequelize.define('copies', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        number: type.INTEGER,
        format: type.ENUM('value 1', 'value 2'),
        status: type.ENUM('value 1', 'value 2')
    });
    return Copy;
};
