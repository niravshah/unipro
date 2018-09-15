module.exports = (sequelize, DataTypes) => {
    var Supplier = sequelize.define('Supplier', {
        supplier_id: DataTypes.BIGINT,
        supplier_name: DataTypes.STRING,
        payment_terms: DataTypes.STRING
    }, {indexes: [{unique: true, fields: ['supplier_id']}]});

    return Supplier;
};