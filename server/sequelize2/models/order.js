module.exports = (sequelize, DataTypes) => {

    var Order = sequelize.define('Order', {
        id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        tenant_id: {type: DataTypes.INTEGER, allowNull:false},
        product_code: {type: DataTypes.INTEGER, allowNull:false},
        supplier_id: {type: DataTypes.INTEGER, allowNull:false},
        cost_centre: {type: DataTypes.INTEGER, allowNull:false},
        location_id: {type: DataTypes.INTEGER, allowNull:false},
        tax_code: {type: DataTypes.INTEGER, allowNull:false},
        order_type: {type: DataTypes.INTEGER, allowNull:false},
        period:DataTypes.STRING,
        quarter:DataTypes.STRING,
        order_no:DataTypes.INTEGER,
        po_count:DataTypes.INTEGER,
        po:DataTypes.INTEGER,
        sales_order:DataTypes.INTEGER,
        ordered_qty:DataTypes.INTEGER,
        ordered_amount_in_each:DataTypes.INTEGER,
        unit_price:DataTypes.FLOAT,
        amount:DataTypes.FLOAT,
        delivered:DataTypes.INTEGER,
        alt_id:DataTypes.INTEGER,
        order_date:DataTypes.DATEONLY,
        tax_percent:DataTypes.INTEGER,
        status:DataTypes.STRING
    });

    Order.associate = function (models) {
        models.Order.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });

        models.Order.belongsTo(models.Item, {
            foreignKey: 'product_code', targetKey: 'id'
        });

        models.Order.belongsTo(models.Supplier, {
            foreignKey: 'supplier_id', targetKey: 'id'
        });

        models.Order.belongsTo(models.CostCentre, {
            foreignKey: 'cost_centre', targetKey: 'id'
        });
        models.Order.belongsTo(models.Location, {
            foreignKey: 'location_id', targetKey: 'id'
        });
        models.Order.belongsTo(models.TaxCode, {
            foreignKey: 'tax_code', targetKey: 'id'
        });
        models.Order.belongsTo(models.OrderType, {
            foreignKey: 'order_type', targetKey: 'id'
        });
    };

    return Order;
};
