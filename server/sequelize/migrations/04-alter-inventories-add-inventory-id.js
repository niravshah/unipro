module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Inventories', 'inventory_id', {
            type: Sequelize.INTEGER, allowNull: false
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Inventories', 'inventory_id');
    }
}