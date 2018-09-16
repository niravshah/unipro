module.exports = (sequelize, DataTypes) => {

    var Location = sequelize.define('Location', {
        location_id: DataTypes.BIGINT,
        description: DataTypes.STRING,
        tenant_id: {type: DataTypes.INTEGER, allowNull: false}
    }, {
        indexes: [{unique: true, fields: ['location_id']}], scopes: {
            tenant: function (tenantId) {
                return {
                    where: {
                        tenant_id: tenantId
                    }
                }
            }
        }
    });

    Location.associate = function (models) {
        models.Location.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return Location;
};

