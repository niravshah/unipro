module.exports = (sequelize, DataTypes) => {

    var EClass = sequelize.define('EClass', {
        eclass: DataTypes.STRING,
        description: DataTypes.STRING
    }, {indexes: [{unique: true, fields: ['eclass']}]});

    return EClass;
};

