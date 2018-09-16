module.exports = (sequelize, DataTypes) => {


    var Order = sequelize.define('Order', {

        order_id: DataTypes.BIGINT,
        supplier_id: DataTypes.INTEGER,
        product_code: DataTypes.INTEGER,
        cost_centre: DataTypes.INTEGER,
        location_id: DataTypes.INTEGER,
        order_type: DataTypes.STRING,
        period: DataTypes.INTEGER,
        quarter: DataTypes.STRING,
        order_no: DataTypes.BIGINT,
        po_count: DataTypes.INTEGER,
        pos: DataTypes.INTEGER,
        sales_order_no: DataTypes.BIGINT,
        ordered: DataTypes.INTEGER,
        amount_in_each: DataTypes.INTEGER,
        unit_price: DataTypes.DECIMAL,
        amount: DataTypes.DECIMAL,
        delivered: DataTypes.INTEGER,
        transaction_no: DataTypes.INTEGER,
        order_date: DataTypes.DATEONLY,
        posted: DataTypes.INTEGER,
        status: DataTypes.STRING,
        tenant_id: DataTypes.INTEGER
    });

    Order.associate = function (models) {
        models.Order.belongsTo(models.Supplier, {
            foreignKey: 'supplier_id', targetKey: 'id'
        });

        models.Order.belongsTo(models.Product, {
            foreignKey: 'product_code', targetKey: 'id'
        });

        models.Order.belongsTo(models.CostCentre, {
            foreignKey: 'cost_centre', targetKey: 'id'
        });

        models.Order.belongsTo(models.Location, {
            foreignKey: 'location_id', targetKey: 'id'
        });

        models.Order.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });

    };


    return Order;
};