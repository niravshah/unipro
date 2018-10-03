module.exports = (sequelize, DataTypes) => {

    var Catalogue = sequelize.define('Catalogue', {
        id: {type: DataTypes.INTEGER, primaryKey:true},
        tenant_id: {type: DataTypes.INTEGER, allowNull:false},
        supplier_id	:{type: DataTypes.INTEGER, allowNull:false},
        item_id	:{type: DataTypes.INTEGER, allowNull:false},
        status:DataTypes.STRING,
        current_price:DataTypes.FLOAT,
        supplier_item_url:DataTypes.STRING,
        other_item_code:DataTypes.STRING,
        min_order:DataTypes.INTEGER,
        order_lead_time:DataTypes.INTEGER,
        contract_ref:DataTypes.STRING,
        start_date:DataTypes.DATEONLY,
        end_date:DataTypes.DATEONLY
    });

    Catalogue.associate = function (models) {
        models.Catalogue.belongsTo(models.Tenant, {
            foreignKey: 'tenant_id', targetKey: 'id'
        });
        models.Catalogue.belongsTo(models.Supplier, {
            foreignKey: 'supplier_id', targetKey: 'id'
        });
        models.Catalogue.belongsTo(models.Item, {
            foreignKey: 'item_id', targetKey: 'id'
        });
    };

    return Catalogue;
};


