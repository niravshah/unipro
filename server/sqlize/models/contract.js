module.exports = (sequelize, DataTypes) => {

    var Contract = sequelize.define('Contract', {
        contract_id: DataTypes.STRING,
        start_date: DataTypes.DATEONLY,
        end_date: DataTypes.DATEONLY
    }, {indexes: [{unique: true, fields: ['contract_id']}]});

    return Contract;
};

