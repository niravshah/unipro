module.exports = (sequelize, DataTypes) => {

    var EClass = sequelize.define('EClass', {
        eclass: DataTypes.STRING,
        description: DataTypes.STRING,
        tenant_id: {type: DataTypes.INTEGER, allowNull:false}
    }, {indexes: [{unique: true, fields: ['eclass']}]});

    EClass.associate = function (models) {
        models.EClass.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };


    return EClass;
};

