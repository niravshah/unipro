module.exports = (sequelize, DataTypes) => {

    var Location = sequelize.define('Location', {
        location_id: DataTypes.BIGINT,
        description: DataTypes.STRING,
        tenant_id:DataTypes.INTEGER,
    }, {indexes: [{unique: true, fields: ['location_id']}]});

    Location.associate = function (models) {
        models.Location.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return Location;
};

