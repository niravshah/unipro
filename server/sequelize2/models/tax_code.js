module.exports = (sequelize, DataTypes) => {

    var TaxCode = sequelize.define('TaxCode', {
        id: {type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
        code: DataTypes.STRING,
        description: DataTypes.STRING,
        tenant_id: {type: DataTypes.INTEGER, allowNull:false}
    });

    TaxCode.associate = function (models) {
        models.TaxCode.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return TaxCode;
};
