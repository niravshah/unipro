module.exports = (sequelize, DataTypes) => {

    var Barcode = sequelize.define('Barcode', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        tenant_id: {type: DataTypes.INTEGER, allowNull: false},
        supplier_id: {type: DataTypes.INTEGER, allowNull: false},
        item_id: {type: DataTypes.INTEGER, allowNull: false},
        barcode: {type: DataTypes.BIGINT, allowNull: false},
        description: DataTypes.STRING
    });

    Barcode.associate = function (models) {
        models.Barcode.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
        models.Barcode.belongsTo(models.Supplier, {
            foreignKey: 'supplier_id', targetKey: 'id'
        });
        models.Barcode.belongsTo(models.Item, {
            foreignKey: 'item_id', targetKey: 'id'
        });
    };

    return Barcode;
};


