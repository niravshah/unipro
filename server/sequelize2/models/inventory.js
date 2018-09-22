module.exports = (sequelize, DataTypes) => {

    var Inventory = sequelize.define('Inventory', {
        id: {type: DataTypes.INTEGER, primaryKey:true},
        tenant_id: {type: DataTypes.INTEGER, allowNull:false},
        supplier_id	:{type: DataTypes.INTEGER, allowNull:false},
        item_id	:{type: DataTypes.INTEGER, allowNull:false},
        min_level:DataTypes.INTEGER,
        max_level:DataTypes.INTEGER,
        current_level:DataTypes.INTEGER,
    });

    Inventory.associate = function (models) {
        models.Inventory.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
        models.Inventory.belongsTo(models.Supplier, {
            foreignKey: 'supplier_id', targetKey: 'id'
        });
        models.Inventory.belongsTo(models.Item, {
            foreignKey: 'item_id', targetKey: 'id'
        });
    };

    return Inventory;
};




