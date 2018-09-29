module.exports = (sequelize, DataTypes) => {

    var OrderType = sequelize.define('OrderType', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        code: DataTypes.STRING,
        description: DataTypes.STRING,
        tenant_id: {type: DataTypes.INTEGER, allowNull: false}
    });

    OrderType.associate = function (models) {
        models.OrderType.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return OrderType;
};
