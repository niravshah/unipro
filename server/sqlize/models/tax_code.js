module.exports = (sequelize, DataTypes) => {

    var TaxCode = sequelize.define('TaxCode', {
        tax_code: DataTypes.STRING,
        description: DataTypes.STRING,
        tenant_id: {type: DataTypes.INTEGER, allowNull: false}
    }, {indexes: [{unique: true, fields: ['tax_code']}]});

    TaxCode.associate = function (models) {
        models.TaxCode.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };


    return TaxCode;
};

