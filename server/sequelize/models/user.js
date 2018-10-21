module.exports = (sequelize, DataTypes) => {

    var User = sequelize.define('User', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        reset: DataTypes.BOOLEAN,
        last_login: DataTypes.DATE,
        tenant_id: {type: DataTypes.INTEGER, allowNull: false}
    }, {indexes: [{unique: true, fields: ['name']}]});

    User.associate = function (models) {
        models.User.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return User;
};
