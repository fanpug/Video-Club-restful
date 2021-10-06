module.exports = (sequelize, type) => {
    const Booking = sequelize.define('bookings', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        date: type.DATE(2)
    });
    return Booking;
};
