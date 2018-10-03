module.exports = (sequelize, DataTypes) => {

    var Supplier = sequelize.define('Supplier', {
        id: {type: DataTypes.INTEGER, primaryKey:true},
        name: DataTypes.STRING,
        tenant_id: {type: DataTypes.INTEGER, allowNull:false}
    }, {indexes: [{unique: true, fields: ['name']}]});

    Supplier.associate = function (models) {
        models.Supplier.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return Supplier;
};
