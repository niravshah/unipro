module.exports = (sequelize, DataTypes) => {

    var Tenant = sequelize.define('Tenant', {
        sudomain: DataTypes.STRING,
        status: DataTypes.STRING
    }, {indexes: [{unique: true, fields: ['sudomain']}]});

    return Tenant;
};
