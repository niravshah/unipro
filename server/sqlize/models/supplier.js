module.exports = (sequelize, DataTypes) => {
    var Supplier = sequelize.define('Supplier', {
        supplier_id: DataTypes.BIGINT,
        supplier_name: DataTypes.STRING,
        payment_terms: DataTypes.STRING,
        tenant_id: DataTypes.INTEGER
    }, {indexes: [{unique: true, fields: ['supplier_id']}]});

    Supplier.associate = function (models) {
        models.Supplier.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return Supplier;
};