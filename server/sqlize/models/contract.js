module.exports = (sequelize, DataTypes) => {

    var Contract = sequelize.define('Contract', {
        contract_id: DataTypes.STRING,
        start_date: DataTypes.DATEONLY,
        end_date: DataTypes.DATEONLY,
        tenant_id: {type: DataTypes.INTEGER, allowNull:false}
    }, {indexes: [{unique: true, fields: ['contract_id']}]});

    Contract.associate = function (models) {
        models.Contract.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };
    return Contract;
};

