module.exports = (sequelize, DataTypes) => {


    var CostCentre = sequelize.define('CostCentre', {
        cost_centre: DataTypes.STRING,
        description: DataTypes.STRING,
        sdu_description: DataTypes.STRING,
        care_group_description: DataTypes.STRING,
        directorate_description: DataTypes.STRING,
        division_description: DataTypes.STRING,
        pcm_division_description: DataTypes.STRING,
        reporting_division: DataTypes.STRING,
        tenant_id: {type: DataTypes.INTEGER, allowNull: false}
    }, {indexes: [{unique: true, fields: ['cost_centre']}]});

    CostCentre.associate = function (models) {
        models.CostCentre.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
    };

    return CostCentre;
};

