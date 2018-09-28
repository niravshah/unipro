module.exports = (sequelize, DataTypes) => {

    var Location = sequelize.define('Location', {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        description: DataTypes.STRING,
        tenant_id: {type: DataTypes.INTEGER, allowNull: false}
    });

    Location.associate = function (models) {
        models.Location.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return Location;
};

