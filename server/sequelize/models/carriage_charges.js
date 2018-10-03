module.exports = (sequelize, DataTypes) => {

    var CarriageCharge = sequelize.define('CarriageCharge', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        tenant_id: {type: DataTypes.INTEGER, allowNull: false},
        supplier_id: {type: DataTypes.INTEGER, allowNull: false},
        current_price: DataTypes.FLOAT
    });

    CarriageCharge.associate = function (models) {
        models.CarriageCharge.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
        models.CarriageCharge.belongsTo(models.Supplier, {
            foreignKey: 'supplier_id', targetKey: 'id'
        });
    };

    return CarriageCharge;
};


