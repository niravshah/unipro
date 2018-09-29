module.exports = (sequelize, DataTypes) => {

    var Eclass = sequelize.define('Eclass', {
        id: {type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
        code: DataTypes.STRING,
        description: DataTypes.STRING,
        tenant_id: {type: DataTypes.INTEGER, allowNull:false}
    });

    Eclass.associate = function (models) {
        models.Eclass.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return Eclass;
};
