module.exports = (sequelize, DataTypes) => {

    var Inventory = sequelize.define('Inventory', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        tenant_id: {type: DataTypes.INTEGER, allowNull: false},
        supplier_id: {type: DataTypes.INTEGER, allowNull: false},
        item_id: {type: DataTypes.INTEGER, allowNull: false},
        location_id: {type: DataTypes.INTEGER, allowNull: false},
        cost_centre: {type: DataTypes.INTEGER, allowNull: false},
        inventory_id: DataTypes.INTEGER,
        min_level: DataTypes.INTEGER,
        max_level: DataTypes.INTEGER,
        current_level: DataTypes.INTEGER,
        active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
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
        models.Inventory.belongsTo(models.Location, {
            foreignKey: 'location_id', targetKey: 'id'
        });
        models.Inventory.belongsTo(models.CostCentre, {
            foreignKey: 'cost_centre', targetKey: 'id'
        });
    };

    return Inventory;
};




