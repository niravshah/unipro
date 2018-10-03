module.exports = (sequelize, DataTypes) => {

    var Manufacturer = sequelize.define('Manufacturer', {
        id: {type: DataTypes.INTEGER, primaryKey:true},
        name: DataTypes.STRING,
        tenant_id: {type: DataTypes.INTEGER, allowNull:false}
    }, {indexes: [{unique: true, fields: ['name']}]});

    Manufacturer.associate = function (models) {
        models.Manufacturer.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return Manufacturer;
};
