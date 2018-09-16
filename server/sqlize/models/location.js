module.exports = (sequelize, DataTypes) => {

    var Location = sequelize.define('Location', {
        location_id: DataTypes.BIGINT,
        description: DataTypes.STRING
    }, {indexes: [{unique: true, fields: ['location_id']}]});

    return Location;
};

