module.exports = (sequelize, DataTypes) => {
    var ProductGroup = sequelize.define('ProductGroup', {
        group_id: DataTypes.BIGINT,
        description: DataTypes.STRING,
        tenant_id: {type: DataTypes.INTEGER, allowNull:false}
    }, {indexes: [{unique: true, fields: ['group_id']}]});

    ProductGroup.associate = function (models) {
        models.ProductGroup.hasMany(models.Product, {
            foreignKey: 'group_id', sourceKey: 'group_id'
        });
        models.ProductGroup.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return ProductGroup;
};