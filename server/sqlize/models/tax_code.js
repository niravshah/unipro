module.exports = (sequelize, DataTypes) => {

    var TaxCode = sequelize.define('TaxCode', {
        tax_code: DataTypes.STRING,
        description: DataTypes.STRING
    }, {indexes: [{unique: true, fields: ['tax_code']}]});

    return TaxCode;
};

