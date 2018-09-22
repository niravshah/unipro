
module.exports = (sequelize, DataTypes) => {

    var Item = sequelize.define('Item', {
        id: {type: DataTypes.INTEGER, primaryKey:true},
        tenant_id: {type: DataTypes.INTEGER, allowNull:false},
        manufacturer_id: {type: DataTypes.INTEGER, allowNull:false},
        product_code: DataTypes.STRING,
        description: DataTypes.STRING,
        gtin: DataTypes.STRING,
        package_type: DataTypes.STRING,
        package_qty: DataTypes.INTEGER,
        measurement_unit: DataTypes.STRING,
        nhs_eclass: DataTypes.STRING,
        trust_product_code: DataTypes.STRING,
        account_code: DataTypes.STRING,
        manufacturer_item_code: DataTypes.STRING,

    });

    Item.associate = function (models) {
        models.Item.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
        models.Item.belongsTo(models.Manufacturer, {
            foreignKey: 'manufacturer_id', targetKey: 'id'
        });
    };

    return Item;
};


