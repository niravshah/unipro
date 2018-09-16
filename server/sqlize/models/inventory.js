module.exports = (sequelize, DataTypes) => {


    var Inventory = sequelize.define('Inventory', {
        location_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        cost_centre: DataTypes.INTEGER,
        current_level: DataTypes.INTEGER,
        min_level: DataTypes.INTEGER,
        max_level: DataTypes.INTEGER,
        tenant_id: {type: DataTypes.INTEGER, allowNull:false}
    });

    Inventory.associate = function (models) {
        models.Inventory.belongsTo(models.Product, {
            foreignKey: 'product_id', targetKey: 'id'
        });

        models.Inventory.belongsTo(models.CostCentre, {
            foreignKey: 'cost_centre', targetKey: 'id'
        });

        models.Inventory.belongsTo(models.Location, {
            foreignKey: 'location_id', targetKey: 'id'
        });

        models.Inventory.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };


    return Inventory;
};