module.exports = (sequelize, DataTypes) => {


    var Product = sequelize.define('Product', {
        product_code: DataTypes.STRING,
        description: DataTypes.STRING,
        unit: DataTypes.STRING,
        unit_desc: DataTypes.STRING,
        units_in_each: DataTypes.INTEGER,
        unit_price: DataTypes.DECIMAL,
        nhs_supply_chain_code: DataTypes.STRING,
        bunzl_product_code: DataTypes.STRING,
        group_id: DataTypes.BIGINT,
        tax_code:DataTypes.STRING,
        eclass:DataTypes.STRING,
        supplier_id: DataTypes.BIGINT,
        cost_centre:DataTypes.STRING,
    },{indexes: [{unique: true, fields: ['product_code']}]});

    Product.associate = function (models) {
        models.Product.belongsTo(models.ProductGroup, {
            foreignKey: 'group_id', targetKey: 'group_id'
        });

        models.Product.belongsTo(models.TaxCode, {
            foreignKey: 'tax_code', targetKey: 'tax_code'
        });

        models.Product.belongsTo(models.EClass, {
            foreignKey: 'eclass', targetKey: 'eclass'
        });

        models.Product.belongsTo(models.Supplier, {
            foreignKey: 'supplier_id', targetKey: 'supplier_id'
        });

        models.Product.belongsTo(models.CostCentre, {
            foreignKey: 'cost_centre', targetKey: 'cost_centre'
        });
    };


    return Product;
};