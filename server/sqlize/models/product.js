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
        group_id: DataTypes.INTEGER,
        tax_code:DataTypes.INTEGER,
        eclass:DataTypes.INTEGER,
        supplier_id: DataTypes.INTEGER,
        contract_id: DataTypes.INTEGER
    },{indexes: [{unique: true, fields: ['product_code']}]});

    Product.associate = function (models) {
        models.Product.belongsTo(models.ProductGroup, {
            foreignKey: 'group_id', targetKey: 'id'
        });

        models.Product.belongsTo(models.TaxCode, {
            foreignKey: 'tax_code', targetKey: 'id'
        });

        models.Product.belongsTo(models.EClass, {
            foreignKey: 'eclass', targetKey: 'id'
        });

        models.Product.belongsTo(models.Supplier, {
            foreignKey: 'supplier_id', targetKey: 'id'
        });

        models.Order.belongsTo(models.Contract, {
            foreignKey: 'contract_id', targetKey: 'id'
        });
    };


    return Product;
};