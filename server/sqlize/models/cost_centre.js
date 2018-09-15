module.exports = (sequelize, DataTypes) => {


    var CostCentre = sequelize.define('CostCentre', {
        cost_centre: DataTypes.STRING,
        description: DataTypes.STRING,
        sdu_description: DataTypes.STRING,
        care_group_description: DataTypes.STRING,
        directorate_description: DataTypes.STRING,
        division_description: DataTypes.STRING,
        pcm_division_description: DataTypes.STRING,
        reporting_division: DataTypes.STRING
    },   {indexes: [{unique: true, fields: ['cost_centre']}]});

    return CostCentre;
};

