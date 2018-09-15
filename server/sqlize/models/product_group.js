module.exports = (sequelize, DataTypes) => {
    var ProductGroup = sequelize.define('ProductGroup', {
        group_id: DataTypes.BIGINT,
        description: DataTypes.STRING
    }, {indexes: [{unique: true, fields: ['group_id']}]});

    ProductGroup.associate = function (models) {
        models.ProductGroup.hasMany(models.Product, {
            foreignKey: 'group_id', sourceKey: 'group_id'
        });
    };

    return ProductGroup;
};